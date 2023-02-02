<template>
  <div class="n-new">
    <div class="v-hd2">
      <router-link to="/found/album" class="tit f-ff2 f-tdn">新碟上架</router-link>
      <span class="more">
        <router-link to="/found/album">更多</router-link>
        <i class="cor s-bg s-bg-6"></i>
      </span>
    </div>
    <div class="n-disk">
      <div class="inner">
        <a href="javascript:;" class="s-bg s-bg-7 pre" @click="lastPage">上一页</a>
        <div class="roll pr">
          <ul v-for="(item,index) in newestList" :key="index" :style="{
            left: leftList[index] + 'px',
            transition: leftList[index] === 1290 ? 'none' : 'left 1s'
          }" class="clearfix">
            <li v-for="arr in item" :key="arr.id">
              <div class="u-cover u-cover-alb1">
                <img :src="arr.picUrl + '?param=100y100'" alt="" />
                <router-link :to="`/album?id=${arr.id}`" :title="arr.name" class="msk"></router-link>
                <a href="javascript:;" class="icon-play tr" title="播放"></a>
              </div>
              <p class="f-thide">
                <router-link :to="`/album?id=${arr.id}`" :title="arr.name" class="s-fc0 tit">{{ arr.name }}</router-link>
              </p>
              <p class="tit f-thide">
                <router-link :to="`/artist?id=${arr.artist.id}`" :title="arr.artist.name" class="s-fc3">{{ arr.artist.name }}</router-link>
              </p>
            </li>
          </ul>
        </div>
        <a href="javascript:;" class="s-bg s-bg-8 nxt" @click="nextPage">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getNewest } from '@/api/disvocer'
export default {
  name: 'New',
  data(){
    return {
      leftList: [-645, 0, 645, 1290],
      newestList: [], // 新碟数据
    }
  },
  methods: {
    // 上一页
    lastPage(){
      this.leftList = this.leftList.map(item => {
        if(item === 1290){
          return -645
        }
        return (item + 645)
      })
    },
    // 下一页
    nextPage(){
      this.leftList = this.leftList.map(item => {
        if(item === -645){
          return 1290
        }
        return (item - 645)
      })
    },
    // 获取新碟数据
    async getNewData(){
      let newest =  await getNewest()
      newest = newest.albums.splice(0,10)
      this.newestList = [
        newest.slice(0,newest.length/2),
        newest.slice(newest.length/2),
        newest.slice(0,newest.length/2),
        newest.slice(newest.length/2)
      ]
    }
  },
  created(){
    this.getNewData()
  }
}
</script>

<style lang="less" scoped>
.n-new{
  .n-disk{
    position: relative;
    zoom: 1;
    height: 186px;
    margin: 20px 0 37px;
    border: 1px solid #d3d3d3;
    .inner{
      height: 184px;
      padding-left: 16px;
      background: #f5f5f5;
      border: 1px solid #fff;
    }
    .roll{
      float: left;
      width: 645px;
      height: 180px;
      overflow: hidden;
      ul{
        position: absolute;
        float: left;
        width: 100%;
        height: 100%;
        margin: 28px 0 0 0;
        li{
          float: left;
          display: inline;
          width: 118px;
          height: 150px;
          margin-left: 11px;
          background-position: -260px 100px;
          p{
            width: 90%;
            line-height: 18px;
            a:hover{
              text-decoration: underline;
            }
          }
          .u-cover{
            position: relative;
            width: 100px;
            height: 100px;
            margin-bottom: 7px;
            &:hover .icon-play{
              display: block;
            }
            img{
              display: block;
              width: 100%;
              height: 100%;
            }
            .msk{
              width: 118px;
              height: 100px;
              background-position: 0 -570px;
            }
          }
        }
      }
    }
    .pre,.nxt{
      position: absolute;
      top: 71px;
      width: 17px;
      height: 17px;
      text-indent: -9999px;
    }
    .pre{
      left: 4px;
    }
  }
}
</style>
