import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/bookingform.css';
import { useNavigate } from 'react-router-dom';
// import Billing from './billing';


const BookingForm = () => {
    const [rooms, setRooms] = useState([]); 
    const [formData, setFormData] = useState({name: '', checkIn: '', checkOut: '', roomType: '', guests: ''});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getrooms/');
                    setRooms(response.data.rooms); 
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        roomType: response.data.rooms.length > 0 ? response.data.rooms[0].type : ''
                    }));
            } catch (error) {
                console.error('Failed to fetch room types:', error);
            }
        };
        fetchRooms();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const selectedRoom = rooms.find(room => room.type === formData.roomType);

        const bookingData = {
            ...formData,
            price: selectedRoom ? selectedRoom.price : 0 
        };
        // const name1=formData['name']

        try {
            const response = await axios.post('http://localhost:8000/bookroom/', bookingData);
            if (response.status === 201) {
                alert('Booking Successful!');
                // Billing(name1)
                navigate('/billing', { state: { customerName: formData['name'] } })
            } else {
                alert('Booking Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <form className='booking' onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            </div>
            <div>
                <label>Check-in Date:</label>
                <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
            </div>
            <div>
                <label>Check-out Date:</label>
                <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
            </div>
            <div className='roomtype'>
                <label>Room Type:</label>
                <select name="roomType" value={formData.roomType} onChange={handleChange} required >
                    {rooms.map((room) => (
                        <option key={room.type} value={room.type}>
                            {room.type} - ₹{room.price}
                        </option>
                    ))}
                </select>
            </div>
            <div className='price'>
                <label name="price" onChange={handleChange}>Price: ₹{rooms.find(room => room.type === formData.roomType)?.price || 0}</label>
            </div>
            <div>
                <label>Number of Guests:</label>
                <input type="number" name="guests" value={formData.guests} onChange={handleChange} required />
            </div>
            <button type="submit">Book Now</button>
        </form>
    );
};

export default BookingForm;
