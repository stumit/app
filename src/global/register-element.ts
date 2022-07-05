import { App } from 'vue'
// 导入我们的element-plus的css文件
import 'element-plus/dist/index.css'
// 把我们需要使用的组件进行导入
import {
  ElButton,
  ElCheckbox,
  ElForm,
  ElFormItem,
  ElInput,
  ElLink,
  ElRadio,
  ElTabPane,
  ElTabs,
} from 'element-plus' // 需要的就导入
// 把我们要使用的组件名放入一个数组里面
const components = [
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElTabs,
  ElTabPane,
  ElCheckbox,
  ElLink,// 需要的就导入
]

export default function (app: App): void {
  // 循环我们的组件名数组进行全局注册
  for (const component of components) {
    app.component(component.name, component)
  }
}