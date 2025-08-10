<script setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useShopStore } from "../stores/shop";
import Breadcrumbs from "../components/BreadCrumbs.vue";
import Card from "../components/Card.vue";
import Filters from "../components/Filters.vue";
import { useCategories } from "../composables/useCategories";

const shop = useShopStore();
const route = useRoute();
const router = useRouter();
const categories = useCategories();

const selectedCategory = ref(route.params.category || "");

onMounted(() => {
  shop.fetchItems("title", selectedCategory.value);
});

watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = newCategory || "";
    shop.fetchItems("title", selectedCategory.value);
  }
);

watch(selectedCategory, (newCategory) => {
  router.push({ name: "Shop", params: { category: newCategory || undefined } });
});
</script>

<template>
  <div v-if="shop.notification" class="notification">
    {{ shop.notification }}
  </div>
  <div class="Breadcrumbs-header"><Breadcrumbs /></div>

  <main class="shop-container">
    <aside class="sidebar">
      <h2 class="sidebar-title">
        {{
          selectedCategory
            ? categories.find((c) => c.id === selectedCategory)?.name
            : "Каталог"
        }}
      </h2>

      <ul class="category-list">
        <li
          v-for="cat in categories"
          :key="cat.id"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </li>
      </ul>
    </aside>

    <section class="shop-content">
      <header class="shop-header">
        <h2 class="mobile-title">
          {{
            selectedCategory
              ? categories.find((c) => c.id === selectedCategory)?.name
              : "Каталог"
          }}
        </h2>
        <div class="filters">
          <Filters :category="selectedCategory" />
        </div>
      </header>

      <Card :items="shop.items" />
    </section>
  </main>
</template>
