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

    <div class="actions">
      <div class="left-actions">
        <!-- 只有在准备中时可预约 -->
        <template v-if="canReserve">
          <el-button type="primary" @click="reserveInterview" v-if="!alreadyReserved">
            预约面试
          </el-button>
          <el-tag type="success" v-else>已预约</el-tag>
        </template>
      </div>
      <div class="right-actions">
        <el-button
          v-if="interviewRoom.status === '进行中'"
          type="primary"
          @click="enterInterviewRoom"
        >加入面试</el-button>
      </div>
    </div>

    <!-- 面试已结束后显示打分结果 -->
    <div v-if="interviewRoom.status === '已结束'" class="score-section">
      <p v-if="score !== null">本次面试最终得分：<el-tag type="info">{{ score }}</el-tag></p>
      <p v-else>本次面试暂未打分</p>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'StudentInterviewDetail',
  data() {
    return {
      interviewId: this.$route.params.id,
      interviewRoom: {},
      studentName: this.$cookies.get('cname') || '',
      score: null,
      socket: null,
    };
  },
  computed: {
    canReserve() {
      return this.interviewRoom.status === '准备中';
    },
    alreadyReserved() {
      const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
      const reservedStudents = reservations[this.interviewId] || [];
      return reservedStudents.includes(this.studentName);
    },
  },
  methods: {
    fetchInterviewRoom() {
      this.$store.dispatch('fetchInterviewRoomById', this.interviewId).then(() => {
        this.interviewRoom = this.$store.getters.currentInterviewRoom;
        if (this.interviewRoom.candidateName !== this.studentName) {
          this.$message.error('您无权查看此面试详情');
          this.$router.push('/student/interviewlist');
        }
        this.loadScore();
      }).catch(() => {
        this.$message.error('无法获取面试详情');
        this.$router.push('/student/interviewlist');
      });
    },
    reserveInterview() {
      const reservations = JSON.parse(localStorage.getItem('reservations') || '{}');
      reservations[this.interviewId] = reservations[this.interviewId] || [];
      if (!reservations[this.interviewId].includes(this.studentName)) {
        reservations[this.interviewId].push(this.studentName);
        localStorage.setItem('reservations', JSON.stringify(reservations));
        this.$message.success('预约成功!');

        // 通过 socket 通知服务器更新预约信息
        this.socket.emit('reservation', { interviewId: this.interviewId, candidateName: this.studentName });
      }
    },
    enterInterviewRoom() {
      const peerId = this.interviewRoom.peerId;
      this.$router.push(`/interviewRoom?id=${this.interviewId}&peerId=${peerId}`);
    },
    formatDate(dateStr) {
      if (!dateStr) return '';
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
    loadScore() {
      const scores = JSON.parse(localStorage.getItem('scores') || '{}');
      this.score = scores[this.interviewId] || null;
    },
    connectSocket() {
      this.socket = io('http://localhost:3000'); // 信令服务器地址
      this.socket.on('connect', () => {
        console.log('Student connected to signaling server for reservations');
      });
    }
  },
  created() {
    this.fetchInterviewRoom();
    this.connectSocket();
  },
};
</script>

<style scoped>
.interview-detail {
  padding: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  align-items: center;
}

.left-actions, .right-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.score-section {
  margin-top: 20px;
}
</style>
