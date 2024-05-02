namespace Train_Web_Project.Models
{
    public class TrainBooking
    {
        public int Id { get; set; }

        public int TrainId { get; set; }
        public string StartStation { get; set; }
        public string EndStation { get; set; }
        public TimeOnly ArrivalTime { get; set; }
        public TimeOnly DepartureTime { get; set; }
        public DateOnly Date { get; set; }
        public string Class { get; set; }
        public string Name { get; set; }
        public string NIC { get; set; }
        public string MobileNo { get; set; }
        public int Seats { get; set; }
        public int Price { get; set; }
        public List<string> SeatNumbers { get; set; }
    }
}
