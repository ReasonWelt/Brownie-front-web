<template>
  <div class="navBack">
    <nav>
      <img :src="require('../assets/logo.png')" alt="" id="logo">
      <h1 id="title">Brownie</h1>
      <div class="mobile-menu">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <ul class="nav-list">
        <li>
          <a href="#/Home" class="taga" :class="ifActive === 1 ? 'tagActive' : ''">首页</a>
        </li>
        <li>
          <a href="#/Community" class="taga" :class="ifActive === 2 ? 'tagActive' : ''">社区</a>
        </li>
        <li>
          <a href="#/Official" class="taga" :class="ifActive === 3 ? 'tagActive' : ''">官方</a>
        </li>
        <li>
          <a href="#/Resources" class="taga" :class="ifActive === 4 ? 'tagActive' : ''">资源</a>
        </li>
        <!-- <li>
          <a href="#/Wiki" class="taga" :class="ifActive === 5 ? 'tagActive' : ''">wiki</a>
        </li> -->
      </ul>
      <el-button v-if="this.token!=''" icon="el-icon-edit" circle size="small" class="editbutton" @click="goCreatePage()"></el-button>

      <div @click="goUserInfo()">
        <el-avatar :src="this.avatar==''? this.Avatar:this.avatar"></el-avatar>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data() {
    return {
      ifActive: 0,
      avatar: "",
      Avatar: "https://browne.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg",
      token: "",
    };
  },
  // props: ['active'],
  created() {
    if (localStorage.getItem("token")) {
      this.avatar = JSON.parse(localStorage.getItem("userInfo")).avatar;
      // console.log(JSON.parse(localStorage.getItem("userInfo")));
      this.token = localStorage.getItem("token");
    }
  },
  mounted() {
    this.mobileMenu = document.querySelector(".mobile-menu");
    this.navList = document.querySelector(".nav-list");
    this.navLinks = document.querySelectorAll(".nav-list li");
    this.activeClass = "active";
    this.handleClick = this.handleClick.bind(this);
    this.init();
    this.changeTag();
  },
  methods: {
    animateLinks() {
      this.navLinks.forEach((link, index) => {
        link.style.animation
          ? (link.style.animation = "")
          : (link.style.animation = `navLinkFade 0.5s ease forwards ${
              index / 7 + 0.3
            }s`);
      });
    },
    handleClick() {
      this.navList.classList.toggle(this.activeClass);
      this.mobileMenu.classList.toggle(this.activeClass);
      this.animateLinks();
    },
    addClcikEvent() {
      this.mobileMenu.addEventListener("click", this.handleClick);
    },
    init() {
      if (this.mobileMenu) {
        this.addClcikEvent();
      }
      return this;
    },
    changeTag() {
      if (this.$route.path == "/Home" || this.$route.path == "/") {
        this.ifActive = 1;
      } else if (this.$route.path == "/Community") {
        this.ifActive = 2;
      } else if (this.$route.path == "/Official") {
        this.ifActive = 3;
      } else if (this.$route.path == "/Resources") {
        this.ifActive = 4;
      } else if (this.$route.path == "/Wiki") {
        this.ifActive = 5;
      }
    },
    goCreatePage() {
      this.$router.push("/CreateTopic");
    },
    goUserInfo() {
      var token = localStorage.getItem("token");
      if (token) {
        this.$router.push("/UserInfo");
      } else {
        this.$router.push("/Login");
      }
    },
  },
};
</script>

<style>

#logo{
  width: 70px;
}

#title {
  flex: 0 0 55%;
  color: #fff;
}

.taga {
  color: #bbbbbb;
  text-decoration: none;
  transition: 0.3s;
}
.taga:hover,
.tagActive {
  color: #fff;
  text-shadow: 0px 0px 10px #fff;
  /* opacity: 0.7; */
}

.logo {
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 4px;
}

.navBack {
  background: #23232e;
  height: 60px;
}

/* 
这个是之前写的原版，注释掉，应为直接分移动端和pc端开发，暂时不需要这类相应组件，还有上面的navback
 nav {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-family: "system-ui", -apple-system, "Helvetica", Arial, sans-serif;
  background: #23232e;
  height: 60px; 
} */
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "system-ui", -apple-system, "Helvetica", Arial, sans-serif;
  background: #23232e;
  height: 60px;
  width: 1200px;
  margin: 0 auto;
}

/* main { */
/* background: url("./bg.jpg") no-repeat center center; */
/* background-size: cover;
  height: 90vh; */
/* } */

.nav-list {
  /* 黑点消失 */
  list-style: none;
  display: flex;
}

.nav-list li {
  letter-spacing: 3px;
  margin-left: 32px;
}

.mobile-menu {
  display: none;
  cursor: pointer;
}

.mobile-menu div {
  width: 32px;
  height: 2px;
  background: #fff;
  margin: 8px;
  transition: 0.3s;
}

/* 开始响应式 */
/* @media (max-width: 999px) {
  body {
    overflow-x: hidden;
  }
  .nav-list {
    position: absolute;
    top: 8vh;
    right: 0;
    width: 30vw;
    height: 92vh;
    background: #23232e;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    transform: translateX(100%);
    transition: transform 0.3s ease-in;
  }

  .nav-list li {
    margin-left: 0;
    opacity: 0;
  }

  .mobile-menu {
    display: block;
  }

  .nav-list.active {
    transform: translateX(0);
  }

  @keyframes navLinkFade {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
} */

.mobile-menu.active .line1 {
  transform: rotate(-45deg) translate(-8px, 8px);
}
.mobile-menu.active .line2 {
  opacity: 0;
}
.mobile-menu.active .line3 {
  transform: rotate(45deg) translate(-5px, -7px);
}
.el-avatar {
  cursor: pointer;
}
</style>