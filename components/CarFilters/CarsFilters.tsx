import { useCarsStore } from "@/lib/store/carsStore";
import { useEffect, useState } from "react";

export default function CarsFilters(){
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
    <div>
        {/* Brand */}
      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
      >
        <option value="">Choose a brand</option>
       {brands.map((b) => ( 
           
  <option key={b} value={b}>
    {b}
  </option>
))}
      </select>

      {/* Price */}
      <select
        value={rentalPrice}
        onChange={(e) => setRentalPrice(e.target.value)}
      >
        <option value="">Choose a price</option>
        <option value="30">$30</option>
        <option value="40">$40</option>
        <option value="50">$50</option>
        <option value="60">$60</option>
        <option value="70">$70</option>
        <option value="80">$80</option>
      </select>

      {/* Mileage */}
      <input
        type="number"
        placeholder="From"
        value={minMileage}
        onChange={(e) => setMinMileage(e.target.value)}
      />

      <input
        type="number"
        placeholder="To"
        value={maxMileage}
        onChange={(e) => setMaxMileage(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  )
}

