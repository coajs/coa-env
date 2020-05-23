import * as fs from 'fs'
import { Dic, Env } from './typing'

const extend2 = require('extend2')
export default {
  // 直接设置配置信息
  set (option: Dic<any>) {
    extend2(true, this, option)
    return this as Env
  },
  // 加载模块类配置信息
  load (file: string) {
    extend2(true, this, require(file).default)
    return this as Env
  },
  // 直接读取文本类配置
  read (key: string, file: string) {
    const value = fs.readFileSync(file).toString().trim()
    this.set({ [key]: value })
    return this as Env
  }
}