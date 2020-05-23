import * as fs from 'fs'

const extend2 = require('extend2')

type Dic<T> = { [key: string]: T }

// 处理基本信息
const env = process.env || {}
const runEnv = env.RUN_ENV || 'd0'
const runEnvType = runEnv.substr(0, 1) as 'd' | 't' | 'v'
const runEnvName = { d: 'alpha', t: 'beta', v: 'online' }[runEnvType] || 'unknown'
const cwd = process.cwd()
const name = env.npm_package_name || ''
const isProd = env.NODE_ENV === 'production'
const isOnline = runEnvType === 'v'
const hostname = env.HOSTNAME || 'local'
const version = env.npm_package_version || ''
const started = false

// 处理mods
const modules = env.MODS || '', mods = {} as Dic<boolean>
modules.split(',').forEach(v => mods[v] = true)

// 构建
export default {
  // 基本参数
  env, cwd, name, mods, version, hostname, runEnv, runEnvType, runEnvName, isProd, isOnline, started,
  // 直接设置配置信息
  set (...envs: Dic<any>[]) {
    extend2(true, this, ...envs)
  },
  // 加载模块类配置信息
  load (...files: string[]) {
    files.forEach(file => {
      extend2(true, this, Object.values(require(file)))
    })
  },
  // 直接读取文本类配置
  read (key: string, file: string) {
    const value = fs.readFileSync(file).toString().trim()
    this.set({ [key]: value })
  }
}