<template>
  <div class="interview-detail">
    <h2>面试详情</h2>
    <el-descriptions :title="`面试ID：${interviewRoom.id}`" border>
      <el-descriptions-item label="考官姓名">{{ interviewRoom.examinerName }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ formatDate(interviewRoom.startTime) }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ formatDate(interviewRoom.endTime) }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ interviewRoom.status }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ interviewRoom.remark || '无' }}</el-descriptions-item>
    </el-descriptions>
    <el-button
      v-if="interviewRoom.status === '进行中'"
      type="primary"
      @click="enterInterviewRoom"
    >加入面试</el-button>
  </div>
</template>

<script>
export default {
  name: 'StudentInterviewDetail',
  data() {
    return {
      interviewId: this.$route.params.id,
      interviewRoom: {},
    };
  },
  methods: {
    fetchInterviewRoom() {
      this.$store.dispatch('fetchInterviewRoomById', this.interviewId).then(() => {
        this.interviewRoom = this.$store.getters.currentInterviewRoom;

        // 检查当前学生是否有权限查看该面试
        const studentName = this.$cookies.get('cname');
        if (this.interviewRoom.candidateName !== studentName) {
          this.$message.error('您无权查看此面试详情');
          this.$router.push('/student/interviewlist');
        }
      }).catch(() => {
        this.$message.error('无法获取面试详情');
        this.$router.push('/student/interviewlist');
      });
    },
    enterInterviewRoom() {
      // 获取 peerId 并跳转到面试房间
      const peerId = this.interviewRoom.peerId;
      this.$router.push(`/interviewRoom?id=${this.interviewId}&peerId=${peerId}`);
    },
    formatDate(dateStr) {
      // 格式化日期字符串
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
  },
  created() {
    this.fetchInterviewRoom();
  },
};
</script>

<style scoped>
.interview-detail {
  padding: 20px;
}

.el-descriptions {
  margin-bottom: 20px;
}
</style>
