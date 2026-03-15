"use client";

import BookingForm from "@/components/BookForm/BookingForm";
import { getServerCarById } from "@/lib/api/serverApi";
import { getCityAndCountry } from "@/utils/utils";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import css from "./CarDetails.module.css";

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
  const rentalConditions = car.rentalConditions;

  const specifications = [
    { label: "Year", value: car.year, icon: "/icons.svg#icon-calendar" },
    { label: "Type", value: car.type, icon: "/icons.svg#icon-car" },
    { label: "Fuel Consumption", value: car.fuelConsumption, icon: "/icons.svg#icon-fuel-pump" },
    { label: "Engine Size", value: car.engineSize, icon: "/icons.svg#icon-gear" }
  ];

  const accessories = car.accessories;

  return (
    <div className={css.container}>
      <div className={css.left}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}, ${car.year}`}
          width={640}
          height={512}
          className={css.details_img}
        />
        <BookingForm />
      </div>

      <div className={css.right}>
        <div className={css.header}>
          <div className={css.titleSection}>
            <div>
              <h2 className={css.carTitle}>
                {car.brand} {car.model}, {car.year}
              </h2>
              <span className={css.carId}>Id: {car.id}</span>
            </div>

            <div className={css.locationPrice}>
              <div className={css.location}>
                <p>
                  {city}, {country}
                </p>
                <p className={css.mileage}>Mileage: {car.mileage} km</p>
              </div>

              <span className={css.price}>${car.rentalPrice}</span>
            </div>
          </div>

          <div className={css.description}>
            <p>{car.description || "The Buick Enclave is a stylish and spacious SUV known for its comfortable ride and luxurious features."}</p>
          </div>
        </div>

        <div className={css.specification}>
          <div className={css.rentalConditions}>
            <h3 className={css.sectionTitle}>Rental Conditions:</h3>
            <ul className={css.conditionsList}>
              {rentalConditions.map((condition, index) => (
                <li key={index} className={css.conditionItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={css.specsSection}>
            <h3 className={css.sectionTitle}>Car Specifications:</h3>
            <ul className={css.specsList}>
              {specifications.map((spec, index) => (
                <li key={index} className={css.specItem}>
                  <svg className={css.specIcon}>
                    <use href={spec.icon} />
                  </svg>
                  <span className={css.specLabel}>{spec.label}:</span> {spec.value}
                </li>
              ))}
            </ul>
          </div>
          
          <div className={css.accessoriesSection}>
            <h3 className={css.sectionTitle}>Accessories and functionalities:</h3>
            <ul className={css.accessoriesList}>
              {accessories.map((accessory, index) => (
                <li key={index} className={css.accessoryItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  {accessory}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}