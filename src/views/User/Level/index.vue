<template>
  <div class="g-bd clearfix">
    <div class="n-mylv">
      <div class="n-lv">
        <div class="h3">
          当前等级：
          <span class="n-level-big"><i></i>{{ data.level }}</span>
          <span class="n-level-tips">等级数据每天下午2点更新</span>
        </div>
        <div class="sub">
          <div class="subbg">
            <div :style="{
              width: (83.5*data.level)+((data.nowLoginCount+data.nowPlayCount)/(data.nextLoginCount+data.nextPlayCount)*83.5)+'px'
            }">
              <span></span>
            </div>
          </div>
          <div class="subnum">
            <div class="divison">
              <span v-for="_ in [1,2,3,4,5,6,7,8,9]"></span>
            </div>
            <div class="divnum">
              <ul>
                <li v-for="(item,index) in [0,1,2,3,4,5,6,7,8,9,10]" :class="
                  item<=data.level
                  ?item===data.level
                    ?'z-on'
                    :'z-ov'
                  :''
                ">{{ item }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="n-pow">
        <div class="h3">当前等级特权：</div>
        <div class="telist">
          <ul>
            <li v-for="item in telist">{{ item }}</li>
          </ul>
        </div>
        <div class="aboutmore">
          <router-link to="/level/details">了解等级特权和升级方式></router-link>
        </div>
      </div>
      <div class="n-nextlv">
        <div class="h4">
          距离下一个等级：
          <span class="n-level"><i></i>{{ data.level+1 }}</span>
          <span class="n-iconpoint">
            <a href="javascript:;" class="icon u-icn2 u-icn2-5"></a>
            <div class="tip">
              <p>听歌量是指累计播放的歌曲数量而非播放次数，并且实际播放时间过短的歌曲将不纳入计算，每天最多计算300首。</p>
              <p>登录天数是指使用云音乐的天数，在多端同时使用不会被重复计算。</p>
              <i class="t"></i>
              <i class="b"></i>
            </div>
          </span>
        </div>
        <div class="uitl">
          <span class="tit">听歌：</span>
          <div class="bar">
            <div class="barbox">
              <span :style="{
                width: data.progress*100+'%'
              }"></span>
            </div>
          </div>还需听歌{{ data.nextPlayCount-data.nowPlayCount }}首
        </div>
        <div class="uitl">
          <span class="tit">登录：</span>
          <div class="bar">
            <div class="barbox">
              <span :style="{
                width: data.nowLoginCount/data.nextLoginCount*100+'%'
              }"></span>
            </div>
          </div>还需登录{{ data.nextLoginCount-data.nowLoginCount }}天
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLevel } from '@/api/user'
import { mapState } from 'vuex'
export default {
  name: 'Level',
  computed: {
    ...mapState('user',['isLogin','cookie'])
  },
  data(){
    return {
      telist: [],
      data: {}
    }
  },
  methods: {
    // 获取等级数据
    async userLevel(){
      try{
        let res = await getUserLevel(this.cookie)
        if(res.code === 200){
          this.data = res.data
          this.telist = res.data.info.split('$')
        }else{
          throw '获取用户等级信息失败'
        }
      }catch(e){
        throw e
      }
    }
  },
  created(){
    this.userLevel()
  }
}
</script>

<style lang="less" scoped>
.n-level-big{
  position: relative;
  z-index: 1;
  height: 32px;
  line-height: 32px;
  margin-left: 30px;
  zoom: 1;
  font-family: Arial;
  font-size: 24px;
  font-weight: 700;
  color: #e03a24;
  font-style: italic;
  i{
    position: absolute;
    left: -30px;
    top: 0;
    z-index: 1;
    width: 30px;
    height: 30px;
    background-position: left 5px;
  }
}
.n-mylv{
  padding: 70px 68px;
  .h3{
    position: relative;
    z-index: 1;
    zoom: 1;
    height: 32px;
    line-height: 32px;
    color: #333;
    font-size: 22px;
    margin-bottom: 4px;
    font-family: 'Microsoft YaHei';
    .n-level-tips{
      position: absolute;
      z-index: 1;
      top: 101px;
      left: 0;
      font-size: 12px;
      color: #999;
      font-family: Arial, Helvetica, sans-serif;
    }
  }
}
.n-lv{
  margin-bottom: 52px;
  .sub{
    width: 100%;
    position: relative;
    z-index: 1;
    padding-top: 31px;
    height: 34px;
    .subbg{
      width: 835px;
      height: 10px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      border-radius: 10px;
      background: #dcdfe6;
      span{
        display: block;
        width: 100%;
        height: 10px;
        border-radius: 10px;
        background: url('@/assets/icons/mylevelbar.png') 0 0 repeat-y;
        animation: subbar 2s;
      }
    }
    .subnum{
      position: absolute;
      left: 0;
      bottom: 0;
      width: 835px;
      height: 40px;
      z-index: 2;
    }
  }
  .divison{
    position: absolute;
    display: flex;
    justify-content: start;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 10px;
    span{
      float: left;
      display: inline;
      width: 1px;
      background: #fff;
      height: 10px;
      margin-left: 82.7px;
    }
  }
  .divnum{
    position: absolute;
    left: -12.5px;
    top: 0;
    font-family: 'Microsoft YaHei';
    font-size: 18px;
    color: #c4c6cc;
    width: 860px;
    ul{
      display: flex;
      justify-content: space-between;
    }
    li{
      display: inline;
      float: left;
      width: 25px;
      height: 28px;
      line-height: 24px;
      text-align: center;
      &.z-ov{
        color: #ed5757;
        animation: show 3s;
      }
      &.z-on{
        color: #fff;
        background-position: 0 -50px;
        animation: show1 2s;
      }
    }
  }
}
@keyframes show{
  0%{
    color: #c4c6cc;
  }
  100%{
    color: #ed5757;
  }
}
@keyframes show1{
  0%{
    color: #c4c6cc;
    background-position: 9999px 9999px;
  }
  50%{
    color: #c4c6cc;
    background-position: 0 -50px;
  }
  100%{
    color: #fff;
  }
}
@keyframes subbar{
  0%{
    width: 0%;
  }
  100%{
    width: 100%;
  }
}
.n-pow{
  border-bottom: solid 1px #ddd;
  margin-bottom: 36px;
  .telist{
    padding-bottom: 10px;
    li{
      height: 30px;
      line-height: 30px;
      color: #666;
      padding-left: 13px;
      background-position: -17px -82px;
      font-size: 14px;
    }
  }
  .aboutmore{
    color: #0e73ba;
    margin-top: 28px;
    padding-left: 4px;
    margin-bottom: 26px;
    height: 20px;
    line-height: 20px;
    a{
      color: #0e73ba;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
.n-nextlv{
  h4{
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    color: #333;
    margin-bottom: 20px;
  }
  .uitl{
    font-size: 12px;
    color: #999;
    height: 32px;
    line-height: 32px;
    .tit{
      line-height: 32px;
      color: #666;
    }
  }
  .bar{
    display: inline-block;
    width: 160px;
    height: 12px;
    margin-right: 6px;
    position: relative;
    zoom: 1;
  }
  .barbox{
    position: absolute;
    top: 7px;
    left: 0;
    z-index: 1;
    width: 160px;
    height: 4px;
    line-height: 0;
    background: #dcdfe6;
    border-radius: 4px;
    span{
      height: 100%;
      background: #f75757;
      border-radius: 4px;
      display: block;
    }
  }
}
</style>
