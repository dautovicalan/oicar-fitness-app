namespace FitPal_Models.Dto
{
    public class UserDto
    {
        public int Id { get; set; }
        public string Email { get; set; } = null!;
        public string? Name { get; set; }
        public string? Surname { get; set; }
        public bool? Newsletter { get; set; }
        public int? RoleId { get; set; }
        public bool IsRegister { get; set; }
    }
}
