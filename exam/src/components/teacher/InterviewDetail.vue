<template>
  <div>
    <h2>面试详情</h2>
    <el-descriptions :title="`面试ID：${interviewRoom.id}`" border>
      <el-descriptions-item label="考生姓名">{{ interviewRoom.candidateName }}</el-descriptions-item>
      <el-descriptions-item label="考官姓名">{{ interviewRoom.examinerName }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ interviewRoom.startTime }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ interviewRoom.endTime }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ interviewRoom.status }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ interviewRoom.remark }}</el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="startInterview" v-if="interviewRoom.status === '准备中'">开始面试</el-button>
    <el-button type="default" disabled v-else>面试{{ interviewRoom.status }}</el-button>
  </div>
</template>

<script>
export default {
  name: 'InterviewDetail',
  data() {
    return {
      interviewId: this.$route.params.id,
      interviewRoom: {},
    };
  },
  methods: {
    fetchInterviewRoom() {
      this.$store.dispatch('fetchInterviewRoomById', this.interviewId).then(() => {
        this.interviewRoom = this.$store.state.currentInterviewRoom;
      });
    },
    startInterview() {
      this.$store.dispatch('startInterview', this.interviewId).then(() => {
        this.$message({
          type: 'success',
          message: '面试已开始',
        });
        this.$router.push(`/interviewRoom?roomId=${this.interviewId}`);
      });
    },
  },
  created() {
    this.fetchInterviewRoom();
  },
};
</script>

<style scoped>
.teacher-interview-detail {
  text-align: center;
  margin-top: 20px;
}
button {
  padding: 10px 20px;
  background-color: #0275d8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #025aa5;
}
</style>