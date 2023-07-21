using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class FixWorkoutTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__WorkoutEx__Custo__6DCC4D03",
                table: "WorkoutExercise");

            migrationBuilder.DropColumn(
                name: "CustomWorkoutId",
                table: "WorkoutExercise");

            migrationBuilder.CreateTable(
                name: "CustomWorkoutExercise",
                columns: table => new
                {
                    CustomWorkoutsId = table.Column<int>(type: "int", nullable: false),
                    ExercisesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Id", x => new { x.CustomWorkoutsId, x.ExercisesId });
                    table.ForeignKey(
                        name: "FK_CustomWorkoutExercise_CustomWorkout_CustomWorkoutsId",
                        column: x => x.CustomWorkoutsId,
                        principalTable: "CustomWorkout",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CustomWorkoutExercise_Exercise_ExercisesId",
                        column: x => x.ExercisesId,
                        principalTable: "Exercise",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CustomWorkoutExercise_ExercisesId",
                table: "CustomWorkoutExercise",
                column: "ExercisesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CustomWorkoutExercise");

            migrationBuilder.AddColumn<int>(
                name: "CustomWorkoutId",
                table: "WorkoutExercise",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WorkoutExercise_CustomWorkoutId",
                table: "WorkoutExercise",
                column: "CustomWorkoutId");

            migrationBuilder.AddForeignKey(
                name: "FK_WorkoutExercise_CustomWorkout_CustomWorkoutId",
                table: "WorkoutExercise",
                column: "CustomWorkoutId",
                principalTable: "CustomWorkout",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
