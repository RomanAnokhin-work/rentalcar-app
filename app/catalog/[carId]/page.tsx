import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import CarDetails from "./CarDetails.client";
import { getServerCarById } from "@/lib/api/serverApi";

interface CarPageByIdProps {
  params: Promise<{
    carId: string;
  }>;
}

export default async function CarPageById({ params }: CarPageByIdProps) {
   const { carId } = await params;
   const queryClient = new QueryClient();

   await queryClient.prefetchQuery({
    queryKey: ["cars", carId],
    queryFn: () => getServerCarById(carId),
  });
   
  return (
    
       <HydrationBoundary state={dehydrate(queryClient)}>
      <CarDetails/>
    </HydrationBoundary>
  );
}