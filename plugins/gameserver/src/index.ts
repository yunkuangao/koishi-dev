import {Context, Dict, Schema} from 'koishi'

import Gamedig from 'gamedig'

export const name = 'gameserver'

export interface Config {
  server: Dict<String, any>
}

export const schema = Schema.dict(Schema.object({
  type: Schema.string().required(),
  host: Schema.string().required(),
}).required())

export function apply(ctx: Context, config: Config) {
  ctx.command("server <server>")
    .action((_, server) => {

      const currentType = config[server].type
      const currentHost = config[server].host

      if (currentHost != null) {
        return Gamedig.query({
          type: currentType,
          host: currentHost,
        }).then((data) => {
          return `
服务器名称 : ${data.name}
密码 : ${ data.password==true ? '有':'无'}
地图 : ${data.map}
appId : ${data.raw.appId}
玩家数 : ${data.raw.numplayers}
bot数 : ${data.raw.numbots}
最大允许玩家数 : ${data.maxplayers}
连接:${data.connect}
          `
        }).catch((error) => {
          console.log("Server is offline:" + error.toString());
          return "查询不到该服务器"
        });
      } else {
        return "无该服务器"
      }
    })
}
