namespace ChoreChart.Models.DTOs;

public class UserChoresDTO
{
    public int Id { get; set; }
    public int ChoreId { get; set; }
    public ChoreDTO Chore { get; set; }
    public int RoomId { get; set; }
    public RoomDTO Room { get; set; }
    public int UserProfileId { get; set; }
    public UserProfileDTO UserProfile { get; set; }
    public UserChoresDTO UserChores { get; set; }
}