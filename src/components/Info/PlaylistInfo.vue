<template>
  <div class="m-info clearfix">
    <div class="cover u-cover u-cover-dj">
      <img :src="playlist.coverImgUrl+'?param=200y200'" alt="" />
      <i class="u-jp u-icn2 u-icn2-jp2" v-if="playlist.highQuality"></i>
      <span class="msk"></span>
    </div>
    <div class="cnt">
      <div class="cntc">
        <div class="hd clearfix">
          <i :class="'type pr '+(playlist.highQuality?'u-icn2 u-icn2-jp1':'u-icn u-icn-13')"></i>
          <a href="javascript:;" class="edit s-fc7" v-if="userPlaylist.slice(1,userSubcount.createdPlaylistCount).some(play => play.id===playlist.id)">编辑</a>
          <div :class="'tit '+(playlist.highQuality?'tit3':'')" v-if="userPlaylist.some(play => play.id===playlist.id)">
            <h2 class="f-ff2 f-brk">{{ playlist.name }}</h2>
          </div>
          <h2 class="f-ff2 f-thide" v-else>{{ playlist.specialType!==0&&playlist.userId===detail.profile.userId?'我喜欢的音乐':playlist.name }}</h2>
        </div>
        <div class="user clearfix">
          <router-link :to="`/user/home?id=${playlist.userId}`" class="face">
            <img :src="playlist.creator?.avatarUrl+'?param=200y200'" alt="" />
          </router-link>
          <span class="name f-thide">
            <router-link :to="`/user/home?id=${playlist.userId}`" class="s-fc7" :title="playlist.creator?.nickname">{{ playlist.creator?.nickname }}</router-link>
          </span>
          <span class="u-icn-new-wrap" v-if="playlist.creator.avatarDetail">
            <img class="u-icn-new" :src="playlist.creator.avatarDetail.identityIconUrl" alt="" />
          </span>
          <span class="time s-fc4">{{ playlist.createTime | allDay }}&nbsp;创建</span>
        </div>
        <!-- 功能按钮 -->
        <Disable v-if="playlist.trackCount===0" />
        <CountBtns :subCount="playlist.subscribedCount" :shaCount="playlist.shareCount" :commCount="playlist.commentCount" :fav="false" v-else-if="userPlaylist.some(play => play.id===playlist.id)" />
        <CountBtns  :subCount="playlist.subscribedCount" :shaCount="playlist.shareCount" :commCount="playlist.commentCount" :fav="true" v-else />
        <!-- 标签 -->
        <div class="tags clearfix" v-if="playlist.tags.length!==0">
          <b>标签：</b>
          <router-link :to="`/found/playlist?cat=${tag}&order=hot`" class="u-tag" v-for="tag in playlist.tags">
            <i>{{ tag }}</i>
          </router-link>
        </div>
        <!-- 介绍 -->
        <template v-if="playlist.description">
          <p class="intr f-brk" v-if="playlist.description.length<=109">
            <b>介绍：</b>
            <template v-for="(int,i) in allIntr">
              {{ int }}<br v-if="i!==allIntr.length-1"/>
            </template>
          </p>
          <p :class="'intr f-brk '+(intrShow?'f-hide':'')" v-if="playlist.description.length>109">
            <b>介绍：</b>
            <template v-for="(int,i) in partIntr">
              {{ int }}<br v-if="i!==allIntr.length-1"/>
            </template>
          </p>
          <p :class="'intr f-brk '+(!intrShow?'f-hide':'')" v-if="playlist.description.length>109">
            <b>介绍：</b>
            <template v-for="(int,i) in allIntr">
              {{ int }}<br v-if="i!==allIntr.length-1"/>
            </template>
          </p>
          <div class="clearfix" v-if="playlist.description.length>109">
            <a href="javascript:;" class="s-fc7 fr" @click="intrShow = !intrShow">{{ intrShow?'收起':'展开' }}<i :class="'u-icn '+(intrShow?'u-icn-70':'u-icn-69')"></i></a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlaylistInfo',
  props: {
    playlist: {
      type: Object,
      required: true,
    }
  },
  computed: {
    allIntr(){
      return this.playlist.description.split('\n')
    },
    partIntr(){
      let val = this.playlist.description.slice(0,109)+'...'
      return val.split('\n')
    }
  },
  data(){
    return {
      intrShow: false,
    }
  }
}
</script>
