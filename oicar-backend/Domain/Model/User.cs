using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class User
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Name { get; set; }

    public string? Surname { get; set; }

    public bool? Newsletter { get; set; }

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public bool? Deleted { get; set; }

    public int? RoleId { get; set; }
    public bool IsRegister { get; set; }

    public virtual Role? Role { get; set; }
}
