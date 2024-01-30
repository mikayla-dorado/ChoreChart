using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ChoreChart.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Components.Routing;

namespace ChoreChart.Data;
public class ChoreChartDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Chore> chores { get; set; }
    public DbSet<Room> rooms { get; set; }
    public DbSet<UserChores> userChores { get; set; }


    public ChoreChartDbContext(DbContextOptions<ChoreChartDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Joe",
            LastName = "Shepherd",
            Email = "admina@strator.comx",
            Address = "101 Main Street",
        });
        modelBuilder.Entity<Chore>().HasData(new Chore[]
        {
            new Chore {Id = 1, Name = "Dust", Description = "Dust all wood surfaces", DueDate = new DateTime(2024, 1, 25), Status = "In Progress"},
            new Chore {Id = 2, Name = "Sweep", Description = "Sweep all floors", DueDate = new DateTime(2024, 1, 19), Status = "Completed"},
            new Chore {Id = 3, Name = "Clean Counters", Description = "Wipe down all kitchen counters", DueDate = new DateTime(2024, 1, 24), Status = "Pending"},
            new Chore {Id = 4, Name = "Mop", Description = "Mop all floors after sweeping", DueDate = new DateTime(2024, 1, 19), Status = "Completed"},
            new Chore {Id = 5, Name = "Do Dishes", Description = "Wash all Dishes", DueDate = new DateTime(2024, 1, 26), Status = "In Progress"},
            new Chore {Id = 6, Name = "Organize Storage Totes", Description = "Organize totes", DueDate = new DateTime(2024, 1, 30), Status = "Pending"},
            new Chore {Id = 7, Name = "Laundry", Description = "Fold and put away clean laudry", DueDate = new DateTime(2024, 1, 28), Status = "In Progress"},
        });
        modelBuilder.Entity<Room>().HasData(new Room[]
        {
            new Room {Id = 1, Name = "Living Room", Location = "Main Floor"},
            new Room {Id = 2, Name = "Kitchen", Location = "Main Floor"},
            new Room {Id = 3, Name = "Garage", Location = "Garage"},
            new Room {Id = 4, Name = "Bedroom", Location = "Upstairs"}
        });
        modelBuilder.Entity<UserChores>().HasData(new UserChores[]
        {
            new UserChores {Id = 1, UserProfileId = 1, ChoreId = 1, RoomId = 1},
            new UserChores {Id = 2, UserProfileId = 1, ChoreId = 7, RoomId = 4},
            new UserChores {Id = 3, UserProfileId = 1, ChoreId = 6, RoomId = 3},
            new UserChores {Id = 4, UserProfileId = 1, ChoreId = 2, RoomId = 1},
            new UserChores {Id = 5, UserProfileId = 1, ChoreId = 4, RoomId = 1},
            new UserChores {Id = 6, UserProfileId = 1, ChoreId = 3, RoomId = 2},
            new UserChores {Id = 7, UserProfileId = 1, ChoreId = 5, RoomId = 2}
        });
    }
}

