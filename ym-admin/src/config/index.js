let baseUrl = "/api";

switch (process.env.NODE_ENV) {
  case "development":
    baseUrl = "api"; // 本地请求
    break;
  case "test":
    baseUrl = "test"; // 测试接口
    break;
  case "production":
    baseUrl = "http线上"; // 生成接口
    break;
}

export default baseUrl;