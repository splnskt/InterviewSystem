<template>
    <div>
      <h2>创建新面试</h2>
      <el-form :model="interviewRoom" ref="interviewForm" :rules="rules" label-width="120px">
        <el-form-item label="考生姓名" prop="candidateName">
          <el-input v-model="interviewRoom.candidateName"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            v-model="interviewRoom.startTime"
            type="datetime"
            placeholder="选择开始时间"
            style="width: 100%;"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            v-model="interviewRoom.endTime"
            type="datetime"
            placeholder="选择结束时间"
            style="width: 100%;"
            value-format="timestamp">
          </el-date-picker>
        </el-form-item>
        <!-- 不需要输入考官姓名，直接从用户信息获取 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('interviewForm')">提交</el-button>
          <el-button @click="resetForm('interviewForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  
  export default {
    name: 'InterviewCreate',
    data() {
      // 从 cookies 中获取考官姓名
      const examinerName = this.$cookies.get("cname") || '';
      console.log('Examiner Name:', examinerName);
  
      return {
        interviewRoom: {
          candidateName: '',
          examinerName: examinerName, // 使用获取的考官姓名
          startTime: '',
          endTime: '',
          status: '准备中',
          peerId: '', // 初始化 peerId
        },
        rules: {
          candidateName: [{ required: true, message: '请输入考生姓名', trigger: 'blur' }],
          startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
          endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }],
        },
      };
    },
    methods: {
      generatePeerId() {
        // 生成随机的 UUID 作为 peerId
        return 'xxxxxxxxyxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0;
          var v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 在提交前生成随机的 peerId
            this.interviewRoom.peerId = this.generatePeerId();
  
            // 格式化日期字段
            const formattedInterviewRoom = {
              candidateName: this.interviewRoom.candidateName,
              examinerName: this.interviewRoom.examinerName,
              startTime: moment(this.interviewRoom.startTime).format('YYYY-MM-DD HH:mm:ss'),
              endTime: moment(this.interviewRoom.endTime).format('YYYY-MM-DD HH:mm:ss'),
              status: this.interviewRoom.status,
              peerId: this.interviewRoom.peerId, // 包含生成的 peerId
            };
  
            // 打印发送的数据，供调试
            console.log('Payload:', formattedInterviewRoom);
  
            // 发送格式化后的数据
            this.$store.dispatch('createInterviewRoom', formattedInterviewRoom)
              .then(() => {
                this.$message({
                  type: 'success',
                  message: '创建成功!',
                });
                // 跳转到面试列表页面
                this.$router.push('/teacher/interviews');
              });
          } else {
            console.log('表单验证失败!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        // 重置时，确保状态仍然是“准备中”
        this.interviewRoom.status = '准备中';
      },
    },
  };
  </script>
  
  <style scoped>
  .teacher-interview-create {
    text-align: center;
    margin-top: 20px;
  }
  form {
    display: inline-block;
    text-align: left;
  }
  label {
    display: block;
    margin-bottom: 5px;
  }
  input {
    margin-bottom: 10px;
    padding: 5px;
    width: 100%;
    box-sizing: border-box;
  }
  button {
    padding: 10px 20px;
    background-color: #5cb85c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #4cae4c;
  }
  </style>