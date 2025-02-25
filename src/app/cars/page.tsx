"use client";

import { useEffect, useState } from "react";

// Define Car type
type Car = {
  _id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  number_of_seats: number;
  price_per_day: number;
  steering_type: string;
  available: boolean;
};

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]); // Typed state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("http://localhost:1911/api/cars/rental-cars");

        if (!res.ok) {
          throw new Error("Failed to fetch cars");
        }

        const data: Car[] = await res.json(); // Ensure API response matches `Car` type
        setCars(data);
      } catch {
        setError("Error fetching cars"); // Removed unused `err`
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div>Loading cars...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Cars for Rent</h1>
      {cars.length === 0 ? (
        <div>No cars available</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cars.map((car) => (
            <div key={car._id} className="border rounded-lg p-4 shadow-lg">
              <h2 className="text-xl font-semibold">
                {car.make} {car.model}
              </h2>
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
