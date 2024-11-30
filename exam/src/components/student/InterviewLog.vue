<!-- src/components/student/InterviewLog.vue -->
<template>
    <div class="interview-log">
      <h3>面试日志管理</h3>
      <el-form @submit.native.prevent="submitLog">
        <el-form-item label="日志内容">
          <el-input v-model="newLog.content" placeholder="请输入日志内容" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitLog">添加日志</el-button>
        </el-form-item>
      </el-form>
  
      <el-table :data="interviewLogs" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="timestamp" label="时间" width="180"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'InterviewLog',
    data() {
      return {
        newLog: {
          content: '',
        },
      };
    },
    computed: {
      ...mapGetters(['allInterviewLogs']),
      interviewLogs() {
        return this.allInterviewLogs;
      },
    },
    methods: {
      ...mapActions(['addInterviewLog']),
      submitLog() {
        if (!this.newLog.content.trim()) {
          this.$message.error('日志内容不能为空');
          return;
        }
        const log = {
          id: Date.now(),
          content: this.newLog.content,
          timestamp: new Date().toLocaleString(),
        };
        this.addInterviewLog(log);
        this.$message.success('日志已添加');
        this.newLog.content = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .interview-log {
    padding: 20px;
  }
  </style>
  