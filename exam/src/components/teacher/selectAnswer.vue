//查询所有题库
<template>
  <div class="exam">
    <el-table :data="pagination.records" border :row-class-name="tableRowClassName">
      <el-table-column prop="subject" label="试题名称" width="180"></el-table-column>
      <el-table-column prop="question" label="题目信息" width="490"></el-table-column>
      <el-table-column prop="section" label="所属模块" width="200"></el-table-column>
      <el-table-column prop="type" label="题目类型" width="200"></el-table-column>
      <el-table-column prop="score" label="试题分数" width="150"></el-table-column>
      <el-table-column prop="level" label="难度等级" width="133"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current"
      :page-sizes="[6, 10]"
      :page-size="pagination.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total"
      class="page"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pagination: {
        //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    };
  },
  created() {
    this.getAnswerInfo();
  },
  methods: {
    getAnswerInfo() {
      //分页查询所有试卷信息
      this.$axios(
        `/api/answers/${this.pagination.current}/${this.pagination.size}`
      )
        .then(res => {
          this.pagination = res.data.data;
          console.log(res);
        })
        .catch(error => {});
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val;
      this.getAnswerInfo();
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val;
      this.getAnswerInfo();
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.exam {
  padding: 0px 40px;
  max-width: 1000px;
  margin: 0 auto;
  .page {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /deep/ .el-table {
    border: 3px solid #dfe6ec;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);

    &::before {
      height: 3px;
    }

    th, td {
      border-right: 3px solid #dfe6ec;
      border-bottom: 3px solid #dfe6ec;
    }

    .warning-row {
      background-color: #f8f8f8 !important;
    }

    .success-row {
      background-color: #ffffff !important;
    }

    .el-table__fixed {
      height: 100% !important;
      border-right: 3px solid #dfe6ec;
    }

    .el-table__fixed::before {
      height: 3px;
    }

    .el-table__fixed-right {
      height: 100% !important;
      border-left: 3px solid #dfe6ec;
    }

    .el-table__fixed-right::before {
      height: 3px;
    }

    .el-table__empty-block {
      display: none;
    }
  }
}

</style>
