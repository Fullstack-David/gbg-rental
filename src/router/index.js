import { createRouter, createWebHistory } from "vue-router";
import ItemsView from "@/views/ItemsView.vue";
import ItemDetailsView from "@/views/ItemDetailsView.vue";
import MyItemsView from "@/views/owner/MyItemsView.vue";
import RentalHistoryView from "@/views/renter/RentalHistoryView.vue";
import CreateItemView from "@/views/owner/CreateItemView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import RegisterView from "@/views/auth/RegisterView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing-page",
      component: ItemsView,
      children: [
        {
          path: ":id",
          name: "itemDetails",
          component: ItemDetailsView,
        },
        {
          path: "/create-item",
          name: "createItem",
          component: CreateItemView,
        },
      ],
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
      path: "/history",
      name: "rentalHistory",
      component: RentalHistoryView,
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
