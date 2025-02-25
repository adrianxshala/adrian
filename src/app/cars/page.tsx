// 'use client'
// import React, { useEffect, useState } from 'react';
// import { getRentalCars } from '../lib/api'; // Adjust the import path to where your API functions are stored

// const Page = () => {
//   const [cars, setCars] = useState([]); // State to store the rental cars
//   const [loading, setLoading] = useState(true); // State to handle loading state
//   const [error, setError] = useState(null); // State to handle errors

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const data = await getRentalCars(); // Fetch rental cars
//         setCars(data); // Update state with the fetched cars
//       } catch (err) {
//         setError(err.message); // Set error message if something goes wrong
//       } finally {
//         setLoading(false); // Set loading to false after the request is complete
//       }
//     };

//     fetchCars(); // Call the function to fetch cars
//   }, []); // Empty dependency array ensures this runs only once on mount

//   if (loading) {
//     return <div className="text-center text-xl font-semibold py-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 text-xl font-semibold py-10">Error: {error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Available Cars for Rent</h1>
//       {cars.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cars.map((car) => (
//             <div
//               key={car._id}
//               className="bg-white shadow-lg rounded-lg overflow-hidden p-5 transition-transform transform hover:scale-105"
//             >
//               <h2 className="text-xl font-semibold text-gray-900">{car.make} {car.model}</h2>
//               <p className="text-gray-600">Year: <span className="font-medium">{car.year}</span></p>
//               <p className="text-gray-600">Seats: <span className="font-medium">{car.number_of_seats}</span></p>
//               <p className="text-lg font-semibold mt-2 text-blue-500">${car.price_per_day}/day</p>
//               <p
//                 className={`text-sm mt-3 px-3 py-1 rounded-full font-medium ${
//                   car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//                 }`}
//               >
//                 {car.available ? 'Available' : 'Not Available'}
//               </p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-lg text-gray-500">No cars available for rent.</p>
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";

import { useEffect, useState } from "react";

const Cars = () => {
  const [cars, setCars] = useState<any[]>([]); // State to store car data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch car data when the component mounts
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:1911/api/cars/rental-cars", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data = await res.json();
        setCars(data); // Set the car data
      } catch (err) {
        setError("Error fetching cars");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <div>Loading cars...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Cars for Rent</h1>
      {cars.length === 0 ? (
        <div>No cars available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car: any) => (
            <div key={car._id} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold">{car.make} {car.model}</h2>
              <p><strong>Year:</strong> {car.year}</p>
              <p><strong>Color:</strong> {car.color}</p>
              <p><strong>Seats:</strong> {car.number_of_seats}</p>
              <p><strong>Price per day:</strong> ${car.price_per_day}</p>
              <p><strong>Steering:</strong> {car.steering_type}</p>
              <p><strong>Status:</strong> {car.available ? "Available" : "Not Available"}</p>
              <button
                className={`mt-4 py-2 px-4 rounded ${car.available ? "bg-blue-500" : "bg-gray-500"}`}
                disabled={!car.available}
              >
                {car.available ? "Rent Now" : "Not Available"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cars;
