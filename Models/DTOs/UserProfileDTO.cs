using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace ChoreChart.Models.DTOs;

public class UserProfileDTO
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string Address { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string UserName { get; set; }

    public List<string> Roles { get; set; }

    public string? IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<UserChoresDTO> UserChores {get; set; }
    //public int ChoreId { get; set; }
    public List<ChoreDTO> Chores { get; set; }
}