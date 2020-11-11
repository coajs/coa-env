import { CoaError } from 'coa-error'

export class CoaEnv {

  public readonly runEnv: string
  public readonly runEnvType: 'd' | 't' | 'v' | string
  public readonly runEnvName: 'alpha' | 'beta' | 'online' | 'unknown' | string
  public readonly cwd: string
  public readonly name: string
  public readonly isProd: boolean
  public readonly isOnline: boolean
  public readonly hostname: string
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

  getConfig<T> (configs: { $?: T, d?: T, t?: T, v?: T, d0?: T, d1?: T, t1?: T, v1?: T }) {
    return configs[this.runEnv as '$'] || configs[this.runEnvType as '$'] || configs['$'] || CoaError.throw('Env.ConfigNotFound', '配置信息不存在')
  }
}