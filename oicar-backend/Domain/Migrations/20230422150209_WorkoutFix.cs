using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "CustomWorkoutWorkoutSchedule",
                columns: table => new
                {
                    WorkoutsId = table.Column<int>(type: "int", nullable: false),
                    WorkoutsId1 = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CustomWorkoutWorkoutSchedule", x => new { x.WorkoutsId, x.WorkoutsId1 });
                    table.ForeignKey(
                        name: "FK_CustomWorkoutWorkoutSchedule_CustomWorkout_WorkoutsId",
                        column: x => x.WorkoutsId,
                        principalTable: "CustomWorkout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomWorkoutWorkoutSchedule_WorkoutSchedule_WorkoutsId1",
                        column: x => x.WorkoutsId1,
                        principalTable: "WorkoutSchedule",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomWorkoutWorkoutSchedule_WorkoutsId1",
                table: "CustomWorkoutWorkoutSchedule",
                column: "WorkoutsId1");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomWorkoutWorkoutSchedule");

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
    }
}
