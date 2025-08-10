<template>
  <nav class="breadcrumbs">
    <router-link to="/" class="link">Главная</router-link>

    <template v-for="(segment, index) in segments" :key="index">
      <span class="separator">/</span>

      <span v-if="index === segments.length - 1" class="current">
        {{ formatSegment(segment) }}
      </span>

      <router-link v-else :to="getPathTo(index)" class="link">
        {{ formatSegment(segment) }}
      </router-link>
    </template>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import { useCategories } from "../composables/useCategories";

const categories = useCategories();

const extraTranslations = {
  catalog: "Каталог",
  wishlist: "Вишлист",
  profile: "Профиль",
  checkout: "Оформление",
  orders: "Мои заказы",
};

const route = useRoute();
const segments = computed(() => route.path.split("/").filter(Boolean));
const getPathTo = (index) => {
  return "/" + segments.value.slice(0, index + 1).join("/");
};

const formatSegment = (text) => {
  if (extraTranslations[text]) return extraTranslations[text];

  const category = categories.find((cat) => cat.id === text);
  if (category) return category.name;

  return decodeURIComponent(text)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
};
</script>
