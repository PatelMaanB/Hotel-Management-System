import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/billing.css'
import { useLocation } from 'react-router-dom';

const Billing = () => {
    const [customerData, setCustomerData] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const location = useLocation();
    const { customerName } = location.state || { customerName: '' }; 

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getuserdata/', {name: customerName });

                setCustomerData(response.data);
                calculateTotalPrice(response.data.checkIn, response.data.checkOut, response.data.price);
            } catch (error) {
                console.error('Failed to fetch customer data:', error);
            }
        };

        if (customerName) {
            fetchCustomerData();
        }
    }, [customerName]);

    const calculateTotalPrice = (checkIn, checkOut, pricePerDay) => {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const daysStayed = timeDifference / (1000 * 3600 * 24);
        const calculatedPrice = pricePerDay * daysStayed 
        setTotalPrice(calculatedPrice);
    };

    const storeFinalPrice = async () => {
        try {
            const response = await axios.post('http://localhost:8000/finalprice/', {name: customerName,finalprice: totalPrice});

            if (response.status === 200) {
                alert('Billing successful! Final price updated.');
            } else {
                alert('Failed to update final price.');
            }
        } catch (error) {
            console.error('Error updating final price:', error);
        }
    };

    const printBill = () => {
        if (customerData) {
            return (
                <div className='billing'>
                    <h3>Billing Details</h3>
                    <div>
                        <label>Name: {customerData.name}</label>
                    </div>
                    <div>
                        <label>Check-in Date: {customerData.checkIn}</label>
                    </div>
                    <div>
                        <label>Check-out Date: {customerData.checkOut}</label>
                    </div>
                    <div>
                        <label>Room Type: {customerData.roomType}</label>
                    </div>
                    <div>
                        <label>Total Price: ₹{totalPrice}</label>
                    </div>
                    <button onClick={storeFinalPrice} className='button'>printBill</button>
                </div>
            );
        } else {
            return <div>Loading billing details...</div>;
        }
    };

    return (
        <div>
            {printBill()}
        </div>
    );
};

export default Billing;
