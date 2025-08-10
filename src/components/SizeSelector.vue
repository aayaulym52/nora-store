<template>
  <div class="size-selector">
    <button @click="toggleDropdown" class="size-button">
      <span>{{ selectedSize || "Выберите размер" }}</span>
      <img src="/icons/down-arrow.svg" alt="Открыть" />
    </button>
    <div v-if="showSizes" class="size-dropdown">
      <button
        v-for="size in sizes"
        :key="size"
        @click="selectSize(size)"
        :class="{ selected: selectedSize === size }"
      >
        {{ size }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineEmits, defineProps } from "vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const sizes = ["XS", "S", "M", "L", "XL"];
const showSizes = ref(false);

const selectedSize = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const toggleDropdown = () => {
  showSizes.value = !showSizes.value;
};

const selectSize = (size) => {
  selectedSize.value = size;
  showSizes.value = false;
};
</script>
