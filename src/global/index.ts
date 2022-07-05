// 从vue 中导入APP类型
import { App } from 'vue'
// 导入我们们的组件注册声明文件
import registerElement from './register-element'
// 导出（暴露）我们的主接口方便main接口调用使用
export function globalRegister(app: App): void {
  // 使用use函数安装我们的registerElement
  app.use(registerElement)
}