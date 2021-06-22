import Vue from "vue";
import Router from "vue-router";
import CommentPage from "@/views/Comment";
import EditPage from "@/views/Edit";

Vue.use(Router);

const routes = [
  { path: "/", redirect: "/edit" },
  { path: "/comment", component: CommentPage },
  { path: "/edit", component: EditPage },
];

const router = new Router({
  routes, // short for `routes: routes`
});

export default router;
