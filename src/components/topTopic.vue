<template>
  <div class="topTopicBox">
    <el-divider content-position="left">置顶热门</el-divider>
    <el-skeleton animated :loading="loading">
      <div v-for="(topic,index) in topicList" :key="index" class="Topitem" :class="index===topicList.length-1?'Topitem-Last':''">
        <a :href="'#/TopicDetail/'+topic.id">
          <!-- <div class="topiclisbox"> -->
          <div class="topTopicFooter">
            <div class="toptopicimg">
              <img :src="topic.coverImage" alt="" />
            </div>
          </div>
          <div class="topTopicBody">
            <div class="topTopicBody-header">
              <h3>{{topic.title}}
                <span>{{topic.tagName}} </span>
                <span v-if="topic.isTop" class="el-icon-message-solid">置顶</span>
              </h3>

              <!-- <i v-if="topic.isVideo" class="el-icon-video-camera"></i> -->
            </div>
            <div class="topTopicBody-body">
              <span>{{topic.synopsis}} </span>
            </div>
            <div class="topTopicBody-footer">
              <div class="topTopicFooter-i">
                <i class="el-icon-chat-line-round"></i><span>{{topic.comments}}</span>
                <i class="el-icon-view"></i><span>{{ topic.numberOfViews }} </span>
                <i class="el-icon-lollipop"></i><span>{{ topic.numberOfLikes }}</span>
                <span id="authorTime">{{topic.createTime.substring(0,16)}}</span>
              </div>
            </div>
          </div>

          <!-- </div> -->
        </a>
      </div>
    </el-skeleton>
    <el-pagination background layout="total,prev,pager,next,jumper" :page-size="6" :total="this.total" @current-change="CurrentChange">
    </el-pagination>

  </div>
</template>

<script>
import topicApi from "@/api/topic";
export default {
  data() {
    return {
      topicList: [],
      total: 0,
      loading: true,
    };
  },
  methods: {
    CurrentChange(curPage) {
      this.getAllTopic(curPage);
    },
    getAllTopic(curPage) {
      topicApi.getTopicList(curPage).then((response) => {
        this.topicList = response.data.list;
        this.total = response.data.total;
        this.loading = false;
      });
    },
  },
  created() {
    this.loading = true;
    this.getAllTopic(1);
  },
};
</script>

<style scoped>
.topTopicFooter-i {
  color: black;
  transition: 0.5s ease 0s;
}
.topTopicFooter-i span {
  margin: 0 5px;
}
.topTopicBox {
  background-color: #fff;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.215); */
  border: 1px solid rgb(203, 202, 202);
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
.Topitem {
  padding: 20px;
  max-height: 280px;
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.189);
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.215);
  border-radius: 10px;
  margin-top: 3px; */
}

.Topitem:hover{
  background-color: #f3f2f2;
}

.Topitem a {
  display: flex;
  /* flex-direction: row; */
  /* justify-content: space-between; */
  box-sizing: border-box;
}

.topTopicBody-body {
  flex: 0 0 30;
}

.topTopicBody-body span {
  display: block;
  overflow: hidden;
  line-height: 18px;
  margin-top: 8px;
  color: #999;
  font-size: 15px;
  width: 400px;
  height: 55px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.topTopicBody-header {
  display: flex;
  align-items: center;
}

.topTopicBody-header span {
  background: rgb(60, 126, 250);
  margin-left: 20px;
  padding: 3px 8px;
  font-size: 8px;
  border-radius: 5px;
  color: #fff;
}

.topTopicBody-header h3 {
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  color: #333;
  transition: 0.5s ease 0s;
}

.Topitem a:hover h3,
.Topitem a:hover .topTopicFooter-i,
.community-active {
  color: rgb(100, 154, 254);
}

.toptopicimg {
  margin: 5px;
  width: 184px;
  height: 104px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
}

.toptopicimg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.topTopicBody {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
}
</style>