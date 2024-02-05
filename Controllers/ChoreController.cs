using System.Text.Json;
using System.Xml.Linq;
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
    //[Authorize]
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
    //[Authorize]
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

        if (chore.Comment == null)
        {
            chore.Comment = null;
        }

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
    [Authorize(Roles = "Admin")]
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
        choreUpdate.Comment = chore.Comment;
        choreUpdate.UserChores = chore.UserChores;

        _dbContext.SaveChanges();
        return NoContent();
    }


    //get comments by a chore id
    [HttpGet("comments/{choreId}")]
    //[Authorize]
    public IActionResult GetCommentsByChoreId(int choreId)
    {
        var chore = _dbContext.chores
            .FirstOrDefault(c => c.Id == choreId);

        if (chore == null)
        {
            return NotFound("Chore not found");
        }

        // Assuming "Comment" is a property on the Chore model
        var comments = new List<string> { chore.Comment };

        return Ok(comments);
    }


    //this allows users to leave a comment on a chore
    [HttpPut("comment/{choreId}")]
    //[Authorize]
    public IActionResult PostComment(int choreId, [FromBody] Chore chore)
    {
        var existingChore = _dbContext.chores.Find(choreId);

        if (existingChore == null)
        {
            return NotFound("Chore not found");
        }

        // Update the comment in the existing chore
        existingChore.Comment = chore.Comment;

        _dbContext.SaveChanges();

        // Optionally, you can return the updated chore or other relevant information
        return Ok(existingChore);
    }

    //allows user to delete a comment on a chore
    [HttpDelete("comment/{choreId}")]
    //[Authorize]
    public IActionResult DeleteComment(int choreId)
    {
        var existingChore = _dbContext.chores.Find(choreId);

        if (existingChore == null)
        {
            return NotFound("Chore not found");
        }

        // Remove the comment from the existing chore
        existingChore.Comment = ""; // Or set it to an empty string depending on your requirements

        _dbContext.SaveChanges();

        // Optionally, you can return the updated chore or other relevant information
        return Ok(existingChore);
    }



}

