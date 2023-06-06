<template>
  <div class="home">
    <pcl-line></pcl-line>
    <navigation v-if="flush"></navigation>
    <div class="contentBody">
      <div class="leftBox">
        <!-- 轮播图 -->
        <el-carousel indicator-position="outside" height="350px">
          <el-carousel-item v-for="item in phList" class="phitem">
            <a :href="'#/TopicDetail/'+item.id"><img :src="item.coverImage" style="width:650px"/></a>
          </el-carousel-item>
        </el-carousel>
        <!-- 左边内容区域 -->
        <topTopic></topTopic>
        <!-- <topiclist></topiclist> -->
      </div>

      <div class="rightBox">
        <!-- 右边内容区域 -->
        <rightlist></rightlist>

        <!-- <h1>主页</h1> -->
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
import navigation from "../components/navigation.vue";
import topiclist from "../components/topiclist.vue";
import rightlist from "../components/rightlist.vue";
import pclLine from "@/components/pcl-line.vue";
import topTopic from "@/components/topTopic.vue";
import topicApi from "@/api/topic";
export default {
  name: "HOME",
  data() {
    return {
      phList: [
        require("../assets/rotograph/1.jpg"),
        require("../assets/rotograph/2.jpg"),
        require("../assets/rotograph/3.jpg"),
        require("../assets/rotograph/4.jpg"),
        require("../assets/rotograph/5.jpg"),
      ],
      flush: true,
    };
  },
  components: {
    navigation,
    topiclist,
    rightlist,
    pclLine,
    topTopic,
  },
  methods: {
    getCoverImg(curPage) {
      topicApi.getCoverImg().then((response) => {
        this.phList = response;
      });
    },
  },
  created() {
    this.getCoverImg();
  },
  watch: {
    $route: function (to, from) {
      if (
        from.path == "/UserInfo" ||
        from.path == "/Login" ||
        from.path == "/CreateTopic"
      ) {
        location.reload();
      }
    },
  },
};
</script>

<style>
.el-carousel__item img {
  height: 100%;
}
.el-carousel__mask {
  background-color: black;
  opacity: 0.55;
  border-radius: 20px;
  /* height: 100%; */
}
.phitem {
  background-color: #606063;
  text-align: center;
  /* border: 1px solid rgba(102, 102, 103, 0.174); */
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.322); */
  /* border-radius: 10px; */
}

</style>