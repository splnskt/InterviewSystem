// 我的试卷页面
<template>
  <div id="myExam">
    <div class="title">笔试题列表</div>
    <div class="wrapper">
      <ul class="top">
        <li class="order">笔试题列表</li>
        <li class="search-li"><div class="icon"><input type="text" placeholder="试题名称" class="search" v-model="key"><i class="el-icon-search"></i></div></li>
        <li><el-button type="primary" @click="search()">搜索试题</el-button></li>
      </ul>
      <ul class="paper" v-loading="loading">
        <li class="item" v-for="(item,index) in pagination.records" :key="index">
          <h4 @click="toExamMsg(item.examCode)">{{item.source}}</h4>
          <p class="name">{{item.source}}-{{item.description}}</p>
          <div class="info">
            <i class="el-icon-loading"></i><span>{{item.examDate.substr(0,10)}}</span>
            <i class="iconfont icon-icon-time"></i><span v-if="item.totalTime != null">限时{{item.totalTime}}分钟</span>
            <i class="iconfont icon-fenshu"></i><span>满分{{item.totalScore}}分</span>
          </div>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current"
          :page-sizes="[6, 10, 20, 40]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // name: 'myExam'
  data() {
    return {
      loading: false,
      key: null, //搜索关键字
      allExam: null, //所有考试信息
      pagination: { //分页后的考试信息
        current: 1, //当前页
        total: null, //记录条数
        size: 6 //每页条数
      }
    }
  },
  created() {
    this.getExamInfo()
    this.loading = true
  },
  // watch: {

  // },
  methods: {
    //获取当前所有考试信息
    getExamInfo() {
      this.$axios(`/api/exams/${this.pagination.current}/${this.pagination.size}`).then(res => {
        this.pagination = res.data.data
        this.loading = false
        console.log(this.pagination)
      }).catch(error => {
        console.log(error)
      })
    },
    //改变当前记录条数
    handleSizeChange(val) {
      this.pagination.size = val
      this.getExamInfo()
    },
    //改变当前页码，重新发送请求
    handleCurrentChange(val) {
      this.pagination.current = val
      this.getExamInfo()
    },
    //搜索试卷
    search() {
      this.$axios('/api/exams').then(res => {
        if(res.data.code == 200) {
          let allExam = res.data.data
          let newPage = allExam.filter(item => {
            return item.source.includes(this.key)
          })
          this.pagination.records = newPage
        }
      })
    },
    //跳转到试卷详情页
    toExamMsg(examCode) {
      this.$router.push({path: '/examMsg', query: {examCode: examCode}})
      console.log(examCode)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  padding: 20px 0px 30px 0px;
  .el-pagination {
    display: flex;
    justify-content: center;
  }
}
.paper {
  display: block;
  padding: 0 20px;
}
.paper .item {
  width: 100%;
  border-radius: 4px;
  padding: 20px 30px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px -1px rgba(60, 179, 113, 0.1), 0 2px 4px -1px rgba(60, 179, 113, 0.06);
  transition: all 0.6s ease;
  margin-bottom: 20px;
}
.paper .item:hover {
  box-shadow: 0 10px 15px -3px rgba(60, 179, 113, 0.2), 0 4px 6px -2px rgba(60, 179, 113, 0.1);
  transform: translateX(10px);
}
.paper .item .info {
  display: flex;
  align-items: center;
}
.paper .item h4 {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}
.paper .item .name {
  color: #666;
  margin-bottom: 15px;
}
.paper .item .info span {
  margin-right: 20px;
  color: #666;
}
.paper .item .info i {
  margin-right: 5px;
  color: #3CB371;
}
.wrapper .top .order {
  cursor: pointer;
}
.wrapper .top .order:hover {
  color: #3CB371;
  border-bottom: 2px solid #3CB371;
}
.wrapper .top .order:visited {
  color: #0195ff;
  border-bottom: 2px solid #0195ff;
}
.item .info i {
  margin-right: 5px;
  color: #3CB371;
}
.item .info span {
  margin-right: 14px;
}
.paper * {
  margin: 20px 0;
}
.wrapper .paper {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.top .el-icon-search {
  position: absolute;
  right: 10px;
  top: 10px;
}
.top .icon {
  position: relative;
}
.wrapper .top {
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}
#myExam .search-li {
  margin-left: auto;
}
.top .search-li {
  margin-left: auto;
}
.top li {
  display: flex;
  align-items: center;
}
.top .search {
  margin-left: auto;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #eee;
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.top .search:hover {
  color: #3CB371;
  border-color: #3CB371;
}
.wrapper .top {
  display: flex;
}
.wrapper .top li {
  margin: 20px;
}
#myExam {
  width: 980px;
  margin: 0 auto;
}
#myExam .title {
  margin: 20px;
}
#myExam .wrapper {
  background-color: #fff;
}

/* 修改搜索按钮样式 */
.wrapper .top .el-button--primary {
  background-color: #3CB371;
  border-color: #3CB371;
}

.wrapper .top .el-button--primary:hover,
.wrapper .top .el-button--primary:focus {
  background-color: #98FFB3;
  border-color: #98FFB3;
  color: #3CB371;
}
</style>
