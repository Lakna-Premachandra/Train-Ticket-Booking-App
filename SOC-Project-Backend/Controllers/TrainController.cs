using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Train_Web_Project.DAL;
using Train_Web_Project.Models;

namespace Train_Web_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrainController : ControllerBase
    {
        private readonly MyAppDbContext _context;

        public TrainController(MyAppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Post([FromBody] Train model)
        {
            try
            {
                if (model == null)
                {
                    return BadRequest("Train data is invalid.");
                }

                _context.Trains.Add(model);
                _context.SaveChanges();

                return CreatedAtRoute("GetTrainById", new { id = model.Id }, new { message = "Train created successfully." });

            }
            catch (Exception ex)
            {
                Console.WriteLine("Exception Message: " + ex.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while saving the train." });
            }
        }

        

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Train model)
        {
            if (model == null || id == 0)
            {
                if (model == null)
                {
                    return BadRequest("Model Data Is Invalid");
                }
                else if (id == 0)
                {
                    return BadRequest($"Train Id {id} is invalid");
                }
            }
            try
            {
                var train = _context.Trains.Find(id);
                if (train == null)
                {
                    return NotFound($"Train not found with id {id}");
                }

                train.StartStation = model.StartStation;
                train.EndStation = model.EndStation;
                train.Date = model.Date;
                train.DepartureTime = model.DepartureTime;
                train.ArrivalTime = model.ArrivalTime;
                train.Class = model.Class;
                train.AvailableSeats = model.AvailableSeats;
                train.Price = model.Price;
                train.SeatNumbers = model.SeatNumbers;

                _context.SaveChanges();
                return Ok("Train details updated.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updateAvailability/{id}")]
        public IActionResult UpdateAvailability(int id, [FromBody] TrainAvailabilityUpdateModel model)
        {
            if (model == null || id == 0)
            {
                if (model == null)
                {
                    return BadRequest("Model Data Is Invalid");
                }
                else if (id == 0)
                {
                    return BadRequest($"Train Id {id} is invalid");
                }
            }
            try
            {
                
                var train = _context.Trains.Find(id);
                if (train == null)
                {
                    return NotFound($"Train not found with id {id}");
                }

                
                train.AvailableSeats -= model.BookedSeats;

                
                train.SeatNumbers = train.SeatNumbers.Except(model.BookedSeatNumbers).ToArray();

                _context.SaveChanges();

                return Ok("Train availability updated.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var train = _context.Trains.Find(id);
                if (train == null)
                {
                    return NotFound($"Train not found with id {id}");
                }

                _context.Trains.Remove(train);
                _context.SaveChanges();
                return Ok("Train details deleted.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var trains = _context.Trains.ToList();
                if (trains.Count == 0)
                {
                    return NotFound("Trains Not Available.");
                }
                return Ok(trains);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}", Name = "GetTrainById")]
        public IActionResult GetById(int id)
        {
            try
            {
                var train = _context.Trains.Find(id);
                if (train == null)
                {
                    return NotFound($"Train details not found with id {id}");
                }
                return Ok(train);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("search")]
        public IActionResult SearchTrains([FromQuery] string startStation, [FromQuery] string endStation, [FromQuery] DateTime date)
        {
            try
            {
                startStation = startStation.ToLower();
                endStation = endStation.ToLower();

                var searchDate = new DateOnly(date.Year, date.Month, date.Day);

                var trains = _context.Trains.Where(t =>
                    t.StartStation.ToLower() == startStation &&
                    t.EndStation.ToLower() == endStation &&
                    t.Date == searchDate).ToList();

                if (trains.Count == 0)
                {
                    return NotFound(new { error = "No trains available for the provided criteria." });
                }

                return Ok(trains);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}

