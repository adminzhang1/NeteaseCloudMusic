<template>
  <div class="g-bd">
    <div class="g-wrap pr">
      <!-- 热门新碟 -->
      <div class="u-title clearfix">
        <h3><span class="f-ff2">热门新碟</span></h3>
      </div>
      <ul class="m-cvrlst clearfix">
        <li v-for="item in hotAlbumList" :key="item.id">
          <div class="u-cover u-cover-alb2">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <router-link :to="`/album?id=${item.id}`" class="msk" :title="item.name"></router-link>
            <a href="javascript:;" class="icon-play fr" title="播放"></a>
          </div>
          <p class="dec">
            <router-link :to="`/album?id=${item.id}`" :title="item.name" class="tit f-thide s-fc0">{{ item.name }}</router-link>
          </p>
          <p class="f-thide">
            <span class="nm f-thide" :title="item.name">
              <template v-for="(ar,index) in item.artists">
                <router-link :to="`/artist?id=${ar.id}`">{{ ar.name }}</router-link>
                <template v-if="index !== item.artists.length - 1"> / </template>
              </template>
            </span>
          </p>
        </li>
      </ul>
      <!-- 全部新碟 -->
      <div class="u-title clearfix">
        <h3><span class="f-ff2">全部新碟</span></h3>
        <div class="tab">
          <template v-for="(item,index) in [{title: '全部',area: 'ALL'},{title: '华语',area: 'ZH'},{title: '欧美',area: 'EA'},{title: '韩国',area: 'KR'},{title: '日本',area: 'JP'}]">
            <router-link :to="`/found/album?area=${item.area}`" class="s-fc3">{{ item.title }}</router-link>
            <span class="line" v-if="index !== 4">|</span>
          </template>
        </div>
      </div>
      <ul class="m-cvrlst clearfix">
        <li v-for="item in AlbumList" :key="item.id">
          <div class="u-cover u-cover-alb2">
            <img :src="item.picUrl + '?param=130y130'" alt="" />
            <router-link :to="`/album?id=${item.id}`" class="msk" :title="item.name"></router-link>
            <a href="javascript:;" class="icon-play fr" title="播放"></a>
          </div>
          <p class="dec">
            <router-link :to="`/album?id=${item.id}`" :title="item.name" class="tit f-thide s-fc0">{{ item.name }}</router-link>
          </p>
          <p class="f-thide">
            <span class="nm f-thide" :title="item.name">
              <template v-for="(ar,index) in item.artists">
                <router-link :to="`/artist?id=${ar.id}`">{{ ar.name }}</router-link>
                <template v-if="index !== item.artists.length - 1"> / </template>
              </template>
            </span>
          </p>
        </li>
      </ul>
      <!-- 步进器 -->
      <Stepper  :total="total" :pageSize="pageSize" :page="page" @setNewPage="updateNewPage" />
    </div>
  </div>
</template>

<script>
import Stepper from '@/components/Stepper'
import { getAlbumNewest,getAlbumNew1,getAlbumNew2 } from '@/api/album'
import { mapState } from 'vuex'
export default {
  name: 'Album',
  components: {
    Stepper,
  },
  computed: {
    ...mapState('user',['isLogin','cookie'])
  },
  data(){
    return {
      total: 0,
      page: 1,
      pageSize: 35,
      offset: 0,
      area: 'ALL',
      hotAlbumList: [],
      AlbumList: []
    }
  },
  methods: {
    // 更新页码
    updateNewPage(newPage){
      this.offset = (newPage - 1) * this.pageSize
      this.page = newPage
      console.log(newPage)
      this.albumNewData()
    },
    // 获取热门新碟数据
    async albumNewestData(){
      try{
        let res = await getAlbumNewest()
        if(res.code === 200){
          this.hotAlbumList = res.albums.slice(0,10)
        }else{
          throw '获取热门新碟数据失败'
        }
      }catch(e){
        throw e
      }
    },
    // 获取全部新碟数据
    async albumNewData(){
      try{
        let res = null
        if(this.isLogin){
          res = await getAlbumNew2(this.pageSize,this.area,this.offset,this.cookie)
        }else{
          res = await getAlbumNew1(this.pageSize,this.area,this.offset)
        }
        if(res.code === 200){
          this.AlbumList = res.albums
          this.total = res.total
        }else{
          throw '获取全部新碟数据失败'
        }
      }catch(e){
        throw e
      }
    },
  },
  created(){
    this.albumNewestData()
    this.albumNewData()
    // console.log(this.$route)
  },
  watch: {
    '$route.query': {
      deep: true,
      handler(newVal){
        // console.log(newVal)
        if(!newVal.area){
          this.area = 'ALL'
          this.total = 0
          this.page = 1
          this.offset = 0
          this.albumNewData()
        }else{
          this.area = newVal.area
          this.total = 0
          this.page = 1
          this.offset = 0
          this.albumNewData()
        }
      },
    }
  }
}
</script>

<style lang="less" scoped>
.m-cvrlst{
  margin-top: 20px;
  li{
    width: 153px;
    height: 178px;
    padding-left: 33px;
    &:nth-child(1){
      padding-left: 0;
    }
    &:nth-child(5n+1){
      padding-left: 0;
    }
  }
  .u-cover-alb2{
    .msk{
      width: 153px;
      height: 130px;
      background-position: 0 -845px;
    }
  }
}
</style>
