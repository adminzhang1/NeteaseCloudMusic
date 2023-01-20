<template>
  <table class="m-table">
    <thead>
      <tr>
        <th class="first w1">
          <div class="wp"></div>
        </th>
        <th>
          <div class="wp af0"></div>
        </th>
        <th class="w2">
          <div class="wp af1"></div>
        </th>
        <th class="w3">
          <div class="wp af2"></div>
        </th>
        <th class="w4">
          <div class="wp af3"></div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item,index) in tracks" :key="item.id" :class="index%2===0?'even':''">
        <!-- 序号和播放 -->
        <td class="left">
          <div class="hd">
            <span class="ply"></span>
            <span class="num">{{ index+1 }}</span>
          </div>
        </td>
        <!-- 歌曲标题 -->
        <td>
          <div class="clearfix">
            <div class="tt">
              <div class="ttc">
                <span class="txt">
                  <!-- 歌曲名字 -->
                  <router-link :to="`/song?id=${item.id}`">
                    <b
                      :title="
                        `${item.name}${item.tns?'-('+item.tns.join('')+')':item.alia.length!==0?'-('+item.alia.join('')+')':''}`
                      "
                    >{{ item.name }}</b>
                  </router-link>
                  <!-- 歌曲后缀 -->
                  <span class="s-fc8" :title="item.tns?item.tns.join(''):item.alia.length!==0?item.alia.join(''):''" v-if="item.tns||item.alia.length">
                    {{
                      item.tns
                      ?`-(${item.tns.join('')})`
                      :item.alia.length!==0
                        ?`-(${item.alia.join('')})`
                        :''
                    }}
                  </span>
                  <!-- mv -->
                  <span class="mv" title="播放mv" :data-res-id="item.mv" v-if="item.mv">mv</span>
                </span>
              </div>
            </div>
          </div>
        </td>
        <!-- 时长 -->
        <td class="s-fc3">
          <div class="u-dur">{{ item.dt | duration }}</div>
          <FiveOpt />
        </td>
        <!-- 歌手 -->
        <td>
          <div class="text" :title="item.ar.map(a => a.name).join('/')">
            <template v-for="(arr,i) in item.ar">
              <router-link :to="`/artist?id=${arr.id}`">{{ arr.name }}</router-link>{{ i===item.ar.length-1?'':'/' }}
            </template>
          </div>
        </td>
        <!-- 专辑 -->
        <td>
          <div class="text">
            <router-link :to="`/album?id=${item.al.id}`" :title="item.al.name">{{ item.al.name }}</router-link>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Playlisttable1',
  props: {
    tracks: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style lang="less" scoped>

</style>
