import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, stock) => {
        // ดึง item เดิมขึ้นมาเช็คก่อน
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          if (existingItem.quantity + 1 > stock) {
            return { error: `ไม่สามารถสั่ง ${stock} เกินได้` };
          }

          const updateItem = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1, stock }
              : item
          );
          set({ items: updateItem });
        } else {
          if (1 > stock) {
            return { error: `ขออภัยสินค้าหมดแล้ว` };
          }
          set({ items: [...items, { ...product, quantity: 1, stock }] });
        }
      },
      removeItem: (productId) => {
        console.log("🚀 ~ productId:", productId);

        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId, quantity) => {
        const updatedItems = get().items.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        );
        set({ items: updatedItems.filter((item) => item.quantity > 0) });
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
      clearCart: () => {
        set({ item: [] });
      },
    }),
    // ตั้งชื่อให้กับ พื้นที่เก็บข้อมูล
    {
      name: "cart-storage",
    }
  )
);

export default useCartStore;
