<template>
  <div class="g-mn3">
    <div class="g-wrap">
      <div class="m-info clearfix">
        <div class="cover u-cover u-cover-rank">
          <img :src="ListDetail.coverImgUrl + '?param=150y150'" alt="" />
          <span class="msk"></span>
        </div>
        <div class="cnt">
          <div class="cntc m-info">
            <div class="hd clearfix">
              <h2 class="f-ff2">{{ ListDetail.name }}</h2>
            </div>
            <div class="user clearfix">
              <i class="u-icn u-icn-57"></i>
              <span class="sep s-fc3">最近更新：{{ ListDetail.updateTime | updateTime }}</span>
              <span class="s-fc4"> ({{ update }})</span>
            </div>
            <div class="btns clearfix">
              <!-- 播放 -->
              <a href="javascript:;" class="u-btn2 u-btn2-2 u-btni-addply" title="播放">
                <i>
                  <em class="ply"></em>
                  播放
                </i>
              </a>
              <a href="javascript:;" class="u-btni u-btni-add" title="添加到播放列表"></a>
              <!-- 收藏 -->
              <a href="javascript:;" class="u-btni u-btni-fav">
                <i>({{ ListDetail.subscribedCount }})</i>
              </a>
              <!-- 分享 -->
              <a href="javascript:;" class="u-btni u-btni-share">
                <i>({{ ListDetail.shareCount }})</i>
              </a>
              <!-- 下载 -->
              <a href="javascript:;" class="u-btni u-btni-dl">
                <i>下载</i>
              </a>
              <!-- 评论 -->
              <a href="javascript:;" class="u-btni u-btni-cmmt">
                <i>({{ ListDetail.commentCount }})</i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="g-wrap12">
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">歌曲列表</span>
        </h3>
        <span class="sub s-fc3">
          <span>{{ ListDetail.trackCount }}</span>首歌
        </span>
        <div class="more s-fc3">
          播放：<strong class="s-fc6">{{ ListDetail.playCount }}</strong>次
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div>
        <div class="j-flag">
          <table class="m-table m-table-rank">
            <!-- 表头 -->
            <thead>
              <tr>
                <th class="first w1"></th>
                <th>
                  <div class="wp">标题</div>
                </th>
                <th class="w2-1">
                  <div class="wp">时长</div>
                </th>
                <th class="w3-1">
                  <div class="wp">歌手</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr :class="index % 2 === 0 ? 'even' : ''" v-for="(item,index) in ListDetail.tracks" :key="item.id">
                <!-- 顺序 -->
                <td>
                  <div class="hd">
                    <span class="num">{{ index + 1 }}</span>
                    <div class="rk">
                      <span :class="
                        'u-icn ' + (
                          ListDetail.trackIds[index].lr === undefined
                          ? 'u-icn-75'
                          : ListDetail.trackIds[index].lr - index < 0
                            ? 'ico u-icn-74 s-fc10'
                            : ListDetail.trackIds[index].lr - index > 0
                              ? 'ico u-icn-73 s-fc9'
                              : ListDetail.trackIds[index].lr - index === 0
                                ? 'ico u-icn-72 s-fc4'
                                : ''
                        )
                      ">
                        {{ ListDetail.trackIds[index].lr === undefined ? '' : Math.abs(ListDetail.trackIds[index].lr - index) }}
                      </span>
                    </div>
                  </div>
                </td>
                <!-- 标题 -->
                <td :class="index < 3 ? 'rank' : ''">
                  <div class="clearfix">
                    <div class="tt">
                      <!-- 歌曲封面 -->
                      <router-link :to="`/found/song?id=${item.id}`" v-if="index < 3">
                        <img :src="item.al.picUrl + '?param=50y50&quality=100'" alt="" class="rpic" />
                      </router-link>
                      <!-- 播放按钮 -->
                      <span class="ply"></span>
                      <div class="ttc">
                        <!-- 歌曲名字、后缀 -->
                        <span class="txt">
                          <!-- 名字 -->
                          <router-link :to="`/found/song?id=${item.id}`">
                            <b :title="item.name + (item.tns ? '-' + item.tns.join('') : '')">
                              {{ item.name }}
                            </b>
                          </router-link>
                          <!-- 后缀 -->
                          <span v-if="item.tns" class="s-fc8" :title="item.tns.join('')"> - ({{ item.tns.join('') }})</span>
                          <!-- mv按钮 -->
                          <span class="mv" title="播放mv" v-if="item.mv"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <!-- 时长 -->
                <td class="s-fc3">
                  <span class="u-dur">{{ item.dt | duration }}</span>
                  <div class="opt hshow">
                    <a href="javascript:;" title="添加到播放列表" class="u-icn u-icn-81"></a>
                    <a href="javascript:;" title="收藏" class="icn icn-fav"></a>
                    <a href="javascript:;" title="分享" class="icn icn-share"></a>
                    <a href="javascript:;" title="下载" class="icn icn-dl"></a>
                  </div>
                </td>
                <!-- 歌手 -->
                <td>
                  <div class="text" :title="item.ar.map(i => i.name).join('/')">
                    <span :title="item.ar.map(i => i.name).join('/')">
                      <router-link :to="`/found/artist?id=${ar.id}`" v-for="(ar,i) in item.ar" :key="ar.id" hidefocus="true">{{ ar.name + (i === item.ar.length - 1 ? '' : '/') }}</router-link>
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="n-cmt">
        <div>
          <div class="u-title">
            <h3>
              <span class="f-ff2">评论</span>
            </h3>
            <span class="sub s-fc3">工{{ ListDetail.commentCount }}条评论</span>
          </div>
        </div>
        评论
      </div>
    </div>
  </div>
</template>

<script>
import { getTopListDetail } from '@/api/toplist'
import { mapState } from 'vuex'
export default {
  name: 'toplistRight',
  computed: {
    ...mapState('toplist',['defaultId','selectId','update','feature'])
  },
  filters: {
    updateTime(val){
      if(val){
        let month = new Date(val).getMonth() + 1
        let day = new Date(val).getDate()
        return `${month < 10 ? '0' + month : month}月${day < 10 ? '0' + day : day}日`
      }else{
        return ''
      }
    },
    duration(val){
      val = parseInt(val/1000)
      let minutes = parseInt(val/60)
      let seconds = val - (minutes * 60)
      return `${minutes < 10 ? '0' + minutes :minutes}:${seconds < 10 ? '0' + seconds :seconds}`
    }
  },
  data(){
    return {
      ListDetail: {}, // 榜单内部数据
    }
  },
  methods: {
    // 获取歌单内部详情信息
    async toplistDetail(id){
      try{
        let res = await getTopListDetail(id)
        if(res.code === 200){
          this.ListDetail = res.playlist
        }else{
          throw '获取榜单内部数据失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.toplistDetail(this.selectId)
  },
  watch: {
    selectId: {
      handler(){
        this.toplistDetail(this.selectId)
      }
    }
  },
}
</script>

<style lang="less" scoped>
.g-mn3{
  height: 100%;
  float: right;
  width: 740px;
  padding-bottom: 50px;
  .m-info{
    .cover{
      float: left;
      position: relative;
      display: inline;
      margin: 0 -220px 0 0;
    }
    .u-cover-rank,.u-cover-rank img{
      width: 150px;
      height: 150px;
    }
    .u-cover-rank{
      padding: 3px;
      border: 1px solid #ccc;
      .msk{
        top: 3px;
        left: 3px;
        width: 150px;
        height: 150px;
        background-position: -230px -380px;
      }
    }
    .cnt{
      float: right;
      width: 100%;
    }
    .cntc{
      margin-left: 187px;
      .hd{
        position: relative;
        line-height: 24px;
        margin: 16px 0 4px;
        h2{
          line-height: 24px;
          font-size: 20px;
          font-weight: normal;
        }
      }
      .user{
        line-height: 35px;
        margin: 0 0 20px;
        .u-icn{
          float: left;
          margin: 9px 0 0 3px;
        }
        .sep{
          margin-left: 5px;
        }
      }
      .btns{
        margin-bottom: 25px;
        margin-right: -10px;
        .u-btni-addply{
          float: left;
          i{
            padding: 0 7px 0 8px;
          }
          &:hover .ply{
            background-position: -28px -1622px;
          }
          .ply{
            float: left;
            width: 20px;
            height: 18px;
            margin: 6px 2px 2px 0;
            background-position: 0 -1622px;
            overflow: hidden;
          }
        }
        .u-btni{
          margin-right: 6px;
          font-family: simsun,\5b8b\4f53;
        }
        .u-btni-add{
          margin-right: 5px;
        }
        .u-btni-fav{
          i{
            background-position: 0 -977px;
          }
          &:hover i{
            background-position: 0 -1063px;
          }
        }
        .u-btni-share{
          &:hover i{
            background-position: 0 -1268px;
          }
          i{
            background-position: 0 -1225px;
          }
        }
        .u-btni-dl{
          &:hover i{
            background-position: 0 -2805px;
          }
          i{
            background-position: 0 -2761px;
          }
        }
        .u-btni-cmmt{
          &:hover i{
            background-position: 0 -1508px;
          }
          i{
            background-position: 0 -1465px;
          }
        }
      }
    }
  }
  .u-title{
    height: 33px;
    border-bottom: 2px solid #c20c0c;
    h3{
      float: left;
      font-size: 20px;
      line-height: 28px;
      font-weight: normal;
    }
    .sub{
      float: left;
      margin: 9px 0 0 20px;
    }
    .more{
      float: right;
      margin-top: 5px;
    }
  }
  .m-table-rank{
    tr:hover{
      .hshow{
        display: block;
        position: relative;
        margin-right: -10px;
      }
      .u-dur{
        display: none;
      }
    }
    .first{
      width: 77px;
    }
    .even{
      td{
        background-color: #f7f7f7;
      }
    }
    .hd{
      height: 18px;
      .num{
        float: left;
        width: 25px;
        margin-left: 0;
        text-align: center;
        color: #999;
      }
      .rk{
        float: right;
        width: 32px;
        margin-right: -5px;
        text-align: center;
        .ico{
          padding-left: 8px;
          line-height: 17px;
          font-size: 10px;
          font-family: Arial, Helvetica, sans-serif;
        }
        .u-icn-75{
          display: block;
          float: none;
          margin: 0 auto;
          padding-left: 0;
        }
      }
    }
    td{
      &.rank{
        padding-top: 10px;
        padding-bottom: 10px;
        .ply{
          margin-top: 17px;
        }
        .ttc{
          margin-top: 16px;
        }
        .txt{
          max-width: 67%;
        }
      }
    }
    .tt{
      float: left;
      width: 100%;
      .ply{
        margin-right: 8px;
      }
    }
    .rpic{
      float: left;
      width: 50px;
      height: 50px;
      margin-right: 14px;
    }
    .ttc{
      height: 18px;
      margin-right: 20px;
    }
    .txt{
      max-width: 88%;
      a:hover{
        text-decoration: underline;
        color: #333;
      }
    }
    .opt{
      .u-icn-81{
        float: left;
        margin-top: 2px;
      }
    }
  }
  .n-cmt{
    margin-top: 40px;
  }
}
</style>
