import env_fc from './env-fc'
import env_var from './env-var'

type EnvFc = typeof env_fc
type EnvVar = typeof env_var

export interface Dic<T> {
  [key: string]: T
}

export interface Env extends EnvFc, EnvVar {
}