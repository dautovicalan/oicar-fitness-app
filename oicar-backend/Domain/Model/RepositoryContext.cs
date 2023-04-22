using System;
using System.Collections.Generic;
using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Domain.Models;

public partial class RepositoryContext : DbContext
{
    public RepositoryContext()
    {
    }

    public RepositoryContext(DbContextOptions<RepositoryContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<UserPreferences> UserPreferences { get; set; }
    public virtual DbSet<BodyPart> BodyPart { get; set; }
    public virtual DbSet<Equipment> Equipment { get; set; }
    public virtual DbSet<TargetMuscle> TargetMuscles { get; set; }
    public virtual DbSet<Exercise> Exercise { get; set; }
    public virtual DbSet<CustomWorkout> CustomWorkout { get; set; }
    public virtual DbSet<WorkoutExercise> WorkoutExercise { get; set; }
    public virtual DbSet<WorkoutSchedule> WorkoutSchedule { get; set; }

    
 
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Role__3214EC0789CF6323");

            entity.ToTable("Role");

            entity.Property(e => e.Name).HasMaxLength(70);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC0705EAA96C");

            entity.ToTable("User");

            entity.Property(e => e.CreateDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.Surname).HasMaxLength(70);
            entity.Property(e => e.UpdateDate).HasColumnType("datetime");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK__User__RoleId__398D8EEE");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
