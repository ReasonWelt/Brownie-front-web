<template>

  <div class="editUserInfoBox">
    <header>
      <h1>
        个人资料
      </h1>
    </header>
    <section>
      <ul class="userInfoBox">
        <li class="avatarlist">
          <span class="leftTitle">头像</span>

          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img :src="userInfoObj.avatar==''?this.Avatar:userInfoObj.avatar" class="edit-avatar">
              </div>
            </div>
          </div>
        </li>
        <li class="username">
          昵称：<span class="leftTitle">{{userInfoObj.name}}</span>
        </li>
        <li>
         电子邮件： <span class="leftTitle">{{userInfoObj.email}}</span>
        </li>
        <li>
          电话号码：<span class="leftTitle">{{userInfoObj.phone}}</span>
        </li>
        <li>
          个人签名：<span class="leftTitle">{{userInfoObj.synopsis}}</span>
        </li>
      </ul>
    </section>
    <el-divider></el-divider>

    <section>
      <div>
        <el-row :gutter="20">
          <el-col :span="8">
            <div>
              <el-statistic title="总帖子数">
                <template slot="formatter">{{userInfo.total}}</template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="获赞数">
                <template slot="formatter"> {{userInfo.likes}}</template>
              </el-statistic>
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-statistic title="总观看">
                <template slot="formatter"> {{userInfo.views}}</template>
              </el-statistic>
            </div>
          </el-col>
          
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
import userApi from "@/api/user";
export default {
  components: { myUpload },
  data() {
    return {
      showDialog: false,
      uploadURL: "",
      Avatar:
        "https://browne.oss-cn-shenzhen.aliyuncs.com/Avatar.jpg",
      userInfo: '', //本地存储的用户信
      userInfoObj: "", //用户的信息
    };
  },
  methods: {
    routeChange: function () {
      this.userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
      userApi.getAny(this.userInfoObj.id).then(response=>{
        this.userInfo = response.data.DTO
      })
       
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    $route: "routeChange",
  },
  created() {
    //生命周期函数
    this.routeChange();
    // this.uploadURL = store.state.baseURL + "upload";
  },
};
</script>

<style scoped>

ol,ul{
  list-style: none;
}
.userInfoBox .avatarlist {
  position: relative;
}

.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 120px;
  height: 120px;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.edit-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
.gotoEdit {
  font-size: 15px;
  margin-right: 10px;
  float: right;
  cursor: pointer;
  color: #999;
}
.gotoEdit:hover {
  color: #333;
}
/*个人设置*/
.userInfoBox .leftTitle {
  display: inline-block;
  width: 100px;
  padding: 10px 0;
}
.userInfoBox .rightInner {
  display: inline-block;
  max-width: calc(100% - 140px);
  vertical-align: top;
}
.userInfoBox li {
  padding: 20px;
  /* border-bottom: 1px solid #ddd; */
}

.userInfoBox .el-input,
.userInfoBox .el-textarea {
  max-width: 300px;
  min-width: 100px;
}

.userInfoBox .el-input__inner {
  border-radius: 4px;
}
.userInfoBox .el-textarea {
  vertical-align: top;
}
.saveInfobtn {
  margin: 20px 0;
  text-align: center;
}
.saveInfobtn a {
  color: #fff;
  padding: 6px 20px;
  margin: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
}
.userInfoBox .fa-asterisk {
  color: #df2050;
}
</style>