<script setup>
import { onMounted, computed } from "vue";
import { useShopStore } from "../stores/shop";
import Card from "../components/Card.vue";
const shop = useShopStore();

const wishlistItems = computed(() =>
  shop.items.filter((item) => item.isWishlist)
);

onMounted(async () => {
  await shop.fetchItems();
});
</script>

<template>
  <div v-if="shop.notification" class="notification">
    {{ shop.notification }}
  </div>
  <div class="wishlist">
    <div class="wishlist__header">
      <div class="wishlist__header-title">Вишлист</div>
    </div>
  </div>
  <div v-if="shop.wishlistItems.length === 0" class="WishlistEmpty">
    <div class="EmptyResult">
      <div class="EmptyResult__content">
        <div class="EmptyResult__icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="WishlistIcon"
          >
            <path
              d="M17.5 2.5H6.5V21.5C8.59 16.48 15.41 16.48 17.5 21.5V2.5Z"
              stroke-linejoin="round"
              stroke-width="1"
            />
          </svg>
        </div>
        <h2 class="EmptyResult__title">Вишлист пока пуст</h2>
        <p class="EmptyResult__description">
          Здесь будут модели, которые вы<br />отложите в избранное
        </p>
        <router-link to="/catalog">
          <button class="EmptyResult__button">
            <span>Перейти в каталог</span>
          </button></router-link
        >
      </div>
    </div>
  </div>
  <div v-else class="Wishlist__column">
    <div class="Wishlist__column-content">
      <Card :items="wishlistItems" />
    </div>
  </div>
</template>
