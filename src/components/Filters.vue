<script setup>
import { ref, defineProps } from "vue";
import { useShopStore } from "../stores/shop";

const props = defineProps({
  category: String,
});

const shop = useShopStore();
const showDropdown = ref(false);
const selectedLabel = ref("По умолчанию");

const options = [
  { value: "", label: "По умолчанию" },
  { value: "title", label: "По названию" },
  { value: "price", label: "По возрастанию цены" },
  { value: "-price", label: "По убыванию цены" },
];

function selectOption(option) {
  selectedLabel.value = option.label;
  shop.fetchItems(option.value, props.category);
  showDropdown.value = false;
}
</script>

<template>
  <div class="filters">
    <div class="filter-select" @click="showDropdown = !showDropdown">
      <span>{{ selectedLabel }}</span>
      <img
        src="/icons/down-arrow.svg"
        alt=""
        class="filter-arrow"
        :class="{ open: showDropdown }"
      />
    </div>

    <div v-if="showDropdown" class="filter-dropdown">
      <div
        v-for="option in options"
        :key="option.value"
        class="dropdown-item"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>
