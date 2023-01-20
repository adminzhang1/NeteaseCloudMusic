<template>
  <div class="g-mn3 pr">
    <div class="g-wrap">
      <div class="u-title clearfix">
        <h3>
          <span class="f-ff2">我订阅的电台（{{ userSubcount.djRadioCount }}）</span>
        </h3>
      </div>
      <Loading v-if="load" />
      <ul class="n-favrdi clearfix" v-if="!load">
        <li v-for="item in djRadios" :key="item.id">
          <router-link :to="`/djradio?id=${item.id}`" class="cvr u-cover u-cover-3 fl">
            <img :src="item.picUrl+'?param=177y177'" alt="" />
            <i class="u-bub" v-if="item.newProgramCount">
              <b></b>
              <em>{{ item.newProgramCount }}</em>
            </i>
          </router-link>
          <div class="cnt col pr">
            <h3 class="f-fw0 f-fs1 f-thide">
              <router-link :to="`/djradio?id=${item.id}`">{{ item.name }}</router-link>
            </h3>
            <p class="col s-fc4">
              by &nbsp;<router-link :to="`/user/home?id=${item.dj.userId}`" class="s-fc4">{{ item.dj.nickname }}</router-link>
            </p>
            <div class="opt hshow">
              <span class="icn u-icn2 u-icn2-share" title="分享"></span>
              <span class="icn u-icn2 u-icn2-del" title="删除"></span>
            </div>
          </div>
          <div class="col no s-fc4">{{ item.programCount }}期</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getDjSublist } from '@/api/user'
export default {
  name: 'Radio',
  data(){
    return {
      load: false,
      djRadios: [],
    }
  },
  methods: {
    // 获取用户订阅电台
    async djSublistData(){
      try{
        this.load = true
        let res = await getDjSublist(this.cookie)
        if(res.code === 200){
          this.djRadios = res.djRadios
        }else{
          throw '获取用户订阅电台失败'
        }
        this.load = false
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.djSublistData()
  }
}
</script>

<style lang="less" scoped>
.n-favrdi{
  margin-bottom: 24px;
  li{
    float: left;
    width: 100%;
    height: 50px;
    padding: 10px 0;
    border-bottom: 1px solid #e7e7e7;
    line-height: 50px;
    &:hover{
      .cnt .opt{
        display: block;
      }
    }
  }
  .no{
    max-width: 40px;
    overflow: visible;
    white-space: nowrap;
  }
  .cnt{
    width: 488px;
    padding-right: 57px;
    line-height: 24px;
    .hshow{
      display: none;
    }
    .opt{
      position: absolute;
      top: 50%;
      right: 0;
      margin-top: -6px;
      .icn{
        float: right;
        margin-right: 10px;
        text-indent: -9999px;
        cursor: pointer;
      }
    }
  }
  .col{
    float: left;
    margin-left: 10px;
    .col{
      margin-left: 0;
    }
  }
  .cvr{
    .u-bub{
      position: absolute;
      top: -10px;
      right: -10px;
    }
  }
}
</style>
