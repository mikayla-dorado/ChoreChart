using ChoreChart.Models.DTOs;

namespace ChoreChart.Models;

public class UserChores
{
    public int Id { get; set; }
    public int ChoreId { get; set; }
    public Chore Chore { get; set; }
    public int RoomId { get; set; }
    public Room Room { get; set; }
    public int UserProfileId { get; set; }
    public UserProfile UserProfile { get; set; }

    internal object Select(Func<object, UserChoresDTO> value)
    {
        throw new NotImplementedException();
    }
}