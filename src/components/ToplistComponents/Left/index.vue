<template>
  <div class="g-sd3">
    <div class="n-minelst">
      <h2 class="f-ff1">云音乐特色榜</h2>
      <ul class="clearfix">
        <li v-for="item in toplistDate1" :key="item.id" :class="item.id === selectId ? 'z-selected' : ''" @click="$router.push(`/found/toplist?id=${item.id}`)">
          <div class="item clearfix">
            <div class="left">
              <router-link :to="`/found/toplist?id=${item.id}`" class="avatar">
                <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
                <span class="msk"></span>
              </router-link>
            </div>
            <p class="name">
              <router-link :to="`/found/toplist?id=${item.id}`" class="s-fc0">{{ item.name }}</router-link>
            </p>
            <p class="s-fc4">{{ item.updateFrequency }}</p>
          </div>
        </li>
      </ul>
      <h2 class="scd f-ff1">全球媒体榜</h2>
      <ul class="clearfix">
        <li v-for="item in toplistDate2" :key="item.id" :class="item.id === selectId ? 'z-selected' : ''" @click="$router.push(`/found/toplist?id=${item.id}`)">
          <div class="item clearfix">
            <div class="left">
              <router-link :to="`/found/toplist?id=${item.id}`" class="avatar">
                <img :src="item.coverImgUrl + '?param=40y40'" alt="" />
                <span class="msk"></span>
              </router-link>
            </div>
            <p class="name">
              <router-link :to="`/found/toplist?id=${item.id}`" class="s-fc0">{{ item.name }}</router-link>
            </p>
            <p class="s-fc4">{{ item.updateFrequency }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getToplist } from '@/api/toplist'
import { mapMutations,mapState } from 'vuex'
export default {
  name: 'toplistLeft',
  computed: {
    ...mapState('toplist',['defaultId','selectId'])
  },
  data(){
    return {
      toplistDate1: [], // 云音乐特色榜数据
      toplistDate2: [], // 全球媒体榜数据
    }
  },
  methods: {
    ...mapMutations('toplist',['setSelect','setUpdate','setFeature']),
    // 获取歌单列表
    async topListDate(){
      try{
        let res = await getToplist()
        if(res.code === 200){
          this.toplistDate1 = res.list.slice(0,4)
          this.toplistDate2 = res.list.slice(4,res.list.length)
        }else{
          throw '获取歌单数据失败'
        }
      }catch(e){
        throw e
      }
    },
  },
  created(){
    this.topListDate()
  },
  watch: {
    '$route.query.id': {
      handler(newVal){
        if(newVal){
          this.setSelect(parseInt(newVal))
        }else{
          this.setSelect(this.defaultId)
        }
        this.setUpdate([...this.toplistDate1,...this.toplistDate2].filter(item => item.id === (newVal ? this.selectId : this.defaultId))[0].updateFrequency)
        this.setFeature(this.toplistDate1.some(item => item.id === (newVal ? this.selectId : this.defaultId)))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.g-sd3{
  float: left;
  width: 240px;
  .n-minelst{
    margin-top: 40px;
    h2{
      padding: 0 10px 12px 15px;
      font-size: 14px;
      color: #000;
    }
    ul *{
      cursor: pointer;
      vertical-align: middle;
    }
    li{
      position: relative;
      zoom: 1;
      height: 42px;
      padding: 10px 0 10px 20px;
      &:hover{
        background-color: #f4f2f2;
      }
      &.z-selected{
        &:hover{
          background: #e6e6e6;
        }
        background: #e6e6e6;
      }
    }
    .item{
      padding-left: 50px;
    }
    .left{
      display: inline;
      float: left;
      margin-left: -50px;
      overflow: hidden;
      width: 40px;
    }
    .avatar{
      display: block;
      position: relative;
      width: 40px;
      height: 40px;
      img{
        width: 100%;
        height: 100%;
      }
      .msk{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-position: -310px -330px;
      }
    }
    .name{
      width: 150px;
      overflow: hidden;
      margin-top: 2px;
      margin-bottom: 8px;
      a{
        white-space: nowrap;
      }
    }
  }
}
</style>
