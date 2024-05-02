import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../style.scss";
import { Alert, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Accordion from "react-bootstrap/Accordion";
import { PiTrainSimpleBold } from "react-icons/pi";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { setToLocalStorage } from '../../utils/localStorage';

export default function Home() {
  const [data, setData] = useState([]);
  const [startStation, setStartStation] = useState("");
  const [endStation, setEndStation] = useState("");
  const [date, setDate] = useState("");
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [proceedDetails, setProceedDetails] = useState(null);
  const navigate = useNavigate();
  let [showError, setShowError] = useState(null);

  useEffect(() => {
    const fetchTrainData = async () => {
      try {
        const response = await fetch("https://localhost:44327/api/Train");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching train data:", error);
      }
    };
    fetchTrainData();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://localhost:44327/api/Train/search?startStation=${startStation}&endStation=${endStation}&date=${date}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.ok) {
          setShowError(data.error);
          setTimeout(()=>{
            setShowError('');
          },3800)
          console.log(data.error);
        }
        setFilteredTrains(data);
        setSelectedRow(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  const startOption = [...new Set(data.map((item) => item.startStation))].map(
    (startStation) => {
      return <option key={startStation}>{startStation}</option>;
    }
  );
  const endOption = [...new Set(data.map((item) => item.endStation))].map(
    (endStation) => {
      return <option key={endStation}>{endStation}</option>;
    }
  );
  const handleRowClick = (index) => {
    setSelectedRow(index === selectedRow ? null : index);
  };
  const handleProceedClick = (train) => {
    setProceedDetails(train);
    setToLocalStorage('train', train);
    navigate("/proceed", { state: { train } });
  };
  return (
    <div className="home">

      <div className="home__container flex flex-col max-lg:h-[800px] ">
        <div className="vid_back flex justify-center items-center relative">
          <video
            src="src/components/client/pages/a.mp4"
            autoPlay
            playsInline
            loop
            type="video/mp4 "
          >
            {" "}
          </video>
          <div className="vid_para absolute bottom-[300px]  text-center text-[whitesmoke] flex items-center gap-[2rem]">
            <h1 className="text-[3.6rem]">Sri lanka Railway</h1>
          </div>
        </div>
        <Form
          className="z-[1000] max-w-[600px] mx-auto my-[1rem] p-[2rem] border-1 border-[red] absolute top-[300px]"
          onSubmit={handleFormSubmit}
        >
          {showError && (
            <>
              <Alert className="text-center" variant="danger">
                {showError}
              </Alert>
            </>
          )}
          <h2>Book Your Seat </h2>
          <p style={{ textAlign: "left" }}>
            Online Railway Train Reservation Website
          </p>
          <Form.Group
            className="my-[0.5rem]"
            as={Col}
            controlId="formGridStartStation"
          >
            <Form.Label>Start Station</Form.Label>
            <Form.Select
              className="mb-[1rem]"
              value={startStation}
              onChange={(e) => setStartStation(e.target.value)}
            >
              <option>Choose...</option>
              {startOption}
            </Form.Select>
          </Form.Group>
          <Form.Group
            className="my-[0.5rem]"
            as={Col}
            controlId="formGridEndStation"
          >
            <Form.Label>End Station</Form.Label>
            <Form.Select
              className="mb-[1rem]"
              value={endStation}
              onChange={(e) => setEndStation(e.target.value)}
            >
              <option>Choose...</option>
              {endOption}
            </Form.Select>
          </Form.Group>
          <Form.Group className="my-[0.5rem]" as={Col} controlId="formGridDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              className="mb-[1rem]"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Button
            style={{
              width: "100%",
              margin: "1rem 0",
              backgroundColor: " #094793",
              border: "none",
              padding: "0.8rem",
            }}
            className="home__button"
            variant="primary"
            type="submit"
          >
            Search Trains
          </Button>
        </Form>
        <div className="space h-[340px]"></div>
        {filteredTrains.length > 0 && (
          <div className="max-w-[1400px]">
            <h2 style={{ textAlign: "center", margin: "2rem 0" }}>
              Available Trains
            </h2>
            <Table
              className="max-w-1400px"
              style={{ margin: "2rem auto" }}
              responsive="sm"
            >
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>ArrivalTime</th>
                  <th>DepartureTime</th>
                  <th>Train Class</th>
                  <th>Available Seats</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrains.map((train, index) => (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                      backgroundColor:
                        selectedRow === index ? "#ccc" : "transparent",
                    }}
                    onClick={() => handleRowClick(index)}
                  >
                    <td>
                      {train.startStation} to {train.endStation} - {train.date}
                    </td>
                    <td>{train.departureTime}</td>
                    <td>{train.arrivalTime}</td>
                    <td>{train.class}</td>
                    <td>{train.availableSeats}</td>
                    <td>{train.price}</td>
                    <td style={{ display: "none" }}>{train.seatNumbers}</td>
                    <td style={{ display: "none" }}>{train.id}</td>
                    <td>
                      <Button
                        style={{ backgroundColor: "#094273", border: "none", marginLeft: '2rem' }}
                        onClick={() => handleProceedClick(train)}
                      >
                        Proceed
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
      <h2 className="my-[2rem]" style={{ textAlign: "center" }}>
        {" "}
        Why Our Clients Trust Us?
      </h2>
      <div className="container-trust-item">
      
      <Card style={{ width: '18rem' , padding:'0.6rem', cursor:'pointer'}} className="hover:bg-[#ffdc00] ">
      <Card.Img style={{width:'100px', margin:'0 auto'}} variant="top" src="src/assets/images/online-booking (2).png" />
      <Card.Body>
        <Card.Title>Easy Booking</Card.Title>
        <Card.Text className="leading-7" style={{fontSize:'0.9rem'}}>
        If you're feeling adventurous and want a rail trip, don't put off booking your tickets for too long with just one mouse click.
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem', padding:'0.6rem', cursor:'pointer'}} className="hover:bg-[#ffdc00] ">
      <Card.Img style={{width:'100px', margin:'0 auto'}} variant="top" src="src/assets/images/card.png" />
      <Card.Body>
        <Card.Title>Optimized & Secure Payments</Card.Title>
        <Card.Text className="leading-7" style={{fontSize:'0.9rem'}}>
        There are 15+ options for you to choose from when purchasing your train tickets online. You can select the most convenient payment method and have everything taken care of in less than 3 minutes!
        </Card.Text>
      </Card.Body>
    </Card>

    <Card style={{ width: '18rem' , padding:'0.6rem', cursor:'pointer'}} className="hover:bg-[#ffdc00] ">
      <Card.Img style={{width:'100px', margin:'0 auto'}} variant="top" src="src/assets/images/self-service (1).png" />
      <Card.Body>
        <Card.Title>High-Quality Amenities</Card.Title>
        <Card.Text className="leading-7" style={{fontSize:'0.9rem'}}>
        You will be thrilled by the excellent onboard service as your well-equipped train takes you to a final destination.
        </Card.Text>
      </Card.Body>
    </Card>
    </div>


      <h2 className="my-[2rem] " style={{ textAlign: "center" }}>
        {" "}
        This is your ticket to perks, news, and more.
      </h2>
      <CardGroup style={{ maxWidth: "1200px", margin: "0rem auto" }}>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/s17.jpg"
          />
          <Card.Body>
            <Card.Title className="text-center mb-3 text-[1.2rem] font-bold">Discover 20+ Train Routes</Card.Title>
            <Card.Text className="leading-7">
            Embark on an exhilarating journey of discovery as you traverse Sri Lanka's most enchanting train routes, each offering a tapestry of breathtaking vistas and unforgettable experiences. Traverse towering mountains adorned with nature.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img
            variant="top"
            src="src/assets/images/cq5dam.web.900.600.jpeg"
          />
          <Card.Body>
            <Card.Title  className="text-center mb-3 text-[1.2rem] font-bold">Travel Classes to Suit Every Pocket</Card.Title>
            <Card.Text className="leading-7">
            Discover the array of travel classes tailored to meet every traveler's needs. You're seeking the epitome of opulence or prioritizing affordability without compromising comfort, our diverse range of options caters to all preferences.

{" "}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img variant="top" src="src/assets/images/original (2).jpeg" />
          <Card.Body>
            <Card.Title  className="text-center mb-3 text-[1.2rem] font-bold">All Aboard with Just Your Phone</Card.Title>
            <Card.Text className="leading-7">
            Embarking on an exciting voyage across Sri Lanka's picturesque landscapes is now as simple as reaching for your smartphone. The Sri Lanka Railway Department proudly presents a groundbreaking initiative with All Aboard with Just Your Phone.


            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      <CardGroup style={{ maxWidth: "1200px", margin: "2rem auto" }}>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img variant="top" src="src/assets/images/s18.jpg" className="aspect-[3/2]"/>
          <Card.Body>
            <Card.Title  className="text-center mb-3 text-[1.2rem] font-bold">Experience Modern Regular & High-Speed Trains</Card.Title>
            <Card.Text className="leading-7">
            Sri Lanka boasts a fleet of modern trains designed for your comfort and convenience. From regular services to high-speed express trains, we offer a variety of options to suit your travel needs. Select your preferred schedule, route, train type, and departure time for a seamless journey across the island.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card style={{ margin: "0 0.6rem" }}>
          <Card.Img variant="top" src="src/assets/images/s19.jpg"  className="aspect-[3/2]"/>
          <Card.Body>
            <Card.Title  className="text-center mb-3 text-[1.2rem] font-bold">Plan Your Perfect Rail Adventure</Card.Title>
            <Card.Text className="leading-7">
            Ready to embark on your Sri Lankan rail adventure? Explore our routes, compare travel classes, and book your tickets online today. Whether you're traveling solo, with family, or with friends, we makes planning your journey a breeze. Start your adventure with us and create memories that will last a lifetime.{" "}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>

      <div
        style={{
          backgroundColor: "whitesmoke",
          width: "100%",
          padding: "4rem 0",
          margin: "3rem 0 ",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        className="container__home"
      >
        <h2 style={{ textAlign: "center" }}>
          {" "}
          Sri Lanka Train Tickets Service
        </h2>

        <h1 style={{ fontSize: "4rem", margin: "1rem 0" }}>
          {" "}
          <img
            width={150}
            src="src/assets/images/Auckland_transport_train_logo.png"
            alt=""
          />{" "}
        </h1>
        <p className="leading-7" style={{ textAlign: "center", margin: "auto", maxWidth: 1200 }}>
        At Sri Lanka Rail, we understand that every traveler is unique. That's why we offer a range of travel classes to suit all preferences and budgets. Choose from luxurious first-class compartments with plush seating and exclusive amenities, or opt for a more economical option without sacrificing comfort. Whichever class you choose, our dedicated staff are committed to ensuring a comfortable and enjoyable journey for all passengers.
        </p>
      </div>

      <h2 style={{ textAlign: "center", margin: "5rem 0 0 0" }}>
        {" "}
        Comfort and Convenience
      </h2>
      <p className="leading-7" style={{ textAlign: "center", margin: "1rem auto", maxWidth: 1200 }}>
      Experience unparalleled comfort and convenience with Sri Lanka Rail. Our goal is to make your journey as seamless as possible, allowing you to relax and enjoy the ride while we take care of the rest. Please ensure you arrive at the station with ample time to spare, allowing for any parking arrangements and baggage handling. Your safety and satisfaction are our top priorities.
</p>


      <Accordion
        style={{ maxWidth: "1200px", margin: "4rem auto", width: 1000 }}
        defaultActiveKey="0"
      >
        <Accordion.Item style={{ backgroundColor: "#094273", color: "white" }}>
          <Accordion.Header>Family-Friendly Accessibility</Accordion.Header>
          <Accordion.Body>
            Strollers, car seats, and booster seats can be carried on board and
            will not count as carry-ons. All stations and trains are also
            wheelchair-accessible.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          style={{ backgroundColor: "#094273", color: "white" }}
          eventKey="1"
        >
          <Accordion.Header>Families Save</Accordion.Header>
          <Accordion.Body>
            Kids under 24 months old ride free, and kids aged 2-12 years old
            ride for 50% off* SMART fares. Families of four or more can also
            save 25% with promo code: ALLABOARD in South Florida. Groups of 4 or
            more automatically save 25% off when booking trips between South
            Florida and Orlando.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          style={{ backgroundColor: "#094273", color: "white" }}
          eventKey="2"
        >
          <Accordion.Header>
            Sit Back, relax and enjoy the ride
          </Accordion.Header>
          <Accordion.Body>
            Each of our large hand-stitched leather seats recline for your
            comfort alongside full windows. With two ways to ride—SMART or
            PREMIUM—there’s something for everyone.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item
          style={{ backgroundColor: "#094273", color: "white" }}
          eventKey="3"
        >
          <Accordion.Header>Stay Connected and Charged</Accordion.Header>
          <Accordion.Body>
            Enjoy free, high-speed Wi-Fi while you ride from station to station.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
