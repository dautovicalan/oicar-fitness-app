using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain.Migrations
{
    /// <inheritdoc />
    public partial class isRegister : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "test",
                table: "User");

            migrationBuilder.AddColumn<bool>(
                name: "IsRegister",
                table: "User",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRegister",
                table: "User");

            migrationBuilder.AddColumn<string>(
                name: "test",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
