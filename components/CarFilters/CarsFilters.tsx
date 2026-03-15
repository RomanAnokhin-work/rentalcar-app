import { useCarsStore } from "@/lib/store/carsStore";
import { useEffect, useState } from "react";
import css from "./CarsFilters.module.css";

export default function CarsFilters(){
  const [isActive, setIsActive] = useState(false);
  const [activeSelect, setActiveSelect] = useState<"brand" | "price" | null>(null);;
      const setFilters = useCarsStore((state) => state.setFilters);
const { brands, fetchBrands } = useCarsStore();

  const [brand, setBrand] = useState("");
  const [rentalPrice, setRentalPrice] = useState("");
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  useEffect(() => {
  fetchBrands();
}, [fetchBrands]);

  const handleSearch = () => {
    setFilters({
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    });
  };
  

  return (
     <div className={css.container}>
      {/* Brand */}
      <div className={css.filterGroup}>
        
        <label className={css.label}>Car brand</label>
        <div className={css.selectWrapper}>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
           onFocus={() => setActiveSelect("brand")}
  onBlur={() => setActiveSelect(null)}
          className={css.select}
        >
          <option className={css.option} value="">Choose a brand</option>
          {brands.map((b) => (
            <option className={css.option} key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
         <svg className={css.arrow}>
        <use href={
        activeSelect === "brand"
          ? "/icons.svg#icon-chevron-down-active"
          : "/icons.svg#icon-chevron-down-default"
      }></use>
      </svg>
        </div>
      </div>

      {/* Price */}
      <div className={css.filterGroup}>
        <label className={css.label}>Price/1 hour</label>
        <div className={css.selectWrapper}>
        <select
          value={rentalPrice}
          onChange={(e) => setRentalPrice(e.target.value)}
           onFocus={() => setActiveSelect("price")}
  onBlur={() => setActiveSelect(null)}
          className={css.select}
        >
          <option className={css.option} value="">Choose a price</option>
          <option className={css.option} value="30">$30</option>
          <option className={css.option} value="40">$40</option>
          <option className={css.option} value="50">$50</option>
          <option className={css.option} value="60">$60</option>
          <option className={css.option} value="70">$70</option>
          <option className={css.option} value="80">$80</option>
        </select>
        <svg className={css.arrow}>
        <use href={
        activeSelect === "price"
          ? "/icons.svg#icon-chevron-down-active"
          : "/icons.svg#icon-chevron-down-default"
      }></use>
      </svg>
        </div>
      </div>

      {/* Mileage */}
      <div className={css.filterGroup}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileage_wrapper}>
          <input
            type="number"
            placeholder="From"
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
            className={css.input_from}
          />
          <input
            type="number"
            placeholder="To"
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
            className={css.input_to}
          />
        </div>
      </div>

      <button className={css.search_button}onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

