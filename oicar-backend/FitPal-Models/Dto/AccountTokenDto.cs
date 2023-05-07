namespace FitPal_Models.Dto
{
    public class AccountTokenDto
    {
        public int IdUser { get; set; }
        public bool IsRegister { get; set; }
        public string AccessToken { get; set; }
    }
}
