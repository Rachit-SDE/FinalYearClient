import React from 'react'
import { assets } from "../../assets/assets";
import './Header.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setSource,
  setDestination,
  setSearchResults,
  setLoading,
  setError,
  setDate,
} from "../../redux/searchSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { source, destination, date } = useSelector((state) => state.search);

  const handleSourceChange = (event) => {
    dispatch(setSource(event.target.value));
  };

  const handleDestinationChange = (event) => {
    dispatch(setDestination(event.target.value));
  };

  const handleDateChange = (event) => {
    dispatch(setDate(event.target.value));
  };
  console.log(source, destination, date);

  const handleSearch = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.get(
        `https://backend-chi-one-67.vercel.app/api/bus/search?source=${source}&destination=${destination}`
      );
      dispatch(setSearchResults(response.data));
      dispatch(setLoading(false));
      navigate("/allbuses");
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="header">
      <div className="main-header">
        <div>
          <img src={assets.homeBus} alt="" className="bus" />
        </div>
        <div className="banner">
          <div className="banner-search">
            <div className="banner-search-main">
              <p className="search-heading">Get Your Favourite Ticket</p>
              <div className="search-input-box">
                <div className="search-input">
                  <img src={assets.pickup} alt="" className="source-location" />
                  <input
                    type="text"
                    value={source}
                    onChange={handleSourceChange}
                    placeholder="Enter source"
                  />
                </div>
                <div className="search-input">
                <img src={assets.calendar} alt="" className="source-location" />
                &nbsp;
                <input
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                  placeholder="Enter date"
                />
                </div>
                <div className="search-input">
                  <img src={assets.drop} alt="" className="source-location" />
                  <input
                    type="text"
                    value={destination}
                    onChange={handleDestinationChange}
                    placeholder="Enter destination"
                  />
                </div>
                <button className="search-button" onClick={handleSearch}>
                Search
              </button>
              </div>
            </div>   
          </div>
          <div className="banner-background">
            <div className="background">
              <div className="background-heading">
                <h1>Plan Your Next Trip</h1>
                <h3>with Ease and Safely</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
