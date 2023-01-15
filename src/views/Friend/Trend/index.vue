<template>
  <div class="g-bd5 clearfix">
    <div class="g-mn5">
      <div class="g-wrap8">
        <!-- 标题 -->
        <div class="u-title m-timeline-title">
          <h3>
            <span class="f-ff2">动态</span>
          </h3>
          <span class="btn u-dicn u-dicn-38 fr" title="发动态"></span>
        </div>
        <!-- 新歌消息 -->
        <div id="j-flag-newsongbar">
          <div class="m-newsongbar m-newsongbar-normal f-ff1">
            <i class="nicon"></i>
            近三个月有{{ newSongNum }}首新歌发布
            <router-link to="/friend/newsong" class="linktip">快去看看 ></router-link>
          </div>
        </div>
        <!-- 新动态(还没有找到接口) -->
        <!-- 动态信息 -->
        <div class="u-load s-fc4" v-if="islast && events">
          <i class="icn"></i>加载中...
        </div>
        <div class="m-timeline">
          <ul class="m-dlist">
            <li class="item" v-for="item in events" :key="item.id">
              <div class="gface">
                <router-link :to="`/user/home?id=${item.user.userId}`" class="ficon">
                  <img :src="item.user.avatarUrl+'?param=45y45'" alt="" />
                </router-link>
              </div>
              <div class="gcnt">
                <div class="dcntc">
                  <!-- 名字 -->
                  <div class="type f-fs1 pr">
                    <router-link :to="`/user/home?id=${item.user.userId}`" class="s-fc7">{{ item.user.nickname }}</router-link>
                    <span class="u-icn-new-wrap">
                      <img class="u-icn-new" :src="item.user.avatarDetail.identityIconUrl" alt="" v-if="item.user.avatarDetail" />
                    </span>
                    <span class="sep s-fc3">{{ item.type | type }}</span>
                  </div>
                  <!-- 时间 -->
                  <div class="time">
                    <a href="javascript:;" class="s-fc4">{{ item.showTime | time }}</a>
                  </div>
                  <!-- 文本 -->
                  <div class="text f-fs1 f-brk" v-html="dealText(JSON.parse(item.json).msg)"></div>
                  <!-- 内容 -->
                  <div class="j-flag">
                    <div class="card">内容太复杂,以后再写</div>
                    <!-- <div class="card" v-if="item.type === 22">1</div> -->
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="u-load s-fc4" v-if="islast && events.length!==0">
            <i class="icn"></i>加载中...
          </div>
        </div>
      </div>
    </div>
    <div class="g-sd5">
      <div class="n-frduser">
        <router-link :to="`/user/home?id=${detail.profile.userId}`" class="face">
          <img :src="detail.profile.avatarUrl+'?param=70y70'" alt="" />
        </router-link>
        <h5 class="f-thide">
          <router-link :to="`/user/home?id=${detail.profile.userId}`" class="s-fc1 f-fs1" :title="detail.profile.nickname">{{ detail.profile.nickname }}</router-link>
        </h5>
        <ul class="clearfix">
          <li>
            <router-link :to="`/user/event?id=${detail.userPoint.userId}`">
              <em>{{ detail.profile.eventCount }}</em>
              <span>动态</span>
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/follows?id=${detail.userPoint.userId}`">
              <em>{{ detail.profile.follows }}</em>
              <span>关注</span>
            </router-link>
          </li>
          <li>
            <router-link :to="`/user/fans?id=${detail.userPoint.userId}`">
              <em>{{ detail.profile.followeds }}</em>
              <span>粉丝</span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="g-wrap8">
        <div class="n-frdlist">
          <div class="hd clearfix">
            <h4>明星用户</h4>
            <a href="javascript:;" class="more">换一批</a>
          </div>
          <ul>
            明星用户数据几口暂时还没有找到
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEvent,getNewArtistSong } from '@/api/friend'
import { mapState,mapMutations } from 'vuex'
export default {
  name: 'Trend',
  computed: {
    ...mapState('user',['cookie','detail']),
  },
  filters: {
    type(val){
      let typeText = {
        18: '分享单曲',
        19: '分享专辑',
        17: '分享电台节目',
        28: '分享电台节目',
        22: '转发',
        39: '发布视频',
        35: '分享歌单',
        13: '分享歌单',
        24: '分享专栏文章',
        41: '分享视频',
        21: '分享视频',
      }
      return typeText[val]
    },
    time(val){
      let newDay = new Date().getDate()
      let oldDay = new Date(val).getDate()
      let h = new Date(val).getHours()
      let m = new Date(val).getMinutes()
      if(newDay-oldDay === 0){
        return `${h<10?'0'+h:h}:${m<10?'0'+m:m}`
      }else if(newDay-oldDay === 1){
        return `昨天${h<10?'0'+h:h}:${m<10?'0'+m:m}`
      }else{
        let mon = new Date(val).getMonth()+1
        let day = new Date(val).getDate()
        return `${mon}月${day}日 ${h<10?'0'+h:h}:${m<10?'0'+m:m}`
      }
    }
  },
  data(){
    return {
      events: [], // 动态数据
      lasttime: -1, // 上一页时间
      newSongNum: 0, // 新歌数量
      islast: false, // 是否在加载下一页
    }
  },
  methods: {
    ...mapMutations('login',['open']),
    // 获取动态数据
    async eventData(){
      try{
        this.islast = true
        let res = await getEvent(this.cookie,this.lasttime)
        this.islast = false
        if(res.code === 200){
          // console.log(JSON.parse(res.event[0].json).event)
          this.events = [...this.events,...res.event]
          this.lasttime = res.lasttime
        }else{
          throw '获取动态数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取新歌数量
    async newSongDate(){
      try{
        let res = await getNewArtistSong(this.cookie)
        if(res.code === 200){
          this.newSongNum = res.data.newSongCount
        }else{
          throw '获取新歌数量失败'
        }
      }catch(e){
        throw e
      }
    },
    dealText(val){
      let reg = /#.+#/
      val = val.replaceAll('\n','<br />')
      val = reg.exec(val) ? val.replaceAll(reg.exec(val)[0],`<a href='javascript:;' class='s-fc7'>${reg.exec(val)[0]}</a>`) : val
      return val
    },
    a(val){
      return val
    },
    // 滚动事件
    handleScroll(e){
      if(e.target.body.scrollHeight-window.scrollY-window.innerHeight<500){
        if(!this.islast){
          this.eventData()
        }
      }
    }
  },
  created(){
    window.addEventListener('scroll',this.handleScroll)
    this.newSongDate()
    this.eventData()
  },
}
</script>

<style lang="less" scoped>
.m-timeline-title{
  .btn{
    margin: 6px 0 0 10px;
    overflow: hidden;
    cursor: pointer;
  }
}
.m-newsongbar-normal{
  color: #000;
  text-align: left;
  background: rgba(35, 93, 157, 0.1);
  .nicon{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('@/assets/icons/iconnew80@2x.png');
    background-size: contain;
    vertical-align: top;
    margin-top: 7px;
    margin-right: 2px;
  }
  a{
    float: right;
    color: #235d9d;
  }
}
.m-newsongbar{
  display: block;
  height: 40px;
  line-height: 40px;
  margin: 16px 0;
  padding: 0 16px 0 12px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  letter-spacing: 1px;
}
.m-timeline{
  position: relative;
  zoom: 1;
  text-shadow: none;
  .head,.head h2,.m-dlist .item{
    border-color: #e8e8e9;
  }
}
.m-dlist{
  .time{
    margin-top: 7px;
  }
  .card{
    padding: 10px;
    margin: 4px 0 5px;
  }
}
.n-frduser{
  .face{
    position: absolute;
    top: 38px;
    left: 30px;
    width: 70px;
    height: 70px;
    img{
      display: block;
      width: 62px;
      height: 62px;
      padding: 2px;
      background: #fff;
      border: 1px solid #dadada;
    }
  }
  h5{
    position: absolute;
    top: 40px;
    left: 112px;
    width: 180px;
    font-size: 14px;
  }
  ul{
    position: absolute;
    top: 134px;
    left: 13px;
    overflow: hidden;
  }
  li{
    display: inline;
    float: left;
    margin: 0 2px 0 -2px;
    border-left: 1px solid #c2c2c2;
    a{
      display: block;
      padding: 0 20px;
      color: #666;
      &:hover{
        color: #0c73c2;
      }
    }
    em{
      display: block;
      padding: 0 0 9px;
      font-size: 20px;
      line-height: 20px;
      font-family: Arial;
    }
    i{
      display: block;
      padding: 0 0 0 2px;
    }
  }
}
.n-frdlist{
  margin: 0 0 20px;
  .hd{
    margin: 5px 0;
    padding: 0 0 5px;
    border-bottom: 1px solid #dcdcdc;
    .more{
      float: right;
      color: #666;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
