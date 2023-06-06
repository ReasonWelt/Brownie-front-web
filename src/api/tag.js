import request from "@/utils/request";

export default {
  getTagList() {
    return request({
      url: `/tag`,
      method: "GET",
    });
  },
};
