<template>
  <div
    v-show="shop.isCartOpen"
    class="cart-overlay"
    @click.self="shop.isCartOpen = false"
  >
    <div :class="['cart', { 'cart--open': shop.isCartOpen }]">
      <div class="cart__header">
        <div class="cart__header-title">Корзина</div>
        <button class="cart__close-btn" @click="shop.isCartOpen = false">
          <img src="/icons/close.svg" alt="" class="cart-icon" />
        </button>
      </div>

      <div v-if="shop.cartItems.length === 0" class="cart__empty-text">
        Ваша корзина пока пуста
      </div>

      <div v-else class="cart_item">
        <!-- Товары -->
        <div v-for="item in shop.cartItems" :key="item.id" class="cart__item">
          <div class="cart__items">
            <div class="cart__item-content">
              <img
                :src="`/images/${item.imgTop[1]}`"
                :alt="item.title"
                class="cart__item-image"
              />
              <div class="cart__item-info">
                <div class="cart__item-title">{{ item.title }}</div>
                <div class="cart__item-size">Размер: {{ item.size }}</div>
                <div class="cart__item-price">
                  {{ item.price.toLocaleString("ru-RU") }} ₽
                </div>

                <div class="cart__item-content">
                  <div class="cart__quantity-controls">
                    <button
                      @click="decreaseQuantity(item.id, item.size)"
                      class="cart__quantity-btn"
                    >
                      –
                    </button>
                    <span class="cart__quantity-value">
                      {{ item.quantity }}
                    </span>
                    <button
                      @click="increaseQuantity(item.id, item.size)"
                      class="cart__quantity-btn"
                    >
                      +
                    </button>
                  </div>

                  <button
                    class="cart__item-remove"
                    @click="shop.toggleCart(item, item.size)"
                  >
                    <img
                      src="/icons/trash.svg"
                      alt="Удалить из корзины"
                      class="cart_icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Итого -->
        <div class="cart__totalItems">Товары: {{ totalItems }}</div>
        <div class="cart__totalsum">
          Итого: {{ totalSum.toLocaleString("ru-RU") }} ₽
        </div>
        <div>
          <button class="checkout-btn">Оформить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useShopStore } from "../stores/shop";
const shop = useShopStore();
const totalSum = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
);

const totalItems = computed(() =>
  shop.cartItems.reduce((acc, item) => acc + item.quantity, 0)
);
function increaseQuantity(id, size) {
  const item = shop.cartItems.find((i) => i.id === id && i.size === size);
  if (item) {
    shop.updateQuantity(id, size, item.quantity + 1);
  }
}

function decreaseQuantity(id, size) {
  const item = shop.cartItems.find((i) => i.id === id && i.size === size);
  if (item) {
    const newQuantity = item.quantity - 1;
    if (newQuantity <= 0) {
      shop.removeFromCart(id, size);
    } else {
      shop.updateQuantity(id, size, newQuantity);
    }
  }
}
</script>
