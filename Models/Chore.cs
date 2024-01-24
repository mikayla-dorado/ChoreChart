using ChoreChart.Models.DTOs;

namespace ChoreChart.Models;

public class Chore
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
    //public UserChores UserChores { get; set; }
    public List<UserChores> UserChores { get; set; }
    //public List<UserProfile> UserProfiles { get; set; }
}
