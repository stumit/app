//新建一个扩展接口,新增code，message，extra，然后用 AxiosResponse 来继承扩展接口
import axios from 'axios'

declare module 'axios' {
 interface IAxios<D = null> {
   code: number
   message: string
   extra: D
 }
 export interface AxiosResponse<T = any> extends IAxios<D> {}
}