import { Car } from "@/types/car";
import { getCityAndCountry } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";

interface CarsListProps {
  cars: Car[];
}

const CarsList = ({ cars }: CarsListProps) => (
  <ul>
    {cars.map((car: Car) => {
      const { city, country } = getCityAndCountry(car.address);

      return (
        <li key={car.id}>
          <div className="img-wrapper">
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}, ${car.year}`}
              width={276}
              height={268}
            />
          </div>

          <div className="info-wrapper">
            <div>
              <h2>
                {car.brand} <span>{car.model}</span>, {car.year}
              </h2>
              <p>${car.rentalPrice}</p>
            </div>

            <div>
              <p>
                {city} | {country} | {car.rentalCompany} | {car.type} | {car.mileage} km
              </p>
            </div>
          </div>

          <button>
            <Link href={`/catalog/${car.id}`}>Read More</Link>
          </button>
        </li>
      );
    })}
  </ul>
);

export default CarsList;
