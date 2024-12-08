<template> 
  <div class="teacher-interview-list">
    <h2>教师面试管理</h2>
    <el-table
      :data="interviewRooms"
      style="width: 100%"
      v-loading="loading"
      border
      stripe
    >
      <el-table-column
        prop="id"
        label="面试ID"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="candidateName"
        label="考生姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="examinerName"
        label="考官姓名"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="startTime"
        label="开始时间"
        width="180"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="面试状态"
        width="120"
      ></el-table-column>
      <!-- 移除预约状态列 -->
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-dropdown trigger="click">
            <el-button type="primary" size="mini">
              操作 <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="viewInterviewDetail(scope.row.id)">
                查看详情
              </el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.status === '准备中'"
                @click.native="startInterview(scope.row.id)"
              >
                开始面试
              </el-dropdown-item>
              <el-dropdown-item
                v-else-if="scope.row.status === '进行中'"
                @click.native="joinInterview(scope.row.id, scope.row.peerId)"
              >
                加入面试
              </el-dropdown-item>
              <el-dropdown-item
                v-if="scope.row.status !== '进行中'"
                @click.native="deleteInterview(scope.row.id)"
              >
                删除面试
              </el-dropdown-item>
              <el-dropdown-item v-else disabled>
                无法操作
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'TeacherInterviewList',
  data() {
    return {
      interviewRooms: [],
      loading: false,
    };
  },
  methods: {
    fetchInterviewRooms() {
      this.loading = true;
      this.$store
        .dispatch('fetchInterviewRooms')
        .then(() => {
          this.interviewRooms = this.$store.state.interviewRooms;
          this.loading = false;
        })
        .catch(() => {
          this.$message.error('无法获取面试列表');
          this.loading = false;
        });
    },
    viewInterviewDetail(id) {
      this.$router.push(`/teacher/interview/${id}`);
    },
    startInterview(interviewId) {
      this.$confirm('确认开始面试吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store
          .dispatch('startInterview', interviewId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '面试已开始',
            });
            this.$router.push(`/teacher/interviewRoom?id=${interviewId}&peerId=${interviewId}`);
          })
          .catch((error) => {
            console.error('开始面试失败', error);
            this.$message.error('开始面试失败，请稍后重试。');
          });
      }).catch(() => {
        // 用户取消操作
      });
    },
    joinInterview(interviewId, peerId) {
      this.$router.push(`/teacher/interviewRoom?id=${interviewId}&peerId=${peerId}`);
    },
    deleteInterview(interviewId) {
      this.$confirm('确认删除此面试吗？此操作无法撤销。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.$store
          .dispatch('deleteInterviewRoom', interviewId)
          .then(() => {
            this.$message({
              type: 'success',
              message: '面试已删除',
            });
            this.fetchInterviewRooms();
          })
          .catch((error) => {
            console.error('删除面试失败', error);
            this.$message.error('删除面试失败，请稍后重试。');
          });
      }).catch(() => {
        // 用户取消删除操作
      });
    },
    formatDate(row, column, cellValue) {
      if (!cellValue) return '';
      const date = new Date(cellValue);
      return date.toLocaleString();
    },
  },
  created() {
    this.fetchInterviewRooms();
  },
};
</script>

<style scoped>
.teacher-interview-list {
  padding: 20px;
}

.el-table {
  font-size: 14px;
}

.el-table th {
  background-color: #f5f7fa;
  color: #333;
}

.el-button {
  margin-right: 5px;
}
</style>
