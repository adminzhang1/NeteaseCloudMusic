<template>
  <div class="m-lycifo">
    <!-- 歌曲信息 -->
    <div class="clearfix">
      <!-- 歌曲图片 -->
      <div class="cvrwrap pr clearfix">
        <div class="u-cover u-cover-6 fl">
          <img :src="songDetail.al?.picUrl+'?param=130y130'" alt="">
          <span class="msk f-alpha"></span>
        </div>
        <div class="out s-fc3">
          <i class="u-icn u-icn-95 fl"></i>
          <a href="javascript:;" class="des s-fc7">生成外链播放器</a>
        </div>
      </div>
      <!-- 歌曲详情 -->
      <div class="cnt">
        <!-- 歌名 -->
        <div class="hd">
          <i class="lab u-icn u-icn-37"></i>
          <div class="tit">
            <em class="f-ff2">{{ songDetail.name }}</em>
            <router-link :to="`/mv?id=${songDetail.mv}`" title="播放mv" v-if="songDetail.mv!==0">
              <i class="icn u-icn u-icn-2"></i>
            </router-link>
            <div class="subtit f-fs1 f-ff2" v-if="songDetail.tns">{{ songDetail.tns.join('') }}</div>
          </div>
        </div>
        <!-- 歌手 -->
        <p class="des s-fc4">
          歌手：<span :title="songDetail.ar?.map(item => item.name).join('/')">
            <template v-for="(ar,i) in songDetail.ar">
              <router-link :to="`/artist?id=${ar.id}`" class="s-fc7">{{ ar.name }}</router-link>
              {{ i===songDetail.ar.length-1?'':'/' }}
            </template>
          </span>
        </p>
        <!-- 专辑 -->
        <p class="des s-fc4">
          所属专辑：<router-link :to="`/album?id=${songDetail.al?.id}`" class="s-fc7">{{ songDetail.al?.name }}</router-link>
        </p>
        <!-- 操作按钮 -->
        <div class="m-info">
          <SongBtns :commentToal="1" :songDetail="playSong" />
        </div>
        <!-- 歌词 -->
        <div class="bd bd-open f-brk f-ib">
          <template v-if="tlrc.length===0">
            <template v-if="lrc.length<13">
              <template v-for="item in lrc">{{ item.text }}<br /></template>
            </template>
            <template v-else>
              <template v-for="item in lrc.slice(0,13)">
                {{ item.text }}<br />
              </template>
              <div :class="hideLrc?'':'f-hide'">
                <template v-for="(item,index) in lrc.slice(13)">
                  {{ item.text }}<br v-if="index!==lrc.slice(13).length-1"/>
                </template>
              </div>
              <div class="crl">
                <a href="javascript:;" @click="hideLrc = !hideLrc" class="s-fc7">{{ hideLrc?'收起':'展开' }}<i :class="'u-icn '+(hideLrc?'u-icn-70':'u-icn-69')"></i></a>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-if="tlrc.length<6">
              <template v-for="item in tlrc">{{ item.text }}<br />{{ item.tText }}<br /></template>
            </template>
            <template v-else>
              <template v-for="item in tlrc.slice(0,6)">
                {{ item.text }}<br />{{ item.tText }}<br v-if="item.tText" />
              </template>
              <div :class="hideLrc?'':'f-hide'">
                <template v-for="(item,index) in tlrc.slice(6)">
                  {{ item.text }}<br v-if="index!==tlrc.slice(6).length-1" />{{ item.tText }}<br v-if="index!==tlrc.slice(6).length-1" />
                </template>
              </div>
              <div class="crl">
                <a href="javascript:;" @click="hideLrc = !hideLrc" class="s-fc7">{{ hideLrc?'收起':'展开' }}<i :class="'u-icn '+(hideLrc?'u-icn-70':'u-icn-69')"></i></a>
              </div>
            </template>
          </template>
        </div>
      </div>
    </div>
    <!-- 报错按钮 -->
    <div class="lrc-user">
      <p>
        <router-link :to="`/lyric/report?id=${id}`" class="f-tdu s-fc4">报错</router-link>
      </p>
      <p class="s-fc3" v-if="songRic.lyricUser||songRic.transUser">
        {{ songRic.lyricUser?' 贡献滚动歌词：':'' }}
        <router-link :to="`/user/home?id=${songRic.lyricUser?.id}`" class="f-tdu s-fc7" v-if="songRic.lyricUser">{{ songRic.lyricUser?.nickname }}</router-link>
        {{ songRic.transUser?'&nbsp;&nbsp;&nbsp;&nbsp;贡献翻译：':'' }}
        <router-link :to="`/user/home?id=${songRic.transUser?.id}`" class="f-tdu s-fc7" v-if="songRic.transUser">{{ songRic.transUser?.nickname }}</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongInfo',
  props: {
    id: {
      type: Number,
      required: true,
    },
    songDetail: {
      type: Object,
      required: true,
    },
    songRic: {
      type: Object,
      required: true,
    },
    playSong: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      hideLrc: false, // 展开/收起
      lrc: [], // 主要歌词
      tlrc: [], // 带翻译歌词
    }
  },
  watch: {
    songRic: {
      immediate: true,
      deep: true,
      handler(val){
        if(val.lrc!==''&&val.lrc!==undefined){
          let lrc = val.lrc.split('\n')
          let nlrc = lrc.map(item => {
            if(item.indexOf(']') === -1){
              return {
                time: '',
                text: '',
              }
            }
            let time = item.substring(0,item.indexOf(']')+1)
            let text = item.substring(item.indexOf(']')+1).trim()
            return {
              time,
              text,
            }
          })
          if(val.tlyric!==''&&val.tlyric!==undefined){
            let tlrc = val.tlyric.split('\n')
            let ntlrc = tlrc.map(item => {
              if(item.indexOf(']') === -1){
                return {
                  time: '',
                  text: '',
                }
              }
              let time = item.substring(0,item.indexOf(']')+1)
              let text = item.substring(item.indexOf(']')+1).trim()
              return {
                time,
                text,
              }
            })
            this.tlrc = nlrc.map(item => {
              ntlrc.forEach(a => {
                if(item.time === a.time){
                  item.tText = a.text
                }
              })
              return item
            })
          }else{
            this.lrc = nlrc
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.u-cover-6{
  width: 198px;
  height: 198px;
  img{
    width: 130px;
    height: 130px;
    margin: 34px;
  }
  .msk{
    width: 206px;
    height: 205px;
    top: -4px;
    left: -4px;
    background-position: -140px -580px;
  }
}
</style>
