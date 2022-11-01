import {Context, Schema} from 'koishi'

export const name = 'tianxing'

export interface Config {
  key: String
}

export const schema = Schema.object({
  key: Schema.string().required(),
})


export function apply(ctx: Context, config: Config) {
  ctx.command("地区 <area>")
    .usage("地区 重庆")
    .action((_, area) => {
      return ctx.http.get(`http://api.tianapi.com/citylookup/index?key=${config.key}&area=${area}`).then(data => {
        if (data.code == "200") {
          let result = ""
          for (const ar of data.newslist) {
            result += `
名称 : ${ar.areacn}
省份 : ${ar.provincecn}
城市 : ${ar.citycn}
级别 : ${ar.areatype == 1 ? "地市级" : "区县级"}
天气id : ${ar.areaid}
纬度 : ${ar.latitude}
精度 : ${ar.longitude}
行政代码 : ${ar.adcode}
`
          }
          return result
        } else {
          return data.msg
        }
      })
    })

  ctx.command("术语 <ct>")
    .usage("术语 IT")
    .action((_, ct) => {
      return ctx.http.get(`http://api.tianapi.com/pcterm/index?key=${config.key}&word=${ct}`).then(data => {
        if (data.code == "200") {
          let result = ""
          for (const note of data.newslist) {
            result += `
缩写 : ${note.abbr}
术语 : ${note.type}
说明 : ${note.notes}
         `
          }
          return result
        } else {
          return data.msg
        }
      })
    })

  ctx.command("花语 <flower>")
    .usage("花语 百合花")
    .action((_, flower) => {
      return ctx.http.get(`http://api.tianapi.com/huayu/index?key=${config.key}&word=${flower}`).then(data => {
        if (data.code == "200") {
          let result = ""
          for (const flower of data.newslist) {
            result += `
花名 : ${flower.cnflower}
英文 : ${flower.enflower}
花语 : ${flower.flowerlang}
箴言 : ${flower.flowerprov}
         `
          }
          return result
        } else {
          return data.msg
        }
      })
    })


  ctx.command("节假日 [year]")
    .usage("节假日")
    .action((_, year) => {
      year ??= new Date().getFullYear().toString()
      return ctx.http.get(`http://api.tianapi.com/jiejiari/index?key=${config.key}&date=${year}&type=1`).then(data => {
        if (data.code == "200") {
          let result = ""
          for (const gala of data.newslist) {
            result += gala.name + ":" + gala.holiday + "," + gala.tip + "\n"
          }
          return result
        } else {
          return data.msg
        }
      })
    })

  ctx.command("地名 <place>")
    .usage("地名 重庆")
    .action((_, place) => {
      return ctx.http.get(`http://api.tianapi.com/gjdm/index?key=${config.key}&word=${place}`).then(data => {
        if (data.code == "200") {
          let result = ""
          for (const flower of data.newslist) {
            result += `
地名 : ${flower.area}
历史 : ${flower.introduce}
         `
          }
          return result
        } else {
          return data.msg
        }
      })
    })
}
