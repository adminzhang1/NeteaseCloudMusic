<template>
  <div class="g-btmbar" @mouseenter="handleMouseenter" @mouseleave="handleMouseleave">
    <div :class="'m-playbar '+(fix?'m-playbar-lock':'m-playbar-unlock')" :style="{top: show?'-53px':'-7px',visibility: 'visible'}">
      <div class="updn">
        <div class="left fl">
          <a href="javascript:;" hidefocus="true" class="btn" @click="lock(!fix)"></a>
        </div>
        <div class="right fl"></div>
      </div>
      <div class="bg"></div>
      <!-- 展开 -->
      <div class="hand"></div>
      <!-- 主要功能区 -->
      <div class="wrap">
        <!-- 上一首、下一首、暂停/播放 -->
        <div class="btns">
          <a href="javascript:;" hidefocus="true" class="prv" @click="preSong">上一首</a>
          <a href="javascript:;" hidefocus="true" :class="!play?'ply':'ply pas'" @click="handlePlay">暂停/播放</a>
          <a href="javascript:;" hidefocus="true" class="nxt" @click="nextSong">下一首</a>
        </div>
        <!-- 歌曲图片 -->
        <div class="head">
          <img :src="playingSongId?Songlist[songIndex].picUrl+'?param=34y34':'http://s4.music.126.net/style/web2/img/default/default_album.jpg'" alt="" />
          <router-link :to="`/song?id=${Songlist[songIndex].songId}`" hidefocus="true" class="mask" v-if="playingSongId"></router-link>
          <a href="javascript:;" hidefocus="true" class="mask" v-else></a>
        </div>
        <!-- 进度条 -->
        <div class="play">
          <!-- 歌曲名称和歌手名字 -->
          <div class="words">
            <router-link :to="`/song?id=${Songlist[songIndex].songId}`" :title="Songlist[songIndex].songName" class="f-thide name fc1 fl" v-if="playingSongId">{{ Songlist[songIndex].songName }}</router-link>
            <span class="by f-thide fl" v-if="playingSongId">
              <span :title="Songlist[songIndex].ar.map(a => a.name).join('/')">
                <template v-for="(ar,i) in Songlist[songIndex].ar">
                  <router-link :to="`/artist?id=${ar.id}`" hidefocus="true">{{ ar.name }}</router-link>{{ i===Songlist[songIndex].ar.length-1?'':'/' }}</template>
              </span>
            </span>
            <router-link :to="`/playlist?id=${Songlist[songIndex].playId}`" class="src" title="来自歌单" @click.native="close" v-if="playingSongId&&Songlist[songIndex].playId"></router-link>
          </div>
          <!-- 进度条 -->
          <div class="m-pbar">
            <!-- 进度 -->
            <div class="barbg">
              <!-- 缓冲条 -->
              <div class="rdy" :style="{width: buffEnd+'%'}"></div>
              <!-- 进度条 -->
              <div class="cur" :style="{width: currTime+'%'}">
                <!-- z-load -->
                <span :class="'btn '+(songLoading?'':'z-load')">
                  <i></i>
                </span>
              </div>
            </div>
            <!-- 时长 -->
            <span class="time">
              <template v-if="Songlist.length===0">
                <em>00:00</em>/00:00
              </template>
              <template v-else>
                <em>{{ time | duration }}</em>/{{ Songlist[songIndex].dt | duration }}
              </template>
            </span>
          </div>
        </div>
        <!-- 操作按钮（左） -->
        <div class="oper fl">
          <a href="javascript:;" hidefocus="true" class="icn icn-pip" title="画中画歌词">画中画歌词</a>
          <a href="javascript:;" hidefocus="true" class="icn icn-add" title="收藏">收藏</a>
          <a href="javascript:;" hidefocus="true" class="icn icn-share" title="分享">分享</a>
        </div>
        <!-- 操作按钮（右） -->
        <div class="ctrl fl pr">
          <!-- 音量 -->
          <div class="m-vol" :style="{visibility: 'hidden'}"></div>
          <!-- 音量按钮 -->
          <a href="javascript:;" hidefocus="true" class="icn icn-vol"></a>
          <!-- 循环按钮 -->
          <a href="javascript:;" hidefocus="true" class="icn icn-loop" title="循环"></a>
          <!-- 歌单 -->
          <span class="add pr" @click="handleListShow">
            <span class="tip" :style="{display: playlistTip?'block':'none'}">{{ msg }}</span>
            <a href="javascript:;" hidefocus="true" class="icn icn-list s-fc3" title="播放列表">{{ Songlist.length }}</a>
          </span>
          <!-- 循环提示 -->
          <div class="tip tip-1" :style="{display: 'none'}">{{ msg }}</div>
        </div>
      </div>
      <!-- 播放列表 -->
      <div class="list" v-show="listShow">
        <!-- 表头 -->
        <div class="listhd">
          <div class="listhdc">
            <h4>播放列表({{ Songlist.length }})</h4>
            <a href="javascript:;" class="addall">
              <span class="ico ico-add"></span>收藏全部
            </a>
            <span class="line"></span>
            <a href="javascript:;" class="clear" @click="clear" >
              <span class="ico icn-del"></span>清除
            </a>
            <p class="lytit f-ff0 f-thide">{{ '' }}</p>
            <span class="close" @click="close">关闭</span>
          </div>
        </div>
        <!-- 内容 -->
        <div class="listbd">
          <img class="imgbg" v-if="Songlist.length!==0&&playingSongId" :src="Songlist[songIndex].picUrl+'?imageView&blur=40x20'" alt="" style="top: -360px">
          <div class="msk"></div>
          <div class="listbdc">
            <div class="nocnt" v-show="Songlist.length===0">
              <i class="ico ico-face"></i>
              你还没有添加任何歌曲
              <br>
              去首页<router-link to="/" class="f-tdu" @click.native="clearList">发现音乐</router-link>，或在<router-link to="/my" class="f-tdu" @click.native="clearList">我的音乐</router-link>收听自己收藏的歌单。
            </div>
            <ul class="clearfix" @wheel.prevent="leftS" ref="list" v-show="Songlist.length!==0">
              <li v-for="item in Songlist" :key="item.songId" :class="playingSongId===item.songId?'z-sel':''" @click="clickSong(item.songId)">
                <!-- 是否正在播放 -->
                <div class="col col-1">
                  <div class="playicn" v-if="playingSongId===item.songId"></div>
                </div>
                <!-- 歌曲名字 -->
                <div class="col col-2">{{ item.songName }}</div>
                <!-- 功能按钮 -->
                <div class="col col-3">
                  <div class="icns">
                    <i class="ico icn-del" title="删除">删除</i>
                    <i class="ico ico-dl" title="下载">下载</i>
                    <i class="ico ico-share" title="分享">分享</i>
                    <i class="ico ico-add" title="收藏">收藏</i>
                  </div>
                </div>
                <!-- 歌手名字 -->
                <div class="col col-4">
                  <span :title="item.ar.map(a => a.name).join('/')">
                    <template v-for="(arr,i) in item.ar">
                      <router-link :to="`/artist?id=${arr.id}`" hidefocus="true">{{ arr.name }}</router-link>{{ i===item.ar.length-1?'':'/' }}
                    </template>
                  </span>
                </div>
                <div class="col col-5">{{ item.dt | duration }}</div>
                <!-- 来源歌单 -->
                <div class="col col-6">
                  <router-link :to="`/playlist?id=${item.playId}`" class="ico ico-src" @click.native="close" v-if="Songlist[songIndex].playId"></router-link>
                  <a href="javascript:;" class="ico ico-src ico-src-dis" v-else></a>
                </div>
              </li>
            </ul>
          </div>
          <div class="bline">
            <span class="scrol" :style="{top: listScrolTop+'px'}" ref="listScrol"></span>
          </div>
          <div class="ask">
            <a href="javascript:;" class="ico ico-ask"></a>
          </div>
          <!-- <div class="upload"></div> -->
          <div class="msk2"></div>
          <div class="listlyric"></div>
          <div class="bline bline-1">
            <span class="scrol" :style="{height: '260px',display: 'none',top: '0px'}"></span>
          </div>
        </div>
      </div>
    </div>
    <audio :src="songDetail.url?songDetail.url:''" class="au" ref="audio">{{  }}</audio>
  </div>
</template>

<script>
import { mapState,mapMutations,mapActions } from 'vuex'
export default {
  name: 'MusicPlayer',
  computed: {
    ...mapState('music',['show','fix','playingSongId','play','songLoading','songIndex','Songlist','songDetail','listShow']),
    // a(){
    //   // console.log(this.Songlist.length)
    //   // console.log(this.$refs)
    //   if(this.Songlist.length === 0){
    //     this.$nextTick(() => {
    //       this.$refs.listScrol.style.height = '260px'
    //       this.$refs.listScrol.style.display = 'none'
    //     })
    //   }else{
    //     this.$nextTick(() =>{
    //       console.log(this.$refs)
    //       if(this.$refs.list.clientHeight<260){
    //         this.$refs.listScrol.style.height = '260px'
    //         this.$refs.listScrol.style.display = 'none'
    //       }else{
    //         this.$refs.listScrol.style.height = ((260/this.$refs.list.clientHeight)*260).toFixed(3)+'px'
    //         this.$refs.listScrol.style.display = 'block'
    //       }
    //     })
    //   }
    //   return
    // }
  },
  data(){
    return {
      time: 0,
      buffEnd: 0, // 缓冲比例
      currTime: 0, // 播放比例
      msg: '',
      playlistTip: false,
      listScrolTop: 0, // 歌曲列表距离头部的距离
    }
  },
  methods: {
    ...mapMutations('music',['expansion','conceal','lock','handleListShow','clearList','clearPlaylist']),
    ...mapActions('music',['handlePlay','nextSong','preSong','clickSong']),
    // 移入显示
    handleMouseenter(){
      this.$bus.$emit('forbidScroll',false)
      if(!this.fix){
        this.expansion()
      }
    },
    // 移出隐藏
    handleMouseleave(){
      this.$bus.$emit('forbidScroll',true)
      if(this.fix===true||this.listShow===true)return;
      setTimeout(() => {
        this.conceal()
      }, 500);
    },
    // 关闭歌单
    close(){
      this.clearList()
      this.$bus.$emit('forbidScroll',true)
    },
    // 缓冲进度
    handleBuff(){
      if(this.$refs.audio.buffered.length!==0){
        this.buffEnd = (parseInt(this.$refs.audio.buffered.end(this.$refs.audio.buffered.length-1))/(this.songDetail.time/1000)*100).toFixed(2)
      }
    },
    // 播放进度
    handleCurr(){
      this.time = parseInt(this.$refs.audio.currentTime)*1000
      this.currTime = (parseInt(this.$refs.audio.currentTime)/(this.songDetail.time/1000)*100).toFixed(2)
    },
    // 左侧歌曲列表的滚动事件
    leftS(e){
      let h = window.getComputedStyle(this.$refs.listScrol).height.replaceAll('px','')
      if(e.wheelDelta>0){
        if(this.listScrolTop - 4<0){
          this.listScrolTop = 0
          this.$refs.list.style.top = 0+'px'
        }else{
          this.listScrolTop -= 4
          this.$refs.list.style.top = '-'+this.listScrolTop/260*this.$refs.list.clientHeight+'px'
        }
      }else if(e.wheelDelta<0){
        if(this.listScrolTop+4+parseFloat(h)>260){
          this.listScrolTop = 260-parseFloat(h)
          this.$refs.list.style.top = '-'+(this.$refs.list.clientHeight-260)+'px'
        }else{
          this.listScrolTop += 4
          this.$refs.list.style.top = '-'+this.listScrolTop/260*this.$refs.list.clientHeight+'px'
        }
      }
    },
    // 清除歌单
    clear(){
      this.buffEnd = 0
      this.currTime = 0
      this.clearPlaylist()
    },
  },
  created(){
    this.buffEnd = 0
    this.currTime = 0
    this.$bus.$on('addPlayList',(msg) => {
      this.msg = msg
      this.playlistTip = true
      setTimeout(() => {
        this.playlistTip = false
      }, 3000);
    })
    this.$bus.$on('closeList',() => {
      this.clearList()
    })
  },
  mounted(){
    if(this.$refs.list.clientHeight<260){
      this.$refs.listScrol.style.height = '260px'
      this.$refs.listScrol.style.display = 'none'
    }else{
      this.$refs.listScrol.style.height = ((260/this.$refs.list.clientHeight)*260).toFixed(3)+'px'
      this.$refs.listScrol.style.display = 'block'
    }
    this.$refs.audio.addEventListener('loadedmetadata', (e) => {
      if(this.play){
        e.target.play()
      }else{
        e.target.pause()
      }
    })
    this.$refs.audio.addEventListener('ended', (e) => {
      this.nextSong()
    })
    // 获取总时长
    // this.$refs.audio.addEventListener('durationchange',() => {
    //   console.log('总时长',this.$refs.audio.duration)
    // })
    // 开始加载
    // this.$refs.audio.addEventListener('loadstart',() => {
    //   console.log(this.$refs.audio.buffered.length)
    // })
    // 缓冲进度
    // this.$refs.audio.addEventListener('progress',() => {
    //   if(this.$refs.audio.buffered.length!==0){
    //     // console.log(this.$refs.audio.buffered.start(this.$refs.audio.buffered.length-1)) 开始
    //     // console.log(this.$refs.audio.buffered.end(this.$refs.audio.buffered.length-1)) 结束
    //     this.buffEnd = parseInt(this.$refs.audio.buffered.end(this.$refs.audio.buffered.length-1))/(this.songDetail.time/1000)*100
    //   }
    // })
    // 播放事件
    // this.$refs.audio.addEventListener('timeupdate',() => {
    //   this.currTime = parseInt(this.$refs.audio.currentTime)/(this.songDetail.time/1000)*100
    // })
  },
  watch: {
    play: {
      handler(val){
        if(val){
          this.$refs.audio.addEventListener('progress',this.handleBuff)
          this.$refs.audio.addEventListener('timeupdate',this.handleCurr)
          if(this.playingSongId&&this.Songlist.length!==0){
            this.$refs.audio.play()
          }
        }else{
          this.$refs.audio.removeEventListener('progress',this.handleBuff)
          this.$refs.audio.removeEventListener('timeupdate',this.handleCurr)
          this.$refs.audio.pause()
        }
      }
    },
    Songlist: {
      immediate: true,
      deep: true,
      handler(val){
        if(val.length === 0){
          this.$nextTick(() => {
            this.$refs.listScrol.style.height = '260px'
            this.$refs.listScrol.style.display = 'none'
          })
        }else{
          this.$nextTick(() => {
            if((28*this.Songlist.length)<260){
              this.$refs.listScrol.style.height = '260px'
              this.$refs.listScrol.style.display = 'none'
            }else{
              this.$refs.listScrol.style.height = ((260/(28*this.Songlist.length))*260).toFixed(3)+'px'
              this.$refs.listScrol.style.display = 'block'
            }
          })
        }
      },
    },
  },
}
</script>

<style lang="less" scoped>
.g-btmbar{
  position: fixed;
  zoom: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1002;
}
.m-playbar .list li:hover .col, .m-playbar .list li:hover .col a, .m-playbar .list li:hover .col a:hover, .m-playbar .list li.z-sel .col, .m-playbar .list li.z-sel .col a, .m-playbar .list li.z-sel .col a:hover{
  color: #fff;
}
.m-playbar{
  position: absolute;
  zoom: 1;
  top: -53px;
  left: 0;
  width: 100%;
  height: 53px;
  margin: 0 auto;
  transition: top 0.5s;
  box-sizing: border-box;
  .hand{
    position: absolute;
    top: -10px;
    width: 100%;
    height: 20px;
    cursor: pointer;
  }
  .bg{
    height: 53px;
    zoom: 1;
    margin-right: 67px;
    background-position: 0 0;
    background-repeat: repeat-x;
  }
  .updn{
    position: relative;
    z-index: 11;
    .btn{
      display: block;
      width: 18px;
      height: 18px;
      margin: 6px 0 0 17px;
    }
    .left{
      position: absolute;
      top: -14px;
      right: 15px;
      width: 52px;
      height: 67px;
      background-position: 0 -380px;
    }
    .right{
      position: absolute;
      top: -1px;
      right: 0;
      width: 15px;
      height: 54px;
      background-position: -52px -393px;
      pointer-events: none;
    }
  }
  .wrap{
    position: absolute;
    left: 50%;
    top: 6px;
    z-index: 15;
    width: 980px;
    height: 47px;
    margin: 0 auto;
    transform: translateX(-50%);
  }
  .btns{
    width: 137px;
    padding: 6px 0 0 0;
    a{
      display: block;
      float: left;
      width: 28px;
      height: 28px;
      margin-right: 8px;
      margin-top: 5px;
      text-indent: -9999px;
    }
    .prv{
      background-position: 0 -130px;
      &:hover{
        background-position: -30px -130px;
      }
    }
    .nxt{
      background-position: -80px -130px;
      &:hover{
        background-position: -110px -130px;
      }
    }
    .ply{
      width: 36px;
      height: 36px;
      margin-top: 0;
      background-position: 0 -204px;
      &:hover{
        background-position: -40px -204px;
      }
    }
    .pas{
      background-position: 0 -165px;
      &:hover{
        background-position: -40px -165px;
      }
    }
  }
  .head,.head img{
    width: 34px;
    height: 34px;
  }
  .head{
    position: relative;
    margin: 6px 15px 0 0;
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 34px;
      height: 35px;
      background-position: 0 -80px;
    }
  }
  .play{
    position: relative;
    width: 581px;
  }
  .words{
    height: 28px;
    overflow: hidden;
    color: #e8e8e8;
    text-align: 0 1px 0 #171717;
    line-height: 28px;
    .src{
      float: left;
      width: 14px;
      height: 14px;
      margin: 7px 0 0 13px;
      background-position: -110px -103px;
      &:hover{
        background-position: -130px -103px;
      }
    }
    .name{
      max-width: 300px;
    }
    .fc1{
      color: #e8e8e8;
    }
    .by{
      max-width: 220px;
      margin-left: 15px;
      color: #9b9b9b;
      a{
        color: #9b9b9b;
      }
    }
  }
  .m-pbar{
    .time{
      position: absolute;
      top: -3px;
      right: -84px;
      color: #797979;
      text-shadow: 0 1px 0 #121212;
      em{
        color: #a1a1a1;
      }
    }
  }
  .icn{
    float: left;
    width: 25px;
    height: 25px;
    margin: 11px 2px 0 0;
    text-indent: -9999px;
  }
  .icn-pip{
    position: relative;
    background: url('https://p1.music.126.net/DLVi_1eymwAX8gDunfd2bg==/109951165524394991.png') no-repeat 0 0;
    &:hover,&:active{
      background-position-y: -25px;
    }
  }
  .icn-add{
    background-position: -88px -163px;
    &:hover{
      background-position: -88px -189px;
    }
  }
  .icn-share{
    background-position: -114px -163px;
    &:hover{
      background-position: -114px -189px;
    }
  }
  .icn-vol{
    background-position: -2px -248px;
    &:hover{
      background-position: -31px -248px;
    }
  }
  .icn-loop{
    background-position: -3px -344px;
    &:hover{
      background-position: -33px -344px;
    }
  }
  .icn-list{
    display: block;
    float: none;
    width: 38px;
    padding-left: 21px;
    background-position: -42px -68px;
    line-height: 27px;
    text-align: center;
    text-indent: 0;
    color: #666;
    text-decoration: none;
    text-shadow: 0 1px 0 #080707;
    &:hover{
      background-position: -42px -98px;
      text-decoration: none;
    }
  }
  .ctrl{
    position: relative;
    z-index: 10;
    width: 113px;
    padding-left: 13px;
    background-position: -147px -238px;
  }
  .add{
    float: left;
    width: 59px;
    height: 36px;
  }
  .tip{
    position: absolute;
    top: -51px;
    left: -65px;
    clear: both;
    width: 152px;
    height: 49px;
    background-position: 0 -287px;
    text-align: center;
    color: #fff;
    line-height: 37px;
  }
  .tip-1{
    top: -35px;
    left: 12px;
    width: 81px;
    height: 39px;
    line-height: 34px;
    background-position: 0 -457px;
  }
  .ico{
    height: 16px;
  }
  .ico-add{
    width: 16px;
    background-position: -24px 0;
  }
  .ico-add:hover,a:hover .ico-add{
    background-position: -24px -20px;
  }
  .icn-del{
    width: 13px;
    background-position: -51px 0;
  }
  .icn-del:hover,a:hover .icn-del{
    background-position: -51px -20px;
  }
  .ico-ask{
    display: inline-block;
    width: 21px;
    height: 21px;
    background-position: 0 -50px;
    text-indent: 0;
    &:hover{
      background-position: -24px -50px;
    }
  }
  .ico-src{
    width: 14px;
    margin-left: 0;
    background-position: -80px 0;
  }
  .ico-dl{
    width: 14px;
    background-position: -57px -50px;
  }
  .ico-dl:hover,a:hover .ico-dl{
    background-position: -80px -50px;
  }
  .ico-share{
    width: 14px;
    background-position: 0 0;
  }
  .ico-share:hover,a:hover .ico-share{
    background-position: 0 -20px;
  }
  .list{
    position: absolute;
    left: 50%;
    bottom: 47px;
    width: 986px;
    height: 301px;
    margin-left: -493px;
    .nocnt,.nocnt a{
      color: #aaa;
    }
    .nocnt{
      padding-top: 85px;
      text-align: center;
      line-height: 43px;
      .ico{
        float: none;
        display: inline-block;
        position: relative;
        top: -4px;
        width: 36px;
        height: 29px;
        margin-right: 3px;
        background-position: -138px 0;
        vertical-align: middle;
      }
    }
    ul{
      color: #ccc;
    }
    li{
      float: left;
      width: 100%;
      &.z-sel{
        background-color: rgba(0, 0, 0, .3);
      }
      &:hover{
        background-color: rgba(0, 0, 0, .4);
      }
    }
    li.z-sel .playicn,li:hover .icns,li.z-hover1 .icns{
      display: block;
    }
  }
  .listhd,.listbd{
    padding: 0 5px;
  }
  .listhd{
    background-position: 0 0;
    height: 41px;
  }
  .listhdc{
    position: relative;
    height: 40px;
    h4{
      position: absolute;
      left: 25px;
      top: 0;
      height: 39px;
      line-height: 39px;
      font-size: 14px;
      color: #e2e2e2;
    }
    a{
      color: #ccc;
      &:hover{
        color: #e2e2e2;
      }
    }
    .clear,.addall{
      position: absolute;
      left: 490px;
      top: 12px;
      height: 15px;
      line-height: 15px;
      cursor: pointer;
    }
    .addall{
      left: 398px;
    }
    .ico{
      float: left;
      margin: 1px 6px 0 0;
    }
    .line{
      position: absolute;
      top: 13px;
      left: 477px;
      height: 15px;
      border-left: 1px solid #000;
      border-right: 1px solid #2c2c2c;
    }
    .lytit{
      position: absolute;
      left: 595px;
      top: 0;
      width: 346px;
      height: 39px;
      text-align: center;
      line-height: 39px;
      color: #fff;
      font-size: 14px;
    }
    .close{
      position: absolute;
      top: 6px;
      right: 8px;
      width: 30px;
      height: 30px;
      overflow: hidden;
      text-indent: -999px;
      cursor: pointer;
      background-position: -195px 9px;
    }
  }
  .listbd{
    position: absolute;
    left: 0;
    top: 41px;
    width: 976px;
    height: 260px;
    overflow: hidden;
    background-position: -1014px 0;
    background-repeat: repeat-y;
    .scrol{
      position: absolute;
      left: 0;
      width: 4px;
      height: 100%;
      border-radius: 5px;
      cursor: pointer;
      background: #868686;
      border: 1px solid #a6a6a6;
      opacity: .8;
    }
    .bline{
      position: absolute;
      left: 555px;
      top: -1px;
      z-index: 2;
      width: 6px;
      height: 260px;
      background: #000;
      opacity: .5;
    }
    .bline-1{
      left: auto;
      right: 2px;
    }
  }
  .imgbg{
    position: absolute;
    left: 2px;
    top: -1px;
    z-index: 1;
    width: 980px;
    height: auto;
    opacity: .2;
  }
  .msk{
    position: absolute;
    left: 2px;
    top: 0;
    z-index: 2;
    width: 558px;
    height: 260px;
    background: #121212;
    opacity: .5;
  }
  .msk2{
    position: absolute;
    left: 560px;
    top: 0;
    z-index: 2;
    width: 420px;
    height: 250px;
    background: #121212;
    opacity: .01;
  }
  .ask{
    position: absolute;
    right: 25px;
    top: 12px;
    cursor: pointer;
    z-index: 5;
  }
  .listbdc{
    position: absolute;
    left: 2px;
    top: 0;
    z-index: 4;
    height: 260px;
    width: 553px;
    overflow: hidden;
    ul{
      position: relative;
      overflow: hidden;
    }
  }
  .listlyric{
    position: absolute;
    right: 40px;
    top: 0;
    z-index: 4;
    height: 219px;
    width: 354px;
    margin: 21px 0 20px 0;
    overflow: hidden;
  }
  .playicn{
    display: block;
    margin-top: 8px;
    width: 10px;
    height: 13px;
    background-position: -182px 0;
  }
  .col{
    float: left;
    padding-left: 10px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    cursor: pointer;
    a,a:hover{
      color: #9b9b9b;
    }
    .ico{
      float: right;
      overflow: hidden;
      margin: 7px 0 0 10px;
      text-indent: -9999px;
    }
    .ico-src:hover,a:hover .ico-src{
      background-position: -80px -20px;
    }
    .icns{
      display: none;
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;
      height: 23px;
    }
    .ico-src-dis,.ico-src-dis:hover{
      background-position: -100px 0;
      cursor: default;
    }
  }
  .col-2,.col-4{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .col-1{
    width: 10px;
  }
  .col-2{
    width: 256px;
  }
  .col-3{
    width: 78px;
    position: relative;
  }
  .col-4{
    width: 70px;
  }
  .col-5{
    width: 35px;
    color: #666;
  }
  .col-6{
    width: 37px;
    padding-left: 6px;
  }
}
.m-playbar-unlock{
  .updn{
    .btn{
      background-position: -80px -380px;
      &:hover{
        background-position: -80px -400px;
      }
    }
  }
}
.m-playbar-lock{
  .updn{
    .btn{
      background-position: -100px -380px;
      &:hover{
        background-position: -100px -400px;
      }
    }
  }
}
/*.au{
  position: fixed;
  top: 50px;
  left: 50px;
}*/
.m-vol{
  position: absolute;
  top: -113px;
  left: 9px;
  clear: both;
  width: 32px;
  height: 113px;
}
</style>
