/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-reoute-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import "./Mybookings.css"
import { assets } from '../../assets/assets';

const MyBookings = () => {

  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const { user } = useSelector(state => state.users);
  
  const [ticketData, setTicketData] = useState([]); // Initialize as an empty array
  const fetchBooking = async () => {
    console.log("function run")
    try {
      console.log("try block run")
      const response = await axios.post("https://backend-chi-one-67.vercel.app/api/Booking/get-bookings", { user: user._id}
      );    
      setTicketData(response.data.bookings); // Set ticketData to the bookings array
      console.log(response.data.bookings);
    } catch (error) {
      console.log(error.message);
    }
  };
  console.log(ticketData);

  const trackBus = (busnumber, source, destination) => {
        const start = `${source[1]},${source[0]}`;
        const end = `${destination[1]},${destination[0]}`;
        navigate(`/map/${busnumber}/${start}/${end}`);
  }

  useEffect(() => {
    if (isLoggedIn) { // Fetch bookings only if the user is logged in
      fetchBooking();
    }
  }, [isLoggedIn]); // Add isLoggedIn as a dependency
  console.log(ticketData);

  return (
    <div className='mybookings'>
      <h1 className='booking-heading'>My Bookings</h1>
      <div className='my-bookings-inner'>
        {
          Array.isArray(ticketData) && ticketData.length > 0 ? (
            ticketData.map((ticket, index) => (
              <div key={index} className='single-ticket'>
                <div className='single-ticket-top'>
                  <div>{ticket.source}</div>
                  <div className="ticket-arrow"><img src={assets.rightarrow} alt="" />{ticket.busnumber}<img src={assets.rightarrow} alt="" /></div>
                  <div>{ticket.destination}</div>
                </div>
                <div className='ticket-boottom'>
                {ticket.passengers.map((passenger, index) => (
                <div key={index} className='passenger-box'>
                  <p>{passenger.passengername}</p>
                  <p className='passenger-detail'>{passenger.passengergender} | {passenger.passengerage} yrs | seat {passenger.seats}</p>
                </div>
              ))}
                </div>
                
                <div className='single-ticket-detail'>Date: <p>  {moment(ticket.date).format('DD-MM-YYYY')}</p></div>
                 <div className='ticketstatus'><div className='ticketstatus-popup'>{ticket.ticketStatus}</div><button onClick={() => trackBus(ticket.busnumber, ticket.startpoint, ticket.endpoint)} >track bus</button></div>
              </div>
            ))
          ) : (
            <div>No bookings found.</div> // Handle the case where there are no bookings
          )
        }
      </div>
    </div>
  );
}

export default MyBookings;
