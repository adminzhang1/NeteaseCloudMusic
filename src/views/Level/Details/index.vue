<template>
  <div class="g-bd clearfix">
    <div class="n-privilege">
      <section class="top">
        <div class="h1">升级方式</div>
        <div class="h2">基础说明</div>
        <div class="text">
          <li>最高账号等级为10级，升级需同时满足听歌量和登录天数；</li>
        </div>
        <div class="h2">听歌量计算</div>
        <div class="text">
          <li>听歌量的增加需要播放从未听过的歌曲，<span class="red">同一首歌曲播放多次仍计为1首；</span></li>
          <li>单首歌曲<span class="red">播放时长过短不计入听歌量；</span></li>
          <li>每日听歌量计算<span class="red">上限为300首；</span></li>
          <li>同一个账号在IOS、安卓、PC端、ipadHD以及网页端听歌量都会纳入统计；</li>
          <li>电台歌曲不计入听歌量；</li>
        </div>
        <div class="h2">登录天数计算</div>
        <div class="text">
          <li>打开并登录网易云音乐App的天数；</li>
        </div>
        <div class="h2">数据更新时间</div>
        <div class="text">
          <li>当日数据<span class="red">次日14:00后更新;</span></li>
        </div>
      </section>
      <h2 class="tit f-ff2">等级特权</h2>
      <router-link to="/user/level" class="myleve">查看我的等级<i></i></router-link>
      <div class="list">
        <div class="tip">
          <span class="th1">等级</span>
          <span class="th2">特权</span>
        </div>
        <ul>
          <li v-for="item in levelList">
            <span class="n-level"><i></i>{{ item.level }}</span>
            <template v-for="(a,i) in item.privilege">
              <span>{{ a }}</span>
              <span class="point" v-if="item.privilege.length-1 !== i"></span>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data(){
    return {
      levelList: [
        {
          level: 1,
          privilege: ['5G音乐云盘免费容量','黑名单上限20']
        },
        {
          level: 2,
          privilege: ['20G音乐云盘免费容量','黑名单上限20']
        },
        {
          level: 3,
          privilege: ['40G音乐云盘免费容量','黑名单上限20','云音乐商城满100减3元优惠券','价值50云贝']
        },
        {
          level: 4,
          privilege: ['40G音乐云盘免费容量','黑名单上限20']
        },
        {
          level: 5,
          privilege: ['40G音乐云盘免费容量','黑名单上限20','云音乐商城满100减6元优惠券','价值100云贝']
        },
        {
          level: 6,
          privilege: ['60G音乐云盘免费容量','黑名单上限40']
        },
        {
          level: 7,
          privilege: ['60G音乐云盘免费容量','黑名单上限80','云音乐商城满100减9元优惠券','价值400云贝']
        },
        {
          level: 8,
          privilege: ['60G音乐云盘免费容量','黑名单上限100']
        },
        {
          level: 9,
          privilege: ['60G音乐云盘免费容量','黑名单上限120','云音乐商城满100减12元优惠券','价值1200云贝']
        },
        {
          level: 10,
          privilege: ['100G音乐云盘免费容量','黑名单上限140']
        },
      ],
    }
  }
}
</script>

<style lang="less" scoped>
.n-privilege{
  position: relative;
  z-index: 1;
  zoom: 1;
  padding: 25px 30px;
  section.top{
    padding-bottom: 10px;
    background: #fff;
    margin-bottom: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #eaeaea;
  }
  .h1{
    padding-left: 14px;
    font-size: 22px;
    line-height: 32px;
    font-weight: 400;
    margin-bottom: 10px;
  }
  .h2{
    font-size: 14px;
    font-weight: bold;
    margin-left: 20px;
    margin-bottom: 5px;
  }
  .text{
    margin-left: 40px;
    margin-bottom: 5px;
    li{
      list-style: disc;
      margin: 6px 0;
      &::marker{
        unicode-bidi: isolate;
        font-variant-numeric: tabular-nums;
        text-transform: none;
        text-indent: 0px!important;
        text-align: start!important;
        text-align-last: start!important;
      }
    }
  }
  h2.tit{
    padding-left: 14px;
    font-size: 22px;
    line-height: 32px;
    font-weight: 400;
  }
  a.myleve{
    position: absolute;
    right: 25px;
    top: 40px;
    color: #0e73ba;
    i{
      display: inline-block;
      width: 7px;
      height: 12px;
      margin-left: 5px;
      vertical-align: middle;
      background: url('@/assets/icons/gtblue.png');
    }
  }
  .red{
    color: #dc4b37;
  }
  .tip{
    padding-top: 6px;
    padding-left: 14px;
    height: 32px;
    line-height: 32px;
    border-bottom: solid 1px #e6e6e6;
    color: #666;
    span.th2{
      margin-left: 46px;
    }
  }
  .n-level{
    width: 46px;
    display: inline-block;
  }
  .list{
    li{
      height: 30px;
      padding-top: 20px;
      overflow: hidden;
      padding-left: 14px;
      color: #666;
      border-bottom: 1px solid #e6e6e6;
      span.point{
        display: inline-block;
        vertical-align: middle;
        width: 4px;
        height: 4px;
        margin-left: 15px;
        margin-right: 15px;
        background: url('@/assets/icons/addico.png');
      }
    }
  }
}
</style>
