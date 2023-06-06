import request from "@/utils/request";

export default {
  userLogin(account, password) {
    return request({
      url: `/user/login`,
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "account":account
      },
      data: {
        account: account,
        password: password,
      },
    });
  },
  userLogout(account){
    return request({
      url: `/user/logout/${account}`,
      method: "GET",
    });
  },
  userRegister(user) {
    return request({
      url: `/user/add`,
      method: "post",
      data: {
        account: user.account,
        password: user.password,
        name: user.name,
        email: user.email,
      },
    });
  },
  getUserTopicList(id) {
    return request({
      url: `/user/getTopicList/${id}`,
      method: "GET",
    });
  },
  editUserInfo(userObj) {
    return request({
      url: `/user/revise`,
      method: "PUT",
      data:{
        account:userObj.account,
        avatar: userObj.avatar,
        email:userObj.email,
        id:userObj.id,
        name:userObj.name,
        password:userObj.password,
        phone:userObj.phone,
        synopsis:userObj.synopsis,
      }
    });
  },
  getAny(id){
    return request({
      url:`/user/lvn/${id}`,
      method:"GET"
    })
  }
};
