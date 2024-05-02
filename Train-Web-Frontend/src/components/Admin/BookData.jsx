import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import AdminNav from "./AdminNav";
import "./style.scss";
export default function BookData() {
  const [bookDetails, setBookingDetails] = useState([]);
  const getDataApi = "https://localhost:44327/api/TrainBookings";

  fetch(getDataApi)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      setBookingDetails(data);
    });

  return (
    <>
      <AdminNav />
      <h1 className="text-center p-[1rem] text-[2.8rem]">Train Reservations</h1>
      <Table
        className="data_td bg-[#3a3030]"
        style={{ maxWidth: "1800px", margin: "1rem auto" }}
        striped
        bordered
        hover
      >
        <thead>
          <tr className="data_td">
            <th>Id</th>
            <th>start station</th>
            <th>End station</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th>Booking Date</th>
            <th>Train Class</th>
            <th>Passenger Name</th>
            <th>NIC</th>
            <th>Mobile No</th>
            <th>No of Seats</th>
            <th>Total Price</th>
            <th>Seat Numbers</th> 
          </tr>
        </thead>
        <tbody>

          {bookDetails.map((det) => {
            return (
              <>
                <tr className="data_td">
                  <td  className='p-3'>{det.id}</td>
                  <td>{det.startStation}</td>
                  <td>{det.endStation}</td>
                  <td>{det.arrivalTime}</td>
                  <td>{det.departureTime}</td>
                  <td>{det.date}</td>
                  <td>{det.class}</td>
                  <td>{det.name}</td>
                  <td>{det.nic}</td>
                  <td>{det.mobileNo}</td>
                  <td>{det.seats}</td>
                  <td>{det.price}</td>
                  <td>{det.seatNumbers.join(", ")}</td> 
                </tr>
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
