using System.ComponentModel.DataAnnotations;

namespace Train_Web_Project.Models
{
    public class Train
    {
        public int Id { get; set; }
        [Required]
        public string StartStation { get; set; }
        [Required]
        public string EndStation { get; set; }
        [Required]
        public DateOnly Date { get; set; }
        [Required]
        public TimeSpan DepartureTime { get; set; }
        [Required]
        public TimeSpan ArrivalTime { get; set; }
        [Required]
        public string Class { get; set; }
        [Required]
        public int AvailableSeats { get; set; }
        [Required]
        public int Price { get; set; }
        [Required]
        public string[] SeatNumbers { get; set; }
    }

    public class TrainAvailabilityUpdateModel
    {
        [Required]
        public int BookedSeats { get; set; }
        [Required]
        public string[] BookedSeatNumbers { get; set; }
    }
}
