<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import { useRouter } from "vue-router";

const router = useRouter();

function handleSlideClick(category) {
  router.push({ name: "Shop", params: { category } });
}

const slides = [
  {
    video: "/banner/novinki.mp4",
    title: "Новинки",
    subtitle: "Актуальное",
    category: "new",
  },
  {
    video: "/banner/summer.mp4",
    title: "Летняя коллекция",
    subtitle: "Актуальное",
    category: "summer",
  },
  {
    video: "/banner/capsule.mp4",
    title: "Капсула nora",
    subtitle: "Актуальное",
    category: "capsule",
  },
];
</script>

<template>
  <section class="slider">
    <Swiper
      :modules="[Navigation, Pagination]"
      :speed="700"
      :loop="true"
      :navigation="{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }"
      :pagination="{ el: '.swiper-pagination', clickable: true }"
      class="mySwiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <article class="slide">
          <video
            class="slide-video"
            :src="slide.video"
            autoplay
            muted
            loop
            playsinline
          ></video>

          <div class="slide-content">
            <p class="slide-subtitle">{{ slide.subtitle }}</p>
            <h1 class="slide-title">{{ slide.title }}</h1>
            <button
              class="slide-button"
              @click="handleSlideClick(slide.category)"
            >
              Смотреть
            </button>
          </div>
        </article>
      </SwiperSlide>

      <div class="swiper-button-prev">
        <img src="/icons/prev.svg" alt="Prev" />
      </div>
      <div class="swiper-button-next">
        <img src="/icons/next.svg" alt="Next" />
      </div>
      <div class="swiper-pagination"></div>
    </Swiper>
  </section>
</template>
