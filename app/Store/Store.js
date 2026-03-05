import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const Store = create(
  devtools(
    (set) => ({
      list: [],

      addItem: (dog) =>
        set(
          (state) => {
            const exists = state.list.some((item) => item.id === dog.id);
            if (exists) return state;
            return { list: [...state.list, dog] };
          },
          false,
          "store/addItem"
        ),

      removeItem: (id) =>
        set(
          (state) => ({
            list: state.list.filter((item) => item.id !== id),
          }),
          false,
          "store/removeItem"
        ),
    }),
    { name: "DogStore" }
  )
);