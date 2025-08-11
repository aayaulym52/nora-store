import { defineStore } from "pinia";
import axios from "axios";

export const useShopStore = defineStore("shop", {
  state: () => ({
    items: [],
    wishlistItems: [],
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    isCartOpen: false,
    notification: null,
  }),
  getters: {
    isWishlistEmpty: (state) => state.wishlistItems.length === 0,
    wishlistCount: (state) => state.wishlistItems.length,

    isCartEmpty: (state) => state.cartItems.length === 0,
    cartCount: (state) => state.cartItems.length,

    isInCart: (state) => {
      return (id, size) =>
        state.cartItems.some((i) => i.id === id && i.size === size);
    },
  },
  actions: {
    async fetchItems(sortBy = "title", category = "", search = "") {
      try {
        const res = await axios.get(
          "https://5725e8620e37ebd9.mokky.dev/items",
          {
            params: { sortBy },
          }
        );

        let items = res.data;

        // фильтр по категории
        if (category) {
          items = items.filter(
            (item) =>
              item.category === category || item.tags?.includes(category)
          );
        }

        // фильтр по поиску
        if (search) {
          const searchLower = search.toLowerCase();
          items = items.filter((item) =>
            item.title.toLowerCase().includes(searchLower)
          );
        }

        this.items = items;
        await this.fetchWishlist();
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error);
      }
    },

    showNotification(message) {
      this.notification = message;
      setTimeout(() => {
        this.notification = null;
      }, 3000);
    },

    addToCart(item, selectedSize) {
      if (!selectedSize) {
        this.showNotification("Пожалуйста, выберите размер");
        return;
      }

      const existing = this.cartItems.find(
        (i) => i.id === item.id && i.size === selectedSize
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        this.cartItems.push({ ...item, size: selectedSize, quantity: 1 });
        this.showNotification("Товар добавлен в корзину");
      }

      this.saveCart();
    },

    removeFromCart(id, size) {
      this.cartItems = this.cartItems.filter(
        (i) => !(i.id === id && i.size === size)
      );
      this.saveCart();
      this.showNotification("Товар удалён из корзины");
    },

    updateQuantity(id, size, quantity) {
      const item = this.cartItems.find((i) => i.id === id && i.size === size);

      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(id, size);
        }
      }

      this.saveCart();
    },

    toggleCart(item, selectedSize) {
      if (!selectedSize) {
        this.showNotification("Пожалуйста, выберите размер");
        return;
      }

      if (this.isInCart(item.id, selectedSize)) {
        this.removeFromCart(item.id, selectedSize);
      } else {
        this.addToCart(item, selectedSize);
      }
    },

    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
    },

    async fetchItemById(id) {
      try {
        const res = await axios.get(
          `https://5725e8620e37ebd9.mokky.dev/items/${id}`
        );
        return res.data;
      } catch (err) {
        console.error("Ошибка при загрузке товара по ID:", err);
        return null;
      }
    },
    async toggleWishlist(item) {
      try {
        if (!item.isWishlist) {
          const obj = { item_id: item.id };
          const { data } = await axios.post(
            "https://5725e8620e37ebd9.mokky.dev/wishlist",
            obj
          );

          item.isWishlist = true;
          item.wishlistId = data.id;

          this.wishlistItems.push({ id: data.id, item_id: item.id });

          this.showNotification("Товар добавлен в избранное");
        } else {
          await axios.delete(
            `https://5725e8620e37ebd9.mokky.dev/wishlist/${item.wishlistId}`
          );

          item.isWishlist = false;

          this.wishlistItems = this.wishlistItems.filter(
            (el) => el.item_id !== item.id
          );

          item.wishlistId = null;

          this.showNotification("Товар удалён из избранного");
        }
      } catch (err) {
        console.error("Ошибка при добавлении в избранное:", err);
      }
    },
    async fetchWishlist() {
      try {
        const res = await axios.get(
          "https://5725e8620e37ebd9.mokky.dev/wishlist"
        );
        this.wishlistItems = res.data;
        this.items.forEach((item) => {
          const fav = this.wishlistItems.find((f) => f.item_id === item.id);
          if (fav) {
            item.isWishlist = true;
            item.wishlistId = fav.id;
          } else {
            item.isWishlist = false;
            item.wishlistId = null;
          }
        });
      } catch (err) {
        console.error("Ошибка при загрузке избранного:", err);
      }
    },
  },
});
