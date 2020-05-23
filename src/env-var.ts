import { Dic } from './typing'

// 处理基本信息
const env = process.env || {}
const envBase = env.ENV_BASE || ''
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
export default { cwd, name, mods, version, hostname, runEnv, envBase, runEnvType, runEnvName, isProd, isOnline, started }