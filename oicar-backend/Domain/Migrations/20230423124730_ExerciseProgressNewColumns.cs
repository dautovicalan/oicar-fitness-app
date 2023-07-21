using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class ExerciseProgressNewColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                table: "ExerciseProgress",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "ExerciseProgress",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ExerciseProgress_UserId",
                table: "ExerciseProgress",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ExerciseProgress_User_UserId",
                table: "ExerciseProgress",
                column: "UserId",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExerciseProgress_User_UserId",
                table: "WorkoutExercise");

            migrationBuilder.DropIndex(
                name: "IX_ExerciseProgress_UserId",
                table: "WorkoutExercise");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "ExerciseProgress");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "ExerciseProgress");
        }
    }
}
