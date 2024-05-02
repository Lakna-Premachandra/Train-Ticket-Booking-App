import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import AdminNav from "./AdminNav";
import Alert from "@mui/material/Alert";

const Admin = () => {
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const [errorStatus, setErrorStatus] = useState(null);
  const url = "https://localhost:44327/api/Train";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((details) => setDetails(details))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  function deleteHandler(id) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setErrorStatus("Deleted Successfully");
          setDetails(details.filter((item) => item.id !== id));
          setTimeout(() => {
            setErrorStatus("");
          }, 3000);
        } else {
          console.log("Error deleting train");
        }
      })
      .catch((error) => console.error("Error deleting train:", error));
  }

  const filteredDetails = details.filter((detail) =>
    detail.id.toString().includes(searchQuery)
  );

  return (
    <>
      <AdminNav />
      <div
        style={{
          margin: "1rem auto",
          width: "600px",
          display: "flex",
          justifyContent: "center",
        }}
        className="search"
      >
       

        <input
          className="bg-[#f7f7f7] p-[0.6rem]  rounded-[6px] border-2 border-[#999999] text-[black] "
          style={{ width: "600px", margin: "auto" }}
          type="text"
          placeholder="Search Train By ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {errorStatus && (
        <>
          <Alert
            className=" z-[1001]  w-[300px] m-auto text-center "
            variant="filled"
            severity="success"
          >
            {errorStatus}
          </Alert>
        </>
      )}
      <Table
        style={{ maxWidth: "1800px", margin: "1rem auto" }}
        striped
        bordered
        hover
      >
        <thead className="bg-info">
          <tr className="bg-info">
            <th>Id</th>
            <th>start station</th>
            <th>end station</th>
            <th>date</th>
            <th>Class</th>
            <th>departure time</th>
            <th>arrival time</th>
            <th>available seats</th>
            <th>price</th>
            <th>Seat Numbers</th>
            <th>
              <button
                style={{ backgroundColor: "green" }}
                onClick={() => navigate("add")}
              >
                <i class="ri-add-line"></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map((detail) => (
            <tr key={detail.id}>
              <td>{detail.id}</td>
              <td>{detail.startStation}</td>
              <td>{detail.endStation}</td>
              <td>{detail.date}</td>
              <td>{detail.class}</td>
              <td>{detail.departureTime}</td>
              <td>{detail.arrivalTime}</td>
              <td>{detail.availableSeats}</td>
              <td>{detail.price}</td>
              <td>
                {Array.isArray(detail.seatNumbers)
                  ? detail.seatNumbers.join(", ")
                  : detail.seatNumbers}
              </td>

              <td>
                <button
                  style={{ backgroundColor: "blue" }}
                  onClick={() => navigate(`/admin/edit/${detail.id}`)}
                >
                  <i class="ri-loop-right-line"></i>
                </button>
                <button
                  style={{ backgroundColor: "red", margin: "0 1rem" }}
                  onClick={() => deleteHandler(detail.id)}
                >
                  <i class="ri-delete-bin-2-line"> </i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Admin;
