<template>
  <div class="CreateTopicBox">
    <navigation></navigation>
    <div class="Createbox">
      <el-form ref="form" :model="form" label-width="80px">
        <div class="Create02">
          <div class="isv" v-if="this.form.isVideo">
            <h2>发布视频</h2>
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="form.synopsis"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-select v-model="form.tagId" placeholder="请选择标签" clearable>
                <el-option v-for="tag in Taglist" :key="tag.id" :label="tag.content" :value="tag.id"></el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="封面图">
              <el-upload :file-list="fileList" class="upload-demo" list-type="picture" drag name="img" action="/upload/uploadOss" :on-remove="fileRemove" :limit="1" :before-upload="beforeUploadImg" :http-request="handleUpload" :on-exceed="onExceed">
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
            </el-form-item> -->

            <!-- <el-form-item label="视频上传" prop="content">
              <el-upload class="avatar-uploader el-upload--text" drag action="/api/upload/uploadVideo" multiple :show-file-list="false" :on-success="handleVideoSuccess" :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">
                <i v-if="Plus" class="el-icon-upload"></i>
                <div v-if="Plus" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <el-progress v-if="videoFlag == true" type="circle" :percentage="parseFloat(videoUploadPercent)" style="margin-top:30px;"></el-progress>
                <div class="el-upload__tip" slot="tip">只能上传mp4/flv/avi文件，且不超过1G</div>
              </el-upload>
            </el-form-item> -->
          </div>

          <div class="ist" v-if="!this.form.isVideo">
            <h2>发布文章</h2>
            <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="form.synopsis"></el-input>
            </el-form-item>
            <el-form-item label="标签">
              <el-select v-model="form.tagId" placeholder="请选择标签" clearable>
                <el-option v-for="tag in Taglist" :key="tag.id" :label="tag.content" :value="tag.id"></el-option>
                <!-- <el-option label="安师大发生发" value="beijing"></el-option> -->
              </el-select>
            </el-form-item>

            <!-- <el-form-item label="封面图">
              <el-upload :file-list="fileList" class="upload-demo" list-type="picture" drag name="img" action="/upload/uploadOss" :on-remove="fileRemove" :limit="1" :http-request="handleUpload" :before-upload="beforeUploadImg" :on-exceed="onExceed">
                <i class="el-icon-upload" />
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
            </el-form-item> -->

            <mavon-editor ref="md" v-model="form.content" @imgAdd="imgAdd" />
          </div>
          <!-- <el-button style="margin-top: 12px" @click="handleSubmit">发布</el-button> -->
          <div id="tip">若选择返回上一步，则当前填写数据全部作废，将需要用户重新填写</div>
          <el-button style="margin-top: 12px" @click="handleSubmit">确定发布</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import navigation from "@/components/navigation.vue";
import tagApi from "@/api/tag";
import uploadApi from "@/api/upload";
import TopicApi from "@/api/topic";
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        synopsis: "",
        // createUser: "Brownie",
        createUserId: 0,
        tagId: "",
        coverImage: "",
        isVideo: "",
      },
      Taglist: [],
      isvtf: true,
      fileList: [],
      videoFlag: false,
      Plus: true,
      videoUploadPercent: 0,
    };
  },
  components: {
    navigation,
  },
  methods: {
    isvt(flag) {
      this.form = {
        title: "",
        content: "",
        synopsis: "",
        // createUser: "Brownie",
        createUserId: JSON.parse(localStorage.getItem("userInfo")).id,
        tagId: "",
        coverImage: "",
        isVideo: "",
      };
      this.$set(this.form, "isVideo", flag);
      this.active++;
      this.isvtf = false;
    },
    onExceed() {
      this.$message.error("只能上传一个图片");
    },
    imgAdd(pos, $file) {
      uploadApi
        .uploadImg($file)
        .then((response) => {
          this.$refs.md.$img2Url(pos, response.data.url);
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    handleUpload(img) {
      uploadApi
        .uploadImg(img.file)
        .then((response) => {
          this.form.coverImage = response.data.url;
          this.fileList.push({ name: img.file.name, url: response.data.url });
        })
        .catch((error) => {
          this.$message.error(error.msg);
        });
    },
    fileRemove(file, fileList) {
      this.fileList.pop();
    },

    // 上传图片前执行
    // beforeUploadImg(file){
    //   if (
    //     [
    //       "image/jpeg",
    //       "image/png",
    //       "image/jpg"
    //     ].indexOf(file.type) === -1
    //   ) {
    //     this.$message.error("请上传正确的图片格式");
    //     return false;
    //   }
    // } ,

    // // 视频上传前执行
    // beforeUploadVideo(file) {
    //   const isLt300M = file.size / 1024 / 1024 < 300;
    //   if (
    //     [
    //       "video/mp4",
    //       "video/ogg",
    //       "video/flv",
    //       "video/avi",
    //       "video/wmv",
    //       "video/rmvb",
    //     ].indexOf(file.type) === -1
    //   ) {
    //     this.$message.error("请上传正确的视频格式");
    //     return false;
    //   }
    //   if (!isLt300M) {
    //     this.$message.error("上传视频大小不能超过300MB哦!");
    //     return false;
    //   }
    // },
    // 视频上传过程中执行
    // uploadVideoProcess(event, file, fileList) {
    //   this.Plus = false;
    //   this.videoFlag = true;
    //   this.videoUploadPercent = file.percentage.toFixed(0);
    // },
    // 视频上传成功是执行
    // handleVideoSuccess(res, file) {
    //   this.Plus = false;
    //   this.videoUploadPercent = 100;
    //   console.log(res);
    //   // 如果为200代表视频保存成功
    //   if (res.code === 200) {
    //     // 接收视频传回来的名称和保存地址
    //     // 至于怎么使用看你啦~
    //     this.form.content = res.data.videoId;
    //     this.$message.success("视频上传成功！");
    //   } else {
    //     this.$message.error("视频上传失败，请重新上传！");
    //   }
    // },

    handleSubmit() {
      if (this.form.title == "") {
        this.$message.warning("标题未填写哦");
      } else if (this.form.synopsis == "") {
        this.$message.warning("简介未填写哦");
      } else if (this.form.tagId == "") {
        this.$message.warning("标签还未选择");
      } else {
        TopicApi.editTopic(this.form)
          .then((response) => {
            this.$message.success("帖子修改成功");
            this.$router.push("/");
          })
          .catch((error) => {
            this.$message.error(error);
          });
      }
    },
    getAllTag() {
      tagApi.getTagList().then((response) => {
        this.Taglist = response.data.tagList;
      });
    },
    getTopicForm() {
      TopicApi.getTopicDetail(this.$route.params.tid).then((response) => {
        this.form = response.data.topic;
      });
    },
  },
  watch: {
    $route:"getTopicForm"
  },
  created() {
    this.form.createUserId = JSON.parse(localStorage.getItem("userInfo")).id;
    this.getTopicForm();
    this.getAllTag();
  },
};
</script>

<style scoped>
.Createbox {
  width: 1200px;
  margin: 60px auto;
}

.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px !important;
  position: relative !important;
  overflow: hidden !important;
}
.avatar-uploader .el-upload:hover {
  border: 1px dashed #d9d9d9 !important;
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 178px;
  display: block;
}

.Create01,
.Create03,
.prenext-button {
  text-align: center;
  margin-top: 100px;
  /* background-color: blue; */
}

.prenext-button {
  margin-top: 40px;
}

h2 {
  margin: 50px;
}

.enterContent {
  width: 300px;
  margin: 0 auto;
}

.enterContent p {
  color: red;
}

.enterContent div {
  margin: 20px 0px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.enterContent span {
  font-size: 20px;
}

.coverImage {
  width: 120px;
  height: 120px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
}

.coverImage img {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

#tip {
  height: 50px;
  width: 500px;
  margin: 0 auto;
  color: rgb(100, 154, 254);
  line-height: 50px;
}
</style>