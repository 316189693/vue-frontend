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

  navbarTab: number = this.$store.getters.main;

  currentPage: string = 'home';



  collapse() {
    this.collapsed = !this.collapsed;
  }

  onClickLogin() {
    this.$store.commit("OPEN_DIALOG", "LoginModal", {});
  }

  logout() {
    this.$store.dispatch("logout");
  }
  // ...mapActions({
  //   getAccount: 'getAccount'
  // })

  mounted() {

    setTimeout(() => {
      this.changeTab();
    }, 500);


    window.addEventListener('hashchange', () => {
      this.changeTab();
    });
  }


  changeTab() {
    let router = this.$router as any;

    this.currentPage = router.app._route.name; // cast it to any type to avoid typescript error on _route
  }
}