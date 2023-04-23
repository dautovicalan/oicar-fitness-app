using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class WorkoutScheduleChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomWorkoutWorkoutSchedule");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
