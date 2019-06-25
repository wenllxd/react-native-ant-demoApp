import Mock from "mockjs"; //需要install

// Mock.mock( rurl, rtype, template )
// rurl 需要拦截的url,rtype 请求类型  template 数据模板

export default Mock.mock("/getUser", "get", {
    success: true,
    name: "user1",
    pwd: "123456",
    message: "@cparagraph"
});
