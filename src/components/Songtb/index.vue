<template>
  <div class="n-songtb">
    <div class="u-title u-title-1 clearfix">
      <h3>
        <span class="f-ff2">歌曲列表</span>
      </h3>
      <span class="sub s-fc3">
        {{ trackCount }}首歌
      </span>
      <div class="more s-fc3">
        播放：
        <strong class="s-fc6">{{ playCount }}</strong>
        次
      </div>
      <div class="out out-list s-fc3">
        <i class="u-icn u-icn-95 fl"></i>
        <a href="javascript:;" class="des s-fc7">生成外链播放器</a>
      </div>
    </div>
    <div id="song-list-pre-cache">
      <div class="j-flag">
        <table class="m-table">
          <thead>
            <tr>
              <th class="first w1">
                <div class="wp"></div>
              </th>
              <th>
                <div class="wp af0"></div>
              </th>
              <th class="w2">
                <div class="wp">时长</div>
              </th>
              <th class="w3">
                <div class="wp">歌手</div>
              </th>
              <th class="w4">
                <div class="wp">专辑</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tracks" :class="index%2 === 0 ? 'even' : ''">
              <!-- 序号 -->
              <td class="left">
                <div class="hd">
                  <span class="ply"></span>
                  <span class="num">{{ index + 1 }}</span>
                </div>
              </td>
              <!-- 歌曲标题 -->
              <td>
                <div class="clearfix">
                  <div class="tt">
                    <div class="ttc">
                      <span class="txt">
                        <router-link :to="`/song?id=${item.id}`">
                          <b :title="item.name+' - '+item.alia.join('')">{{ item.name }}</b>
                        </router-link>
                        <span class="s-fc8" :title="item.alia.join('')" v-if="item.alia.length">{{ ` - (${item.alia.join('')})` }}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <!-- 时长 -->
              <td class="s-fc3">
                <span class="u-dur">{{ item.dt | duration }}</span>
                <div class="opt hshow">
                  <a href="javascript:;" class="u-icn u-icn-81 icn-add" title="添加到播放列表"></a>
                  <span class="icn icn-fav" title="播放"></span>
                  <span class="icn icn-share" title="分享"></span>
                  <span class="icn icn-dl" title="下载"></span>
                </div>
              </td>
              <!-- 歌手 -->
              <td>
                <div class="text" :title="item.ar.map(a => a.name).join('/')">
                  <span :title="item.ar.map(a => a.name).join('/')">
                    <template v-for="(a,i) in item.ar">
                      <router-link :to="`/artist?id=${a.id}`" hidefocus="true">{{ a.name }}</router-link>
                      {{ i === item.ar.length - 1 ? '' : '/' }}
                    </template>
                  </span>
                </div>
              </td>
              <!-- 专辑 -->
              <td>
                <div class="text">
                  <router-link :to="`/album?id=${item.al.id}`" :title="item.al.name">{{ item.al.name }}</router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <dowclient />
  </div>
</template>

<script>
import dowclient from '@/components/Downloadclient'
export default {
  name: 'Songtb',
  components: {
    dowclient
  },
  props: ['tracks','trackCount','playCount'],
  filters: {
    duration(val){
      val = parseInt(val/1000)
      let minutes = parseInt(val/60)
      let seconds = val - (minutes * 60)
      return `${minutes < 10 ? '0' + minutes :minutes}:${seconds < 10 ? '0' + seconds :seconds}`
    }
  },
  data(){
    return {
      // count: 0,
      // track: [],
      // playunm: 0,
    }
  },
  watch: {
    // tracks: {
    //   handler(val){
    //     if(val){
    //       this.track = val
    //     }
    //   }
    // },
    // trackCount: {
    //   handler(val){
    //     if(val){
    //       this.count = val
    //     }
    //   }
    // },
    // playCount: {
    //   handler(val){
    //     if(val){
    //       this.playunm = val
    //     }
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.n-songtb{
  margin-top: 27px;
  .u-title-1{
    height: 33px;
    h3{
      font-size: 20px;
      line-height: 28px;
    }
    .sub{
      margin: 9px 0 0 20px;
    }
    .more{
      margin-top: 5px;
    }
    .out{
      margin-top: 5px;
      float: right;
    }
  }
  .m-table{
    th.first .wp{
      background: none;
    }
    .af0::after{
      content: '歌曲标题';
    }
  }
}
</style>
