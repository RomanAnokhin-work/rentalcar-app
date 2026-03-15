import { Car } from "@/types/car";
import { getCityAndCountry } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useCarsStore } from "@/lib/store/carsStore"; // або ваш шлях до store
import css from "./CarsList.module.css";

interface CarsListProps {
  cars: Car[];
}

const CarsList = ({ cars }: CarsListProps) => {
  const { favorites, toggleFavorite } = useCarsStore();

  return (
    <ul className={css.list}>
      {cars.map((car: Car) => {
        const { city, country } = getCityAndCountry(car.address);
        const isFavorite = favorites.includes(car.id);

        return (
          <li key={car.id} className={css.item}>
            <div className={css.img_wrapper}>
              <button 
                className={css.favorite_button}
                onClick={() => toggleFavorite(car.id)}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <svg className={css.favorite_icon} width="24" height="24">
                  <use href={`/icons.svg#${isFavorite ? 'icon-heart-active' : 'icon-heart-default'}`} />
                </svg>
              </button>
              <Image
                src={car.img}
                alt={`${car.brand} ${car.model}, ${car.year}`}
                width={276}
                height={268}
                className={css.img}
              />
            </div>

            <div className={css.info_wrapper}>
              <div className={css.title_wrapper}>
                <h3 className={css.title}>
                  {car.brand} <span className={css.highlight}>{car.model}</span>, {car.year}
                </h3>
                <p className={css.price}>${car.rentalPrice}</p>
              </div>

              <div>
                <p className={css.info}>
                  {city} | {country} | {car.rentalCompany} | {car.type} | {car.mileage} km
                </p>
              </div>
            </div>

            <Link className={css.readMore_button} href={`/catalog/${car.id}`}>Read More</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default CarsList;
