<template>
  <el-skeleton animated :loading="loading" class="ssk">
    <div class="hotlist">
      <h3>热点资讯</h3>
      <a :href="'#/TopicDetail/'+item.id" v-for="item in hotlist">
        <div class="hotlist-content">
          <el-image style="width: 50px; height: 50px" :src="item.coverImage" fit="cover"></el-image><span>{{item.title}}</span>
        </div>
      </a>
    </div>
  </el-skeleton>
</template>

<script>
import TopicApi from "../../api/topic";
export default {
  data() {
    return {
      hotlist: [],
      loading: true,
    };
  },
  created() {
    TopicApi.getHotTopic().then((response) => {
      this.hotlist = response.data.hotList;
      this.loading = false;
    });
  },
};
</script>

<style scoped>
.ssk {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid rgb(203, 202, 202);
}


.hotlist h3{
  margin: 10px;
}

.hotlist a {
  display: block;
  font-size: 13px;
  border-bottom: 1px solid #68686848;
}

.hotlist a:hover{
  background-color: #f3f2f2;
}
.hotlist-content {
  color: #000;
  padding: 10px;
  display: flex;
  transition: 0.1s ease 0s;
}


.hotlist-content span {
  width: 190px;
  margin-left: 10px;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hotlist-content:hover {
  color: rgb(100, 154, 254);
  font-weight: bold;
}
</style>