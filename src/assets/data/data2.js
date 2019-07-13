import Mock from "mockjs"; //需要install

// Mock.mock( rurl, rtype, template )
// rurl 需要拦截的url,rtype 请求类型  template 数据模板

export default Mock.mock("/postForm", "post", {
    success: true,
    name: "user1", // 用户名
    pwd: "123456", // 密码
    nickName: "user1", // 昵称,默认为用户名,
    avatar: null, // 头像
    message: "@cparagraph"
});
