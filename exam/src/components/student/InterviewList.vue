<template>
  <div class="student-interview-list">
    <h2>我的面试列表</h2>
    <el-input
      v-model="searchQuery"
      placeholder="搜索考官姓名"
      class="search-input"
      clearable
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-table
      :data="filteredInterviewRooms"
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
        prop="endTime"
        label="结束时间"
        width="180"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="面试状态"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" width="150">
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
                v-if="scope.row.status === '进行中'"
                @click.native="enterInterviewRoom(scope.row.id, scope.row.peerId)"
              >
                加入面试
              </el-dropdown-item>
              <el-dropdown-item v-else disabled>
                无法加入
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
  name: 'StudentInterviewList',
  data() {
    return {
      interviewRooms: [],
      loading: false,
      searchQuery: '',
      studentName: '',
    };
  },
  computed: {
    filteredInterviewRooms() {
      if (this.searchQuery) {
        return this.interviewRooms.filter((room) =>
          room.examinerName.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.interviewRooms;
    },
  },
  methods: {
    fetchInterviewRooms() {
      this.loading = true;
      // 从 cookies 中获取当前学生的姓名
      this.studentName = this.$cookies.get('cname') || '';
      // 调用 Vuex 的 action 获取与当前学生相关的面试列表
      this.$store
        .dispatch('fetchStudentInterviews', this.studentName)
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
      // 跳转到面试详情页面
      this.$router.push(`/student/interview/${id}`);
    },
    enterInterviewRoom(id, peerId) {
      // 跳转到学生的面试房间
      this.$router.push(`/student/interviewRoom?id=${id}&peerId=${peerId}`);
    },
    formatDate(row, column, cellValue) {
      // 格式化日期
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
.student-interview-list {
  padding: 20px;
}

.search-input {
  width: 300px;
  margin-bottom: 20px;
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
