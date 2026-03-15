import { Car } from "@/types/car";
import { CarFilters } from "@/types/carfilters";
import { create } from "zustand";
// import { getCars } from "../api/clientApi";
import { getServerBrands, getServerCars } from "../api/serverApi";

interface CarsStore {
  cars: Car[];
  favorites: string[];
  filters: CarFilters;
  loading: boolean;

  page: number;
  totalPages: number;

  brands: string[];

  setCars: (cars: Car[]) => void;
  clearCars: () => void;

  setFilters: (filters: CarFilters) => void;
  setBrands: (brands:string[])=> void;

  toggleFavorite: (id: string) => void;
  setLoading: (value: boolean) => void;
  fetchCars: () => Promise<void>;
  loadMore: () => Promise<void>;
  fetchBrands: () => Promise<void>;
}

export const useCarsStore = create<CarsStore>((set, get) => ({
  cars: [],
  favorites: [],
  filters: {} as CarFilters,
  loading: false,

  page: 1,
  totalPages: 1,
  brands: [],



  setCars: (cars) => set({ cars }),

  clearCars: () => set({ cars: [] }),

 setFilters: (filters) => {
  set({ filters, page: 1, cars: [] });
  get().fetchCars();
},
  setLoading: (value) => set({ loading: value }),

  setBrands: (brands) => set({ brands }),

  toggleFavorite: (id) =>
    set((state) => ({
      favorites: state.favorites.includes(id)
        ? state.favorites.filter((f) => f !== id)
        : [...state.favorites, id],
    })),
  fetchCars: async () => {
    const { filters } = get();

    set({ cars: [], loading: true });

    try {
      const data = await getServerCars(filters);
      console.log("fetchCars data", data);

      set({ cars: data.cars,
         totalPages: data.totalPages,
         page: 1,
       });
    } finally {
      set({ loading: false });
    }
  },
  loadMore: async () => {
    const { page, totalPages, filters, cars } = get();

    if (page >= totalPages) return;

    const nextPage = page + 1;

    set({ loading: true });

    try {
      const data = await getServerCars({ ...filters, page: nextPage.toString() });

      set({
        cars: [...cars, ...data.cars],
        page: nextPage,
      });
    } finally {
      set({ loading: false });
    }
  },
  fetchBrands: async () => {
  const data = await getServerBrands();
  set({ brands: data });
},
}));
