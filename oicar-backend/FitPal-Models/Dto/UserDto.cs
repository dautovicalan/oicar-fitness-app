namespace FitPal_Models.Dto
{
    public class UserDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public bool? Newsletter { get; set; }
        public bool? Deleted { get; set; }
        public int? RoleId { get; set; }
        public bool IsRegister { get; set; }
    }
}
