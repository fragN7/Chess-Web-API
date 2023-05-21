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
                name: "FK_tblChessParticipations_tblUserProfiles_UserID",
                table: "tblChessParticipations");

            migrationBuilder.DropIndex(
                name: "IX_tblChessParticipations_UserID",
                table: "tblChessParticipations");

            migrationBuilder.AddColumn<int>(
                name: "TblUserID",
                table: "tblChessParticipations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_tblChessParticipations_TblUserID",
                table: "tblChessParticipations",
                column: "TblUserID");

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessParticipations_tblUserProfiles_TblUserID",
                table: "tblChessParticipations",
                column: "TblUserID",
                principalTable: "tblUserProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tblChessParticipations_tblUserProfiles_TblUserID",
                table: "tblChessParticipations");

            migrationBuilder.DropIndex(
                name: "IX_tblChessParticipations_TblUserID",
                table: "tblChessParticipations");

            migrationBuilder.DropColumn(
                name: "TblUserID",
                table: "tblChessParticipations");

            migrationBuilder.CreateIndex(
                name: "IX_tblChessParticipations_UserID",
                table: "tblChessParticipations",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_tblChessParticipations_tblUserProfiles_UserID",
                table: "tblChessParticipations",
                column: "UserID",
                principalTable: "tblUserProfiles",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
