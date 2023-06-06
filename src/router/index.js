// import { resolve } from "core-js/fn/promise";
import Vue from "vue";
import Router from "vue-router";
// import { component } from "vue/types/umd";
// import hello from "../components/HelloWorld.vue"
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/Im",
      name: "Im",
      component: (resolve) => require(["../pages/Im.vue"], resolve),
    },
    {
      path: "/",
      // component:() => import('../pages/Home.vue')
      component: (resolve) => require(["../pages/Home.vue"], resolve),
    },
    {
      path: "/Home",
      // component:() => import('../pages/Home.vue')
      component: (resolve) => require(["../pages/Home.vue"], resolve),
    },
    {
      path: "/Login",
      component: (resolve) => require(["../pages/Login.vue"], resolve),
    },
    {
      path: "/Resources",
      component: (resolve) => require(["../pages/Resources.vue"], resolve),
    },
    {
      path: "/Community",
      // component:() => import('../pages/Community.vue')
      component: (resolve) => require(["../pages/Community.vue"], resolve),
    },
    {
      path: "/Official",
      // component:() => import('../pages/Official.vue')
      component: (resolve) => require(["../pages/Official.vue"], resolve),
    },
    {
      path: "/Wiki",
      // component:() => import('../pages/Wiki.vue')
      component: (resolve) => require(["../pages/Wiki.vue"], resolve),
    },
    {
      path: "/TopicDetail/:tid",
      component: (resolve) => require(["../pages/DetailTopic.vue"], resolve),
    },
    {
      path: "/CreateTopic",
      component: (resolve) => require(["../pages/CreateTopic.vue"], resolve),
    },
    {
      path: "/EditTopic/:tid",
      component: (resolve) => require(["../pages/EditTopic.vue"], resolve),
    },
    {
      path: "/UserInfo",
      component: (resolve) => require(["../pages/UserInfo.vue"], resolve),
      children: [
        {
          path: "",
          component: (resolve) =>
            require(["../components/userComponents/userinfo.vue"], resolve),
        },
        {
          path: "UserTopic",
          component: (resolve) =>
            require(["../components/userComponents/usertopic.vue"], resolve),
        },
        {
          path: "EditUserInfo",
          component: (resolve) =>
            require(["../components/userComponents/edituserinfo.vue"], resolve),
        },
      ],
    },
  ],
});

export default router;
