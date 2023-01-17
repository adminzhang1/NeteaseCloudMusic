<template>
  <div class="m-record">
    <div>
      <div v-if="song.length !== 0 && !loading">
        <ul>
          <li v-for="(item,index) in song" :class="index%2===0?'':'even'">
            <div class="hd">
              <span class="ply"></span>
              <span class="num">{{ index+1 }}.</span>
            </div>
            <div class="song">
              <div class="tt">
                <div class="ttc">
                  <span class="txt">
                    <router-link :to="`/song?id=${item.song.id}`">
                      <b :title="item.song.name">{{ item.song.name }}</b>
                    </router-link>
                    <span class="ar s-fc8">
                      <em>-</em>
                      <span :title="item.song.ar.map(a => a.name).join('/')">
                        <template v-for="(arr,i) in item.song.ar">
                          <router-link hidefocus="true" :to="`/artist?id=${arr.id}`" class="s-fc8">{{ arr.name }}</router-link>{{ item.song.ar.length-1===i?'':'/' }}</template>
                      </span>
                    </span>
                  </span>
                </div>
              </div>
              <div class="opt">
                <a href="javascript:;" class="u-icn u-icn-81 icn-add"></a>
                <span class="icn icn-fav"></span>
                <span class="icn icn-share"></span>
                <span class="icn icn-dl"></span>
              </div>
            </div>
            <div class="tops">
              <span class="bg" :style="{width: item.score+'%'}"></span>
              <span class="times f-ff2" v-if="$route.query.id == detail.profile?.userId">{{ item.playCount }}次</span>
            </div>
          </li>
        </ul>
        <div class="more">
          <router-link :to="`/user/rank?id=${id}`">查看更多></router-link>
        </div>
      </div>
      <div class="n-nmusic" v-if="song.length === 0 && !loading">
        <h3 class="f-ff2">
          <i class="u-icn u-icn-21"></i>暂无听歌记录
        </h3>
      </div>
    </div>
    <div class="u-load s-fc4" v-if="loading">
      <i class="icn"></i>加载中...
    </div>
  </div>
</template>

<script>
import { getUserRecord } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'ListenSong',
  computed: {
    ...mapState('user',['cookie','detail'])
  },
  props: {
    song: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      // song: [],
      loading: false,
    }
  },
  methods: {
    // 获取用户听歌数据
    async userRecordData(id,type,cookie){
      try{
        this.loading = true
        let res = await getUserRecord(id,type,cookie)
        this.loading = false
        if(res.code === 200){
          if(this.type){
            this.song = res.weekData.length===0?[]:res.weekData.slice(0,10)
          }else{
            this.song = res.allData.length===0?[]:res.allData.slice(0,10)
          }
        }else{
          throw '获取用户听歌记录失败'
        }
      }catch(e){
        throw e
      }
    }
  },
}
</script>

<style lang="less" scoped>
.n-nmusic{
  padding: 105px 0 105px 0;
  text-align: center;
  h3{
    padding-bottom: 38px;
    font-size: 18px;
  }
  .u-icn-21{
    margin-right: 17px;
  }
}
.m-record{
  margin-bottom: 36px;
  ul{
    border: 1px solid #e2e2e2;
    border-top: none;
  }
  li{
    height: 38px;
    line-height: 38px;
    &:hover{
      background: #eeeeee;
      .song{
        .ttc{
          margin-right: 90px;
        }
      }
      .opt{
        display: block;
      }
    }
    .hd{
      float: left;
      width: 72px;
      height: 38px;
      overflow: hidden;
      .num{
        float: left;
        display: inline;
        width: 37px;
        padding-left: 5px;
        padding-right: 8px;
        text-align: right;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        color: #666;
      }
    }
    .song{
      float: left;
      position: relative;
      z-index: 1;
      padding-left: 10px;
      width: 480px;
      height: 38px;
      overflow: hidden;
      .tt{
        float: left;
        width: 100%;
        .txt{
          position: relative;
          display: inline-block;
          max-width: 99%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ar{
          em{
            margin: 0 5px;
          }
        }
      }
    }
    .tops{
      float: right;
      position: relative;
      z-index: 1;
      zoom: 1;
      width: 319px;
      height: 38px;
      line-height: 38px;
      span.bg{
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 38px;
        background-color: #4eb4f5;
        opacity: 0.1;
      }
    }
  }
  .opt{
    position: absolute;
    z-index: 1;
    right: 0;
    top: 11px;
    display: none;
    width: 92px;
    height: 20px;
    overflow: hidden;
  }
  li.even{
    background-color: #f7f7f7;
    &:hover{
      background: #e6e6e6;
    }
  }
  .more{
    height: 32px;
    line-height: 32px;
    text-align: right;
    a{
      color: #666;
    }
  }
  .ply{
    float: right;
    display: inline;
    margin-top: 10px;
    width: 17px;
    height: 17px;
    cursor: pointer;
    background-position: 0 -103px;
    &:hover{
      background-position: 0 -128px;
    }
  }
  .icn-add{
    float: left;
    margin-top: 2px;
  }
  span{
    &.icn{
      float: left;
      width: 18px;
      height: 16px;
      margin: 2px 0 0 8px;
      overflow: hidden;
      text-indent: -999px;
      cursor: pointer;
    }
    &.icn-fav{
      background-position: 0 -174px;
      &:hover{
        background-position: -20px -174px;
      }
    }
    &.icn-share{
      background-position: 0 -195px;
      &:hover{
        background-position: -20px -195px;
      }
    }
    &.icn-dl{
      background-position: -81px -174px;
      &:hover{
        background-position: -104px -174px;
      }
    }
  }
}
</style>
