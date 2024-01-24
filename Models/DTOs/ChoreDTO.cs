namespace ChoreChart.Models.DTOs;

public class ChoreDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime DueDate { get; set; }
    public string Status { get; set; }
    // public List<UserChores> UserChores { get; set; }
    public List<UserChoresDTO> UserChores { get; set; }
    public List<UserProfileDTO> UserProfiles { get; set; }
}