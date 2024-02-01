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
           Comment = c.Comment,
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
    [Authorize(Roles = "Admin")]
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
    [HttpPut("{id}/{userProfileId}/{roomId}")]
    [Authorize(Roles ="Admin")]
    public IActionResult UpdateChore(int id, Chore chore, int userProfileId, int roomId)
    {
        Chore? choreUpdate = _dbContext.chores
        .Include(c => c.UserChores)
        .ThenInclude(uc => uc.UserProfile) // Include UserProfile
        .Include(c => c.UserChores)
        .ThenInclude(uc => uc.Room) // Include Room
        .FirstOrDefault(c => c.Id == id);
        if (choreUpdate == null)
        {
            return NotFound();
        }

        choreUpdate.Name = chore.Name;
        choreUpdate.Description = chore.Description;
        choreUpdate.DueDate = chore.DueDate;
        choreUpdate.Status = chore.Status;
        choreUpdate.UserChores = chore.UserChores;

        _dbContext.SaveChanges();
        return NoContent();
    }

//post a comment
    // [HttpPost]
    // [Authorize]
    // public IActionResult PostComment()
    // {

    // }

[HttpPost("{choreId}")]
[Authorize]
public IActionResult PostComment(int choreId, [FromBody] string comment)
{
    if (string.IsNullOrWhiteSpace(comment))
    {
        return BadRequest("Invalid comment data");
    }

    var chore = _dbContext.chores.Find(choreId);

    if (chore == null)
    {
        return NotFound("Chore not found");
    }

    // Append the new comment to the existing comments
    chore.Comment = string.IsNullOrEmpty(chore.Comment)
        ? comment
        : $"{chore.Comment}\n{comment}";

    _dbContext.SaveChanges();

    // Optionally, you can return the updated chore or other relevant information
    return Ok(chore);
}

}

