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
        Chore chore = _dbContext
        .chores
        .Include(c => c.UserChores)
        .ThenInclude(uc => uc.UserProfile)
        .ThenInclude(up => up.UserChores)
        .SingleOrDefault(c => c.Id == id);

        if (chore == null)
        {
            return NotFound();
        }
        return Ok(chore);
    }

    // [HttpGet]
    // [Authorize]
    // public IActionResult GetUserChores()
    // {
    //     return Ok(_dbContext
    //     .userChores
    //     .Include(uc => uc.UserProfile)
    //     .Select(uc => new UserChoresDTO
    //     {
    //         Id = uc.Id,
    //         ChoreId = uc.ChoreId,
    //         RoomId = uc.RoomId,
    //         UserProfileId = uc.UserProfileId.Select(up => new UserProfileDTO
    //         {
    //             Id = up.Id,
    //             FirstName = up.FirstName,
    //             LastName = up.LastName,
    //             Address = up.Address,
    //             Email = up.Email
    //         }).ToList()
    //     }).ToList());
    // }

}