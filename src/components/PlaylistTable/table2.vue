<template>
  <Loading v-if="tracks.length === 0" />
  <table class="m-table m-table-rank" v-else>
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
      <tr :class="(index % 2 === 0 ? 'even' : '')" v-for="(item,index) in tracks" :key="item.id">
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
              <router-link :to="`/song?id=${item.id}`" v-if="index < 3">
                <img :src="item.al.picUrl + '?param=50y50&quality=100'" alt="" class="rpic" />
              </router-link>
              <!-- 播放按钮 -->
              <span :class="'ply '+(playingSongId===item.id?'play-z-slt':'')" @click="play(item)"></span>
              <div class="ttc">
                <!-- 歌曲名字、后缀 -->
                <span class="txt">
                  <!-- 名字 -->
                  <router-link :to="`/song?id=${item.id}`">
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
            <Opt :type="2" :playId="ListDetail.id" :song="item" />
          </div>
        </td>
        <!-- 歌手 -->
        <td>
          <div class="text" :title="item.ar.map(i => i.name).join('/')">
            <span :title="item.ar.map(i => i.name).join('/')">
              <router-link :to="`/artist?id=${ar.id}`" v-for="(ar,i) in item.ar" :key="ar.id" hidefocus="true">{{ ar.name + (i === item.ar.length - 1 ? '' : '/') }}</router-link>
            </span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState,mapActions } from 'vuex'
export default {
  name: 'Table2',
  props: {
    tracks: {
      type: Array,
      required: true,
    },
    userid: {
      type: Number,
      required: true,
    },
    ListDetail: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapState('music',['playingSongId']),
  },
  methods: {
    ...mapActions('music',['newPlay']),
    play(song){
      if(!song.listen.success)return;
      this.newPlay([{
          songName: song.name,
          songId: song.id,
          ar: song.ar,
          dt: song.dt,
          picUrl: song.al.picUrl
        }])
      this.$bus.$emit('addPlayList','已开始播放')
    }
  }
}
</script>

<style lang="less" scoped>
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
</style>
