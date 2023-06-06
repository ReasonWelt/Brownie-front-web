<template>
  <el-carousel
    height="175px"
    indicator-position="none"
  >
    <el-carousel-item v-for="item in 4" :key="item" class="advertisementimg">
      <h3>广告招租{{ item }}号位置</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 175px;
  margin: 0;
}
.advertisementimg {
  background-color: rgba(0, 0, 255, 0.329);
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.205); */
}
</style>