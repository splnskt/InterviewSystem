<template>
  <section class="index">
    <div class="hello">
      <img src="@/assets/img/icon.png" alt="icon" class="icon-img" />
      <span>欢迎您,{{user.userName}}面试官。</span>
    </div>
    <div class="msg">
      <p class="title">教务公告：</p>
      <ul>
        <li @click="openMsg()"><i class="iconfont icon-flag"></i>本周面试安排</li>
        <li @click="openMsg()"><i class="iconfont icon-flag"></i>面试评分标准更新</li>
        <li @click="openMsg()"><i class="iconfont icon-flag"></i>面试考生信息查看方法</li>
      </ul>
    </div>
  </section>
</template>


<script>
export default {
  data() {
    return {
      user: { //用户信息
        userName: null,
        userId: null
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo() { //获取用户信息
      let userName = this.$cookies.get("cname")
      let userId = this.$cookies.get("cid")
      this.user.userName = userName
      this.user.userId = userId
    },
    openMsg() {
      this.$alert('根据《国务院办公厅关于2019年部分节假日安排的通知》精神，越城区行政服务中心将于4月5日（星期五）至4月7日（星期天）进行清明节放假调休，共3天，放假期间不受理业务。4月8日（星期一）开始正常上班受理业务。望市民朋友相互转告，给您带来不便，敬请谅解。','清明节放假通知',{
        confirmButtonText: '确定'
      })
    }
  }
}
</script>


<style lang="less" scoped>
.index {
  margin-left: 20px;
  .hello {
    font-size: 40px;
    color: #726f70;
    display: flex; /* 使用 Flexbox 对齐图片和文字 */
    align-items: center;

    .icon-img {
      width: 40px; /* 设置图片宽度 */
      height: 40px; /* 设置图片高度 */
      margin-right: 10px; /* 添加右侧间距，防止图片与文字过于贴近 */
    }
  }
  .msg {
    .title {
      font-size: 16px;
      color: #000;
      margin-top: 20px;
      margin-left: 10px;
    }
    ul {
      display: flex;
      flex-direction: column;
      width: 200px;
      overflow: hidden;
    }
    li {
      margin-top: 10px;
      font-size: 14px;
      color: #3CB371;
      cursor: pointer;
      display: inline-block;
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
    }
  }
  .msg li {
    transition: all 0.3s ease;
  }
  .msg li:hover {
    transform: scale(1.05);
    color: #98FFB3;
  }
}
</style>


