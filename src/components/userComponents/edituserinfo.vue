<template>

  <div class="editUserInfoBox">
    <header>
      <h1>
        编辑个人资料
      </h1>
    </header>
    <section>
      <ul class="userInfoBox">
        <li class="avatarlist">
          <span class="leftTitle">头像</span>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <myUpload field="img" url="/api/upload/uploadImg" @crop-upload-success="cropUploadSuccess" :modelValue.sync="showDialog" />
                <img :src="
                    userInfoObj.avatar
                      ? userInfoObj.avatar
                      : Avatar
                  " title="点击上传头像" class="edit-avatar" @click="toggleShow">
              </div>
            </div>
          </div>
        </li>
        <li class="username">
          <span class="leftTitle">昵称</span>
          <el-input v-model="userInfoObj.name" placeholder="昵称（不是真实姓名）"></el-input> <i class="fa fa-wa fa-asterisk"></i>
        </li>
        <li>
          <span class="leftTitle">电子邮件</span>
          <el-input v-model="userInfoObj.email" placeholder="请按照邮箱格式填写"></el-input> <i class="fa fa-wa fa-asterisk"></i>
        </li>
        <li>
          <span class="leftTitle">电话号码</span>
          <el-input v-model="userInfoObj.phone" placeholder="请填写标准电话号码"></el-input> <i class="fa fa-wa fa-asterisk"></i>
        </li>
        <li>
          <span class="leftTitle">个人签名</span>
          <el-input v-model="userInfoObj.synopsis" placeholder="请填写个人签名"></el-input> <i class="fa fa-wa fa-asterisk"></i>
        </li>
        <li>
          <el-popover placement="bottom" width="160" v-model="visible">
            <p>你确定要修改密码吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="goEditPassWord()">确定</el-button>
            </div>
            <el-button type="primary" plain slot="reference">修改密码</el-button>
          </el-popover>
          <el-button class="editButton" type="primary" plain slot="reference" @click="editUserInfo">修改信息</el-button>
        </li>
      </ul>
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
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      userInfo: {}, //本地存储的用户信
      userInfoObj: {
        avatar: "",
        email: "",
        name: "",
        phone: "",
        synopsis: "",
      }, //用户的信息
      visible: false,
    };
  },
  methods: {
    //事件处理器
    handleAvatarSuccess(res, file) {
      //上传头像
      if (res.code == 200) {
        this.userInfoObj.avatar = res.data;
        this.userInfoObj.head_start = 1;
      } else {
        this.$message.error("上传图片失败");
      }
    },
    beforeAvatarUpload(file) {
      //判断头像大小
      const isJPG =
        file.type == "image/png" ||
        file.type == "image/jpg" ||
        file.type == "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 5;
      // console.log(file);
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },

    // 点击头像打开上传窗口
    toggleShow() {
      this.showDialog = !this.showDialog;
    },
    // 上传成功后重新载入信息
    cropUploadSuccess(jsonData, field) {
      this.userInfoObj.avatar = jsonData.data.url
    },
    goEditPassWord() {
      this.$message.success("测试成功");
      console.log("测试成功");
      this.visible = false;
    },
    editUserInfo() {
      userApi.editUserInfo(this.userInfoObj).then((response) => {
        this.$message.success("修改成功");
        localStorage.setItem("userInfo", JSON.stringify(this.userInfoObj));
        console.log(localStorage.getItem("userInfo"));
        location.reload();
      });
    },
    routeChange(){
      this.userInfoObj = JSON.parse(localStorage.getItem("userInfo"));
    }
  },
  watch: {
  },
  created() {
    //生命周期函数
    this.routeChange();
    // this.uploadURL = store.state.baseURL + "upload";
  },
};
</script>

<style scoped>
.editButton {
  margin-left: 20px;
}

ol,
ul {
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