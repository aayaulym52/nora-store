<script setup>
import { ref } from "vue";
import { useCategories } from "../composables/useCategories";

const categories = useCategories();
const emit = defineEmits(["selectCategory"]);
const selectedCategory = ref("");

function selectCategory(id) {
  selectedCategory.value = id;
  emit("selectCategory", id);
}
</script>

<template>
  <section class="category-section">
    <h2 class="category-title">
      {{
        selectedCategory.value
          ? categories.find((c) => c.id === selectedCategory.value)?.name
          : "Каталог"
      }}
    </h2>
    <nav aria-label="Категории">
      <ul class="category-list">
        <li
          v-for="cat in categories"
          :key="cat.id"
          @click="selectCategory(cat.id)"
        >
          {{ cat.name }}
        </li>
      </ul>
    </nav>
  </section>
</template>
