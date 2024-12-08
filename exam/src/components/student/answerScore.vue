<template>
  <div class="score">
    <div class="title">
      <p class="name">笔试题</p>
<!--      <p class="description">考生：大咸鱼</p>-->
    </div>
    <div class="total">
      <div class="look">
        本次考试成绩
      </div>
      <div class="show">
<!--        <div class="img1" :class="{'img1Transform': imgShow}">
          <img :src="imgSrc.fail1" alt="哭了" v-if="score < 60">
          <img :src="imgSrc.pass1" alt="过了" v-if="score >= 60">
        </div>-->
        <div class="number" :class="{'border': isTransition}">
          <span>{{score}}</span>
          <span>分数</span>
        </div>
<!--        <div class="img2" :class="{'img2Transform': imgShow}">
          <img :src="imgSrc.fail2" alt="哭了" v-if="score < 60">
          <img :src="imgSrc.pass2" alt="过了" v-if="score >= 60">
        </div>-->
      </div>
      <ul class="time">
        <li class="start"><span>开始时间</span> <span>{{startTime}}</span></li>
        <li class="end"><span>结束时间</span> <span>{{endTime}}</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTransition: false, //是否渲染完成
      score: 0, //总分
      imgShow: false, //不及格图片显示
      imgSrc: {
        fail1: require("@/assets/img/cry1.gif"),
        fail2: require('@/assets/img/cry2.jpg'),
        pass1: require('@/assets/img/good1.jpg'),
        pass2: require('@/assets/img/good2.gif')
      },
      startTime: null, //考试开始时间
      endTime: null, //考试结束时间
    }
  },
  created() {
    this.transiton()
    this.getScore()
  },
  methods: {
    transiton() {  //一秒后过渡
      setTimeout(() => {
        this.isTransition = true
        this.imgShow = true
      },1000)
    },
    getScore() {
      let score = this.$route.query.score
      let startTime = this.$route.query.startTime
      let endTime = this.$route.query.endTime
      this.score = score
      this.startTime = startTime
      this.endTime = endTime
    }
  }
}
</script>

<style lang="less" scoped>
.show {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 160px;
    height: 160px;
  }
  .img1Transform {
    opacity: 1 !important;
    transform: translateX(30px) !important;
    transition: all 0.6s ease !important;
  }
  .img2Transform {
    opacity: 1 !important;
    transform: translateX(-30px) !important;
    transition: all 0.6s ease !important;
  }
  .img1 {
    margin-top: 70px;
    opacity: 0;
    transform: translateX(0px);
    transition: all 0.6s ease;
  }
  .img2 {
    margin-top: 30px;
    opacity: 0;
    transform: translateX(0px);
    transition: all 0.6s ease;
  }
}
.time {
  padding: 0px 70px;
  li {
    display: flex;
    justify-content: space-around;
    padding: 10px;
    margin: 20px 0px;
  }
  li:nth-child(1) {
    background-color: #fcf8e3;
  }
  li:nth-child(2) {
    background-color: #e9f5e9;
  }
}
.border {
  position: relative !important;
  transition: all 2s ease;
  width: 200px !important;
  height: 200px !important;
  transform: rotate(360deg) !important;
  opacity: 1 !important;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%) !important;
  background-color: #45cc7d !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  box-shadow: 0 0 30px rgba(60, 179, 113, 0.8),
             0 0 60px rgba(60, 179, 113, 0.6) !important;
}
.score {
  max-width: 800px;
  margin: 0 auto;
  .title {
    margin: 60px 0px 30px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .name {
      font-size: 26px;
      color: inherit;
      font-weight: 500;
    }
    .description {
      font-size: 14px;
      color: #888;
    }
  }
  .total {
    border: 1px solid #dbdbdb;
    background-color: #fff;
    padding: 40px;
    .look {
      border-bottom: 1px solid #dbdbdb;
      padding: 0px 0px 14px 0px;
      color: #3CB371;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .number {
      opacity: 0;
      transform: rotate(0deg);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column-reverse;
      margin: 0 auto;
      width: 200px;
      height: 200px;
      margin-top: 80px;
      margin-bottom: 20px;
      transition: all 1s ease;

      span:nth-child(1) {
        font-size: 36px;
        font-weight: 600;
        color: #fff;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
        margin-top: 10px;
      }
      span:nth-child(2) {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
      }
    }
  }
}

/* 修改五角星闪烁动画 */
@keyframes starShine {
  0% {
    transform: scale(1) rotate(360deg);
    box-shadow: 0 0 30px rgba(60, 179, 113, 0.8),
               0 0 60px rgba(60, 179, 113, 0.6);
  }
  50% {
    transform: scale(1.1) rotate(360deg);
    box-shadow: 0 0 40px rgba(60, 179, 113, 0.9),
               0 0 80px rgba(60, 179, 113, 0.7);
  }
  100% {
    transform: scale(1) rotate(360deg);
    box-shadow: 0 0 30px rgba(60, 179, 113, 0.8),
               0 0 60px rgba(60, 179, 113, 0.6);
  }
}

.border {
  animation: starShine 2s infinite;
}
</style>

