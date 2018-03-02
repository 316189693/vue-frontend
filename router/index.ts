import Vue from "vue";
import VueRouter from "vue-router";
import * as Logger from "js-logger";

import Home from "../layouts/home";
import GetQuote from "../layouts/getQuote";
import SchedulePickup from "../layouts/schedulePickup";
import SchedulePickupShipment from "../layouts/schedulePickupShipment";
import Demo from "../layouts/demo";
import NotFound from "../layouts/not-found";
import Login from "../layouts/login";
Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: " ",
      component: Login
    },
    {
      path: "/home",
      name: " ",
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
      path: "/demo",
      name: "demo",
      component: Demo
    },
    {
      path: "*",
      component: NotFound
    }
  ],
  mode: "hash",
  linkActiveClass: "active"
});