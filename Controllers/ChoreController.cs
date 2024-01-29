using ChoreChart.Data;
using ChoreChart.Models;
using ChoreChart.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/api/[controller]")]
public class ChoreController : ControllerBase
{
    private ChoreChartDbContext _dbContext;

    public ChoreController(ChoreChartDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        var choresWithUserChores = _dbContext
       .chores
       .Include(c => c.UserChores)
       .ThenInclude(uc => uc.UserProfile)
       .Select(c => new ChoreDTO
       {
           Id = c.Id,
           Name = c.Name,
           Description = c.Description,
           DueDate = c.DueDate,
           Status = c.Status,
           UserChores = c.UserChores.Select(uc => new UserChoresDTO
           {
               Id = uc.Id,
               UserProfileId = uc.UserProfileId,
               ChoreId = uc.ChoreId,
               RoomId = uc.RoomId
           }).ToList()
       });

        return Ok(choresWithUserChores);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult DeleteChore(int id)
    {
        Chore choreDelete = _dbContext.chores.FirstOrDefault(c => c.Id == id);
        if (choreDelete == null)
        {
            return NotFound();
        }

        _dbContext.chores.Remove(choreDelete);
        _dbContext.SaveChanges();

        return NoContent();
    }

    //get Chores by Id
    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        Chore? chore = _dbContext
        .chores
        .Include(c => c.UserChores)
            .ThenInclude(uc => uc.UserProfile)
                .ThenInclude(up => up.UserChores)
          .Include(c => c.UserChores)
          .ThenInclude(uc => uc.Room)      
        .SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }
        return Ok(chore);
    }

    //post a chore as an admin
    [HttpPost("{userProfileId}/{roomId}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult PostChore(Chore chore, int userProfileId, int roomId)
    {
        _dbContext.chores.Add(chore);
        _dbContext.SaveChanges();


        var userChore = new UserChores
        {
            ChoreId = chore.Id,
            RoomId = roomId,
            UserProfileId = userProfileId,
        };

        _dbContext.userChores.Add(userChore);
        _dbContext.SaveChanges();

        return Created($"/chores/{chore.Id}", chore);
    }

    //edit a chore as an admin
    [HttpPut("{id}")]
    [Authorize(Roles ="Admin")]
    public IActionResult UpdateChore(int id, Chore chore)
    {
        Chore choreUpdate = _dbContext.chores.FirstOrDefault(c => c.Id == id);
        if (choreUpdate == null)
        {
            return NotFound();
        }

        choreUpdate.Name = chore.Name;
        choreUpdate.Description = chore.Description;
        choreUpdate.DueDate = chore.DueDate;
        choreUpdate.Status = chore.Status;

        _dbContext.SaveChanges();
        return NoContent();
    }
}