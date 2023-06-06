<template>
  <div class="friendLink">
    <pcl-line></pcl-line>
    <navigation></navigation>
    <div class="contentBody">
      <div class="leftBox">
        <div class="rescontent">
          <div class="gameRes">
            <div class="title">
              <h2>学习</h2>
            </div>
            <div class="chrRes">
              <a :href="item.url" v-for="item in onelist" target="_blank">
                <h3>{{ item.title }}</h3>
                <div class="tagimg">
                  <el-image style="width: 60px; height: 60px" :src="item.logo" fit="cover"></el-image>
                </div>
              </a>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="stadyRes">
            <div class="title">
              <h2>游戏</h2>
            </div>
            <div class="chrRes">
              <a :href="item.url" v-for="item in twolist" target="_blank">
                <h3>{{ item.title }}</h3>
                <div class="tagimg">
                  <el-image style="width: 60px; height: 60px" :src="item.logo" fit="cover"></el-image>
                </div>
              </a>
            </div>
          </div>
          <el-divider></el-divider>
          <div class="videoRes">
            <div class="title">
              <h2>视频</h2>
            </div>
            <div class="chrRes">
              <a :href="item.url" v-for="item in threelist" target="_blank">
                <h3>{{ item.title }}</h3>
                <div class="tagimg">
                  <el-image style="width: 60px; height: 60px" :src="item.logo" fit="cover"></el-image>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <rightlist></rightlist>
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
import rightlist from "@/components/rightlist.vue";
import navigation from "../components/navigation.vue";
import resourceApi from "@/api/resource";
import pclLine from "@/components/pcl-line.vue";

export default {
  name: "RESOURSES",
  components: {
    navigation,
    rightlist,
    pclLine,
  },
  data() {
    return {
      gameResList: ["1", "2", "3", "4", "5", "6"],
      onelist: [],
      twolist: [],
      threelist: [],
    };
  },
  methods: {
    getAllResorce() {
      resourceApi.getResourceList().then((response) => {
        this.onelist = response.data.one;
        this.twolist = response.data.two;
        this.threelist = response.data.three;
      });
    },
    routeChange() {
      this.getAllResorce();
    },
  },
  created() {
    this.routeChange();
  },
  watch: {
    $route() {
      this.routeChange();
    },
  },
};
</script>

<style scoped>
.rescontent {
  /* background-color: aqua; */
}

.chrRes {
  /* background-color: rgb(234, 0, 255); */
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.chrRes a {
  display: inline-block;
  background-color: rgb(255, 255, 255);
  width: 220px;
  height: 110px;
  margin: 10px 0 0 10px;
  box-sizing: border-box;
  padding: 7px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.215);
  border-radius: 10px;
}

.chrRes a h3 {
  margin-bottom: 7px;
}

/* .tagimg {
  width: 60px;
  overflow: hidden;
  height: 60px;
  margin-left: 30px;
  border-radius: 10px;
}

.chrRes a img {
  height: 100%;
  transform: translateX(-20%);
} */
</style>