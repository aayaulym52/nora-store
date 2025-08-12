<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useShopStore } from "../stores/shop";
import Breadcrumbs from "../components/BreadCrumbs.vue";
import Card from "../components/Card.vue";
import Filters from "../components/Filters.vue";
import { useCategories } from "../composables/useCategories";
import debounce from "lodash/debounce";

const shop = useShopStore();
const route = useRoute();
const router = useRouter();
const categories = useCategories();

const selectedCategory = ref(route.params.category || "");
const searchQuery = ref("");

onMounted(() => {
  shop.fetchItems("title", selectedCategory.value, searchQuery.value);
});

watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = newCategory || "";
    searchQuery.value = "";
    shop.fetchItems("title", selectedCategory.value, "");
  }
);

const debouncedFetch = debounce((query) => {
  shop.fetchItems("title", selectedCategory.value, query);
}, 300);

watch(searchQuery, (newValue) => {
  debouncedFetch(newValue);
});

watch(selectedCategory, (newCategory) => {
  router.push({ name: "Shop", params: { category: newCategory || undefined } });
});
</script>

<template>
  <div v-if="shop.notification" class="notification">
    {{ shop.notification }}
  </div>

  <main class="shop-container">
    <div class="Breadcrumbs-header"><Breadcrumbs /></div>

    <h2 class="shop-title">
      {{
        selectedCategory
          ? categories.find((c) => c.id === selectedCategory)?.name
          : "Каталог"
      }}
    </h2>

    <div class="shop-header">
      <div class="shop-left"></div>
      <div class="shop-right">
        <input
          v-if="!selectedCategory || selectedCategory === 'all'"
          type="search"
          v-model="searchQuery"
          class="search-input"
          placeholder="Поиск..."
          aria-label="Поле поиска"
        />
        <div class="filters">
          <Filters :category="selectedCategory" />
        </div>
      </div>
    </div>

    <div class="shop-product">
      <Card v-if="shop.items.length > 0" :items="shop.items" />
      <div v-else class="no-results">
        <div class="no-result-head">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="inherit"
            viewBox="0 0 48 48"
            class="no-result-icon"
          >
            <path
              d="M20.2257 27.3726C19.7514 27.9043 19.1704 28.33 18.5205 28.6219C17.8706 28.9139 17.1664 29.0655 16.4539 29.0668C15.7414 29.0681 15.0367 28.9192 14.3857 28.6297C13.7347 28.3402 13.152 27.9166 12.6758 27.3867"
              stroke-width="1.2"
              stroke-linecap="square"
              vector-effect="non-scaling-stroke"
              class="no-result-icon"
            ></path>
            <path
              d="M35.3368 27.3726C34.8626 27.9043 34.2815 28.33 33.6316 28.6219C32.9817 28.9139 32.2775 29.0655 31.565 29.0668C30.8526 29.0681 30.1478 28.9192 29.4968 28.6297C28.8458 28.3402 28.2632 27.9166 27.787 27.3867"
              stroke-width="1.2"
              stroke-linecap="square"
              vector-effect="non-scaling-stroke"
              class="no-result-icon"
            ></path>
            <path
              d="M36.3875 20.8492C34.0561 20.1659 31.9056 18.9731 30.0914 17.3571"
              stroke-width="1.2"
              stroke-linecap="square"
              vector-effect="non-scaling-stroke"
              class="no-result-icon"
            ></path>
            <path
              d="M11.6125 20.8492C13.9453 20.1655 16.0969 18.9718 17.9116 17.3544"
              stroke-width="1.2"
              stroke-linecap="square"
              vector-effect="non-scaling-stroke"
              class="no-result-icon"
            ></path>
            <path
              d="M20.2222 37.2224H27.7778M42.8889 24.0001C42.8889 34.4322 34.432 42.889 24 42.889C13.5679 42.889 5.11108 34.4322 5.11108 24.0001C5.11108 13.568 13.5679 5.11108 24 5.11108C34.432 5.11108 42.8889 13.568 42.8889 24.0001Z"
              stroke-width="1.2"
              stroke-linecap="square"
              stroke-linejoin="round"
              vector-effect="non-scaling-stroke"
              class="no-result-icon"
            ></path>
          </svg>
        </div>
        <h3 class="no-result-title">Ничего не нашлось</h3>
        <p class="no-result-subtitle">Проверьте, правильно ли введен запрос</p>
      </div>
    </div>
  </main>
</template>
