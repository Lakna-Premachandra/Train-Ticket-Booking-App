using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Train_Web_Project.DAL;
using Train_Web_Project.Models;

namespace Train_Web_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainBookingsController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public TrainBookingsController(MyAppDbContext context)
        {
            _context = context;
        }

        

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PostTrainBooking([FromBody] TrainBooking trainBooking)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (string.IsNullOrEmpty(trainBooking.StartStation) ||
                string.IsNullOrEmpty(trainBooking.EndStation) ||
                string.IsNullOrEmpty(trainBooking.Class) ||
                string.IsNullOrEmpty(trainBooking.Name) ||
                string.IsNullOrEmpty(trainBooking.NIC) ||
                string.IsNullOrEmpty(trainBooking.MobileNo))
            {
                return BadRequest("All fields are required.");
            }

            _context.TrainBook.Add(trainBooking);
            await _context.SaveChangesAsync();

            
            var updateResult = await UpdateTrainDetails(trainBooking.TrainId, trainBooking.Seats, trainBooking.SeatNumbers.ToArray());

            if (!updateResult)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to update train details.");
            }

            return CreatedAtAction(nameof(GetTrainBooking), new { id = trainBooking.Id }, trainBooking);
        }

        private async Task<bool> UpdateTrainDetails(int trainId, int bookedSeats, string[] bookedSeatNumbers)
        {
            try
            {
                
                var httpClient = new HttpClient();
                var requestUrl = $"https://localhost:44327/api/Train/{trainId}";
                var trainDetails = await httpClient.GetAsync(requestUrl);

                if (!trainDetails.IsSuccessStatusCode)
                {
                    return false;
                }

                
                var trainJson = await trainDetails.Content.ReadAsStringAsync();
                var train = JsonConvert.DeserializeObject<Train>(trainJson);
                train.AvailableSeats -= bookedSeats;

                
                train.SeatNumbers = train.SeatNumbers.Where(seatNumber => !bookedSeatNumbers.Contains(seatNumber)).ToArray();

                
                var updateResponse = await httpClient.PutAsJsonAsync(requestUrl, train);
                return updateResponse.IsSuccessStatusCode;
            }
            catch (Exception ex)
            {
                return false;
            }
        }


        

        [HttpGet("{id}")]
        public async Task<ActionResult<TrainBooking>> GetTrainBooking(int id)
        {
            var trainBooking = await _context.TrainBook.FindAsync(id);

            if (trainBooking == null)
            {
                return NotFound();
            }

            return trainBooking;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<TrainBooking>> GetTrainBookings()
        {
            return _context.TrainBook.ToList();
        }
    }
}
