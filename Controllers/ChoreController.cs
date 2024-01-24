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
       }).ToList();

        return Ok(choresWithUserChores);
    }
}