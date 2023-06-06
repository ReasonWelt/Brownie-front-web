<template>
  <div class="topiclist">
    <el-skeleton :rows="6" animated :loading="loading" class="ske">
      <div v-for="topic in topicList" class="item">
        <a :href="'#/TopicDetail/'+topic.id">
          <!-- <div class="topiclisbox"> -->
          <div class="topicbody">
            <div class="topicbody-header">
              <h3>{{topic.title}} </h3>
              <div class="tag">
                <span v-if="topic.createUserId==0" class="tagName">官方</span>
                <span v-if="topic.tagName" class="tagName">{{topic.tagName}} </span>
                <span v-if="topic.isVideo" class="el-icon-video-camera tagName">视频</span>
              </div>
            </div>
            <div class="topicbody-body">
              <span>{{topic.synopsis}} </span>
              <!-- <el-image style="width: 120px; height: 120px;margin: 8px; border-radius: 10px;" :src="topic.coverImage" fit="cover"></el-image> -->
              <div class="topicimg">
                <img :src="topic.coverImage" alt="" />
              </div>
            </div>
            <div class="topicbody-footer"></div>
          </div>
          <div class="topicfooter">
            <div class="topicfooter-i">
              <i class="el-icon-chat-line-round"></i><span>{{topic.comments}}</span>
              <i class="el-icon-view"></i><span>{{ topic.numberOfViews }} </span>
              <i class="el-icon-lollipop"></i><span>{{ topic.numberOfLikes }}</span>
            </div>

            <div class="author">
              <span id="authorTime">{{topic.createTime.substring(0,16)}}</span>
              <div class="avatar">
                <img :src="topic.avatar==''?'https://browne.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg':topic.avatar " alt="" />
              </div>
              <span>{{ topic.nickName }}</span>
            </div>
          </div>
          <!-- </div> -->
        </a>
      </div>
    </el-skeleton>
    <el-pagination background layout="total,prev,pager,next,jumper" :page-size="6" :total="this.total" @current-change="CurrentChange">
    </el-pagination>
    <el-backtop :visibility-height="200" :bottom="120">
      <div style="{
        text-align: center;
        line-height: 40px;
      }">
        <i class="el-icon-arrow-up"></i>
      </div>
    </el-backtop>

  </div>
</template>

<script>
// import { throttle } from "../utils/util";
import TopicApi from "@/api/topic";
export default {
  data() {
    return {
      topicList: [],
      total: 0,
      loading: true,
    };
  },
  props: ["fuzzyData"],
  methods: {
    CurrentChange(curPage) {
      if (this.$route.path == "/Official") {
        this.getOfficList(curPage);
      } else if (this.$route.path == "/Community") {
        this.fuzzyQuery(curPage);
      }
    },
    getOfficList(curPage) {
      TopicApi.getofficallist(curPage).then((response) => {
        this.topicList = response.data.hostList;
        this.total = response.data.hostTotal;
        this.loading = false;
      });
    },
    fuzzyQuery(curPage) {
      this.fuzzyData.current = curPage;
      TopicApi.fuzzyQueryTopic(this.fuzzyData).then((response) => {
        this.topicList = response.data.fuzzyList;
        this.total = response.data.fuzzyTotal;
        this.loading = false;
      });
    },
  },
  created() {
    this.CurrentChange(1);
    this.loading = true;
  },
  destroyed() {},
  watch: {},
};
</script>

<style>
.ske{
  border-radius: 5px;
  margin-top: 3px;
  border: 1px solid rgb(203, 202, 202);
  background-color: #fff;
}

.tagName {
  background: rgb(60, 126, 250);
  margin-left: 10px;
  padding: 4px 8px;
  line-height: 15px;
  font-size: 10px;
  border-radius: 5px;
  color: #fff;
}
#authorTime {
  color: #999;
  font-size: 13px;
  line-height: 30px;
  margin-right: 10px;
}
.item{
  max-height: 280px;
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.16);
}

.item:hover{
  background-color: #f3f2f2;
}

.item a {
  display: block;
  height: 100%;
  padding: 15px 20px;
}

.topicbody {
  height: 75%;
  padding: 0 10px;
  /* background-color: azure; */
}

.topicfooter {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  height: 15%;
  /* background-color: bisque; */
}

.topicfooter span {
  font-size: 15px;
  margin: 0 5px;
}

.topicfooter i {
  margin-top: 5px;
  margin-left: 5px;
}
.topicfooter {
  height: 10%;
  /* background-color: rgb(255, 161, 161); */
}
.author {
  display: flex;
}

.author span{
  color: black;
}
.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
}

.avatar img {
  height: 100%;
}
.topicbody-header {
  display: flex;
  justify-content: space-between;
}

.topicbody-header h3,
.topicbody-header i {
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  color: #333;
  transition: 0.5s ease 0s;
}

.topicbody-header h3 {
  /* flex: 0 0 74%; */
}

.topicbody-header i {
  font-weight: 200;
  font-size: 20px;
}

.topicbody-body {
  margin-top: 8px;
}

.topicbody-body span {
  display: block;
  overflow: hidden;
  line-height: 18px;
  margin-top: 8px;
  color: #999;
  font-size: 15px;
  width: 600px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.topicimg {
  margin: 5px;
  width: 120px;
  height: 120px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.topicimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topicbody-footer {
  margin-top: 5px;
}

.is-active button {
  background-color: rgb(0, 0, 255);
}

.lm {
  display: block;
  width: 100%;
  height: 40px;
  /* border: 1px solid red; */
  text-align: center;
  color: #999;
  margin-top: 50px;
}


.topicfooter-i{
  color: black;
  transition: 0.5s ease 0s;
}

.topicfooter-i i {
  margin: 0px 2px 0px 15px;
  font-size: 15px;
}


.item a:hover h3
{
  color: rgb(114, 163, 255);
}

.el-pagination {
  text-align: center;
  margin-top: 20px;
}
</style>