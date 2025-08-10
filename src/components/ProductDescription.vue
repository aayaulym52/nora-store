<template>
    <!-- Пока скрыто -->
    <p v-if="!showMore" class="description">
      {{ truncatedText }}
      <button
        v-if="isTruncated"
        @click="showMore = true"
        class="more-button"
      >
        ...ЕЩЕ
      </button>
    </p>
  
    <!-- Полное описание -->
    <div v-else>
      <p
        v-for="(desc, index) in props.description"
        :key="index"
        class="description"
      >
        {{ desc }}
      </p>
      <div class="hide-button-wrapper">
        <button @click="showMore = false" class="more-button">
          ...СКРЫТЬ
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  
  const props = defineProps({
    description: {
      type: Array,
      required: true,
    },
  });
  
  const showMore = ref(false);
  const maxLength = 200;
  
  const isTruncated = computed(() => {
    return props.description[0]?.length > maxLength;
  });
  
  const truncatedText = computed(() => {
    return props.description[0]?.slice(0, maxLength);
  });
  </script>
  