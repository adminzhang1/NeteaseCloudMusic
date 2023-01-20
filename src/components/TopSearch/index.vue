<template>
  <div class="m-srch pr">
    <!-- 搜索框 -->
    <div class="srchbg">
      <div class="parent">
        <input type="text" name="srch" id="srch" class="txt" v-model="searchText" @click="handleClickSearch" @blur="handleBlurSearch" @input="handleInputSearch" />
        <label class="ph" ref="srchLavel">音乐/视频/电台/用户</label>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="u-lstlay" :style="{ display: schlistisShow ? 'block' : 'none' }">
      <div class="m-schlist">
        <!-- 搜相关用户 -->
        <p class="note">
          <router-link to="/search">搜“{{ searchText }}”相关用户</router-link>>
        </p>
        <!-- 单曲、歌手、专辑、歌单列表 -->
        <div class="rap">
          <div class="itm clearfix" v-for="(item,index) in searchSuggest" :key="item.iconClass">
            <h3 class="hd">
              <i :class="'icn u-icn ' + item.iconClass"></i>
              <em class="fl">{{ item.title }}</em>
            </h3>
            <ul :class="'clearfix ' + (index % 2 !== 0 ? 'odd' : '')">
              <li v-for="arr in item.arrs" :key="arr.id">
                <!-- 单曲 -->
                <router-link :to="`${item.href}?id=${arr.id}`" class="s-fc0 f-thide" v-if="item.order === 'songs'" v-textColor="searchText">
                  {{ arr.name }}-{{ arr.artists | artistName }}
                </router-link>
                <!-- 歌手 -->
                <router-link :to="`${item.href}?id=${arr.id}`" class="s-fc0 f-thide" v-else-if="item.order === 'artists'" v-textColor="searchText">
                  {{ arr.name }}
                </router-link>
                <!-- 专辑 -->
                <router-link :to="`${item.href}?id=${arr.id}`" class="s-fc0 f-thide" v-else-if="item.order === 'albums'" v-textColor="searchText">
                  {{ arr.name }}-{{ arr.artist.name }}
                </router-link>
                <!-- 歌单 -->
                <router-link :to="`${item.href}?id=${arr.id}`" class="s-fc0 f-thide" v-else-if="item.order === 'playlists'" v-textColor="searchText">
                  {{ arr.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggest } from '@/api/search'
export default {
  name: 'TopSearch',
  filters: {
    artistName(val){
      return val.map(item => item.name).join(' ')
    }
  },
  data(){
    return {
      schlistisShow: false, // 搜索结果是否显示
      searchText: '', // 搜索内容
      searchSuggest: [], // 搜索结果
    }
  },
  methods: {
    // 搜索框点击事件
    handleClickSearch(){
      this.$refs.srchLavel.style.display = "none"
      this.switchSchlistShow()
    },
    // 搜索框输入事件
    async handleInputSearch(){
      if(!this.searchText){
        this.schlistisShow = false
      }else{
        this.switchSchlistShow()
        // 获取搜索框结果
        try{
          let res = await getSuggest(this.searchText)
          if(res.code === 200){
            let arr = res.result.order.map(item => {
              return {
                title: item === 'songs'
                  ? '单曲'
                  : item === 'artists'
                  ? '歌手'
                  : item === 'albums'
                  ? '专辑'
                  : item === 'playlists'
                  ? '歌单' : '',
                iconClass: item === 'songs'
                  ? 'u-icn-26'
                  : item === 'artists'
                  ? 'u-icn-27'
                  : item === 'albums'
                  ? 'u-icn-28'
                  : item === 'playlists'
                  ? 'u-icn-29' : '',
                href: item === 'songs'
                  ? '/found/song'
                  : item === 'artists'
                  ? '/found/artist'
                  : item === 'albums'
                  ? '/found/album'
                  : item === 'playlists'
                  ? '/found/playlist' : '',
                order: item,
                arrs: res.result[item],
              }
            })
            this.searchSuggest = arr
          }
        }catch(e){
          throw e
        }
      }
    },
    // 搜索框失去焦点事件
    handleBlurSearch(){
      setTimeout(() => {
        if(!this.searchText){
          this.$refs.srchLavel.style.display = "block"
        }else{
          this.schlistisShow = false
        }
      }, 200);
    },
    // 搜索结果显示隐藏切换
    switchSchlistShow(){
      if(!this.searchText){
        this.schlistisShow = false
      }else{
        this.schlistisShow = true
      }
    }
  },
  directives: {
    textColor(e,text){
      e.innerHTML = e.text.trim().replaceAll(text.value,`<span class="s-fc7">${text.value}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>
.m-srch{
  .srchbg{
    margin-top: 19px;
    background-position: 0 -99px;
    background-color: #fff;
    border-radius: 32px;
  }
  .parent{
    display: block;
    position: relative;
    margin: 8px 0 0 30px;
    input{
      width: 95%;
      margin: 0;
      padding: 0;
      background: transparent;
      color: #333;
      line-height: 16px;
    }
    label{
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 90%;
      color: #9b9b9b;
      cursor: text;
      pointer-events: none;
    }
  }
  .u-lstlay{
    position: absolute;
    clear: both;
    top: 59px;
    left: 0;
    z-index: 120;
    width: 240px;
    box-sizing: border-box;
    border: 1px solid #bebebe;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 4px 7px #555;
    text-shadow: 0 1px 0 rgb(255 255 255 / 90%);
    .m-schlist{
      .note{
        height: 17px;
        padding: 11px 10px;
        border-bottom: 1px solid #e2e2e2;
        a:hover{
          background-color: #e3e5e7;
          cursor: pointer;
        }
      }
      .rap{
        .hd{
          float: left;
          width: 52px;
          margin-right: -100px;
          padding: 10px 0 0 10px;
          border-right: 1px solid #e2e2e2;
          line-height: 17px;
          font-weight: normal;
          .icn{
            float: left;
            margin: 2px 4px 0 0;
          }
        }
        ul{
          margin-left: 62px;
          margin-top: -1px;
          padding: 6px 0 5px;
          border-top: 1px solid #e2e2e2;
          border-left: 1px solid #e2e2e2;
          &.odd{
            background: #f9f8f8;
          }
          li{
            width: 100%;
            float: left;
            a{
              display: block;
              width: 100%;
              text-indent: 12px;
              line-height: 24px;
              &:hover{
                text-decoration: none;
                background-color: #e3e5e7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
