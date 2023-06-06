<template>
  <div class="rightlist">
    <officallook></officallook>
    <el-divider></el-divider>
    <advertisement></advertisement>
    <el-divider></el-divider>
    <hotlist></hotlist>
  </div>
</template>

<script>
import advertisement from "./rightComponents/advertisement.vue";
import hotlist from "./rightComponents/hotlist.vue";
import officallook from "./rightComponents/officiallook.vue";
export default {
  data() {
    return {
      count: 3,
    };
  },
  components: {
    advertisement,
    hotlist,
    officallook,
  },
};
</script>

<style>
/* .officallook {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(203, 202, 202);
} */

.officallook a {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  border-bottom: 1px solid #68686848;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 160px;
  margin: 0;
}
.advertisementimg {
  background-color: rgba(0, 0, 255, 0.329);
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205); */
}
/* .hotlist {
  padding: 10px 0px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205);
  border: 1px solid rgb(203, 202, 202);
} */

/* .hotlist a {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  border-bottom: 1px solid #68686848;
} */


</style>