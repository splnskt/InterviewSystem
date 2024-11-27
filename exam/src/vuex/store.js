import VUE from 'vue'
import VUEX from 'vuex'
import {
  getAllInterviewRooms,
  getInterviewRoomById,
  createInterviewRoom,
  updateInterviewRoom,
  deleteInterviewRoom,
  startInterview,
  endInterview,
  fetchStudentInterviews
} from '@/api/interviewRoom';
VUE.use(VUEX)

const state = {
  isPractice: false, //练习模式标志
  flag: false, //菜单栏左右滑动标志
  userInfo: null,
  menu: [{
      index: '1',
      title: '考试管理',
      icon: 'icon-kechengbiao',
      content:[{item1:'功能介绍',path:'/examDescription'},{item2:'考试查询',path:'selectExam'},{item3:'添加考试',path:'/addExam'}],
    },
    {
      index: '2',
      title: '题库管理',
      icon: 'icon-tiku',
      content:[{item1:'功能介绍',path:'/answerDescription'},{item2:'所有题库',path:'/selectAnswer'},{item3:'增加题库',path:'/addAnswer'},{path: '/addAnswerChildren'}],
    },
    {
      index: '3',
      title: '成绩查询',
      icon: 'icon-performance',
      content:[{item1:'学生成绩查询',path:'/allStudentsGrade'},{path: '/grade'},{item2: '成绩分段查询',path: '/selectExamToPart'},{path: '/scorePart'}],
    },
    {
      index: '4',
      title: '学生管理',
      icon: 'icon-role',
      content:[{item1:'学生管理',path:'/studentManage'},{item2: '添加学生',path: '/addStudent'}],
    },
    // {
    //   index: '5',
    //   title: '教师管理',
    //   icon: 'icon-Userselect',
    //   content:[{item1:'教师管理',path:'/teacherManage'},{item2: '添加教师',path: '/addTeacher'}],
    // },
    // {
    //   index: '7',
    //   title: '模块管理',
    //   icon: 'icon-module4mokuai',
    //   content:[{item1:'模块操作',path:'/module'}],
    // }
    // 新增的“面试管理”菜单项
    {
      index: '6',
      title: '面试管理',
      icon: 'icon-interview', // 请确保有对应的图标
      content: [
        { item1: '面试列表', path: '/teacher/interviews' },
        { item2: '创建面试', path: '/teacher/interview/create' },
      ],
    },
  ],
  // 新增的状态
  interviewRooms: [], // 面试房间列表
  currentInterviewRoom: null, // 当前的面试房间详情
}
const mutations = {
  practice(state,status) {
    state.isPractice = status
  },
  toggle(state) {
    state.flag = !state.flag
  },
  changeUserInfo(state,info) {
    state.userInfo = info
  },
  // ... 现有的 mutations
  
  // 新增的 mutations
  SET_INTERVIEW_ROOMS(state, interviewRooms) {
    state.interviewRooms = interviewRooms;
  },
  SET_CURRENT_INTERVIEW_ROOM(state, interviewRoom) {
    state.currentInterviewRoom = interviewRoom;
  },
  setInterviewRooms(state, interviewRooms) {
    state.interviewRooms = interviewRooms;
  },
}
const getters = {
  // 新增的 getters
  allInterviewRooms(state) {
    return state.interviewRooms;
  },
  currentInterviewRoom(state) {
    return state.currentInterviewRoom;
  }
}
const actions = {
  getUserInfo(context,info) {
    context.commit('changeUserInfo',info)
  },
  getPractice(context,status) {
    context.commit('practice',status)
  },
  // ...其他 actions
  fetchInterviewRooms({ commit }) {
    return getAllInterviewRooms().then(response => {
      commit('SET_INTERVIEW_ROOMS', response.data);
    });
  },
  fetchInterviewRoomById({ commit }, id) {
    return getInterviewRoomById(id).then(response => {
      commit('SET_CURRENT_INTERVIEW_ROOM', response.data);
    });
  },
  createInterviewRoom({ dispatch }, interviewRoomData) {
    return createInterviewRoom(interviewRoomData).then(() => {
      dispatch('fetchInterviewRooms');
    });
  },
  updateInterviewRoom({ dispatch }, interviewRoomData) {
    return updateInterviewRoom(interviewRoomData).then(() => {
      dispatch('fetchInterviewRooms');
    });
  },
  deleteInterviewRoom({ dispatch }, id) {
    return deleteInterviewRoom(id).then(() => {
      dispatch('fetchInterviewRooms');
    });
  },
  startInterview({ commit }, id) {
    return startInterview(id).then(response => {
      commit('SET_CURRENT_INTERVIEW_ROOM', response.data);
    });
  },
  endInterview({ commit }, id) {
    return endInterview(id).then(response => {
      commit('SET_CURRENT_INTERVIEW_ROOM', null);
    });
  },
  fetchStudentInterviews({ commit }, studentName) {
    return fetchStudentInterviews(studentName).then((response) => {
      commit('setInterviewRooms', response.data);
    }).catch((error) => {
      console.error('获取学生面试列表失败', error);
    });
  },
  submitEvaluation({ commit }, evaluationData) {
    // 暂时注释掉调用后端的部分
    /*
    return submitEvaluation(evaluationData).then((response) => {
      // 可以根据需要更新状态
    });
    */
    // 暂时返回一个已解决的 Promise
    return Promise.resolve();
  },
}
export default new VUEX.Store({
  state,
  mutations,
  getters,
  actions,
  // store
})
