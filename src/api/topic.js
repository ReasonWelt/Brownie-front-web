import request from "@/utils/request";

export default {
  getTopTopic() {
    return request({
      url: `/topic/topTopic`,
      method: "GET",
    });
  },
  addTopic(topic) {
    return request({
      url: `/topic`,
      method: "POST",
      data: {
        title: topic.title,
        content: topic.content,
        synopsis: topic.synopsis,
        // createUser: "Brownie",
        createUserId: topic.createUserId,
        tagId: topic.tagId,
        coverImage: topic.coverImage,
        isVideo: topic.isVideo,
      },
    });
  },
  editTopic(topic) {
    return request({
      url: `/topic`,
      method: "PUT",
      data: {
        id: topic.id,
        title: topic.title,
        content: topic.content,
        synopsis: topic.synopsis,
        createUserId: topic.createUserId,
        tagId: topic.tagId,
        coverImage: topic.coverImage,
        isVideo: topic.isVideo,
      },
    });
  },
  delTopicById(tid) {
    return request({
      url: `/topic/${tid}`,
      method: "DELETE",
    });
  },
  getHotTopic() {
    return request({
      url: `/topic/focus`,
      method: "GET",
    });
  },
  getofficallook() {
    return request({
      url: `/topic/hostoftopic/1/5`,
      method: "GET",
    });
  },
  getTopicList(currentpage) {
    return request({
      url: `/topic/SelectChoose/${currentpage}`,
      method: "GET",
    });
  },
  getTopicDetail(id) {
    return request({
      url: `/topic/detail/${id}`,
      method: "GET",
    });
  },
  getofficallist(currentpage) {
    return request({
      url: `/topic/hostoftopic/${currentpage}/6`,
      method: "GET",
    });
  },
  fuzzyQueryTopic(topicDto) {
    return request({
      url: `/topic/selectsome`,
      method: "POST",
      data: {
        keyWord: topicDto.keyWord,
        current: topicDto.current,
        startTime: topicDto.startTime,
        endTime: topicDto.endTime,
        tagId: topicDto.tagId,
        isVideo: topicDto.isVideo,
        isTime: topicDto.isTime,
        withTime:topicDto.withTime
      },
    });
  },
  addLikeById(tid) {
    return request({
      url: `/topic/addlikes/${tid}`,
      method: "GET",
    });
  },
  getCoverImg(){
    return request({
      url: `topic/getTopImg`,
      method: "GET",
    });
  }
};
