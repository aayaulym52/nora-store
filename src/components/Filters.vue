<script setup>
import { ref, defineProps } from "vue";
import { useShopStore } from "../stores/shop";

const props = defineProps({
  category: String,
});

const shop = useShopStore();
const showFilters = ref(false);

function toggleFilters() {
  showFilters.value = !showFilters.value;
}

function sortItems(sortBy) {
  shop.fetchItems(sortBy, props.category);
  showFilters.value = false;
}
</script>

<template>
  <div class="filters-wrapper">
    <button @click="toggleFilters" class="filter-button" aria-label="Фильтр">
      <img src="/icons/filter.svg" alt="Фильтр" class="filter-icon" />
    </button>

    <nav v-if="showFilters" class="filters-dropdown">
      <button @click="sortItems('title')" class="dropdown-item">
        По названию
      </button>
      <button @click="sortItems('price')" class="dropdown-item">
        По возрастанию цены
      </button>
      <button @click="sortItems('-price')" class="dropdown-item">
        По убыванию цены
      </button>
    </nav>
  </div>
</template>
