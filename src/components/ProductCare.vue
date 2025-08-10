<template>
  <div>
    <div class="care-toggle" @click="showDetails = !showDetails">
      <p>Состав и уход</p>
      <svg
        :class="{ rotated: showDetails }"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>

    <transition name="fade">
      <div v-if="showDetails" class="care-details">
        <p>Состав: {{ material }}</p>
        <ul>
          <li v-for="(item, i) in care" :key="i">{{ item }}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  material: String,
  care: Array,
});

const showDetails = ref(false);
</script>
