import { CarFilters } from "@/types/carfilters";
import { instance } from "./api";
import { Car } from "@/types/car";

interface CarsResponse {
  cars: Car[];
  page: number;
  totalCars: number;
  totalPages: number;
}
interface GetCarsParams extends CarFilters {
  page?: string;
  limit?: string;
}

export async function getServerCars(
  params: GetCarsParams,
): Promise<CarsResponse> {
  const { data } = await instance.get<CarsResponse>("/cars", {
    params,
  });
console.log("getServerCars data", data);

  return data;
}

export async function getServerBrands() {
    const {data} = await instance.get('/brands');
    console.log("getServerBrands", data);
    return data
    
}

export async function getServerCarById(carId:string): Promise<Car> {
const {data} = await instance.get<Car>(`/cars/${carId}`)

console.log("getServerCarById data", data );


return data;
    
}
