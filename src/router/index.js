import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ItemsView from "@/views/ItemsView.vue";
import ItemDetailsView from "@/views/ItemDetailsView.vue";
import MyRentalsView from "@/views/renter/MyRentalsView.vue";
import RentalHistoryView from "@/views/renter/RentalHistoryView.vue";
import CreateitemView from "@/views/owner/CreateitemView.vue";
import EditItemView from "@/views/owner/EditItemView.vue";
import MyItemsView from "@/views/owner/MyItemsView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisteraView from "@/views/auth/registeraView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/itemsView",
      name: "itemsview",
      component: ItemsView,
    },
    {
      path: "/ItemDetailsView",
      name: "itemDetailsView",
      component: ItemDetailsView,
    },
    {
      path: "/RentalHistoryView",
      name: "rentalHistoryView",
      component: RentalHistoryView,
    },
    {
      path: "/MyRentalsView",
      name: "myRentalsView",
      component: MyRentalsView,
    },
    {
      path: "/createitemView",
      name: "createitemView",
      component: CreateitemView,
    },
    {
      path: "/editItemView",
      name: "editItemView",
      component: EditItemView,
    },
    {
      path: "/myItemsView",
      name: "myItemsView",
      component: MyItemsView,
    },
    {
      path: "/loginView",
      name: "loginView",
      component: LoginView,
    },
    {
      path: "/registeraView",
      name: "registeraView",
      component: RegisteraView,
    },
    {
      path: "/notFoundView",
      name: "notFoundView",
      component: NotFoundView,
    },
  ],
});

export default router;
