import { Filters } from "@/types/filters";
import { instance } from "./api";
import { Car } from "@/types/car";

interface CarsResponse {
  cars: Car[];
  page: number;
  totalCars: number;
  totalPages: number;
}
interface GetCarsParams extends Filters {
  page?: string;
  limit?: string;
}

export async function getServerCars(
  params: GetCarsParams,
): Promise<CarsResponse> {
  const { data } = await instance.get<CarsResponse>("/cars", {
    params,
  });
  console.log("Cars data:", data);

  return data;
}
