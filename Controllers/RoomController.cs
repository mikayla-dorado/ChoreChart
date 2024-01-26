using ChoreChart.Data;
using ChoreChart.Models;
using ChoreChart.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("/api/[controller]")]
public class RoomController : ControllerBase
{
    private ChoreChartDbContext _dbContext;

    public RoomController(ChoreChartDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
        .rooms
        .Select (r => new RoomDTO
        {
            Id = r.Id,
            Name = r.Name,
            Location = r.Location
        })
        );
    }
}