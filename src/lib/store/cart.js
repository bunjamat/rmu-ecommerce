import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        // ดึง item เดิมขึ้นมาเช็คก่อน
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);
        if (existingItem) {
          const updateItem = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ items: updateItem });
        } else {
          set({ items: [...items, { ...product, quantity: 1 }] });
        }
      },
      removeItem : ()=>{
        
      }
    }),
    // ตั้งชื่อให้กับ พื้นที่เก็บข้อมูล
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
