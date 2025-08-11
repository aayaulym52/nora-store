<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { reactive, ref, onMounted } from "vue";
import { useIsMobile } from "../composables/useIsMobile";
import { useShopStore } from "../stores/shop";
import autoAnimate from "@formkit/auto-animate";

const shop = useShopStore();
const { isMobile } = useIsMobile();

const props = defineProps({
  items: Array,
});

const activeIndexes = reactive({});
const productGrid = ref(null);

onMounted(() => {
  if (productGrid.value) autoAnimate(productGrid.value);
});

const handleMouseEnter = (itemId) => {
  activeIndexes[itemId] = 1;
};

const handleMouseLeave = (itemId) => {
  activeIndexes[itemId] = 0;
};

const getActiveIndex = (item) => {
  return activeIndexes[item.id] ?? 0;
};

const toggleWishlist = (item, event) => {
  event.preventDefault();
  shop.toggleWishlist(item);
};
</script>

<template>
  <section class="product-grid" ref="productGrid">
    <article v-for="item in props.items" :key="item.id" class="product-card">
      <router-link :to="`/item/${item.id}`" class="product-link">
        <!-- Мобильный режим -->
        <Swiper
          v-if="isMobile"
          :modules="[Pagination]"
          class="product-swiper"
          :pagination="{ el: '.swiper-pagination', clickable: true }"
          :loop="true"
        >
          <SwiperSlide v-for="(img, idx) in item.imgTop" :key="idx">
            <div class="image-wrapper">
              <img :src="`/images/${img}`" alt="Товар" class="product-image" />
              <div class="wishlist-icon" @click="toggleWishlist(item, $event)">
                <img
                  :src="
                    item.isWishlist
                      ? '/icons/wishlist.svg'
                      : '/icons/wishlist-empty.svg'
                  "
                  alt="wishlist"
                />
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination"></div>
        </Swiper>

        <!-- Десктопный режим -->
        <div
          v-else
          class="desktop-image-wrapper"
          @mouseenter="() => handleMouseEnter(item.id)"
          @mouseleave="() => handleMouseLeave(item.id)"
        >
          <img
            :src="`/images/${item.imgTop[getActiveIndex(item)]}`"
            alt="Товар"
            class="product-image"
          />
          <div class="wishlist-icon" @click="toggleWishlist(item, $event)">
            <img
              :src="
                item.isWishlist
                  ? '/icons/wishlist.svg'
                  : '/icons/wishlist-empty.svg'
              "
              alt="wishlist"
            />
          </div>
        </div>

        <div class="product-info">
          <h3 class="product-title">{{ item.title }}</h3>
          <p class="product-price">
            {{ item.price.toLocaleString("ru-RU") }} ₽
          </p>
        </div>
      </router-link>
    </article>
  </section>
</template>
