using Domain.Model;
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

    public DateTime? CreateDate { get; set; }

    public DateTime? UpdateDate { get; set; }

    public bool? Deleted { get; set; }
    public int? RoleId { get; set; }
    public bool IsRegister { get; set; }
    public string? ForgotPasswordCode { get; set; }
    public DateTime? ForgotPasswordCreateDate { get; set; }
    public virtual Role? Role { get; set; }
    public virtual ICollection<CustomWorkout> CustomWorkouts { get; } = new List<CustomWorkout>();
    public virtual ICollection<ExerciseProgress> ExerciseProgresses { get; } = new List<ExerciseProgress>();

}
