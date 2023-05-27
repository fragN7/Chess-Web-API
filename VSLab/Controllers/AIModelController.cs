using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VSLab.ChessAiModel;

namespace VSLab.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AIModelController : ControllerBase
    {
        [HttpGet("{rating}/{tournaments}/{champions}")]
        [AllowAnonymous]
        public IActionResult GetChampionPrediction(int rating, int tournaments, int champions)
        {
            // Load sample data
            //Load sample data
            var sampleData = new MLModel.ModelInput()
            {
                Id = 3F,
                Rating = rating,
                Tournaments = tournaments,
                Champions = champions,
            };

            //Load model and predict output
            var result = MLModel.Predict(sampleData);

            return Ok(result);
        }
    }
}
