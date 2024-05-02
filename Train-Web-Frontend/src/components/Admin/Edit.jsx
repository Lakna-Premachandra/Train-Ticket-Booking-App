import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";


export default function Edit() {

  const [valid, setValid] = useState('')

  const { id } = useParams();
  const [state, setState] = useState({
    startStation: "",
    endStation: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    class: "",
    availableSeats: "",
    price: "",
    seatNumbers: "",
  });

  useEffect(() => {
    const url = `https://localhost:44327/api/Train/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setState(data))
      .catch((error) => console.log("Error fetching data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    const parsedValue = name === "seatNumbers" ? value.split(",") : value;
    setState((prev) => ({ ...prev, [name]: parsedValue }));
  };
  

  const submitHandler = (e) => {
    e.preventDefault();
    const url = `https://localhost:44327/api/Train/${id}`;
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state), 
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to update data');
      }
      return res.text();
    })
    .then((data) => setValid(data))
    .catch((error) => {
      console.log("Error updating data:", error);
      setValid('Failed to update data');
    });
  };

  return (
    <div className="form">
      <div className="form__container">
        <form action="POST" onSubmit={submitHandler}>
          <h1>Train details</h1>
          
          {valid && <Alert severity="success">{valid}</Alert>}
          <input
            type="text"
            name="startStation"
            placeholder="Start Station"
            onChange={handleChange}
            value={state.startStation}
          />
          <input
            type="text"
            name="endStation"
            placeholder="End Station"
            onChange={handleChange}
            value={state.endStation}
          />
          <input
            type="date"
            name="date"
            placeholder="date"
            onChange={handleChange}
            value={state.date}
          />
          <label htmlFor="departure Time">Departure Time</label>
          <input
            type="time"
            step={1}
            name="departureTime"
            placeholder="Departure"
            onChange={handleChange}
            value={state.departureTime}
          />
          <label htmlFor="departure Time">Arrival Time</label>

          <input
            type="time"
            step={1}
            name="arrivalTime"
            placeholder="arrivalTime"
            onChange={handleChange}
            value={state.arrivalTime}
          />
          <input
            type="text"
            name="class"
            placeholder="Train Class"
            onChange={handleChange}
            value={state.class}
          />
          <input
            type="number"
            name="availableSeats"
            placeholder="Seat Availabilty"
            onChange={handleChange}
            value={state.availableSeats}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            value={state.price}
          />
          <input
            type="text"
            name="seatNumbers"
            placeholder="Seat Numbers"
            onChange={handleChange}
            value={state.seatNumbers}
          />
          <button type="submit" className="form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

