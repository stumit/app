import { v4 as uuidv4 } from 'uuid';
// 生成一个随机字符串，且每次都不能发生变化，用于游客身份长期存储
export const getUUID = () => {
  let uuid_token = localStorage.getItem("UUIDTOKEN")
  if (!uuid_token) {
    // 生成游客身份
    uuid_token = uuidv4();
    // 将游客id存储到本地存储localStorage
    localStorage.setItem("UUIDTOKEN",uuid_token);
  }
  return uuid_token;
}