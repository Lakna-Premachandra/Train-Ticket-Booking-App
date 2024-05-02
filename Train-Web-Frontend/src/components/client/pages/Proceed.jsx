import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SweetAlert from "react-bootstrap-sweetalert";
import "../style.scss";
import { Alert } from "react-bootstrap";
import { getFromLocalStorage } from "../../utils/localStorage";
import SignInModal from "../SignInModal";
import { Settings } from "@mui/icons-material";
import { faLaptopHouse } from "@fortawesome/free-solid-svg-icons";

export default function Proceed() {
  const [seats, setSeats] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const goToSign = useNavigate();
  const [clickbtn, setClickbtn] = useState([]);
  const [clickedSeats, setClickedSeats] = useState([]);
  const [emptyClick, setEmptyClick] = useState([]);
  const [availableSeats, setAvailableSeats] = useState([]);
  const [trainDetails, setTrainDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newId, setter] = useState([]);
  const [newTrains, settings] = useState([]);
  const [inputSeats, setInputSeats] = useState("");
  const [newSeats, setNewSeats] = useState([]);
  const [sum, setSum] = useState("");

  useEffect(() => {
    const state = getFromLocalStorage("train");

    if (state) {
      setTrainDetails(state);
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    nic: "",
    mobileNumber: "",
  });

  const noSeats = (e) => {
    setSeats(e.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSeatChange = (e) => {
    const { value } = e.target;
    setSelectedSeats(value);
  };

  useEffect(() => {
    fetch("https://localhost:44327/api/Train")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const seatNumbers = data.map((train) => train.seatNumbers).flat();
        setAvailableSeats(seatNumbers);
        console.log(seatNumbers);
      })
      .catch((error) =>
        console.error("Error fetching available seats:", error)
      );
  }, []);

  useEffect(() => {
    // Function to calculate total price
    const calculatePrice = () => {
      if (trainDetails) {
        return trainDetails.price * seats;
      }
      return 0;
    };

    // Update price when seats or train details change
    const price = calculatePrice();
    setFormData((prevData) => ({
      ...prevData,
      price: price.toFixed(2),
    }));
  }, [seats, trainDetails]);

  const submitHandler = (e) => {
    e.preventDefault();

    const selectedSeatsArray = Array.isArray(selectedSeats)
      ? selectedSeats.map((seat) => parseInt(seat, 10))
      : [parseInt(selectedSeats, 10)];

    const postData = {
      trainId: trainDetails.id,
      startStation: trainDetails.startStation,
      endStation: trainDetails.endStation,
      arrivalTime: trainDetails.arrivalTime,
      departureTime: trainDetails.departureTime,
      date: trainDetails.date,
      class: trainDetails.class,
      name: formData.name,
      nic: formData.nic,
      mobileNo: formData.mobileNumber,
      seats: seats,
      price:  trainDetails.price * seats,
      seatNumbers: newSeats,
    };

    fetch("https://localhost:44327/api/TrainBookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then(() => {
        setShowAlert("Success");
      })
      .catch((error) => {
        console.error("Error submitting booking:", error);
      });
  };

  useEffect(() => {
    const loggedInfo = localStorage.getItem("isLoggedIn");

    if (!!loggedInfo) {
      setIsLoggedIn(true);
      console.log("ok");
    } else {
      setIsLoggedIn(false);
      console.log("no");
    }
  }, []);

  const toggleSeatSelection = (seat) => {
    if (newSeats.length < seats) { 
      if (newSeats.includes(seat)) {
        setNewSeats(newSeats.filter((selectedSeat) => selectedSeat !== seat));
      } else {
        setNewSeats([...newSeats, seat]);
      }
    } else if (newSeats.includes(seat)) { 
      setNewSeats(newSeats.filter((selectedSeat) => selectedSeat !== seat));
    }
  };
  
  return (
    <>
      {!isLoggedIn && <SignInModal />}

      <div className="proceed-container relative w-full"></div>
      <div className="space h-[600px]"></div>
      {trainDetails && (
        <Form
          className="proceed mt-[6rem]  bg-slate-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          onSubmit={submitHandler}
          style={{
            border: "1px solid lightgrey",
            padding: "1rem 2rem",
            boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          {showAlert && <Alert variant="success"> {showAlert}</Alert>}
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Train ID</Form.Label>
            <Form.Control
              style={{ color: "darkblue", fontWeight: 400 }}
              type="number"
              value={trainDetails.id}
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Start Station</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="text"
                value={trainDetails.startStation}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>End Station</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="text"
                value={trainDetails.endStation}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Arrival Time</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="time"
                value={trainDetails.arrivalTime}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Departure Time</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="time"
                value={trainDetails.departureTime}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="date"
                value={trainDetails.date}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Train Class</Form.Label>
              <Form.Control
                style={{ color: "darkblue", fontWeight: 400 }}
                type="text"
                value={trainDetails.class}
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress2">
            <Form.Label>NIC</Form.Label>
            <Form.Control
              type="text"
              name="nic"
              value={formData.nic}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress3">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Seats</Form.Label>
              <Form.Control type="number" value={seats} max={5} min={1} onChange={noSeats} />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Price (Rs)</Form.Label>
              <Form.Control
              style={{ color: "red" }}
              value={formData.price}
              readOnly
            />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress4">
            <Form.Label>Select Seats</Form.Label>
            <div>
              {trainDetails.seatNumbers.map((seat) => (
                <button
                  key={seat}
                  value={seat}
                  type="button"
                  onClick={() => toggleSeatSelection(seat)}
                  className={`mx-4 mb-3 w-[2.5rem] bg-red-400 p-1 rounded text-white hover:bg-gr ${
                    newSeats.includes(seat) && "bg-green-700"
                  }`}
                >
                  {seat}
                </button>
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress3">
            <Form.Control
              value={newSeats.join(", ")}
              type="text"
              name="selectedSeats"
              readOnly
              required
            />
          </Form.Group>

          <Button
            style={{
              width: "100%",
              backgroundColor: " #094793",
              border: "none",
              padding: "0.8rem",
            }}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
