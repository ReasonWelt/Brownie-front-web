import request from "@/utils/request";

export default {
  getResourceList() {
    return request({
      url: `/resource`,
      method: "get",
    });
  },
};
