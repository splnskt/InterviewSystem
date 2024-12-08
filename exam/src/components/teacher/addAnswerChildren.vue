<template>
  <div class="add">
    <div class="add-header">
      <h2>添加试题</h2>
      <p class="subtitle">请选择题目类型并填写相关信息</p>
    </div>
    <div class="add-content">
      <div class="left-panel">
        <ul>
          <li>
            <div class="form-group">
              <label class="form-label">题目类型</label>
              <el-select v-model="optionValue" placeholder="请选择题型" class="w150">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li v-if="optionValue == '选择题'">
            <div class="form-group">
              <label class="form-label">所属章节</label>
              <el-input
                placeholder="请输入对应模块"
                v-model="postChange.section"
                class="w150"
                clearable>
              </el-input>
            </div>
          </li>
          <li v-if="optionValue == '解答题'">
            <div class="form-group">
              <label class="form-label">所属章节</label>
              <el-input
                placeholder="请输入对应模块"
                v-model="postFill.section"
                class="w150"
                clearable>
              </el-input>
            </div>
          </li>
          <li v-if="optionValue == '判断题'">
            <div class="form-group">
              <label class="form-label">所属章节</label>
              <el-input
                placeholder="请输入对应章节"
                v-model="postJudge.section"
                class="w150"
                clearable>
              </el-input>
            </div>
          </li>
          <li v-if="optionValue == '选择题'">
            <div class="form-group">
              <label class="form-label">难度等级</label>
              <el-select v-model="postChange.level" placeholder="选择难度等级" class="w150">
                <el-option
                  v-for="item in levels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li v-if="optionValue == '解答题'">
            <div class="form-group">
              <label class="form-label">难度等级</label>
              <el-select v-model="postFill.level" placeholder="选择难度等级" class="w150">
                <el-option
                  v-for="item in levels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li v-if="optionValue == '判断题'">
            <div class="form-group">
              <label class="form-label">难度等级</label>
              <el-select v-model="postJudge.level" placeholder="选择难度等级" class="w150">
                <el-option
                  v-for="item in levels"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
          <li v-if="optionValue == '选择题'">
            <div class="form-group">
              <label class="form-label">正确选项</label>
              <el-select v-model="postChange.rightAnswer" placeholder="选择正确答案" class="w150">
                <el-option
                  v-for="item in rights"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </li>
        </ul>
      </div>
      <div class="right-panel">
        <div class="change" v-if="optionValue == '选择题'">
          <div class="question-box">
            <h3>题目内容</h3>
            <el-input
              type="textarea"
              rows="4"
              v-model="postChange.question"
              placeholder="请输入题目内容"
              resize="none"
              class="question-input">
            </el-input>
          </div>
          <div class="options-box">
            <h3>选项设置</h3>
            <ul>
              <li>
                <div class="option-item">
                  <span class="option-label">A</span>
                  <el-input
                    placeholder="请输入选项A的内容"
                    v-model="postChange.answerA"
                    clearable="">
                  </el-input>
                </div>
              </li>
              <li>
                <div class="option-item">
                  <span class="option-label">B</span>
                  <el-input
                    placeholder="请输入选项B的内容"
                    v-model="postChange.answerB"
                    clearable="">
                  </el-input>
                </div>
              </li>
              <li>
                <div class="option-item">
                  <span class="option-label">C</span>
                  <el-input
                    placeholder="请输入选项C的内容"
                    v-model="postChange.answerC"
                    clearable="">
                  </el-input>
                </div>
              </li>
              <li>
                <div class="option-item">
                  <span class="option-label">D</span>
                  <el-input
                    placeholder="请输入选项D的内容"
                    v-model="postChange.answerD"
                    clearable="">
                  </el-input>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="change fill" v-if="optionValue == '解答题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>输入题目,注意需要考生答题部分一定要用括号（英文半角）括起来。</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postFill.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="fillAnswer">
            <el-tag>正确答案:</el-tag>
            <el-input v-model="postFill.answer"></el-input>
          </div>
          <div class="title analysis">
            <el-tag type="success">解析:</el-tag><span>下方输入框中输入答案解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postFill.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="fillSubmit()">立即添加</el-button>
          </div>
        </div>
        <div class="change judge" v-if="optionValue == '判断题'">
          <div class="title">
            <el-tag>题目:</el-tag><span>在下面的输入框中输入题目</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postJudge.question"
              placeholder="请输入题目内容"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="judgeAnswer">
            <el-radio v-model="postJudge.answer" label="T">正确</el-radio>
            <el-radio v-model="postJudge.answer" label="F">错误</el-radio>
          </div>
          <div class="title">
            <el-tag>解析:</el-tag><span>在下面的输入框中输入题目解析</span>
            <el-input
              type="textarea"
              rows="4"
              v-model="postJudge.analysis"
              placeholder="请输入答案解析"
              resize="none"
              class="answer">
            </el-input>
          </div>
          <div class="submit">
            <el-button type="primary" @click="judgeSubmit()">立即添加</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="add-footer">
      <el-button type="primary" size="large" @click="submitQuestion">保存题目</el-button>
      <el-button size="large" @click="resetForm">重置</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeNumber: null, //选择题出题数量
      fillNumber: null, //填空题出题数量
      judgeNumber: null, //判断题出题数量
      activeName: 'first',  //活动选项卡
      options: [ //题库类型
        {
          value: '选择题',
          label: '选择题'
        },
        {
          value: '解答题',
          label: '解答题'
        },
        {
          value: '判断题',
          label: '判断题'
        },
      ],
      difficulty: [ //试题难度
        {
          value: '简单',
          label: '简单'
        },
        {
          value: '一般',
          label: '一般'
        },
        {
          value: '困难',
          label: '困难'
        }
      ],
      difficultyValue: '简单',
      levels: [ //难度等级
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        },
        {
          value: '3',
          label: '3'
        },
        {
          value: '4',
          label: '4'
        },
        {
          value: '5',
          label: '5'
        },
      ],
      rights: [ //正确答案
        {
          value: 'A',
          label: 'A'
        },
        {
          value: 'B',
          label: 'B'
        },
        {
          value: 'C',
          label: 'C'
        },
        {
          value: 'D',
          label: 'D'
        },
      ],
      paperId: null,
      optionValue: '选择题', //题型选中值
      subject: '', //试卷名称用来接收路由参数
      postChange: { //选择题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        rightAnswer: '', //正确答案选中值
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
        answerA: '',
        answerB: '',
        answerC: '',
        answerD: '',
      },
      postFill: { //填空题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
      },
      postJudge: { //判断题提交内容
        subject: '', //试卷名称
        level: '', //难度等级选中值
        answer: '', //正确答案
        section: '', //对应章节
        question: '', //题目
        analysis: '', //解析
      },
      postPaper: { //考试管理表对应字段
        paperId: null,
        questionType: null, // 试卷类型 1--选择题  2--填空题   3--判断题
        questionId: null,
      }
    };
  },
  created() {
    this.getParams()
  },
  methods: {
    // handleClick(tab, event) {
    //   console.log(tab, event);
    // },
    create() {
      this.$axios({
        url: '/api/item',
        method: 'post',
        data: {
          changeNumber: this.changeNumber,
          fillNumber: this.fillNumber,
          judgeNumber: this.judgeNumber,
          paperId: this.paperId,
          subject: '笔试题' //题目数量太少，指定为计算机网络出题
        }
      }).then(res => {
        console.log(res)
        let data = res.data
        if(data.code==200){
          setTimeout(() => {
            this.$router.push({path: '/selectAnswer'})
          },1000)
           this.$message({
            message: data.message,
            type: 'success'
          })
        }else if(data.code==400){
            this.$message({
            message: data.message,
            type: 'error'
          })
        }

      })
    },
    getParams() {
      let subject = this.$route.query.subject //获取试卷名称
      let paperId = this.$route.query.paperId //获取paperId
      this.paperId = paperId
      this.subject = subject
      this.postPaper.paperId = paperId
    },
    changeSubmit() { //选择题题库提交
      this.postChange.subject = this.subject
      this.$axios({ //提交数据到选择题题库表
        url: '/api/MultiQuestion',
        method: 'post',
        data: {
          ...this.postChange
        }
      }).then(res => { //添加成功显示提示
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postChange = {}
        }
      }).then(() => {
        this.$axios(`/api/multiQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 1
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
    },
    fillSubmit() { //填空题提交
      this.postFill.subject = this.subject
      this.$axios({
        url: '/api/fillQuestion',
        method: 'post',
        data: {
          ...this.postFill
        }
      }).then(res => {
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postFill = {}
        }
      }).then(() => {
        this.$axios(`/api/fillQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 2
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
    },
    judgeSubmit() { //判断题提交
      this.postJudge.subject = this.subject
      this.$axios({
        url: '/api/judgeQuestion',
        method: 'post',
        data: {
          ...this.postJudge
        }
      }).then(res => {
        let status = res.data.code
        if(status == 200) {
          this.$message({
            message: '已添加到题库',
            type: 'success'
          })
          this.postJudge = {}
        }
      }).then(() => {
        this.$axios(`/api/judgeQuestionId`).then(res => { //获取当前题目的questionId
          let questionId = res.data.data.questionId
          this.postPaper.questionId = questionId
          this.postPaper.questionType = 3
          this.$axios({
            url: '/api/paperManage',
            method: 'Post',
            data: {
              ...this.postPaper
            }
          })
        })
      })
    },
    // 保存题目
    submitQuestion() {
      if (this.optionValue === '选择题') {
        this.changeSubmit();
      } else if (this.optionValue === '解答题') {
        this.fillSubmit();
      } else if (this.optionValue === '判断题') {
        this.judgeSubmit();
      } else {
        this.$message.warning('请选择题目类型');
      }
    },
    // 重置表单
    resetForm() {
      if (this.optionValue === '选择题') {
        this.postChange = {
          subject: '',
          section: '',
          level: '',
          question: '',
          answerA: '',
          answerB: '',
          answerC: '',
          answerD: '',
          rightAnswer: ''
        };
      } else if (this.optionValue === '解答题') {
        this.postFill = {
          subject: '',
          section: '',
          level: '',
          question: '',
          answer: '',
          analysis: ''
        };
      } else if (this.optionValue === '判断题') {
        this.postJudge = {
          subject: '',
          section: '',
          level: '',
          question: '',
          answer: '',
          analysis: ''
        };
      }

      this.$message({
        message: '已重置表单',
        type: 'success'
      });
    },
  },
};
</script>

<style lang="less" scoped>
.add {
  padding: 30px;
  background: linear-gradient(135deg, #f6f8fc 0%, #e9f2f7 100%);
  min-height: 100vh;

  .add-header {
    text-align: center;
    margin-bottom: 50px;
    animation: fadeInDown 0.8s ease-out;

    h2 {
      font-size: 28px;
      color: #2c3e50;
      margin-bottom: 10px;
      font-weight: 600;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
      position: relative;
      display: inline-block;

      &:after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 3px;
        background: linear-gradient(90deg, #3CB371, #4CAF50);
        border-radius: 3px;
      }
    }

    .subtitle {
      color: #666;
      font-size: 16px;
      margin-top: 20px;
      opacity: 0.8;
    }
  }

  .add-content {
    display: flex;
    gap: 30px;
    margin-bottom: 40px;
    animation: fadeInUp 0.8s ease-out;

    .left-panel {
      flex: 1;
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.12);
      }

      .form-group {
        margin-bottom: 25px;

        .form-label {
          display: block;
          margin-bottom: 12px;
          color: #333;
          font-weight: 500;
          font-size: 15px;
          transition: all 0.3s ease;

          &:hover {
            color: #3CB371;
            transform: translateX(5px);
          }
        }

        .el-select, .el-input {
          .el-input__inner {
            border-radius: 8px;
            border: 2px solid #eef2f7;
            padding: 10px 15px;
            transition: all 0.3s ease;

            &:focus {
              border-color: #3CB371;
              box-shadow: 0 0 0 3px rgba(60,179,113,0.1);
            }
          }
        }
      }
    }

    .right-panel {
      flex: 2;
      background: white;
      padding: 30px;
      border-radius: 16px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.12);
      }

      .question-box {
        margin-bottom: 30px;

        h3 {
          margin-bottom: 15px;
          color: #333;
          font-size: 18px;
          font-weight: 600;
          position: relative;
          padding-left: 15px;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: #3CB371;
            border-radius: 2px;
          }
        }

        .question-input {
          width: 100%;
          .el-textarea__inner {
            border-radius: 12px;
            border: 2px solid #eef2f7;
            padding: 15px;
            transition: all 0.3s ease;

            &:focus {
              border-color: #3CB371;
              box-shadow: 0 0 0 3px rgba(60,179,113,0.1);
            }
          }
        }
      }

      .options-box {
        h3 {
          margin-bottom: 20px;
          color: #333;
          font-size: 18px;
          font-weight: 600;
          position: relative;
          padding-left: 15px;

          &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 20px;
            background: #3CB371;
            border-radius: 2px;
          }
        }

        .option-item {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          transition: all 0.3s ease;

          &:hover {
            transform: translateX(5px);
          }

          .option-label {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #3CB371, #4CAF50);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            margin-right: 15px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 10px rgba(60,179,113,0.2);
          }

          .el-input {
            .el-input__inner {
              border-radius: 8px;
              border: 2px solid #eef2f7;
              padding: 10px 15px;
              transition: all 0.3s ease;

              &:focus {
                border-color: #3CB371;
                box-shadow: 0 0 0 3px rgba(60,179,113,0.1);
              }
            }
          }
        }
      }
    }
  }

  .add-footer {
    text-align: center;
    animation: fadeInUp 1s ease-out;
    margin-top: 50px;

    .el-button {
      padding: 15px 50px;
      font-size: 16px;
      border-radius: 12px;
      font-weight: 600;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(0,0,0,0.1);
      }

      &.el-button--primary {
        background: linear-gradient(135deg, #3CB371, #4CAF50);
        border: none;

        &:hover {
          background: linear-gradient(135deg, #4CAF50, #3CB371);
        }
      }
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


