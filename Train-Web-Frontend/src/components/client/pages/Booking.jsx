import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Booking() {
    const [data, setData] = useState([]);
    const [startStation, setStartStation] = useState('');
    const [endStation, setEndStation] = useState('');
    const [date, setDate] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [proceedDetails, setProceedDetails] = useState(null);
    const navigate = useNavigate()
    const location = useLocation();
    const { filteredTrains } = location.state || {};
    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };
    const handleProceedClick = (train) => {
        setProceedDetails(train);
        navigate('/proceed', { state: { train } })
    };
    return (
        <div>
            {filteredTrains && filteredTrains.length > 0 ? (
                <div style={{ maxWidth: '1200px', margin: '1rem auto' }}>
                    <h2 style={{ textAlign: 'center', margin: '2rem 0' }}>Available Trains</h2>
                    <Table style={{ maxWidth: '1200px', margin: '1rem auto' }} responsive="sm">
                        <thead >
                            <tr  >
                                <th>destination</th>
                                <th>arrivalTime</th>
                                <th>departureTime</th>
                                <th>class</th>
                                <th>available seats</th>
                                <th>price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTrains.map((train, index) => (
                                <tr
                                    key={index}
                                    style={{ cursor: 'pointer', backgroundColor: selectedRow === index ? '#ccc' : 'transparent' }}
                                    onClick={() => handleRowClick(index)}
                                >
                                    <td>{train.startStation} to {train.endStation} - {train.date}</td>
                                    <td>{train.departureTime}</td>
                                    <td>{train.arrivalTime}</td>
                                    <td>{train.class}</td>
                                    <td>{train.availableSeats}</td>
                                    <td>{train.price}</td>
                                    <td><Button style={{ backgroundColor: '#094273', border: 'none' }} onClick={() => handleProceedClick(train)}>Proceed</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <p style={{textAlign:'center'}}>No trains found</p>
            )}
        </div>
    );
}