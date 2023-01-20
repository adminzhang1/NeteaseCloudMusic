<template>
  <div class="g-mn3 pr">
    <div class="g-wrap">
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">我的歌手（{{ userSubcount.artistCount }}）</span>
        </h3>
      </div>
      <div class="n-singer">
        <Loading v-if="load" />
        <div class="item clearfix" v-for="item in artistList" :key="item.id" v-if="!load">
          <div class="cvr">
            <router-link :to="`/artist?id=${item.id}`" class="f-ib">
              <img :src="item.picUrl+'?param=80y80'" alt="" />
            </router-link>
          </div>
          <div class="cnt">
            <h4 class="tit f-fs2">
              <router-link :to="`/artist?id=${item.id}`">{{ item.name }}</router-link>
            </h4>
            <p class="s-fc3">{{ item.albumSize }}个专辑&nbsp;&nbsp;&nbsp;&nbsp;{{ item.mvSize }}个MV</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistSublist } from '@/api/user'
export default {
  name: 'artist',
  data(){
    return {
      load: false,
      artistList: [],
    }
  },
  methods: {
    // 获取我关注的歌手
    async artistSublistData(){
      try{
        this.load = true
        let res = await getArtistSublist(this.cookie)
        if(res.code === 200){
          this.artistList = res.data
        }else{
          throw '获取关注歌手数据失败'
        }
        this.load = false
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.artistSublistData()
  }
}
</script>

<style lang="less" scoped>
.n-singer{
  margin-bottom: 50px;
  .item{
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
    .cvr{
      float: left;
      width: 80px;
      height: 80px;
      margin-right: -95px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .cnt{
      margin-left: 95px;
    }
    h4{
      height: 21px;
      margin: 10px 0;
      line-height: 21px;
    }
  }
}
</style>
