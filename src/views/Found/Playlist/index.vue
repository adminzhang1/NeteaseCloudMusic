<template>
  <div class="g-bd">
    <div class="g-wrap pr" >
      <!-- 标题 -->
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">{{ cat }}</span>
          <a href="javascript:;" class="u-btn2 u-btn2-1 menu" id="cateToggleLink">
            <i>
              选择分类
              <em class="u-icn u-icn-38"></em>
            </i>
          </a>
        </h3>
        <div class="fr u-btn u-btn-hot">
          <router-link to="/found/playlist?order=hot" class="a1" v-if="cat === '全部'">热门</router-link>
          <router-link :to="`/found/playlist?cat=${cat}&order=hot`" class="a1" v-else>热门</router-link>
        </div>
      </div>
      <!-- 风格选择 -->
      <div :class="'n-sltlyr ' + (calssIsShow ? 'n-sltlyr-show' : '')">
        <div class="hd">
          <i class="icn"></i>
        </div>
        <div class="bd">
          <!-- 全部风格 -->
          <h3>
            <router-link to="/found/playlist" class="u-btn u-btn-g s-fc1">
              <em>全部风格</em>
            </router-link>
          </h3>
          <dl v-for="item in catList" class="clearfix" :key="item.category">
            <dt>
              <i :class="'u-icn ' + item.catClassIcon"></i>
              {{ item.catTitle }}
            </dt>
            <dd>
              <template v-for="arr in item.children">
                <router-link :to="`/found/playlist?cat=${arr}`" :class="'s-fc1 ' + (cat === arr ? 'z-slt' : '')" v-if="order !== 'hot'">{{ arr }}</router-link>
                <router-link :to="`/found/playlist?order=${order}&cat=${arr}`" :class="'s-fc1 ' + (cat === arr ? 'z-slt' : '')" v-else>{{ arr }}</router-link>
                <span class="line">|</span>
              </template>
            </dd>
          </dl>
        </div>
        <div class="ft"></div>
      </div>
      <!-- 歌单数据 -->
      <ul class="m-cvrlst clearfix">
        <li v-for="item in playlists" :key="item.id">
          <div class="u-cover">
            <img :src="item.coverImgUrl + '?param=140y140'" alt="" />
            <router-link :to="`/playlist?id=${item.id}`" :title="item.name" class="msk"></router-link>
            <div class="bottom">
              <a href="javascript:;" class="icon-play fr" title="播放"></a>
              <span class="icon-headset"></span>
              <span class="nb">{{ item.playCount | newPlayCount }}</span>
            </div>
          </div>
          <p class="dec">
            <router-link :to="`/playlist?id=${item.id}`" :title="item.name" class="tit f-thide s-fc0">{{ item.name }}</router-link>
          </p>
          <p>
            <span class="s-fc4">by</span>&nbsp;
            <router-link :to="`/user/home?id=${item.creator.userId}`" :title="item.creator.nickname" class="nm nm-icn f-thide s-fc3"> {{ item.creator.nickname }}</router-link>
            <img
              :src="item.creator.avatarDetail.identityIconUrl"
              alt=""
              :style="{
                height: '13px',
                width: '13px',
                display: 'inline-block',
                verticalAlign: 'middle'
              }"
              v-if="item.creator.avatarDetail" />
          </p>
        </li>
      </ul>
      <!-- 步进器 -->
      <Stepper :total="total" :pageSize="pageSize" :page="page" @setNewPage="updateNewPage" />
    </div>
  </div>
</template>

<script>
import Stepper from '@/components/Stepper'
import { getPlaylistCatlist,getTopPlaylist } from '@/api/playlist'
export default {
  name: 'Playlist',
  components: {
    Stepper,
  },
  filters: {
    newPlayCount(val){
      if(val >= 1000000){
        return parseInt(val/10000) + '万'
      }
      return val
    }
  },
  data(){
    return {
      calssIsShow: false, // 是否展示分类选择框
      cat: '全部', // 分类
      order: '', // 热门(没啥用)
      pageSize: 35, // 每页的数量
      page: 1,
      offset: 0, // 偏移量
      total: 0, // 数据总数
      catList: [], // 分类列表
      playlists: [], // 歌单数据列表
    }
  },
  methods: {
    // 分类列表显示与隐藏
    setCatShow(data){
      if(data === undefined){
        this.calssIsShow = !this.calssIsShow
      }else{
        this.calssIsShow = data
      }
    },
    // 更新页数
    updateNewPage(newPage){
      this.offset = (newPage - 1) * this.pageSize
      this.page = newPage
      this.topPlaylist()
    },
    // 获取歌曲分类
    async playCat(){
      try{
        let res = await getPlaylistCatlist()
        if(res.code === 200){
          let CatClass = ['语种','风格','场景','情感','主题']
          let CatClassIcon = ['u-icn-71','u-icn-6','u-icn-7','u-icn-8','u-icn-9']
          let category = []
          res.sub.forEach(item => {
            if(category.indexOf(item.category) === -1){
              category.push(item.category)
            }
          });
          category = category.sort()
          let Cat = category.map(item => ({
            category: item,
            catTitle: CatClass[item],
            catClassIcon: CatClassIcon[item],
            children: []
          }))
          res.sub.forEach(item => {
            Cat.forEach(i => {
              if(item.category === i.category){
                i.children.push(item.name)
              }
            })
          })
          this.catList = Cat
        }else{
          throw '获取歌单分类失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取歌单数据
    async topPlaylist(){
      try{
        let res = await getTopPlaylist(this.cat,this.order,this.pageSize,this.offset)
        if(res.code === 200){
          this.playlists = res.playlists
          this.total = res.total
        }else{
          throw '获取歌单数据失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.playCat()
    this.topPlaylist()
  },
  mounted(){
    this.$bus.$on('setCatShow',this.setCatShow)
  },
  beforeDestroy(){
    this.$bus.$off('setCatShow')
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(newVal){
        this.order = newVal.order === 'hot' ? 'hot' : ''
        this.cat = newVal.cat ? newVal.cat : '全部'
        this.total = 0
        this.page = 1
        this.offset = 0
        this.topPlaylist()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.g-wrap{
  .u-title{
    h3{
      float: left;
      font-size: 24px;
      font-weight: normal;
    }
    .menu{
      font-size: 12px;
      font-weight: normal;
      margin: 2px 0 0 12px;
      i{
        padding: 0 10px 0 15px;
        color: #0c73c2;
        pointer-events: none;
      }
      .u-icn-38{
        margin-left: 5px;
      }
    }
    .u-btn a:hover{
      text-decoration: underline;
    }
  }
  .n-sltlyr{
    left: 0;
    display: none;
    position: absolute;
    top: 75px;
    z-index: 5;
    width: 720px;
    .icn{
      position: absolute;
      top: 2px;
      left: 132px;
      display: inline-block;
      width: 24px;
      height: 11px;
      background-position: -48px 0;
      vertical-align: middle;
    }
    .hd{
      height: 32px;
    }
    .bd{
      width: 700px;
      padding: 0 10px;
      background-position: -720px 0;
      background-repeat: repeat-y;
      h3{
        height: 37px;
        padding-left: 26px;
        border-bottom: 1px solid #e6e6e6;
        font-weight: normal;
      }
      .u-icn{
        margin-right: 8px;
        margin-bottom: 4px;
      }
      dt{
        float: left;
        display: inline;
        width: 70px;
        margin: 0 -100px 0 26px;
        padding-top: 15px;
        border-right: 1px solid #e6e6e6;
        font-weight: bold;
      }
      dd{
        margin-left: 96px;
        padding: 16px 15px 0 15px;
        border-left: 1px solid #e6e6e6;
        line-height: 24px;
        a{
          white-space: nowrap;
          &:hover{
            text-decoration: underline;
          }
        }
        .line{
          margin: 0 8px 0 10px;
          color: #d8d8d8;
        }
        .z-slt{
          background: #a7a7a7;
          color: #fff;
          padding: 2px 6px;
        }
      }
    }
    .ft{
      height: 20px;
      background-position: -1440px -12px;
    }
  }
  .n-sltlyr-show{
    display: block;
  }
  .m-cvrlst{
    margin-top: 30px;
    li{
      float: left;
      display: block;
      width: 140px;
      height: 188px;
      overflow: hidden;
      padding: 0 0 30px 50px;
      line-height: 1.4;
      &:nth-child(1){
        padding-left: 0;
      }
      &:nth-child(5n+1){
        padding-left: 0;
      }
      .nm-icn{
        max-width: 76%;
      }
    }
    .u-cover{
      position: relative;
      display: block;
      width: 140px;
      height: 140px;
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
      .msk{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: 0 0;
      }
      .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 27px;
        background-position: 0 -537px;
        color: #ccc;
        .icon-play:hover{
          background-position: 0 -60px;
        }
        .icon-headset{
          float: left;
          width: 14px;
          height: 11px;
          background-position: 0 -24px;
          margin: 9px 5px 9px 10px;
        }
        .nb{
          float: left;
          margin: 7px 0 0 0;
        }
      }
      .u-jp{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .dec{
      margin: 8px 0 3px;
      font-size: 14px;
      a:hover{
        text-decoration: underline;
      }
      .tit{
        display: inline-block;
        max-width: 100%;
        vertical-align: middle;
        i{
          position: relative;
          top: -1px;
          margin-right: 3px;
          vertical-align: middle;
        }
        .u-icn{
          margin-top: -1px;
        }
      }
    }
    .nm{
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>
