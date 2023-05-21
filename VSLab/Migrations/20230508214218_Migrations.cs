using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace VSLab.Migrations
{
    /// <inheritdoc />
    public partial class Migrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tblUserProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Password = table.Column<string>(type: "text", nullable: false),
                    UserName = table.Column<string>(type: "text", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    BirthDate = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    ConfirmationCode = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblUserProfiles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tblChessPlayers",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    IsMaster = table.Column<int>(type: "integer", nullable: false),
                    StartYear = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UserID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessPlayers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessPlayers_tblUserProfiles_UserID",
                        column: x => x.UserID,
                        principalTable: "tblUserProfiles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessTournaments",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    NumParticipants = table.Column<int>(type: "integer", nullable: false),
                    Host = table.Column<string>(type: "text", nullable: false),
                    PrizeMoney = table.Column<int>(type: "integer", nullable: false),
                    Trophy = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    UserID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessTournaments", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessTournaments_tblUserProfiles_UserID",
                        column: x => x.UserID,
                        principalTable: "tblUserProfiles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessChampions",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    LastTrophy = table.Column<string>(type: "text", nullable: false),
                    Record = table.Column<string>(type: "text", nullable: false),
                    MaxRating = table.Column<int>(type: "integer", nullable: false),
                    ConsecutiveYears = table.Column<int>(type: "integer", nullable: false),
                    Current = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ChessPlayerID = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessChampions", x => x.ID);
                    table.ForeignKey(
                        name: "FK_tblChessChampions_tblChessPlayers_ChessPlayerID",
                        column: x => x.ChessPlayerID,
                        principalTable: "tblChessPlayers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tblChessParticipations",
                columns: table => new
                {
                    ChessPlayerID = table.Column<int>(type: "integer", nullable: false),
                    ChessTournamentID = table.Column<int>(type: "integer", nullable: false),
                    DateSigned = table.Column<string>(type: "text", nullable: false),
                    DurationPlayed = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblChessParticipations", x => new { x.ChessTournamentID, x.ChessPlayerID });
                    table.ForeignKey(
                        name: "FK_tblChessParticipations_tblChessPlayers_ChessPlayerID",
                        column: x => x.ChessPlayerID,
                        principalTable: "tblChessPlayers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tblChessParticipations_tblChessTournaments_ChessTournamentID",
                        column: x => x.ChessTournamentID,
                        principalTable: "tblChessTournaments",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblChessChampions_ChessPlayerID",
                table: "tblChessChampions",
                column: "ChessPlayerID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessParticipations_ChessPlayerID",
                table: "tblChessParticipations",
                column: "ChessPlayerID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessPlayers_UserID",
                table: "tblChessPlayers",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessTournaments_UserID",
                table: "tblChessTournaments",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblChessChampions");

            migrationBuilder.DropTable(
                name: "tblChessParticipations");

            migrationBuilder.DropTable(
                name: "tblChessPlayers");

            migrationBuilder.DropTable(
                name: "tblChessTournaments");

            migrationBuilder.DropTable(
                name: "tblUserProfiles");
        }
    }
}
