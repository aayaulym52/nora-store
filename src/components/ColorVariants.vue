<template>
  <div class="colors">
    <div
      v-for="variant in colorVariants"
      :key="variant.id"
      class="color-item"
      @click="goToProduct(variant.id)"
      :class="{ active: variant.id === currentProductId }"
    >
      <div
        class="color-circle"
        :style="{ backgroundColor: mapColorToHex(variant.color) }"
      ></div>
    </div>
  </div>
  <p class="color-label">{{ currentColor }}</p>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useShopStore } from "../stores/shop";

const props = defineProps({
  currentProductId: Number,
  currentColor: String,
  parentId: Number,
});

const router = useRouter();
const shop = useShopStore();
const goToProduct = (id) => {
  router.push(`/item/${id}`);
};

const colorVariants = computed(() => {
  const currentItem = shop.items.find(
    (item) => item.id === props.currentProductId
  );
  if (!currentItem) {
    return [];
  }
  if (!currentItem.parentId) {
    return [currentItem];
  }
  const variants = shop.items
    .filter((item) => item.parentId === currentItem.parentId)
    .sort((a, b) => a.id - b.id);

  return variants.length ? variants : [currentItem];
});

function mapColorToHex(color) {
  const colorMap = {
    Черный: "#000000",
    Молочный: "#F0EEE4",
    Бежевый: "#C2AD92",
    Песочный: "#D7B57F",
    Серый: "#808080",
    Пепельный: "#9A9B98",
    Белый: "#ffffff",
    "Светло-серый": "#C6CBCC",
    Коричневый: "#6b4c3b",
    "Горький шоколад": "#443731",
    Морковный: "#C34121",
    "Темно-синий в голубую полоску": "#123955",
    "Светло-красный в молочную полоску": "#DC343B",
    "Темный кэмел": "#976F4C",
    Бордовый: "#752329",
    Коньячный: "#60413A",
    Кирпичный: "#8D3F2D",
    "Джинсовый синий": "#495870",
    "Пыльно-розовый": "#B5817D",
  };
  return colorMap[color] || "#ccc";
}
</script>
