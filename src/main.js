import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./assets/base.css";
import "./assets/main.css"; 
import { createPinia } from "pinia";
import { createApp } from "vue";
import { createWebHistory, createRouter } from "vue-router";
import App from "./App.vue";
import Home from "./pages/Home.vue";
import Shop from "./pages/Shop.vue";
import ProductDetail from "./pages/ProductDetail.vue";
import Wishlist from "./pages/Wishlist.vue";

import Profile from "./pages/Profile.vue";

const app = createApp(App);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/wishlist", name: "Wishlist", component: Wishlist },
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/catalog/:category?", name: "Shop", component: Shop },
  { path: "/item/:id", name: "ProductDetail", component: ProductDetail },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router);
app.use(createPinia());
app.mount("#app");
