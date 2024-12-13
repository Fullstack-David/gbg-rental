import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import ItemsView from "@/views/ItemsView.vue";
import ItemDetailsView from "@/views/ItemDetailsView.vue";
import MyRentalsView from "@/views/renter/MyRentalsView.vue";
import RentalHistoryView from "@/views/renter/RentalHistoryView.vue";
import CreateItemView from "@/views/owner/CreateitemView.vue";
import EditItemView from "@/views/owner/EditItemView.vue";
import MyItemsView from "@/views/owner/MyItemsView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import Cartview from "@/views/renter/Cartview.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },

    {
      path: "/my-items",
      name: "myItems",
      component: MyItemsView,
    },
    {
      path: "/create-item",
      name: "createItem",
      component: CreateItemView,
    },
    {
      path: "/items",
      name: "items",
      component: ItemsView,
      children: [
        {
          path: ":id",
          name: "itemDetails",
          component: ItemDetailsView,
        },
        {
          path: "edit/:id",
          name: "editItem",
          component: EditItemView,
        },
      ],
    },
    {
      path: "/rentals",
      name: "myRentals",
      component: MyRentalsView,
    },
    {
      path: "/history",
      name: "rentalHistory",
      component: RentalHistoryView,
    },

    {
      path: "/kundvagn",
      name: "kundvagn",
      component: Cartview,
    },
    {
      path: "/register",
      name: "registerView",
      component: RegisterView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: NotFoundView,
    },
  ],
});

export default router;
