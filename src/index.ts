import env_fc from './env-fc'
import env_var from './env-var'

export { Env } from './typing'
export const env = env_fc.set(env_var)

if (env.envBase) {
  require(env.envBase).default(env)
}