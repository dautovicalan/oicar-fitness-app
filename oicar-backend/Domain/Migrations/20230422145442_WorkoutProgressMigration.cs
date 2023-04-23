using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutProgressMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_WorkoutSchedule_CustomWorkout_CustomWorkoutId",
                table: "WorkoutSchedule");

            migrationBuilder.DropIndex(
                name: "IX_WorkoutSchedule_CustomWorkoutId",
                table: "WorkoutSchedule");

            migrationBuilder.DropColumn(
                name: "CustomWorkoutId",
                table: "WorkoutSchedule");

            migrationBuilder.AddColumn<int>(
                name: "WorkoutScheduleId",
                table: "CustomWorkout",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomWorkout_WorkoutScheduleId",
                table: "CustomWorkout",
                column: "WorkoutScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_CustomWorkout_WorkoutSchedule_WorkoutScheduleId",
                table: "CustomWorkout",
                column: "WorkoutScheduleId",
                principalTable: "WorkoutSchedule",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomWorkout_WorkoutSchedule_WorkoutScheduleId",
                table: "CustomWorkout");

            migrationBuilder.DropIndex(
                name: "IX_CustomWorkout_WorkoutScheduleId",
                table: "CustomWorkout");

            migrationBuilder.DropColumn(
                name: "WorkoutScheduleId",
                table: "CustomWorkout");

            migrationBuilder.AddColumn<int>(
                name: "CustomWorkoutId",
                table: "WorkoutSchedule",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutSchedule_CustomWorkoutId",
                table: "WorkoutSchedule",
                column: "CustomWorkoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutSchedule_CustomWorkout_CustomWorkoutId",
                table: "WorkoutSchedule",
                column: "CustomWorkoutId",
                principalTable: "CustomWorkout",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
