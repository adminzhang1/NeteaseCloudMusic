<template>
  <div class="mrc-qr">
    <div class="qr-container">
      <div class="qr-main" v-if="!waiting">
        <div class="main-left">
          <img src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9643571155/525c/faac/2dc6/fe695c03c7c358ddaa4651736b26a55f.png" alt="" />
        </div>
        <div class="main-right">
          <h3>扫码登陆</h3>
          <div class="qr">
            <canvas width="128" height="128" ref="qrCanvas"></canvas>
            <div class="over-msk" v-if="overdue">
              <p>二维码已失效</p>
              <a href="javascript:;" class="refresh" @click="refresh">点击刷新</a>
            </div>
          </div>
          <p class="app-link">
            使用
            <router-link to="/download" target="_blank">网易云音乐APP</router-link>
            扫码登录
          </p>
        </div>
      </div>
      <div class="waiting" v-if="waiting">
        <img src="https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/9765284460/1b1d/9f46/2fa3/2d5d07bb5fcf8c24c1ad788c923ef313.png" alt="" />
        <h3>扫描成功</h3>
        <p>请在手机上确认登录</p>
      </div>
      <a href="javascript:;" class="more-mode" @click="more">选择其他登录模式</a>
    </div>
  </div>
</template>

<script>
import { getQrKey,getQrCreate,QrCheck } from '@/api/login'
import { mapMutations,mapActions } from 'vuex'
export default {
  name: 'QR',
  data(){
    return {
      key: '',
      overdue: false,
      waiting: false
    }
  },
  methods: {
    ...mapMutations('user',['LogIn']),
    ...mapActions('user',['UserInfo']),
    // 切换其他登陆模式
    more(){
      this.$bus.$emit('switchMode','MoreMode')
    },
    // 获取二维码key值
    async QrDetail(){
      try{
        let key = await getQrKey()
        if(key.code === 200 && key.data.code === 200){
          this.key = key.data.unikey
          let qr = await getQrCreate(key.data.unikey)
          if(qr.code === 200){
            let img = new Image()
            img.src = qr.data.qrimg
            img.onload = () => {
              this.$refs.qrCanvas.getContext('2d').drawImage(img,-15,-15,158,158)
            }
            this.QrTimer = setInterval(() => {
              this.checkQr()
            }, 10000);
          }else{
            throw '二维码信息获取失败'
          }
        }else{
          throw 'key值获取失败'
        }
      }catch(e){
        throw e
      }
    },
    // 检查二维码
    async checkQr(){
      try{
        let res = await QrCheck(this.key)
        console.log(res.code,res.message,res)
        if(res.code === 400){
          throw '传入的参数错误'
        }else if(res.code === 802){
          console.log('待确认')
          this.waiting = true
        }else if(res.code === 800){
          console.log('二维码过期')
          this.overdue = true
          clearInterval(this.QrTimer)
        }else if(res.code === 803){
          this.UserInfo(res.cookie)
          // this.$router.go('/found/discover')
        }
      }catch(e){
        throw e
      }
    },
    // 刷新二维码
    refresh(){
      this.overdue = false
      this.QrDetail()
    }
  },
  created(){
    this.QrDetail()
  },
  beforeDestroy(){
    clearInterval(this.QrTimer)
  }
}
</script>

<style lang="less" scoped>
.mrc-qr{
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 326px;
  margin: auto;
  padding: 0;
  border: 1px solid #d8d8d8;
  border-width: 0 1px 1px;
  border-radius: 0 0 4px 4px;
  background: #fff;
  .qr-main{
    display: flex;
    justify-content: center;
    height: 220px;
    .main-left{
      img{
        width: 125px;
        height: 220px;
      }
    }
    .main-right{
      margin-left: 25px;
      width: 200px;
      text-align: center;
      h3{
        font-size: 18px;
        font-weight: 500;
      }
      .app-link{
        width: 200px;
        font-size: 12px;
        line-height: 17px;
        color: rgba(0, 0, 0, .4);
        a{
          color: #0c73c2;
        }
      }
      .qr{
        position: relative;
        width: 138px;
        height: 138px;
        padding: 4px;
        margin: 13px auto;
        canvas{
          width: 128px;
          height: 128px;
        }
        .over-msk{
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, .9);
          p{
            margin: 45px auto 6px;
            font-size: 12px;
            color: rgba(0, 0, 0, .8);
            font-weight: 500;
          }
          .refresh{
            display: block;
            width: 64px;
            height: 24px;
            line-height: 24px;
            margin: 0 auto;
            text-align: center;
            border-radius: 4px;
            background: linear-gradient(180deg, #81DD81 0%, #55A055 100%);
            border: 1px solid #5baf5b;
            color: #fff;
            font-size: 12px;
          }
        }
      }
    }
  }
  .waiting{
    text-align: center;
    img{
      width: 140px;
      height: 140px;
    }
    h3{
      margin-top: 12px;
      font-size: 18px;
      font-weight: 450;
      line-height: 24px;
      color: rgba(0, 0, 0, .8);
    }
    p{
      margin-top: 4px;
      font-size: 14px;
      color: #333;
    }
  }
  .more-mode{
    display: block;
    width: 118px;
    height: 28px;
    line-height: 28px;
    margin: 20px auto 0;
    font-size: 12px;
    border: 1px solid #979797;
    border-radius: 15px;
    line-height: 28px;
    text-align: center;
    color: rgba(0, 0, 0, .8);
  }
}
</style>
