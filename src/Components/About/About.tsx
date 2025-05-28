import React from 'react'


const About = () => {
   return(
    <div className="flex mx-auto justify-center py-[100px]">
        <div className="max-w-[1300px] mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 h-[50px] mb-[10px] border-b-[1px]">About Us</h2>
        <p className="text-lg text-gray-600 mb-12 mt-12 h-[100px] flex items-center">
          Our Bus Reservation and Tracking System is designed to offer a seamless and secure travel booking experience. Whether you're planning a daily commute or a long-distance trip, our platform enables real-time bus tracking, convenient seat reservations, and instant notifications — all in one place.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">🚌 Easy Reservation</h3>
            <p className="text-gray-600">
              Book your seat in advance from the comfort of your home. Our intuitive interface makes it simple to find buses, choose seats, and confirm your travel plans in minutes.
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-2xl shadow hover:shadow-md transition ">
            <h3 className="text-xl font-semibold text-green-600 mb-4">📍 Real-Time Tracking</h3>
            <p className="text-gray-600">
              Stay updated with the live location of your bus. Our GPS-enabled system helps passengers and administrators monitor vehicle movement and estimated arrival times.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold text-red-600 mb-2">🔔 Smart Notifications</h3>
            <p className="text-gray-600">
              Receive timely alerts about bus arrivals, delays, or route changes via SMS or email. Never miss your bus again with our intelligent notification system.
            </p>
          </div>
        </div>
        </div>
      </div>
   )
}

export default About
