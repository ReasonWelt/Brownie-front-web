<template>
  <el-skeleton animated :loading="loading" class="ssk">
    <div class="officallook">
      <h3>官方公告</h3>
      <a :href="'#/TopicDetail/'+item.id" v-for="(item,key) in officiallook">
        <div class="officiallook-content">
          <span>{{key+1}}.</span><span>{{item.title}}</span>
        </div>
      </a>
    </div>
  </el-skeleton>
</template>

<script>
import TopicApi from "@/api/topic";
export default {
  data() {
    return {
      officiallook: "",
      loading:true
    };
  },
  created() {
    TopicApi.getofficallook().then((response) => {
      this.officiallook = response.data.hostList;
      this.loading = false
    });
  },
};
</script>

<style scoped>

.ssk{
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgb(203, 202, 202);
}


.officallook a {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  border-bottom: 1px solid #68686848;
}

.officiallook-content {
  color: #000;
  padding: 5px;
  transition: 0.3s ease 0s;
}

.officiallook-content span:nth-child(1) {
  font-size: 17px;
}

.officiallook-content span:nth-child(2) {
  font-size: 14px;
  margin-left: 10px;
}

.officiallook-content:hover {
  color: rgb(100, 154, 254);
  font-weight: bold;
}
</style>