<template>
  <div class="footer">
    <div class="m-ft">
      <ul class="enter">
        <li class="unit">
          <a href="https://developer.music.163.com/st/developer" hidefocus="true" target="_blank" class="logo logo-openplatform"></a>
          <span class="tt">音乐开放平台</span>
        </li>
        <li class="unit">
          <a href="https://music.163.com/st/web-sublicense/home" hidefocus="true" target="_blank" class="logo logo-trade"></a>
          <span class="tt">云村交易所</span>
        </li>
        <li class="unit">
          <a href="https://web-amped.music.163.com/" hidefocus="true" target="_blank" class="logo logo-amped"></a>
          <span class="tt">Amped Studio</span>
        </li>
        <li class="unit">
          <a href="https://music.163.com/st/userbasic#/auth" hidefocus="true" target="_blank" class="logo logo-auth"></a>
          <span class="tt">用户认证</span>
        </li>
        <li class="unit">
          <a href="https://music.163.com/musician/artist" hidefocus="true" target="_blank" class="logo logo-musician"></a>
          <span class="tt">独立音乐人</span>
        </li>
        <li class="unit">
          <a href="https://music.163.com/web/reward" hidefocus="true" target="_blank" class="logo logo-reward"></a>
          <span class="tt">赞赏</span>
        </li>
        <li class="unit">
          <a href="https://music.163.com/st/ncreator/revenue-plan" hidefocus="true" target="_blank" class="logo logo-cash"></a>
          <span class="tt">视频激励</span>
        </li>
      </ul>
      <div class="copy">
        <p class="link">
          <a href="https://st.music.163.com/official-terms/service" hidefocus="true" target="_blank" class="s-fc3">服务条款</a>
          <span class="line">|</span>
          <a href="https://st.music.163.com/official-terms/privacy" hidefocus="true" target="_blank" class="s-fc3">隐私政策</a>
          <span class="line">|</span>
          <a href="https://st.music.163.com/official-terms/children" hidefocus="true" target="_blank" class="s-fc3">儿童隐私政策</a>
          <span class="line">|</span>
          <a href="https://music.163.com/st/staticdeal/complaints.html" hidefocus="true" target="_blank" class="s-fc3">版权投诉</a>
          <span class="line">|</span>
          <a href="http://ir.music.163.com/" hidefocus="true" target="_blank" class="s-fc3">投资者关系</a>
          <span class="line">|</span>
          <a href="https://music.163.com/ui/resource" hidefocus="true" target="_blank" class="s-fc3">广告合作</a>
          <span class="line">|</span>
          <a href="https://mp.music.163.com/600948c936c13f4d09752e73/contact-us-web/index.html?source=Music-Main-Station" hidefocus="true" target="_blank" class="s-fc3">联系我们</a>
        </p>
        <p class="s-fc3">
          <a href="https://jubao.163.com/" hidefocus="true" target="_blank" class="sep s-fc3">廉正举报</a>
          <span class="sep">不良信息举报邮箱: 51jubao@service.netease.com</span>
          <span>客服热线：95163298</span>
        </p>
        <p class="s-fc3">
          <span>互联网宗教信息服务许可证：浙（2022）0000120</span>
          <span>增值电信业务经营许可证：浙B2-20150198</span>
          <a href="https://beian.miit.gov.cn/#/Integrated/index" hidefocus="true" target="_blank" class="s-fc3">粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
        </p>
        <p class="s-fc3">
          <span class="sep">网易公司版权所有©1997-2022</span>
          <span>杭州乐读科技有限公司运营：</span>
          <a href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" hidefocus="true" target="_blank" class="s-fc3">浙网文[2021] 1186-054号</a>
          <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010902002564" hidefocus="true" target="_blank" class="s-fc3 police-link">
            <span class="police-logo"></span>
            <span class="police-text">浙公网安备 33010902002564号</span>
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="less" scoped>
.footer{
  position: relative;
  height: 325px;
  border-top: 1px solid #d3d3d3;
  background: #f2f2f2;
  .enter{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 33px;
    .unit{
      width: 45px;
      margin-left: 80px;
      text-align: center;
      color: #666;
      &:first-child{
        margin-left: 0;
      }
      .logo{
        display: block;
        width: 45px;
        height: 45px;
        margin: 0 auto;
        background: url('@/assets/icons/foot_enter_new2.png') no-repeat;
        background-size: 220px 220px;
        &.logo-openplatform{
          background-position: -170px -5px;
          &:hover{
            background-position: -5px -115px;
          }
        }
        &.logo-trade{
          background-position: -5px -170px;
          &:hover{
            background-position: -60px -170px;
          }
        }
        &.logo-amped{
          background-position: -5px -60px;
          &:hover{
            background-position: -60px -5px;
          }
        }
        &.logo-auth{
          background-position: -60px -60px;
          &:hover{
            background-position: -115px -5px;
          }
        }
        &.logo-musician{
          background-position: -115px -115px;
          &:hover{
            background-position: -5px -5px;
          }
        }
        &.logo-reward{
          background-position: -170px -115px;
          &:hover{
            background-position: -60px -115px;
          }
        }
        &.logo-cash{
          background-position: -170px -60px;
          &:hover{
            background-position: -115px -60px;
          }
        }
      }
      .tt{
        display: inline-block;
        width: 100px;
        margin-top: 10px;
        margin-left: -27.5px;
        font-weight: 400;
        font-size: 12px;
        text-align: center;
        color: rgba(0, 0, 0, .5);
      }
    }
  }
  .copy{
    padding-top: 60px;
    line-height: 24px;
    margin: 0 auto;
    text-align: center;
    a:hover{
      text-decoration: underline;
    }
    .line{
      margin: 0 8px 0 8px;
      color: #d9d9d9;
    }
    .sep{
      margin-right: 14px;
    }
    .police-link{
      margin-left: 5px;
      font-size: 0;
    }
    .police-logo{
      display: inline-block;
      width: 14px;
      height: 14px;
      background: url('@/assets/icons/police.png') no-repeat;
      background-size: cover;
      margin-right: 2px;
      vertical-align: -2px;
    }
    .police-text{
      font-size: 12px;
    }
  }
}
</style>
