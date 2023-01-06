<template>
  <div class="n-rcmd">
    <div class="v-hd2">
      <span class="tit f-ff2">个性化推荐</span>
    </div>
    <ul class="m-cvrlst clearfix">
      <li class="clearPaddLeft">
        <router-link to="/found/recommend/taste" class="u-date" title="每日歌曲推荐">
          <span class="head">{{ week }}</span>
          <span class="bd">{{ day }}</span>
          <span class="mask"></span>
        </router-link>
        <p class="dec">
          <router-link to="/found/recommend/taste" title="每日歌曲推荐" class="tit s-fc0">每日歌曲推荐</router-link>
        </p>
        <p class="idv s-fc4" title="根据你的口味生成，每天6:00更新">
          根据你的口味生成，<br />每天6:00更新
        </p>
      </li>
      <li v-for="(item,index) in recommendList" :key="item.id">
        <div class="u-cover">
          <img :src="item.picUrl + '?param=140y140'" alt="" />
          <router-link :to="`/found/playlist?id=${item.id}`" class="msk" :title="item.name"></router-link>
          <div class="bottom">
            <a href="javascript:;" title="播放" class="icon-play fr"></a>
            <span class="icon-headset"></span>
            <span class="nb">{{ item.playcount | newPlayCount }}</span>
          </div>
        </div>
        <p class="dec f-brk">
          <router-link :to="`/found/playlist?id=${item.id}`" :title="item.name" class="tit s-fc0">
            {{ item.name }}
          </router-link>
        </p>
        <p class="idv f-brk s-fc4" :title="idvTitle[index]">
          <em>{{ idvTitle[index] }}</em>
          <a href="javascript:;" class="btn s-bg s-bg-13">不感兴趣</a>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
import { getRecommendResource } from '@/api/disvocer'
import { mapState } from 'vuex'
export default {
  name: 'PersonalRec',
  filters: {
    newPlayCount(val){
      if(val >= 100000000){
        if(val === 100000000){
          return ((val/100000000) + '亿')
        }else{
          let newVal = (val/100000000).toFixed(2) + ''
          return (newVal.substring(0,newVal.length - 1) + '亿')
        }
      }
      if(val >= 10000){
        if(val === 10000){
          return ((val/10000) + '万')
        }else{
          let newVal = (val/10000).toFixed(2)
          if(newVal.substring(newVal.indexOf('.'),newVal.indexOf('.') + 2) == 0){
            return parseInt(val/10000) + '万'
          }else{
            return ((newVal.substring(0,newVal.length - 1)) + '万')
          }
        }
      }
      return val
    }
  },
  computed: {
    ...mapState('user',['cookie']),
    week(){
      let arr = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
      return arr[new Date().getDay()]
    },
    day(){
      return new Date().getDate()
    }
  },
  data(){
    return {
      recommendList: [], // 个性化推荐数据
      idvTitle: ['猜你喜欢','你可能感兴趣','根据常听推荐']
    }
  },
  methods: {
    // 获取个性化推荐数据
    async recommend(){
      try{
        let res = await getRecommendResource(this.cookie)
        if(res.code === 200){
          this.recommendList = res.recommend.splice(0,3)
        }else if(res.code === 302){
          throw 'cookie失效'
        }else{
          throw '获取个性化数据失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.recommend()
  }
}
</script>

<style lang="less" scoped>
.m-cvrlst{
  li{
    p{
      width: 100%;
    }
  }
  li p{
    width: 100%;
  }
  .u-date{
    position: relative;
    zoom: 1;
    display: block;
    width: 140px;
    height: 140px;
    background-position: 0 0;
    .head{
      display: block;
      height: 33px;
      line-height: 33px;
      color: #fed9d9;
      font-size: 14px;
      text-shadow: 0 -1px #962626;
      text-align: center;
    }
    .bd{
      display: block;
      line-height: 102px;
      text-align: center;
      font-size: 94px;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: bold;
      color: #202020;
    }
    .mask{
      position: absolute;
      top: 32px;
      left: 0;
      width: 142px;
      height: 107px;
      background-position: 0 -150px;
    }
  }
  .dec{
    a{
      height: auto;
      max-height: 36px;
      overflow: hidden;
    }
  }
  .idv{
    position: relative;
    z-index: 2;
    margin-top: 3px;
    &:hover{
      em{
        visibility: hidden;
      }
      .btn{
        display: block;
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 1;
      }
    }
    >em{
      min-height: 30px;
      display: inline-block;
    }
    .btn{
      display: none;
      width: 63px;
      height: 26px;
      margin-top: 0;
      text-align: center;
      line-height: 26px;
    }
  }
}
</style>
