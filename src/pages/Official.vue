<template>
  <div class="official">
    <pcl-line></pcl-line>
    <navigation></navigation>
    <div class="contentBody">
      <div class="leftBox">
        <topiclist></topiclist>
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
import navigation from "../components/navigation.vue";
import rightlist from "../components/rightlist.vue";
import topiclist from "../components/topiclist.vue";
import pclLine from "@/components/pcl-line.vue";
export default {
  name: "OFFICIAL",
  components: {
    navigation,
    rightlist,
    topiclist,
    pclLine,
  },
};
</script>

<style>
</style>