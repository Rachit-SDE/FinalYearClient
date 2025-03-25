/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Busdetails.css";
import { ShowLoading, HideLoading } from "../../redux/alertsSlice";
import SeatSelection from "../../Components/SeatSelection/SeatSelection";
import { assets } from "../../assets/assets";
import { message } from "antd";
import moment from 'moment';
import { useSelector } from "react-redux";
import StripeCheckout from 'react-stripe-checkout';

const Busdetails = () => {

  const navigate = useNavigate();

  useEffect(() => {
    fetchBus();
    fetchMembers();
    coordinatesFetch();
  }, []);

  const user = useSelector((state) => state.users.user);
  const { source, destination, date } = useSelector((state) => state.search);
  const params = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bus, setBus] = useState("");
  const [price, setPrice] = useState("");
  const [sourcepoint, setSourcePoint] = useState(null);
  const [destinationpoint, setDestinationPoint] = useState(null);
  const dispatch = useDispatch();
  const [conformpopup, setConformPopup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [existPassenger, setExistPassenger] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState([]);

  function coordinatesFetch() {
    // Check if source and destination are defined before using them
    if (!source || !destination) {
      console.error("Source or destination is undefined", source, destination);
      return;
    }

    const start = source.toLowerCase();
    const end = destination.toLowerCase();

    if (!bus) {
      console.error("Bus data is not available");
      return;
    }

    // Check if bus source matches the provided source
    if (start === bus.source.toLowerCase()) {
      setSourcePoint(bus.sourcepoint);
    } else if (bus.stops && bus.stops.some((stop) => stop.name.toLowerCase() === start)) {
      const stop = bus.stops.find((stop) => stop.name.toLowerCase() === start);
      setSourcePoint(stop.stoppagePoint);
    } else {
      console.log("Source not found in bus data");
    }

    // Check if bus destination matches the provided destination
    if (end === bus.destination.toLowerCase()) {
      setDestinationPoint(bus.destinationpoint);
    } else if (bus.stops && bus.stops.some((stop) => stop.name.toLowerCase() === end)) {
      const stop = bus.stops.find((stop) => stop.name.toLowerCase() === end);
      setDestinationPoint(stop.stoppagePoint);
    } else {
      console.log("Destination not found in bus data");
    }
  }

  function calculateTicketPrice(pick, drop) {
    // Check if bus and bus[0] are defined
    if (!bus) {
      return null; // Return null if bus or bus[0] is not defined
    }

    // Convert pick and drop to lowercase
    pick = pick.toLowerCase();
    drop = drop.toLowerCase();

    // Condition 1: Direct Source to Destination match
    if (pick === bus.source.toLowerCase() && drop === bus.destination.toLowerCase()) {
      return bus.price;
    }

    // Condition 2: Source is in stops and Destination is bus destination
    if (bus.stops && bus.stops.some(stop => stop.name.toLowerCase() === pick) && drop === bus.destination.toLowerCase()) {
      const stop = bus.stops.find(stop => stop.name.toLowerCase() === pick);
      return bus.price - stop.price;  // Adding the stop price
    }

    // Condition 3: Source is bus source and Destination exists in stops
    if (pick === bus.source.toLowerCase() && bus.stops && bus.stops.some(stop => stop.name.toLowerCase() === drop)) {
      const stop = bus.stops.find(stop => stop.name.toLowerCase() === drop);
      return stop.price;  // Adding the stop price
    }

    // Condition 4: Both Source and Destination exist in stops
    if (bus.stops && bus.stops.some(stop => stop.name.toLowerCase() === pick) && bus.stops.some(stop => stop.name.toLowerCase() === drop)) {
      const sourceStop = bus.stops.find(stop => stop.name.toLowerCase() === pick);
      const destStop = bus.stops.find(stop => stop.name.toLowerCase() === drop);
      return destStop.price - sourceStop.price;  // Adding the stop prices
    }

    return console.log("not working"); // In case no valid conditions are met
  }

  const [passengername, setPassengerName] = useState("");
  const [passengerage, setPassengerAge] = useState("");
  const [passengerphone, setPassengerPhone] = useState("");
  const [passengergender, setPassengerGender] = useState("");
  const [passengeradhar, setPassengerAdhar] = useState("");
  const [seats, setSeats] = useState([]);

  const [passengers, setPassengers] = useState([]);
  const [members, setMembers] = useState([""]);

  const data = {};

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        `https://backend-chi-one-67.vercel.app/api/user/${user.email}/getmember`
      );
      setMembers(response.data.user.FamilyData);
    } catch (error) {
      console.log("failed to fetch members");
    }
  };

  const clearFields = () => {
    setPassengerName("");
    setPassengerAge("");
    setPassengerPhone("");
    setPassengerAdhar("");
    setSeats("");
  };

  const amount = calculateTicketPrice(source, destination);
  passengers.forEach(obj => {
    data[obj.key] = obj.value;
  });

  const addPassenger = () => {
    if (selectedPassenger.length < selectedSeats.length) {
      setSelectedPassenger([...selectedPassenger, {
        passengername: passengername,
        passengerage: passengerage,
        passengerphone: passengerphone,
        passengergender: passengergender,
        passengeradhar: passengeradhar,
        price: price,
        seats: selectedSeats[selectedSeats.length - 1],
      }]);
      clearFields();
      message.success('Passenger selected');
    } else {
      message.error('Select seat first');
    }
  };

  const bookTicket = async (transactionId) => {
    dispatch(ShowLoading());
    try {
      coordinatesFetch();
      const response = await axios.post('https://backend-chi-one-67.vercel.app/api/Booking/get-book', {
        userid: user._id,
        busid: bus._id,
        busnumber: bus.busnumber,
        passengers: selectedPassenger,
        source: source,
        startpoint: sourcepoint,
        destination: destination,
        endpoint: destinationpoint,
        transactionId: transactionId,
        date: date,
        totalPrice: calculateTicketPrice(source, destination) * selectedPassenger.length,
      });

      if (response.data.success) {
        message.success('Booking successful');
        dispatch(HideLoading());
        fetchBus();
        navigate('/')
      } else {
        dispatch(HideLoading());
        message.error('Booking failed');
      }
    } catch (error) {
      console.error('Error booking tickets:', error);
    }
  };

  const fetchBus = async () => {
    try {
      const response = await axios.post(
        `https://backend-chi-one-67.vercel.app/api/bus/get-bus-by-id/${params.id}`
      );
      setBus(response.data.bus);
      const fare = calculateTicketPrice(source, destination);
      setPrice(fare);
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
    coordinatesFetch();
  };

  const conformTicketPopup = () => {
    coordinatesFetch();
    setConformPopup(true);
  };

  const onToken = async (token) => {
    try {
      const response = await axios.post("https://backend-chi-one-67.vercel.app/api/Booking/payment", {
        token,
        amount: amount,
      });
      if (response.data.success) {
        console.log(response.data.transactionId);
        bookTicket(response.data.transactionId);
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="conform-popup">
      {conformpopup ? (
        <div className="conform-popup-inner">
          <h4>Confirm Booking?</h4>
          <div className="conform-book-buttons">
            <StripeCheckout
              billingAddress
              amount={amount * 100}
              currency='INR'
              token={onToken}
              stripeKey="pk_test_51PJawlSFdda55wRqALZehfejpABFyGCbL2a9hVBW0DbVQd6pDoXtgFIWUxum4ee0Usx2oj29okSJ1uLGBk3E01Z200d8y2N4uO"
            />
            <button className="conform-cancle-button" onClick={() => setConformPopup(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="booknow">
            <div className="booknow-main">
              <div className="booknow-left">
                <div className="booknow-left-busdetails">
                  <p className="bus-name">{bus.busname}</p>
                  <p className="bus-constant">Bus Number: {bus.busnumber}</p>
                  <p className="bus-constant">Bus Type: {bus.bustype}</p>
                  <p className="bus-constant">Source: {source}</p>
                  <p className="bus-constant">Destination: {destination}</p>
                  <p className="bus-constant">Bus Fare: {calculateTicketPrice(source, destination)}</p>
                  <p className="bus-constant">Journey Date: {moment(bus.date).format('DD-MM-YYYY')}</p>
                  <p className="bus-leftseats">{bus.availableseats - (bus.seatsBooked?.length || 0)} Seats Left</p>
                </div>

                <div className="selectedpassenger">
                  {Array.isArray(selectedPassenger) && selectedPassenger.length > 0 ? (
                    selectedPassenger.map((passenger, index) => (
                      <div key={index} className="member-details-box">
                        <p className="member-name">{passenger.passengername}</p>
                        <p className="member-name-details">{passenger.passengerage}</p>
                        <p className="member-name-details">{passenger.passengergender}</p>
                        <p>{passenger.seats}</p>
                      </div>
                    ))
                  ) : (
                    <div className="passenger-details-box">
                      <div className="passenger-details-box-inner">
                        <p>Select passenger</p>
                        <button onClick={() => setShowForm(true)}>Add new passenger</button>
                      </div>
                    </div>
                  )}
                </div>
                {existPassenger ? (
                  <div className="members-details">
                    {Array.isArray(user.FamilyData) && user.FamilyData.length > 0 ? (
                      members.map((member, index) => (
                        <div key={index} className="member-details-box"></div>
                      ))
                    ) : (
                      <p>Please Add Member</p>
                    )}
                  </div>
                ) : <></>}

                {showForm ? (
                  <div className="booknow-left-passenger">
                    <div className="booknow-left-passenger-form">
                      <div className="passenger-details-heading">
                        Enter passenger Details
                      </div>
                      <div className="member-input-sections">
                        <div className="member-input-sections-inputs">
                          <label htmlFor="">Name:</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Passenger Name"
                            value={passengername}
                            onChange={(e) => setPassengerName(e.target.value)}
                          />
                        </div>
                        <div className="member-input-sections-inputs">
                          <label htmlFor="">Age:</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Passenger Age"
                            value={passengerage}
                            onChange={(e) => setPassengerAge(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="member-input-sections">
                        <div className="member-input-sections-inputs">
                          <label htmlFor="">Phone Number:</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Phone Number"
                            value={passengerphone}
                            onChange={(e) => setPassengerPhone(e.target.value)}
                            className="input"
                          />
                        </div>
                        <div className="member-input-sections-inputs">
                          <label htmlFor="">Gender:</label>
                          <br />
                          <select
                            onChange={(e) => setPassengerGender(e.target.value)}
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="member-input-sections">
                        <div className="member-input-sections-inputs">
                          <label htmlFor="">Adhar Number:</label>
                          <br />
                          <input
                            type="text"
                            placeholder="Adhar Number"
                            required
                            value={passengeradhar}
                            onChange={(e) => setPassengerAdhar(e.target.value)}
                            className="input"
                          />
                          <div>Seat Number: {seats}</div>
                        </div>
                      </div>

                      <div className="passenger-select-buttons">
                        <button className="passenger-select-button" onClick={addPassenger}>Add Passenger</button>
                        <button className="passenger-cancel-button" onClick={() => setShowForm(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <button onClick={() => conformTicketPopup()}>Confirm Ticket</button>
                  </>
                )}
              </div>
            </div>
            <div className="booknow-right">
          <SeatSelection
            selectedSeats={selectedSeats}
            setSelectedSeats={setSelectedSeats}
            bus={bus}
          />
        </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Busdetails;
