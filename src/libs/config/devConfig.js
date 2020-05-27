const webConfig = {
  server: 'http://192.168.2.158:8888/app/mock/16/', // 正式
  timeout: 30000,
  successCode: 2000, // 和后端约定的接口正常状态码
  unLoginCode: 4005, // 未登录的接口返回状态码
  globalParameObj: {}, // 全局参数
  fileDownloadUrl: 'http://192.168.2.102:8080'
};

export default webConfig;
