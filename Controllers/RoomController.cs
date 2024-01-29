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
    [Authorize]
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

    //get rooms by Id
    [HttpGet("{id}")]
    //[Authorize]
    public IActionResult GetRoomById(int id)
    {
        Room room = _dbContext
        .rooms
        .SingleOrDefault(r => r.Id == id);

        if (room == null)
        {
            return NotFound();
        }

        return Ok(room);
    }
}