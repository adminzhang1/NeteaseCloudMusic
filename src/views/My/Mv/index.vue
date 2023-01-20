<template>
  <div class="g-mn3">
    <div class="g-wrap">
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">我的视频（{{ userSubcount.mvCount }}）</span>
        </h3>
      </div>
      <Loading v-if="load" />
      <ul class="n-favmv m-mvlist m-mvlist-1 clearfix" v-if="!load">
        <li v-for="item in mvList" :key="item.vid">
          <div class="cover pr">
            <img :src="item.coverUrl+'?param=159y90'" alt="" />
            <p class="tr u-msk u-msk-1">
              <span class="u-icn2 u-icn2-mv"></span>{{ item.playTime | formatMvCount }}
            </p>
            <p class="bl u-msk u-msk-2">{{ item.durationms | duration }}</p>
            <router-link :to="`/video?id=${item.vid}`" class="link"></router-link>
          </div>
          <h4 class="title f-thide">
            <router-link :to="`/video?id=${item.vid}`" class="s-fc0">{{ item.title }}</router-link>
          </h4>
          <h5 class="name f-thide">
            by
            <template v-for="(ar,i) in item.creator">
              <router-link :to="`/user/home?id=${ar.userId}`" class="s-fc3">{{ ar.userName }}</router-link>{{ i===item.creator.length-1?'':'/' }}
            </template>
          </h5>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getMvSublist } from '@/api/user'
export default {
  name: 'Mv',
  data(){
    return {
      load: false,
      mvList: [],
    }
  },
  methods: {
    // 获取用户收藏mv
    async mvSublistData(){
      try{
        this.load = true
        let res = await getMvSublist(this.cookie)
        if(res.code === 200){
          this.mvList = res.data
        }else{
          throw '获取用户收藏mv失败'
        }
        this.load = false
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.mvSublistData()
  }
}
</script>

<style lang="less" scoped>
.n-favmv{
  padding-top: 11px;
}
.m-mvlist{
  margin-left: -26px;
  li{
    float: left;
    width: 159px;
    padding: 0 0 40px 26px;
    line-height: 1.5;
    overflow: hidden;
    img{
      width: 100%;
      height: 90px;
    }
  }
  .cover{
    width: 159px;
    height: 90px;
    .link{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
    }
  }
  .title{
    width: 100%;
    height: auto;
    margin: 7px 0 1px;
    border: none;
    font-size: 14px;
    font-weight: normal;
  }
  .name{
    width: 100%;
    font-weight: normal;
  }
  .tr{
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    line-height: 20px;
    padding-right: 5px;
    color: #fff;
    box-sizing: border-box;
    text-align: right;
    text-shadow: -2px 1px rgb(0 0 0 / 40%);
  }
  .bl{
    position: absolute;
    bottom: 0;
    left: 0;
    height: 20px;
    line-height: 20px;
    padding-left: 5px;
    color: #fff;
    text-shadow: -2px 1px rgb(0 0 0 / 40%);
  }
  .u-icn2-mv{
    margin: -2px 2px 0 0;
  }
}
.m-mvlist-1{
  margin-left: -8px;
  li{
    padding:  0 0 25px 8px;
  }
}
</style>
