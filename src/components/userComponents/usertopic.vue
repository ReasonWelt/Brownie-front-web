<template>
  <div class="usertopicbox">
    <header>
      <h1>
        帖子管理
      </h1>
    </header>
    <section>
      <div class="usertopiclist">
        <div class="usertopiclist-item" v-for="topic in topicList">
          <a :href="'#/TopicDetail/'+topic.id">
            <div class="usertopic-cover">
              <el-image style="width: 100px; height: 100px; border-radius: 10px" :src="topic.coverImage" fit="cover"></el-image>
            </div>
            <div class="itembox">
              <div class="usertopic-title">
                <h3>{{topic.title}} <i v-if="topic.isVideo" class="el-icon-video-camera isV"></i></h3>
              </div>
              <div class="usertopic-content">{{topic.content}}</div>
            </div>
          </a>
          <div class="usertopic-controller">
            <el-button type="primary" icon="el-icon-edit" circle plain size="small" @click="goEidtTopic(topic.id)" ></el-button>
            <!-- <el-button type="danger" icon="el-icon-delete" circle plain size="small"></el-button> -->
            <!-- <el-popover placement="bottom" width="160">
              <p>你确定要删除帖子吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text">取消</el-button>
                <el-button type="primary" size="mini" @confirm="removeTopicByid(topic.id)">确定</el-button>
              </div>
            </el-popover> -->
            <el-popconfirm @confirm="removeTopicByid(topic.id)" confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red" title="确定删除这条帖子吗？">
              <el-button type="danger" slot="reference" icon="el-icon-delete" circle plain size="small"></el-button>
            </el-popconfirm>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import userApi from "@/api/user";
import topicApi from "@/api/topic";
export default {
  data() {
    return {
      topicList: [],
      isDelete: false,
    };
  },
  methods: {
    getAllUserTopic() {
      userApi
        .getUserTopicList(JSON.parse(localStorage.getItem("userInfo")).id)
        .then((response) => {
          this.topicList = response.data.list;
        });
    },
    removeTopicByid(tid) {
      location.reload();
      topicApi.delTopicById(tid).the((response) => {
        this.$message.success("删除成功");
      });
    },
    goEidtTopic(tid){
      this.$router.push("/EditTopic/"+tid);
    }
  },
  created() {
    this.getAllUserTopic();
  },
};
</script>

<style scoped>
.usertopiclist-item a {
  width: 90%;
  display: flex;
  justify-content: space-between;
  font-style: none;
}

.usertopiclist-item h3,
.usertopiclist-item .isV {
  transition: 0.3s ease 0s;
  color: #333;
}

.usertopiclist-item a:hover h3,
.usertopiclist-item a:hover .isV {
  color: rgb(100, 154, 254);
}

.usertopiclist-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.194);
  height: 100px;
}

.usertopiclist {
  margin-top: 20px;
}
.usertopic-title {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
}

.usertopic-content {
  width: 400px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 18px;
  margin-top: 8px;
  color: #999;
}

.usertopic-controller {
  margin: 10px 0 10px 20px;
}

.usertopic-controller .el-button {
  margin-top: 5px;
}
</style>