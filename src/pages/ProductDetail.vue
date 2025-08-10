<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useShopStore } from "../stores/shop";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { useIsMobile } from "../composables/useIsMobile";
import ColorVariants from "../components/ColorVariants.vue";
import SizeSelector from "../components/SizeSelector.vue";
import SizeTable from "../components/SizeTable.vue";
import ProductDescription from "../components/ProductDescription.vue";
import ProductCare from "../components/ProductCare.vue";

const { isMobile } = useIsMobile();
const route = useRoute();
const router = useRouter();
const shop = useShopStore();
const goBack = () => router.back();
const toggleWishlist = (item) => {
  shop.toggleWishlist(item);
};
const toggleCart = () => {
  if (!item.value) return;
  shop.toggleCart(item.value, selectedSize.value);
};

const selectedSize = ref("");

const item = computed(() =>
  shop.items.find((item) => item.id === +route.params.id)
);

onMounted(async () => {
  if (!shop.items.length) {
    await shop.fetchItems();
  }

  await shop.fetchWishlist();
});
</script>

<template>
  <div v-if="shop.notification" class="notification">
    {{ shop.notification }}
  </div>
  <section v-if="item" class="product-page">
    <!-- Мобильный свайпер -->
    <div v-if="isMobile" class="mobile-swiper">
      <button @click="goBack" class="back-button">
        <img src="/icons/back.svg" alt="Назад" />
      </button>
      <Swiper
        :modules="[Pagination]"
        :pagination="{ clickable: true }"
        :loop="true"
        class="product-detail_swiper"
      >
        <SwiperSlide v-for="(img, i) in item.images" :key="i">
          <img
            :src="`/images/${img}`"
            alt="Изображение товара"
            class="slide-image"
          />
        </SwiperSlide>
      </Swiper>
    </div>

    <div class="product-container">
      <!-- Галерея -->
      <div v-if="!isMobile" class="gallery">
        <img
          v-for="(img, i) in item.images"
          :key="i"
          :src="`/images/${img}`"
          alt="Изображение товара"
          class="gallery-image"
        />
      </div>

      <!-- Информация -->
      <article class="product-info_detail">
        <header>
          <h1>{{ item.title }}</h1>
          <h2>{{ item.price.toLocaleString("ru-RU") }} ₽</h2>
        </header>

        <!-- Цвета -->
        <ColorVariants
          :currentProductId="item.id"
          :currentColor="item.color"
          :parentId="item.parentId"
        />

        <!-- Размер -->
        <SizeSelector v-model="selectedSize" />

        <!-- Корзина -->
        <div class="actions">
          <button
            class="add-to-cart"
            :disabled="!selectedSize"
            @click="toggleCart"
          >
            {{
              shop.isInCart(item.id, selectedSize)
                ? "Убрать из корзины"
                : "Добавить в корзину"
            }}
          </button>

          <!-- Вишлист -->
          <svg
            v-if="item"
            xmlns="http://www.w3.org/2000/svg"
            :fill="item.isWishlist ? '#4f3e35' : 'none'"
            stroke="currentColor"
            viewBox="0 0 24 24"
            class="wishlist-icon_svg"
            @click.stop="toggleWishlist(item)"
          >
            <path
              d="M17.5 2.5H6.5V21.5C8.6 16.48 15.4 16.48 17.5 21.5V2.5Z"
              stroke-width="1"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <hr class="divider" />

        <p>Артикул: {{ item.article }}</p>

        <!-- Описание -->
        <ProductDescription :description="item.description" />

        <hr class="divider" />

        <!-- Таблица размеров -->
        <SizeTable />

        <!-- Состав и уход -->
        <ProductCare :material="item?.material" :care="item?.care" />
      </article>
    </div>
  </section>
</template>
