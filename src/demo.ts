/* eslint-disable @typescript-eslint/no-unused-vars */
import { CoaEnv } from './CoaEnv'

// 创建一个新的环境实例
const appEnv = new CoaEnv('1.0.0')

// 判断是否是线上环境
if (appEnv.isOnline) {
  // do something
}

// 判断是否是测试类环境
if (appEnv.runEnvType === 't') {
  // do something
}

// 获取版本
const version = appEnv.version

// 获取环境名称
const runEnvName = appEnv.runEnvName

// 获取当前工作目录
const cwd = appEnv.cwd

// 用户 d1 t1 v1 等精确的环境，精确返回对应环境的配置
const hostConfig1 = appEnv.getConfig({
  d1: { host: '127.0.0.1' },
  t1: { host: '192.168.0.1' },
  v1: { host: '172.16.0.1' },
})
// 当环境是d1，返回 { host: '127.0.0.1' }
// 当环境是t1，返回 { host: '192.168.0.1' }
// 当环境是v1，返回 { host: '172.16.0.1' }
// 当环境是v2，报错 CoaError: Env.ConfigNotFound 配置信息不存在

// 用 d t v 可以代表一类环境，返回该类环境
const hostConfig2 = appEnv.getConfig({
  d: { host: '127.0.0.1' },
  t: { host: '192.168.0.1' },
  v: { host: '172.16.0.1' },
})
// 当环境是d1 d2 d3，返回 { host: '127.0.0.1' }
// 当环境是t1 t2 t3，返回 { host: '192.168.0.1' }
// 当环境是v1 v2 v3，返回 { host: '172.16.0.1' }
// 当环境是a1，报错 CoaError: Env.ConfigNotFound 配置信息不存在

// 用 $ 可以代表默认配置，当配置表不存在对应环境时，返回默认配置
const hostConfig3 = appEnv.getConfig({
  $: { host: '127.0.0.1' },
  v: { host: '172.16.0.1' },
})
// 当环境是t1 t2 t3，返回 { host: '192.168.0.1' }
// 其他环境，一律返回 { host: '127.0.0.1' }
