import Vue from "vue";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import Home from "../layouts/home";
import GetQuote from "../layouts/getQuote";
import SavedQuote from "../layouts/savedQuote";
import SchedulePickup from "../layouts/schedulePickup";
import SchedulePickupShipment from "../layouts/schedulePickupShipment";
import SchedulePickupReview from "../layouts/schedulePickupReview";
import Demo from "../layouts/demo";
import Track from "../layouts/track";
import NotFound from "../layouts/not-found";
import Login from "../layouts/login";
import OrderReview from "../layouts/orderReview";

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
      name: "GetQuote",
      component: GetQuote
    },
    {
      path: "/savedQuote",
      name: "SavedQuote",
      component: SavedQuote
    },
    {
      path: "/schedulePickup",
      name: "SchedulePickup",
      component: SchedulePickup
    },
    {
      path: "/schedulePickup/Shipment",
      name: "SchedulePickupShipment",
      component: SchedulePickupShipment
    },
    {
      path: "/schedulePickup/Review",
      name: "SchedulePickupReview",
      component: SchedulePickupReview
    },
    {
      path: "/demo",
      name: "Demo",
      component: Demo
    },
    {
      path: "/track",
      name: "Track",
      component: Track
    },
    {
      path: "/orderReview",
      name: "orderReview",
      component: OrderReview
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  mode: "hash",
  linkActiveClass: "active",
  // scroll to top
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});