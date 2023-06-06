import request from "@/utils/request";

// 查询分类列表
export default {
  uploadImg(img) {
    const formData = new FormData();
    formData.append("img", img);
    return request({
      url: "/upload/uploadImg",
      headers: { "Content-Type": "multipart/form-data" },
      method: "POST",
      data: formData,
    });
  },

  getVideoPath(videoId) {
    return request({
      url: `/upload/getVideoPath/${videoId}`,
      method: "GET",
    });
  },
};
