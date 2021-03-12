import { CoaError } from 'coa-error'

// 以下属性均为只读属性，不可修改，在实例创建时刻就已经固定
export class CoaEnv {

  // runEnv 运行环境，一般定义为开发类环境('d0' 'd1' 'd2') 测试类环境('t0' 't1' 't2') 生产类环境('v0' 'v1' 'v2')等
  // 由环境变量 process.env.RUN_ENV 控制，如果没有定义，则默认为 'd0'
  public readonly runEnv: string

  // runEnvType 运行环境类型，单字母形式，便于判断某一类环境，根据 runEnv 自动判断，如 'd' 't' 'v'
  public readonly runEnvType: 'd' | 't' | 'v' | string

  // runEnvName 运行环境的名称，便于对外展示环境的名称，根据 runEnvType 自动判断，如 'alpha' 'beta' 'online'
  public readonly runEnvName: 'alpha' | 'beta' | 'online' | 'unknown' | string

  // cwd 当前运行Node.js进程的工作目录，由 process.cwd() 控制
  public readonly cwd: string

  // name 当前包名，由 package.json 中的 name 控制
  public readonly name: string

  // isProd 是否是生产环境，由 process.env.NODE_ENV === 'production' 控制，只要不是 'production' 均为非生产环境
  public readonly isProd: boolean

  // isOnline 是否是线上环境，由 runEnvType === 'v' 控制，只要不是 'v' 均为非线上环境
  public readonly isOnline: boolean

  // hostname 当前主机名称，由 process.env.HOSTNAME 控制，默认为 'local'
  public readonly hostname: string

  // 当前运行的版本号，解耦出来，由外部程序控制，创建实例时必传此参数
  public readonly version: string

  constructor (version: string) {
    const env = process.env || {}
    this.cwd = process.cwd()
    this.version = version
    this.runEnv = env.RUN_ENV || 'd0'
    this.runEnvType = this.runEnv.substr(0, 1)
    this.runEnvName = ({ d: 'alpha', t: 'beta', v: 'online' } as { [key: string]: string })[this.runEnvType] || 'unknown'
    this.name = env.npm_package_name || ''
    this.hostname = env.HOSTNAME || 'local'
    this.isProd = env.NODE_ENV === 'production'
    this.isOnline = this.runEnvType === 'v'
  }

  // 根据环境获取对应配置信息
  getConfig<T> (configs: { $?: T, d?: T, t?: T, v?: T, d0?: T, d1?: T, t1?: T, v1?: T }) {
    return configs[this.runEnv as '$'] || configs[this.runEnvType as '$'] || configs['$'] || CoaError.throw('Env.ConfigNotFound', '配置信息不存在')
  }
}