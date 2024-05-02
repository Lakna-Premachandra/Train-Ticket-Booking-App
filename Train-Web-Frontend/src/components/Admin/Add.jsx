import React, { useState } from "react";
import "./style.scss";
import AdminNav from "./AdminNav";
import Alert from "@mui/material/Alert";

export default function Add() {
  const [state, setState] = useState({
    startStation: "",
    endStation: "",
    date: "",
    departureTime: "",
    arrivalTime: "",
    class: "",
    availableSeats: "",
    price: "",
    seatNumbers: [],
  });
  const [data, setdata] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { value, name } = e.target;

    const parsedValue = ["availableSeats", "price"].includes(name)
      ? parseInt(value, 10)
      : value;

    setState((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const details = { ...state };

    if (typeof details.seatNumbers === "string") {
      details.seatNumbers = details.seatNumbers
        .split(",")
        .map((item) => item.trim());
    }

    const url = "https://localhost:44327/api/Train";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
    })
      .then((res) => {
        if (!res.ok) {
          setError("wrong");
        }
        return res.json();
      })
      .then((data) => {
        setdata("Train Added Success");
        setTimeout(() => {
          setdata("");
        }, 3000);
      });
  };

  return (
    <>
      <AdminNav />
      <div className="form">
        <div className="form__container">
          <form action="POST" onSubmit={submitHandler}>
            <h1>Train details</h1>

          
            {error && <Alert severity="error">{error}</Alert>}
            {data && <Alert severity="success">{data}</Alert>}
            <input
              type="text"
              name="startStation"
              placeholder="Start Station"
              onChange={handleChange}
              required
              value={state.startStation}
            />
            <input
              type="text"
              name="endStation"
              placeholder="End Station"
              onChange={handleChange}
              required
              value={state.endStation}
            />
            <input
              type="date"
              name="date"
              required
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
              required
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
              required
              value={state.arrivalTime}
            />
            <input
              type="text"
              name="class"
              placeholder="Train Class"
              required
              onChange={handleChange}
              value={state.class}
            />
            <input
              type="number"
              name="availableSeats"
              required
              placeholder="Seat Availabilty"
              onChange={handleChange}
              value={state.availableSeats}
            />
            <input
              type="number"
              name="price"
              required
              placeholder="Price"
              onChange={handleChange}
              value={state.price}
            />
            <input
              type="text"
              name="seatNumbers"
              placeholder="Seat Numbers"
              required
              onChange={handleChange}
              value={state.seatNumbers}
            />
            <button className="form__button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
