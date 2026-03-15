import { Car } from "@/types/car";
import { Filters } from "@/types/filters";
import { create } from "zustand";
import { getCars } from "../api/clientApi";

interface CarsStore {
  cars: Car[];
  favorites: string[];
  filters: Filters;
  loading: boolean;

  page: number;
  totalPages: number;

  setCars: (cars: Car[]) => void;
  clearCars: () => void;

  setFilters: (filters: Filters) => void;

  toggleFavorite: (id: string) => void;
  setLoading: (value: boolean) => void;
  fetchCars: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useCarsStore = create<CarsStore>((set, get) => ({
  cars: [],
  favorites: [],
  filters: {} as Filters,
  loading: false,

  page: 1,
  totalPages: 1,

  setCars: (cars) => set({ cars }),

  clearCars: () => set({ cars: [] }),

 setFilters: (filters) => {
  set({ filters, page: 1, cars: [] });
  get().fetchCars();
},
  setLoading: (value) => set({ loading: value }),

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
      const data = await getCars(filters);
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
      const data = await getCars({ ...filters, page: nextPage.toString() });

      set({
        cars: [...cars, ...data.cars],
        page: nextPage,
      });
    } finally {
      set({ loading: false });
    }
  },
}));
