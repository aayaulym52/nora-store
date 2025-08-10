<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import DrawerCategory from "./DrawerCategory.vue";
import DrawerCart from "./DrawerCart.vue";
import { useShopStore } from "../stores/shop";

const shop = useShopStore();

const isDrawerOpen = ref(false);
const router = useRouter();
const route = useRoute();

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

async function onCategorySelect(categoryId) {
  await router.push({
    name: "Shop",
    params: { category: categoryId || undefined },
  });

  isDrawerOpen.value = false;
}
function closeDrawer() {
  isDrawerOpen.value = false;
}
</script>

<template>
  <div class="layout">
    <header class="main-header">
      <nav class="main-nav">
        <div class="container">
          <!-- Левая часть бургер -->
          <div class="nav-left">
            <div
              class="burger"
              :class="{ open: isDrawerOpen }"
              @click="toggleDrawer"
            ></div>
            <transition name="drawer">
              <div
                v-if="isDrawerOpen"
                class="drawer-overlay"
                @click.self="closeDrawer"
              >
                <aside class="drawer-category" :class="{ open: isDrawerOpen }">
                  <DrawerCategory @selectCategory="onCategorySelect" />
                </aside>
              </div>
            </transition>
          </div>

          <!-- Центр логотип -->
          <div class="nav-center">
            <router-link to="/" class="logo">
              <h1>nora</h1>
            </router-link>
          </div>

          <!-- Правая часть иконки -->
          <div class="nav-right">
            <button class="header-icon" aria-label="Поиск">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M15.13 15.13L20.5 20.5M16.92 10.21C16.92 13.92 13.92 16.92 10.21 16.92C6.5 16.92 3.5 13.92 3.5 10.21C3.5 6.5 6.5 3.5 10.21 3.5C13.92 3.5 16.92 6.5 16.92 10.21Z"
                  stroke-width="1"
                  stroke-linecap="round"
                />
              </svg>
            </button>

            <router-link
              to="/wishlist"
              class="header-icon"
              :data-count="shop.wishlistCount"
              :class="{ 'has-wishlist': !shop.isWishlistEmpty }"
              aria-label="Избранное"
            >
              <!-- Пустое избранное -->
              <svg
                v-if="shop.isWishlistEmpty"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M17.5 2.5H6.5V21.5C8.6 16.48 15.4 16.48 17.5 21.5V2.5Z"
                  stroke-width="1"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Есть избранное -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="inherit"
                stroke="inherit"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M13 2.5H6.5V21.5C8.59224 16.4786 15.4078 16.4786 17.5 21.5V10"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </router-link>

            <div
              class="header-icon"
              :data-count="shop.cartCount"
              :class="{ 'has-cart': !shop.isCartEmpty }"
              @click="shop.isCartOpen = true"
              aria-label="Корзина"
            >
              <!-- Пустая корзина -->
              <svg
                v-if="shop.isCartEmpty"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M8.5 8.5H4.5V20.5C4.5 21.05 4.95 21.5 5.5 21.5H18.5C19.05 21.5 19.5 21.05 19.5 20.5V8.5H15.5M8.5 8.5H15.5M8.5 8.5V9.5M8.5 8.5V6C8.5 4.07 10.07 2.5 12 2.5C13.93 2.5 15.5 4.07 15.5 6V8.5V9.5"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Полная корзина -->
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="inherit"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M8.50002 8.50002H4.5L4.50001 20.5C4.50001 21.0523 4.94772 21.5 5.50001 21.5H18.5C19.0523 21.5 19.5 21.0523 19.5 20.5V11M8.50002 8.50002H15.5L15.5 9.50001M8.50002 8.50002L8.5 9.50001M8.50002 8.50002L8.5 6.00001C8.5 4.06701 10.067 2.5 12 2.5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  vector-effect="non-scaling-stroke"
                />
              </svg>
            </div>

            <DrawerCart v-if="shop.isCartOpen" />

            <router-link to="/profile" class="header-icon" aria-label="Профиль">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                class="header-icon_svg"
              >
                <path
                  d="M19.26 18.12C18.43 14.89 15.49 12.5 12 12.5C8.51 12.5 5.57 14.89 4.74 18.12C6.48 20.19 9.09 21.5 12 21.5C14.91 21.5 17.52 20.19 19.26 18.12Z"
                  stroke-width="1"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 9.5C13.93 9.5 15.5 7.93 15.5 6C15.5 4.07 13.93 2.5 12 2.5C10.07 2.5 8.5 4.07 8.5 6C8.5 7.93 10.07 9.5 12 9.5Z"
                  stroke-width="1"
                />
              </svg>
            </router-link>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>
