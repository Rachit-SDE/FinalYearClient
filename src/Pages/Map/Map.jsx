/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from 'geolib';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import { assets } from '../../assets/assets';

const Map = () => {
  const customIcon = new L.Icon({
    iconUrl: assets.bus,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const endIcon = new L.Icon({
    iconUrl: assets.house,
    iconSize: [34, 34],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const params = useParams();
  const busnumber = params.busnumber;
  const end = params.destination;

  const [coords, setCoords] = useState([]);
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  const [busLocation, setBusLocation] = useState(null);
  const [zoom, setZoom] = useState(true)

  const apiKey = '5b3ce3597851110001cf6248136bace681094a669a5df3dc48f1dba0';

  const getDirections = async (start, end) => {
    if (start && end) {
      try {
        const response = await axios.get(
          `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start}&end=${end}`
        );
        if (response?.data?.features?.[0]?.geometry?.coordinates) {
          const coordinates = response.data.features[0].geometry.coordinates;
          setSourceCoords([coordinates[0][1], coordinates[0][0]]);
          setDestinationCoords([coordinates[coordinates.length - 1][1], coordinates[coordinates.length - 1][0]]);
          setCoords(coordinates);
          setDirections(coordinates);
          setDistance(Math.round(response.data.features[0].properties.summary.distance / 1000));
          setDuration(response.data.features[0].properties.summary.duration);
        } else {
          console.error('Invalid directions response:', response);
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    }
  };

  console.log(sourceCoords)

  const updateLocation = async () => {
    try {
      const response = await axios.get(`https://backend-chi-one-67.vercel.app/api/bus/location/${busnumber}`);
      const busLocation = response.data.response.location;
      setBusLocation(busLocation);
      const location = `${busLocation[1]},${busLocation[0]}`;
      getDirections(location, end);
    } catch (err) {
      console.error('Error sending location:', err);
    }
  };

  // Hook to update map center and zoom level when directions or location updates
  function MapCenter({ coords, setZoom }) {
    const map = useMap();

    useEffect(() => {
      if (sourceCoords && destinationCoords) {
        const lat = (sourceCoords[0] + destinationCoords[0]) / 2;
        const lon = (sourceCoords[1] + destinationCoords[1]) / 2;
        const distance = getDistance(
          { latitude: sourceCoords[0], longitude: sourceCoords[1] },
          { latitude: destinationCoords[0], longitude: destinationCoords[1] }
        );
        
        let zoomLevel = 10; // Default zoom level
        
        // Adjust zoom level based on the distance
        if (distance > 150000) zoomLevel = 8;
        else if (distance > 100000) zoomLevel = 12;
        else if (distance > 50000) zoomLevel = 12;
        else if (distance > 10000) zoomLevel = 15;
        else zoomLevel = 18;
          if(zoom){
            map.setView([lat, lon], zoomLevel);
            setZoom(false);
          }
      }
    }, [coords, map]);

    return null;
  }

  useEffect(() => {
    updateLocation();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateLocation, 8000);
    return () => clearInterval(interval);
  }, [updateLocation]);

  const convertSecondsToHHMM = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    return `${formattedHours} h :${formattedMinutes} m`;
  };

  return (
    <div className="Map">
      <div className="Map-inner">
        <div className="Map-inner-heading">
          {directions && <h3>Directions</h3>}
        </div>
        <div className="">
          <div className="map-details">
            <p>Distance: {distance} km</p>
            <p>Duration: {convertSecondsToHHMM(duration)}</p>
          </div>
          <MapContainer
            center={[23.16000000, 79.95000000]}
            
            style={{ height: '550px', width: '100%', borderRadius: '10px' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {sourceCoords && (
              <Marker position={[sourceCoords[0], sourceCoords[1]]} icon={customIcon}>
                <Popup>Source</Popup>
              </Marker>
            )}
            {destinationCoords && (
              <Marker position={[destinationCoords[0], destinationCoords[1]]} icon={endIcon}>
                <Popup>Destination</Popup>
              </Marker>
            )}
            {busLocation && (
              <Marker position={[busLocation[1], busLocation[0]]} icon={customIcon}>
                <Popup>Current Bus Location</Popup>
              </Marker>
            )}
            {directions && Array.isArray(directions) && directions.length > 0 && (
              <Polyline
                positions={directions.map(coord => [coord[1], coord[0]])}
                color="#3b82f6"
                weight={6}
                opacity={1}
              />
            )}
            <MapCenter coords={coords} setZoom={setZoom} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Map;
