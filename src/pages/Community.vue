<template>
  <div class="guideline">
    <pcl-line></pcl-line>
    <navigation></navigation>
    <div class="ordertopic">
      <div class="ordertopicnav">
        <ul>
          <li :class="this.fuzzyData.isTime == 0? 'ordertopicnav-active': ''"><span class="orderbutton" @click="orderByHot()">最热排序</span></li>
          <li :class="this.fuzzyData.isTime == 1? 'ordertopicnav-active': ''"><span class="orderbutton" @click="orderByNew()">最新排序</span></li>
        </ul>
      </div>
      <el-button icon="el-icon-s-operation" circle id="ttt" @click="drawer = true"></el-button>
    </div>
    <div class="ordertopic orderTwo">
      <div class="ordertopicnav orderTwoNav" >
        <ul>
          <li :class="this.fuzzyData.withTime == 0? 'orderTwoNav-active': ''"><span class="orderbutton" @click="changeWithTime(0)">全部</span></li>
          <li :class="this.fuzzyData.withTime == 1? 'orderTwoNav-active': ''"><span class="orderbutton" @click="changeWithTime(1)">近一天</span></li>
           <li :class="this.fuzzyData.withTime == 2? 'orderTwoNav-active': ''"><span class="orderbutton" @click="changeWithTime(2)">近一周</span></li>
          <li :class="this.fuzzyData.withTime == 3? 'orderTwoNav-active': ''"><span class="orderbutton" @click="changeWithTime(3)">近一个月</span></li>
        </ul>
      </div>
    </div>
    <div class="contentBody">
      <div class="leftBox">
        <topiclist :fuzzyData="fuzzyData" :key="componentKey"></topiclist>
      </div>

      <div class="rightBox">
        <rightlist></rightlist>
      </div>
    </div>
    <el-drawer title="筛选框" :visible.sync="drawer" :direction="direction" @open="handleOpen" size="35%">
      <el-form ref="form" :model="fuzzyData" label-width="80px">
        <el-form-item label="关键字">
          <el-input v-model="fuzzyData.keyWord"></el-input>
        </el-form-item>

        <el-form-item label="标签">
          <el-select v-model="fuzzyData.tagId" placeholder="请选择标签" clearable>
            <el-option v-for="tag in Taglist" :key="tag.id" :label="tag.content" :value="tag.id"></el-option>
            <!-- <el-option label="安师大发生发" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="时间段">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="开始日期" v-model="fuzzyData.startTime" value-format=yyyy-MM-dd style="width: 100%"></el-date-picker>
          </el-col>

          <el-col :span="11">
            <el-date-picker type="date" placeholder="结束日期" v-model="fuzzyData.endTime" value-format=yyyy-MM-dd style="width: 100%"></el-date-picker>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="帖子类型">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="视频" name="type"></el-checkbox>
            <el-checkbox label="文章" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->
        <el-form-item label="帖子类型">
          <el-radio-group v-model="fuzzyData.isVideo">
            <el-radio label="1">视频</el-radio>
            <el-radio label="0">文章</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <div class="Footer">
      <div class="Footer-content">
        <span>
          Welt © 2023
        </span>
        <span>
          违法与不良信息举报：198466453@qq.com
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import navigation from "../components/navigation.vue";
import rightlist from "../components/rightlist.vue";
import topiclist from "../components/topiclist.vue";
import pclLine from "@/components/pcl-line.vue";
import tagApi from "@/api/tag";
export default {
  name: "COMMUNITY",
  data() {
    return {
      fuzzyData: {
        keyWord: "",
        current: 1,
        startTime: "",
        endTime: "",
        tagId: "",
        isVideo: "",
        isTime: 0,
        withTime:0
      },
      Taglist: [],
      componentKey: 0,
      drawer: false,
      direction: "rtl",
    };
  },
  components: {
    navigation,
    rightlist,
    topiclist,
    pclLine,
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      this.drawer = false;
      this.componentKey += 1;
    },
    handleOpen() {
      this.fuzzyData = {
        keyWord: "",
        current: 1,
        startTime: "",
        endTime: "",
        tagId: "",
        isVideo: "",
        isTime: 0,
        withTime:0
      };
    },
    orderByHot() {
      this.$set(this.fuzzyData, "isTime", 0);
      this.componentKey += 1;
    },
    orderByNew() {
      this.$set(this.fuzzyData, "isTime", 1);
      this.componentKey += 1;
    },
    getAllTag() {
      tagApi.getTagList().then((response) => {
        this.Taglist = response.data.tagList;
      });
    },
    changeWithTime(num){
      this.$set(this.fuzzyData, "withTime", num);
      this.componentKey += 1;
    }
  },
  created() {
    this.getAllTag();
  },
  watch: {
    $route() {
      if (!this.$route.path == "/Community") {
        this.componentKey += 1;
      }
    },
  },
};
</script>

<style>
.ordertopic {
  position: relative;
  z-index: 99;
  height: 50px;
  background-color: #ffffff;
  /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.215); */
  border-bottom: 1px solid #ababab;
}
.ordertopicnav {
  width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
}
.ordertopicnav ul {
  list-style: none;
  display: flex;
}

.ordertopicnav ul li {
  height: 45px;
  /* background-color: #5e3b3b; */
  margin-left: 10px;
  line-height: 45px;
  width: 110px;
  text-align: center;
  transition: 0.1s ease 0s;
  cursor: pointer;
}

.ordertopicnav ul li:hover,
.ordertopicnav-active {
  border-bottom: 5px solid rgb(100, 154, 254);
  color: rgb(100, 154, 254);
  font-weight: bolder;
}

.orderTwo{
   height: 30px;
}

.orderTwoNav ul li{
   height: 27px;
   line-height: 27px;
   font-size: 10px;
   width: 80px;
}


.orderTwoNav ul li:hover,
.orderTwoNav-active{
  border-bottom: 3px solid rgb(100, 154, 254);
  color: rgb(100, 154, 254);
  font-weight: bolder;
}

#ttt {
  position: fixed;
  top: 150px;
  right: 40px;
}
</style>