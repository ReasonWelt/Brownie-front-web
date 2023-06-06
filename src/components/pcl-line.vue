<template>
  <div class="pc-line">
    <div class="list">
      <div class="pcl-item">
        <el-popover placement="left-start" width="150px" trigger="hover">
          <img id="shoukuan" src="https://browne.oss-cn-shenzhen.aliyuncs.com/web-ph/shoukuan.jpg" class="ico">
          <img slot="reference" src="https://browne.oss-cn-shenzhen.aliyuncs.com/web-ph/wechat.png" class="ico">
        </el-popover>
      </div>
      <div class="pcl-item" onclick="window.open('https://s.weibo.com/weibo?q=%23%E4%B8%8B%E5%A4%B4%E7%94%B7')"><img src="https://browne.oss-cn-shenzhen.aliyuncs.com/web-ph/webo.png" class="ico"> </div>
      <div class="pcl-item" onclick="window.open('https://space.bilibili.com/1184701784?spm_id_from=333.1007.0.0')"><img src="https://browne.oss-cn-shenzhen.aliyuncs.com/web-ph/bilibili.png" class="ico"> </div>
      <div class="pcl-item"><img src="https://browne.oss-cn-shenzhen.aliyuncs.com/web-ph/QQ.png" class="ico"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>

#shoukuan{
    width: 150px;
}

.pc-line {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 390px;
  width: 100px;
  position: fixed;
  margin: auto 0;
  left: 0;
  top: 29vh;
}

.pcl-item {
  margin: 10px 0;
  cursor: pointer;
}

.pcl-item img {
  width: 30px;
  height: 30px;
}

.list::before {
  content: "";
  position: absolute;
  width: 0.1rem;
  height: 100%;
  background: #23232e5a;
  z-index: -1;
  top: 300px;
}

.list::after {
  content: "";
  position: absolute;
  width: 0.1rem;
  height: 100%;
  background: #23232e5a;
  z-index: -1;
  bottom: 300px;
}
</style>
