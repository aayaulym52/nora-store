<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "./components/Header.vue";
import { useIsMobile } from "./composables/useIsMobile";
const { isMobile } = useIsMobile();

const route = useRoute();
const hideHeader = computed(() => {
  return isMobile.value && route.name === "ProductDetail";
});
</script>

<template>
  <Header v-if="!hideHeader" />

  <main>
    <router-view />
  </main>
</template>
