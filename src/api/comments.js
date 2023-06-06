import request from "@/utils/request";

export default {
  getTopicComment(tid, curpage) {
    return request({
      url: `/comments/commentsList/${tid}/${curpage}/3`,
      method: "GET",
    });
  },
  sendComment(account,topicId, rootId,createById, toCommentId, toCommentUserId, content) {
    return request({
      url: "/comments",
      method: "post",
      data: {
        topicId: topicId,
        rootId: rootId,
        createById:createById,
        toCommentId: toCommentId,
        toCommentUserId: toCommentUserId,
        content: content,
      },
      headers:{
        "account":account
      }
    });
  },
  removeComment(id){
    return request({
      url:`/comments/${id}`,
      method:"DELETE"
    })
  }
};

// // 发送文章评论
// export function sendComment(
//   type,
//   articleId,
//   rootId,
//   toCommentId,
//   toCommentUserId,
//   content
// ) {
//   return request({
//     url: "/comment",
//     method: "post",
//     data: {
//       articleId: articleId,
//       type: type,
//       rootId: rootId,
//       toCommentId: toCommentId,
//       toCommentUserId: toCommentUserId,
//       content: content
//     }
//   });
// }

// export function getLinkComment(query) {
//   return request({
//     url: "/comment/linkCommentList",
//     method: "get",
//     params: query
//   });
// }
