<template>
    <div class="unauthorized">
      <h1>访问未授权</h1>
      <p>您没有权限访问此页面，请联系管理员或返回首页。</p>
      <button @click="goBack">返回首页</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goBack() {
        this.$router.push('/'); // 返回首页或登录页
      }
    }
  }
  </script>
  
  <style scoped>
  .unauthorized {
    text-align: center;
    margin-top: 100px;
  }
  
  .unauthorized h1 {
    font-size: 24px;
    color: #d9534f; /* 红色，用于突出警告 */
  }
  
  .unauthorized p {
    font-size: 18px;
    color: #333;
    margin-bottom: 20px;
  }
  
  .unauthorized button {
    padding: 10px 20px;
    background-color: #0275d8; /* 蓝色按钮 */
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .unauthorized button:hover {
    background-color: #025aa5; /* 深色的蓝色 */
  }
  </style>
  