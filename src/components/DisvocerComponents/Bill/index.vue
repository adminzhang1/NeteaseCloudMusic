<template>
  <div class="n-bill">
    <div class="v-hd2">
      <router-link to="/found/toplist" class="tit f-ff2">榜单</router-link>
      <span class="more">
        <router-link to="/found/toplist" class="s-fc3">更多</router-link>
        <i class="cor s-bg s-bg-6"></i>
      </span>
    </div>
    <div class="n-bilst">
      <dl :class="'blk ' + (index === topList.length -1 ? 'blk-1' : '')" v-for="(item,index) in topList">
        <dt class="top">
          <div class="cver u-cover u-cover-4">
            <img :src="item.coverImgUrl + '?param=100y100'" alt="" />
            <router-link :to="`/found/toplist?id=${item.id}`" class="msk" :title="item.name"></router-link>
          </div>
          <div class="tit">
            <router-link :to="`/found/toplist?id=${item.id}`" :title="item.name">
              <h3 class="f-fs1 f-thide">{{ item.name }}</h3>
            </router-link>
            <div class="btn">
              <a hidefocus="true" href="javascript:;" title="播放" class="s-bg s-bg-9">播放</a>
              <a hidefocus="true" href="javascript:;" title="收藏" class="s-bg s-bg-10">收藏</a>
            </div>
          </div>
        </dt>
        <dd>
          <ol>
            <li v-for="(arr,index) in item.tracks" :key="arr.id">
              <span :class="'no ' + (index < 3 ? 'no-top' : '')">{{ index + 1 }}</span>
              <router-link :to="`/found/song?id=${arr.id}`" :title="arr.name" class="nm s-fc0 f-thide">{{ arr.name }}</router-link>
              <div class="oper">
                <a hidefocus="true" href="javascript:;" class="s-bg s-bg-11" title="播放"></a>
                <a hidefocus="true" href="javascript:;" class="u-icn u-icn-81" title="添加到播放列表"></a>
                <a hidefocus="true" href="javascript:;" class="s-bg s-bg-12" title="收藏"></a>
              </div>
            </li>
          </ol>
          <div class="more">
            <router-link :to="`/found/toplist?id=${item.id}`" class="s-fc0">查看更多></router-link>
          </div>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
import { getToplist, getDetail } from '@/api/disvocer'
export default {
  name: 'Bill',
  data(){
    return {
      topList: [],
    }
  },
  methods: {
    // 获取榜单数据
    async getTopListData(){
      try{
        let res = await getToplist()
        let arr = []
        if(res.code === 200){
          res.list.splice(0,3).forEach(async item => {
            let listDetil = await getDetail(item.id)
            if(listDetil.code === 200){
              item.tracks = listDetil.playlist.tracks.splice(0,10)
              arr.push(item)
            }else{
              throw '获取榜单内容数据失败'
            }
            // console.log(item)
          })
          this.topList = arr
        }else{
          throw '获取榜单失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.getTopListData()
  }
}
</script>

<style lang="less" scoped>
.n-bill{
  .n-bilst{
    height: 472px;
    margin-top: 20px;
    padding-left: 1px;
    .blk{
      float: left;
      width: 230px;
      .top{
        height: 100px;
        padding: 20px 0 0 19px;
        .cver{
          float: left;
          display: inline;
          img{
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .tit{
          float: left;
          width: 116px;
          margin: 6px 0 0 10px;
          >a:hover{
            text-decoration: underline;
          }
          h3{
            width: 100%;
          }
          .btn{
            margin-top: 10px;
            a{
              display: block;
              float: left;
              width: 22px;
              height: 22px;
              margin-right: 10px;
              text-indent: -9999px;
            }
          }
        }
      }
      ol{
        height: 319px;
        margin-left: 50px;
        line-height: 32px;
        li{
          height: 32px;
          *{
            vertical-align: middle;
          }
          >a:hover{
            text-decoration: underline;
          }
          &:hover{
            .nm{
              width: 96px;
            }
            .oper{
              display: block;
            }
          }
        }
        .no{
          float: left;
          position: relative;
          width: 35px;
          height: 32px;
          margin-left: -35px;
          text-align: center;
          color: #666;
          font-size: 16px;
          &.no-top{
            color: #c10d0c;
          }
        }
        .nm{
          float: left;
          width: 170px;
          height: 32px;
        }
        .oper{
          display: none;
          float: right;
          width: 82px;
          margin-top: 7px;
          a{
            float: left;
            width: 17px;
            height: 17px;
            margin-right: 10px;
          }
          .u-icn-81{
            margin: 2px 6px 0 0;
          }
        }
      }
      .more{
        clear: both;
        height: 32px;
        margin-right: 32px;
        text-align: right;
        line-height: 32px;
        a:hover{
          text-decoration: underline;
        }
      }
    }
    .blk-1{
      width: 228px;
    }
  }
}
</style>
