using VSLab.Data;
using System.Text.RegularExpressions;

namespace VSLab.Controllers
{
    public class Validators
    {
        public bool ValidateChampion(tblChessChampion champ)
        {
            if(champ.Current != 0 && champ.Current != 1)
            {
                return false;
            }

            if(champ.Record.Count(f => f == '-') !=2)
            {
                return false;
            }

            if(!Regex.IsMatch(champ.LastTrophy, @"^[a-zA-Z ]+$"))
            {
                return false;
            }

            if(champ.ConsecutiveYears > 50)
            {
                return false;
            }

            return true;
        }
        public bool ValidatePlayer(tblChessPlayer player)
        {
            if(player.IsMaster != 0 && player.IsMaster != 1)
            {
                return false;
            }

            if(player.StartYear <= 1700 || player.StartYear >= 2024)
            {
                return false;
            }

            if(player.Rating < 0)
            {
                return false;
            }

            return true;
        }
        public bool ValidateTournament(tblChessTournament tournament)
        {
            if(!Regex.IsMatch(tournament.Trophy, @"^[a-zA-Z ]+$"))
            {
                return false;
            }

            if(tournament.PrizeMoney < 0)
            {
                return false;
            }

            return true;
        }
    }
}
