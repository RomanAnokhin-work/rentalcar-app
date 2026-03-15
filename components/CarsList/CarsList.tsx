import { Car } from "@/types/car";
import Link from "next/link";

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  return (
    <ul>
      {cars.map((car: Car) => (
        <li key={car.id}>
          <h2>{car.model}</h2>
          <Link href={`/catalog/${car.id}`}>View details</Link>
        </li>
      ))}
    </ul>
  );
}
