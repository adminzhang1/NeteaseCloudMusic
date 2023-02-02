<template>
  <div class="g-bd2 clearfix">
    <div class="g-sd2">
      <div class="g-wrap4 n-sgernav">
        <h2 class="tit">推荐</h2>
        <ul class="nav clearfix">
          <li>
            <router-link to="/found/artist" :class="$route.fullPath==='/found/artist'?'z-slt':''">热门歌手</router-link>
          </li>
        </ul>
        <div class="blk" v-for="item in blkData">
          <h2 class="tit">{{ item.title }}</h2>
          <ul class="nav clearfix">
            <li v-for="it in item.children">
              <router-link :to="it.path" :class="$route.fullPath!=='/found/artist'&&area==item.area&&type==it.type?'z-slt':''">{{  it.tit }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="g-mn2">
      <div class="g-wrap">
        <div class="u-title clearfix">
          <h3>
            <span class="f-ff2" v-if="$route.fullPath==='/found/artist'">热门歌手</span>
            <span class="f-ff2" v-else>{{ blkData.filter(item=>item.area==$route.query.area)[0].children.filter(it=>it.type==$route.query.type)[0].tit }}</span>
          </h3>
        </div>
        <ul class="n-ltlst clearfix" v-if="$route.fullPath!=='/found/artist'">
          <li v-for="item in ltlist">
            <router-link :to="`/found/artist?type=1&area=7&initial=${item.initial}`"
              :class="'s-fs0 '+(initial==item.initial?'z-slt ':'')+(item.initial==-1||item.initial==0?'ch':'')"
            >{{ item.tit }}</router-link>
          </li>
        </ul>
        <div class="m-sgerlist">
          <ul class="m-cvrlst m-cvrlst-5 clearfix">
            <li v-for="(item,index) in Artists" :class="index<10?index<5?'':'line':'sml'">
              <template v-if="index<10">
                <div class="u-cover u-cover-5">
                  <img :src="item.img1v1Url+'?param=130y130'" alt="" />
                  <router-link :to="`/artist?id=${item.id}`" class="msk" :title="item.name+'的音乐'"></router-link>
                </div>
                <p>
                  <router-link :to="`/artist?id=${item.id}`" class="nm nm-icn f-thide s-fc0" :title="item.name+'的音乐'">{{ item.name }}</router-link>
                  <router-link :to="`/user/home?id=${item.accountId}`" class="icn u-icn u-icn-5" v-if="item.accountId"></router-link>
                </p>
              </template>
              <template v-else>
                <router-link :to="`/artist?id=${item.id}`" class="nm nm-icn f-thide s-fc0" :title="item.name+'的音乐'">{{ item.name }}</router-link>
                <router-link :to="`/user/home?id=${item.accountId}`" class="icn u-icn u-icn-5" v-if="item.accountId"></router-link>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ltlist } from '@/utils/module'
import { getTopArtists,getArtistsList } from '@/api/artist'
import { init } from 'events'
export default {
  name: 'Artist',
  data(){
    return {
      ltlist: [], // 姓名选择
      limit: 100, // 取出歌手数量
      area: 7,
      type: 1,
      initial: -1,
      blkData: [], // 左侧导航数据
      Artists: [], // 热门歌手
    }
  },
  methods: {
    // 获取热门歌手数据
    async topArtistsData(limit){
      try{
        let res = await getTopArtists(limit)
        if(res.code === 200){
          this.Artists = res.artists
        }else{
          throw '获取热门歌手数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取歌手数据
    async artistListData(limit,area,type,initial){
      try{
        let res = await getArtistsList(limit,area,type,initial)
        if(res.code === 200){
          this.Artists = res.artists
        }else{
          throw '获取热门歌手数据失败'
        }
      }catch(e){
        throw e
      }
    },
  },
  created(){
    this.blkData = Object.freeze([
      {
        title: '华语',
        area: 7,
        children: [
          {
            tit: '华语男歌手',
            type: 1,
            path: '/found/artist?type=1&area=7'
          },
          {
            tit: '华语女歌手',
            type: 2,
            path: '/found/artist?type=2&area=7'
          },
          {
            tit: '华语组合/乐队',
            type: 3,
            path: '/found/artist?type=3&area=7'
          },
        ]
      },
      {
        title: '欧美',
        area: 96,
        children: [
          {
            tit: '欧美男歌手',
            type: 1,
            path: '/found/artist?type=1&area=96'
          },
          {
            tit: '欧美女歌手',
            type: 2,
            path: '/found/artist?type=2&area=96'
          },
          {
            tit: '欧美组合/乐队',
            type: 3,
            path: '/found/artist?type=3&area=96'
          },
        ]
      },
      {
        title: '日本',
        area: 8,
        children: [
          {
            tit: '日本男歌手',
            type: 1,
            path: '/found/artist?type=1&area=8'
          },
          {
            tit: '日本女歌手',
            type: 2,
            path: '/found/artist?type=2&area=8'
          },
          {
            tit: '日本组合/乐队',
            type: 3,
            path: '/found/artist?type=3&area=8'
          },
        ]
      },
      {
        title: '韩国',
        area: 16,
        children: [
          {
            tit: '韩国男歌手',
            type: 1,
            path: '/found/artist?type=1&area=16'
          },
          {
            tit: '韩国女歌手',
            type: 2,
            path: '/found/artist?type=2&area=16'
          },
          {
            tit: '韩国组合/乐队',
            type: 3,
            path: '/found/artist?type=3&area=16'
          },
        ]
      },
      {
        title: '其他',
        area: 0,
        children: [
          {
            tit: '其他男歌手',
            type: 1,
            path: '/found/artist?type=1&area=0'
          },
          {
            tit: '其他女歌手',
            type: 2,
            path: '/found/artist?type=2&area=0'
          },
          {
            tit: '其他组合/乐队',
            type: 3,
            path: '/found/artist?type=3&area=0'
          },
        ]
      },
    ])
    this.ltlist = Object.freeze(ltlist)
  },
  watch: {
    '$route.query': {
      immediate: true,
      deep: true,
      handler(val){
        if(Object.keys(val).length===0){
          this.topArtistsData(this.limit)
        }else{
          this.topArtists = []
          let { type, area, initial } = val
          let typeList = ['1','2','3']
          let areaList = ['7','96','8','16','0']
          if(type&&area&&typeList.indexOf(type)!==-1&&areaList.indexOf(area)!==-1){
            this.type = type
            this.area = area
            if(initial){
              this.initial = initial
              this.artistListData(this.limit,area,type,initial)
            }else{
              this.artistListData(this.limit,area,type,this.initial)
            }
          }else{
            this.$router.replace('/found/artist?type=1&area=7')
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.n-sgernav{
  margin-top: 51px;
  .tit{
    height: 25px;
    padding-left: 14px;
    font-size: 16px;
    font-family: "Microsoft Yahei";
  }
  li,li a{
    float: left;
    width: 160px;
    height: 29px;
    line-height: 29px;
  }
  li{
    margin-bottom: 2px;
    a{
      width: 133px;
      padding-left: 27px;
      color: #333;
      background: url('@/assets/icons/singer.png') no-repeat 0 9999px;
      background-position: 0 -30px;
      &.z-slt,&.z-slt:hover{
        background-position: 0 0;
        text-decoration: none;
        color: #c20c0c;
      }
    }
  }
  .blk{
    margin: 5px 0 0;
    padding-top: 16px;
    border-top: 1px solid #d3d3d3;
  }
}
.m-sgerlist{
  .m-cvrlst{
    margin-top: 20px;
    li{
      padding-left: 17px;
      p{
        margin-top: 8px;
      }
    }
  }
}
.m-cvrlst-5{
  li{
    width: 130px;
    height: 154px;
    &:nth-child(1){
      padding-left: 0;
    }
    &:nth-child(5n+1){
      padding-left: 0;
    }
    .nm-icn{
      float: left;
    }
    .u-icn-5{
      position: relative;
      float: right;
    }
  }
}
.u-cover-5{
  width: 130px;
  height: 130px;
}
</style>
