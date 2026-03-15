export const getCityAndCountry = (address: string) => {
  const parts = address.split(",").map(p => p.trim());
  return {
    city: parts[1] ?? "",
    country: parts[2] ?? "",
  };
};