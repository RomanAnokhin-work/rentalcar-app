interface CarPageByIdProps {
  params: Promise<{
    carId: string;
  }>;
}

export default async function CarPageById({ params }: CarPageByIdProps) {
   const { carId } = await params;
   
  return (
    <div>
      <h1>Car ID: {carId}</h1>
    </div>
  );
}