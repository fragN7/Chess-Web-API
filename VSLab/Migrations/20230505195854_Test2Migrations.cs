using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSLab.Migrations
{
    /// <inheritdoc />
    public partial class Test2Migrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations",
                columns: new[] { "ChessTournamentID", "ChessPlayerID" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations",
                columns: new[] { "ChessTournamentID", "ChessPlayerID", "UserID" });
        }
    }
}
