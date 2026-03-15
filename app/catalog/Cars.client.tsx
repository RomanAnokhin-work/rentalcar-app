"use client";

import CarsFilters from "@/components/CarFilters/CarsFilters";
import CarsList from "@/components/CarsList/CarsList";
import { useCarsStore } from "@/lib/store/carsStore";
import { useEffect } from "react";
import css from "./Cars.module.css";

export default function Cars() {
  const cars = useCarsStore((state) => state.cars);
  const fetchCars = useCarsStore((state) => state.fetchCars);
  const loadMore = useCarsStore((state) => state.loadMore);
  const page = useCarsStore((state) => state.page);
  const totalPages = useCarsStore((state) => state.totalPages);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <>
    <CarsFilters/>
      {cars.length > 0 && <CarsList cars={cars} />}
      {cars.length > 0 && page < totalPages && (
        <button className={css.loadMore_button} onClick={loadMore}>Load more</button>
      )}
    </>
  );
}
