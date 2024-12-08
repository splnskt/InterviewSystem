<template>
  <div class="teacher-interview-detail">
    <h2>面试详情</h2>
    <el-descriptions :title="`面试ID：${interviewRoom.id}`" border>
      <el-descriptions-item label="考生姓名">{{ interviewRoom.candidateName }}</el-descriptions-item>
      <el-descriptions-item label="考官姓名">{{ interviewRoom.examinerName }}</el-descriptions-item>
      <el-descriptions-item label="开始时间">{{ formatDate(interviewRoom.startTime) }}</el-descriptions-item>
      <el-descriptions-item label="结束时间">{{ formatDate(interviewRoom.endTime) }}</el-descriptions-item>
      <el-descriptions-item label="状态">{{ interviewRoom.status }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ interviewRoom.remark }}</el-descriptions-item>
    </el-descriptions>

    <!-- 当面试已结束时，显示打分功能 -->
    <div class="score-section" v-if="interviewRoom.status === '已结束'">
      <div v-if="score !== null">
        <p>本次面试评分：<el-tag type="success">{{ score }}</el-tag></p>
      </div>
      <div v-else>
        <el-button type="primary" @click="openScoreDialog">给面试打分</el-button>
      </div>
    </div>

    <el-dialog title="打分" :visible.sync="showScoreDialog">
      <div class="dialog-content">
        <el-input v-model="tempScore" placeholder="请输入分数(0-100)" style="width:100%; margin-top:10px;"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showScoreDialog = false">取消</el-button>
        <el-button type="primary" @click="submitScore">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InterviewDetail',
  data() {
    return {
      interviewId: this.$route.params.id,
      interviewRoom: {},
      showScoreDialog: false,
      tempScore: '',
      score: null, // 存储已打分结果
    };
  },
  methods: {
    fetchInterviewRoom() {
      this.$store.dispatch('fetchInterviewRoomById', this.interviewId).then(() => {
        this.interviewRoom = this.$store.state.currentInterviewRoom;
        this.loadScore();
      }).catch(() => {
        this.$message.error('无法获取面试详情');
        this.$router.push('/teacher/interviews');
      });
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
    loadScore() {
      // 从 localStorage 中读取评分信息
      const scores = JSON.parse(localStorage.getItem('scores') || '{}');
      this.score = scores[this.interviewId] || null;
    },
    openScoreDialog() {
      this.showScoreDialog = true;
    },
    submitScore() {
      const value = Number(this.tempScore);
      if (isNaN(value) || value < 0 || value > 100) {
        this.$message.error('请输入0-100的有效分数');
        return;
      }
      const scores = JSON.parse(localStorage.getItem('scores') || '{}');
      scores[this.interviewId] = value;
      localStorage.setItem('scores', JSON.stringify(scores));
      this.score = value;
      this.showScoreDialog = false;
      this.$message.success('打分成功！');
    },
  },
  created() {
    this.fetchInterviewRoom();
  },
};
</script>

<style scoped>
.teacher-interview-detail {
  padding: 20px;
}

.score-section {
  margin-top: 20px;
}

.dialog-content {
  margin: 10px 0;
}
</style>
