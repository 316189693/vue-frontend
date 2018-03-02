import Vue from "vue";
import { Component, Prop, Provide } from "vue-property-decorator";
import * as Logger from "js-logger";
import template from "./navbar.vue";
import store from "../../store";

@Component({
  mixins: [template],
  store
})
export default class NavBar extends Vue {

  collapsed: boolean = true;

  me: "me";
  isLoggedIn: "loggedIn";

  @Provide()
  navbarTab:number = this.$store.getters.main;
  
 
 
  collapse () {
    this.collapsed = !this.collapsed;
  }

  onClickLogin () {
    this.$store.commit("OPEN_DIALOG", "LoginModal", {});
  }
   
  logout(){
    this.$store.dispatch("logout");
  }
  // ...mapActions({
  //   getAccount: 'getAccount'
  // })

  created () {
    // this.isLoggedIn && this.getAccount({id: 'me'})
    // .catch(() => {});
  }

  changeTab(){

  }
}