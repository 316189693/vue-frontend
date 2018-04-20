import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import template from "./navbar.vue";

@Component({
  mixins: [template]
})
export default class NavBar extends Vue {
  collapsed: boolean = true;

  me: "me";
  isLoggedIn: "loggedIn";

  menuItems: any = JSON.parse(
    localStorage.getItem("ParentMenuOrder") || '{ "items":[] }'
  );
  subMenuItems: any = JSON.parse(
    localStorage.getItem("UserMenu") || '{ "items":[] }'
  );

  navbarTab: number = this.$store.getters.main;
  currentPage: string = "home";

  collapse() {
    this.collapsed = !this.collapsed;
  }

  onClickLogin() {
    this.$store.commit("OPEN_DIALOG", "LoginModal", {});
  }

  logout() {
    this.$store.dispatch("logout");
  }

  openPDF() {
    let host = window.location.hostname;

    if (host == "localhost") {
      host = "https://clientdev.com";
    } else {
      host = "";
    }
    window.open(host + "/tms_delivery_estimation_sheet.php");
  }

  searchLink(links: any) {
    let link_list = links.split(",");
    return link_list.indexOf(this.currentPage) >= 0;
  }

  mounted() {
    setTimeout(() => {
      this.changeTab();
    }, 1000);

    window.addEventListener("hashchange", () => {
      this.changeTab();
    });
  }

  changeTab() {
    this.currentPage = this.$route.name as string;
  }
}
