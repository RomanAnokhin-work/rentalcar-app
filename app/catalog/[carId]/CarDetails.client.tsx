"use client";

import BookingForm from "@/components/BookForm/BookingForm";
import { getServerCarById } from "@/lib/api/serverApi";
import { getCityAndCountry } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CarDetails() {
  const { carId } = useParams<{ carId: string }>();

  const {
    data: car,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["car", carId],
    queryFn: () => getServerCarById(carId),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !car) return <p>Something went wrong.</p>;

  console.log("Car", car);
  const { city, country } = getCityAndCountry(car.address);

  return (
    <div>
      <div className="left">
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}, ${car.year}`}
          width={640}
          height={512}
        />
        <BookingForm />
      </div>

      <div className="right">
        <div className="header">
          <div className="">
            <div>
              <h2 className="title">
                {car.brand} {car.model}, {car.year}{" "}
              </h2>
              <span className="id">Id: {car.id}</span>
            </div>

            <div>
              <div>
                <p>
                  {city}, {country}
                </p>
                <p>Mileage: {car.mileage} km</p>
              </div>

              <span>${car.rentalPrice}</span>
            </div>
          </div>

          <div>
            <p>{car.description}</p>
          </div>
        </div>

        <div className="specification">
          <div className="rental">
            <h3 className="title"></h3>
            <ul className="">
              <li></li>
            </ul>
          </div>
          <div className="specification-list">
            <h3 className="title"></h3>
            <ul>
              <li></li>
            </ul>
          </div>
          <div className="accessories">
            <h3 className="title"></h3>
            <ul>
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
