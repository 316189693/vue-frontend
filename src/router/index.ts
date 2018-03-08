import Vue from "vue";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import Home from "../layouts/home";
import GetQuote from "../layouts/getQuote";
import SchedulePickup from "../layouts/schedulePickup";
import SchedulePickupShipment from "../layouts/schedulePickupShipment";
import SchedulePickupReview from "../layouts/schedulePickupReview";
import Demo from "../layouts/demo";
import Track from "../layouts/track";
import NotFound from "../layouts/not-found";
import Login from "../layouts/login";
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/getQuote",
      name: "getQuote",
      component: GetQuote
    },
    {
      path: "/schedulePickup",
      name: "schedulePickup",
      component: SchedulePickup
    },
    {
      path: "/schedulePickup/Shipment",
      name: "schedulePickupShipment",
      component: SchedulePickupShipment
    },
    {
      path: "/schedulePickup/Review",
      name: "schedulePickupReview",
      component: SchedulePickupReview
    },
    {
      path: "/demo",
      name: "demo",
      component: Demo
    },
    {
      path: "/track",
      name: "track",
      component: Track
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  mode: "hash",
  linkActiveClass: "active",
  //scroll to top
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});