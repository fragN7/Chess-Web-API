using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VSLab.Migrations
{
    /// <inheritdoc />
    public partial class TestMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessPlayers_ChessPlaye~",
                table: "tblChessPlayertblChessTournament");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessTournaments_ChessT~",
                table: "tblChessPlayertblChessTournament");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations");

            migrationBuilder.AlterColumn<string>(
                name: "Trophy",
                table: "tblChessTournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "PrizeMoney",
                table: "tblChessTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "NumParticipants",
                table: "tblChessTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblChessTournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Host",
                table: "tblChessTournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessTournaments",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessTournaments",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "tblChessTournaments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "ChessTournamentsID",
                table: "tblChessPlayertblChessTournament",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayersID",
                table: "tblChessPlayertblChessTournament",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "StartYear",
                table: "tblChessPlayers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "tblChessPlayers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblChessPlayers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "IsMaster",
                table: "tblChessPlayers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessPlayers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "tblChessPlayers",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessPlayers",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "tblChessPlayers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "DurationPlayed",
                table: "tblChessParticipations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessParticipations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "DateSigned",
                table: "tblChessParticipations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayerID",
                table: "tblChessParticipations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ChessTournamentID",
                table: "tblChessParticipations",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "tblChessParticipations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Record",
                table: "tblChessChampions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "MaxRating",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "LastTrophy",
                table: "tblChessChampions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessChampions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Current",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ConsecutiveYears",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayerID",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "tblChessChampions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations",
                columns: new[] { "ChessTournamentID", "ChessPlayerID", "UserID" });

            migrationBuilder.CreateTable(
                name: "userProfiles",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Bio = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_userProfiles", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tblChessTournaments_UserID",
                table: "tblChessTournaments",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessPlayers_UserID",
                table: "tblChessPlayers",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessParticipations_UserID",
                table: "tblChessParticipations",
                column: "UserID");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessChampions_UserID",
                table: "tblChessChampions",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessChampions_userProfiles_UserID",
                table: "tblChessChampions",
                column: "UserID",
                principalTable: "userProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessParticipations_userProfiles_UserID",
                table: "tblChessParticipations",
                column: "UserID",
                principalTable: "userProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessPlayers_userProfiles_UserID",
                table: "tblChessPlayers",
                column: "UserID",
                principalTable: "userProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessPlayers_ChessPlayersID",
                table: "tblChessPlayertblChessTournament",
                column: "ChessPlayersID",
                principalTable: "tblChessPlayers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessTournaments_ChessTournamentsID",
                table: "tblChessPlayertblChessTournament",
                column: "ChessTournamentsID",
                principalTable: "tblChessTournaments",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessTournaments_userProfiles_UserID",
                table: "tblChessTournaments",
                column: "UserID",
                principalTable: "userProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblChessChampions_userProfiles_UserID",
                table: "tblChessChampions");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessParticipations_userProfiles_UserID",
                table: "tblChessParticipations");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessPlayers_userProfiles_UserID",
                table: "tblChessPlayers");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessPlayers_ChessPlayersID",
                table: "tblChessPlayertblChessTournament");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessTournaments_ChessTournamentsID",
                table: "tblChessPlayertblChessTournament");

            migrationBuilder.DropForeignKey(
                name: "FK_tblChessTournaments_userProfiles_UserID",
                table: "tblChessTournaments");

            migrationBuilder.DropTable(
                name: "userProfiles");

            migrationBuilder.DropIndex(
                name: "IX_tblChessTournaments_UserID",
                table: "tblChessTournaments");

            migrationBuilder.DropIndex(
                name: "IX_tblChessPlayers_UserID",
                table: "tblChessPlayers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations");

            migrationBuilder.DropIndex(
                name: "IX_tblChessParticipations_UserID",
                table: "tblChessParticipations");

            migrationBuilder.DropIndex(
                name: "IX_tblChessChampions_UserID",
                table: "tblChessChampions");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "tblChessTournaments");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "tblChessPlayers");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "tblChessParticipations");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "tblChessChampions");

            migrationBuilder.AlterColumn<string>(
                name: "Trophy",
                table: "tblChessTournaments",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "PrizeMoney",
                table: "tblChessTournaments",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "NumParticipants",
                table: "tblChessTournaments",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblChessTournaments",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Host",
                table: "tblChessTournaments",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessTournaments",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessTournaments",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<int>(
                name: "ChessTournamentsID",
                table: "tblChessPlayertblChessTournament",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayersID",
                table: "tblChessPlayertblChessTournament",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "StartYear",
                table: "tblChessPlayers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "tblChessPlayers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "tblChessPlayers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "IsMaster",
                table: "tblChessPlayers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessPlayers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Country",
                table: "tblChessPlayers",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessPlayers",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "DurationPlayed",
                table: "tblChessParticipations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessParticipations",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "DateSigned",
                table: "tblChessParticipations",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayerID",
                table: "tblChessParticipations",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ChessTournamentID",
                table: "tblChessParticipations",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Record",
                table: "tblChessChampions",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "MaxRating",
                table: "tblChessChampions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "LastTrophy",
                table: "tblChessChampions",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "tblChessChampions",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "Current",
                table: "tblChessChampions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ConsecutiveYears",
                table: "tblChessChampions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ChessPlayerID",
                table: "tblChessChampions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                table: "tblChessChampions",
                type: "integer",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_tblChessParticipations",
                table: "tblChessParticipations",
                columns: new[] { "ChessTournamentID", "ChessPlayerID" });

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessPlayers_ChessPlaye~",
                table: "tblChessPlayertblChessTournament",
                column: "ChessPlayersID",
                principalTable: "tblChessPlayers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessPlayertblChessTournament_tblChessTournaments_ChessT~",
                table: "tblChessPlayertblChessTournament",
                column: "ChessTournamentsID",
                principalTable: "tblChessTournaments",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
