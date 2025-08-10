<template>
    <div>
      <div class="table-toggle" @click="toggleDetails">
        <p>Размерная сетка</p>
        <svg
          :class="{ rotated: show }"
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
        <div v-if="show" class="size-details">
          <div class="table-size">
            <p>
              Найдите в таблице параметры, близкие к вашим, чтобы определить свой размер.
            </p>
            <table>
              <tr>
                <th>INT</th>
                <th>RU</th>
                <th>Обхват груди</th>
                <th>Обхват талии</th>
                <th>Обхват бедер</th>
              </tr>
              <tr><td>XS</td><td>42</td><td>84</td><td>64</td><td>92</td></tr>
              <tr><td>S</td><td>44</td><td>88</td><td>68</td><td>96</td></tr>
              <tr><td>M</td><td>46</td><td>92</td><td>72</td><td>100</td></tr>
              <tr><td>L</td><td>48</td><td>96</td><td>76</td><td>104</td></tr>
              <tr><td>XL</td><td>50</td><td>100</td><td>80</td><td>108</td></tr>
            </table>
            <div class="table-text">*Все размеры указаны в см</div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const show = ref(false);
  const toggleDetails = () => {
    show.value = !show.value;
  };
  </script>
 
  