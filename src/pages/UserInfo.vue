<template>
  <div class="userinfobox">
    <pcl-line></pcl-line>
    <navigation></navigation>
    <div class="contentBody">
      <div class="leftBox userLeft">
        <div class="user-info-content">
          <el-divider></el-divider>
          <router-view></router-view>
          <el-divider></el-divider>
        </div>
      </div>

      <div class="rightBox">
        <div class="authorbox">
          <div class="authoravatar"><img :src="userinfo.avatar==''?'https://browne.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg':userinfo.avatar " alt="" /></div>
          <div class="authorname">
            <h2>{{ userinfo.name }}</h2>
          </div>
        </div>
        <div class="user-controller-router-box">
          <div class="useritembox">
            <a href="#/UserInfo" class="userinfo-controller controller-item" :class="ifActive === 1 ? 'user-active' : ''">
              <i class="el-icon-user-solid"></i>个人资料
            </a>
          </div>
          <div class="useritembox">
            <a href="#/UserInfo/EditUserInfo" class="edituser-controller controller-item" :class="ifActive === 2 ? 'user-active' : ''">
              <i class="el-icon-s-tools"></i>资料修改
            </a>
          </div>
          <div class="useritembox">
            <a href="#/UserInfo/UserTopic" class="usertopic-controller controller-item" :class="ifActive === 3 ? 'user-active' : ''">
              <i class="el-icon-toilet-paper"></i>帖子管理
            </a>
          </div>
          <div class="useritembox">
            <a href="#/Im" class="usertopic-controller controller-item">
              <i class="el-icon-s-comment"></i>聊天室
            </a>
          </div>
          <div class="useritembox">
            <div href="#/UserInfo/UserTopic" class="usertopic-controller controller-item loutOut" @click="removeToken()">
              <i class="el-icon-switch-button"></i>账号登出
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Footer">
      <div class="Footer-content">
        <span>
          Welt © 2023
        </span>
        <span>
          违法与不良信息举报：198466453@qq.com
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/navigation.vue";
import userApi from "@/api/user";
import pclLine from "@/components/pcl-line.vue";
export default {
  data() {
    return {
      userinfo: {},
      ifActive: 0,
    };
  },
  components: {
    navigation,
    pclLine,
  },
  methods: {
    changeTag() {
      this.userinfo = JSON.parse(localStorage.getItem("userInfo"));
      if (this.$route.path == "/UserInfo") {
        this.ifActive = 1;
      } else if (this.$route.path == "/UserInfo/EditUserInfo") {
        this.ifActive = 2;
      } else if (this.$route.path == "/UserInfo/UserTopic") {
        this.ifActive = 3;
      }
    },
    removeToken() {
      userApi
        .userLogout(JSON.parse(localStorage.getItem("userInfo")).account)
        .then((response) => {
          localStorage.removeItem("token");
          localStorage.removeItem("userInfo");
          this.$router.push("/");
        });
      // localStorage.removeItem("token");
      // localStorage.removeItem("userInfo");
      // this.$router.push("/");
    },
    routeChange() {
      this.changeTag();
    },
  },
  created() {
    this.routeChange();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange",
  },
};
</script>

<style>
.userLeft {
  width: 800px;
}
.user-info-content {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205);
  min-height: 800px;
  border-radius: 10px;
  padding: 10px 30px;
  background-color: #fff;
}
.authorbox {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205);
  text-align: center;
  background-color: #fff;
}

.authoravatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin: 10px auto;
}

.authoravatar img {
  height: 100%;
  /* transform: translateX(-10%); */
}

.authorname {
  margin: 30px 0;
}

.user-controller-router-box {
  margin-top: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205);
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
}

.useritembox {
  height: 50px;
}
.useritembox i {
  margin-right: 10px;
}
.controller-item {
  display: block;
  height: 47px;
  line-height: 50px;
  font-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.434);
  color: #717171;
  transition: 0.1s ease 0s;
  /* cursor: pointer; */
}

.controller-item:hover,
.user-active {
  border-bottom: 3px solid rgb(100, 154, 254);
  color: rgb(100, 154, 254);
  font-weight: bolder;
}
.loutOut {
  cursor: pointer;
}
</style>