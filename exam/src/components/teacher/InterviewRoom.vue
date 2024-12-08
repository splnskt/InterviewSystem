<template>
  <div class="interview-room">
    <div class="header">
      <h2>教师面试房间</h2>
      <div class="actions">
        <el-button size="mini" @click="exitRoom">退出房间</el-button>
        <el-button size="mini" type="danger" @click="endInterview">结束面试</el-button>
        <!-- 录制控制按钮 -->
        <el-button size="mini" type="primary" @click="startRecording" v-if="!isRecording">开始录制</el-button>
        <el-button size="mini" type="warning" @click="stopRecording" v-if="isRecording">停止录制</el-button>
      </div>
    </div>
    <div class="video-container">
      <div class="video-box">
        <video ref="localVideo" autoplay muted playsinline></video>
        <p>本地视频</p>
      </div>
      <div class="video-box">
        <video ref="remoteVideo" autoplay playsinline></video>
        <p>远程视频</p>
      </div>
    </div>
    <div v-if="recordedBlobUrl" style="margin-top:20px;">
      <p>录制完成，可下载：</p>
      <a :href="recordedBlobUrl" download="interview_record.webm">下载录制视频</a>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios'; // 引入 Axios

export default {
  name: 'TeacherInterviewRoom',
  data() {
    return {
      roomId: this.$route.query.id || '', // 假设使用 id 参数
      socket: null,
      localStream: null,
      peerConnection: null,
      remoteSocketId: null,
      isOfferSent: false,
      // 录制相关数据
      recorder: null,
      recordedChunks: [],
      recordedBlobUrl: null,
      isRecording: false,
      remoteStream: null, // 存储远程流，用于录制
    };
  },
  methods: {
    getUsername() {
      return this.$cookies.get("cname") || '';
    },

    async initWebRTC() {
      try {
        // 获取本地媒体流
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (this.$refs.localVideo) {
          this.$refs.localVideo.srcObject = this.localStream;
          console.log('本地视频流已设置');
        } else {
          console.error('本地视频元素 ref 为空');
          this.$message.error('无法访问本地视频元素');
          return;
        }
        // 创建 PeerConnection 并添加本地轨道
        this.createPeerConnection();
      } catch (error) {
        console.error('无法获取本地媒体流', error);
        this.$message.error('无法获取本地媒体流');
      }
    },

    createPeerConnection() {
      const configuration = {
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      };
      this.peerConnection = new RTCPeerConnection(configuration);
      console.log('RTCPeerConnection 实例已创建');

      // 添加本地轨道到 PeerConnection
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });

      // 监听远程轨道
      this.peerConnection.ontrack = (event) => {
        if (this.$refs.remoteVideo) {
          if (this.$refs.remoteVideo.srcObject !== event.streams[0]) {
            this.$refs.remoteVideo.srcObject = event.streams[0];
            this.remoteStream = event.streams[0];
            console.log('远程流已添加');
          }
        } else {
          console.error('远程视频元素 ref 为空');
        }
      };

      // 处理 ICE 候选者
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate && this.remoteSocketId) {
          this.socket.emit('candidate', event.candidate, this.roomId);
          console.log('发送 ICE 候选者');
        }
      };

      // 监听 PeerConnection 状态变化
      this.peerConnection.onconnectionstatechange = () => {
        console.log('PeerConnection 状态:', this.peerConnection.connectionState);
        if (['disconnected', 'failed'].includes(this.peerConnection.connectionState)) {
          this.$message.warning('连接已断开');
          this.disconnect();
        }
      };
    },

    connectSocket() {
      this.socket = io('http://localhost:3000'); // 与 server.js 对应的信令服务器地址

      this.socket.on('connect', () => {
        console.log('Socket.IO 已连接');
        this.socket.emit('join', this.roomId);
      });

      this.socket.on('new-user', (socketId) => {
        console.log('新用户加入:', socketId);
        this.remoteSocketId = socketId;
        this.sendOffer();
      });

      this.socket.on('offer', async (offer, socketId) => {
        console.log('接收到 Offer');
        this.remoteSocketId = socketId;
        try {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
          console.log('设置远程描述成功');
          const answer = await this.peerConnection.createAnswer();
          await this.peerConnection.setLocalDescription(answer);
          this.socket.emit('answer', answer, this.roomId);
          console.log('发送 Answer');
        } catch (error) {
          console.error('处理 Offer 时出错:', error);
          this.$message.error('处理 Offer 时出错');
        }
      });

      this.socket.on('answer', async (answer) => {
        console.log('接收到 Answer');
        try {
          await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
          console.log('设置远程描述成功');
        } catch (error) {
          console.error('处理 Answer 时出错:', error);
          this.$message.error('处理 Answer 时出错');
        }
      });

      this.socket.on('candidate', async (candidate) => {
        console.log('接收到 ICE 候选者');
        try {
          await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          console.log('添加 ICE 候选者成功');
        } catch (error) {
          console.error('添加 ICE 候选者失败:', error);
          this.$message.error('添加 ICE 候选者失败');
        }
      });

      // 监听面试结束事件
      this.socket.on('interview-ended', () => {
        console.log('面试已结束');
        this.$message.info('面试已结束');
        this.disconnect();
        this.$router.push('/teacher/interviews');
      });

      this.socket.on('user-disconnected', (socketId) => {
        console.log('用户已断开连接:', socketId);
        if (socketId === this.remoteSocketId) {
          if (this.$refs.remoteVideo) {
            this.$refs.remoteVideo.srcObject = null;
          }
          this.remoteSocketId = null;
        }
      });

      this.socket.on('disconnect', () => {
        console.log('Socket.IO 已断开连接');
        this.disconnect();
      });
    },

    async sendOffer() {
      if (this.isOfferSent) return;
      try {
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.socket.emit('offer', offer, this.roomId);
        this.isOfferSent = true;
        console.log('发送 Offer');
      } catch (error) {
        console.error('创建/发送 Offer 失败:', error);
        this.$message.error('创建/发送 Offer 失败');
      }
    },

    exitRoom() {
      this.disconnect();
      this.$router.push('/teacher/interviews');
    },

    async endInterview() {
      try {
        // 1. 更新面试状态到后端 Spring Boot
        await axios.post(`http://localhost:8080/interview-room/endInterview`, null, {
          params: {
            id: this.roomId
          }
        });

        // 2. 通知学生端面试已结束 via Socket.IO
        if (this.remoteSocketId) {
          this.socket.emit('interview-ended', this.roomId);
          console.log('通知学生端面试已结束');
        }

        // 3. 提示用户
        this.$message.success('面试已结束');

        // 4. 断开连接并重定向
        this.disconnect();
        this.$router.push('/teacher/interviews');
      } catch (error) {
        console.error('结束面试失败:', error);
        this.$message.error('结束面试失败，请稍后重试。');
      }
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
      }
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
        this.localStream = null;
      }
      if (this.$refs.remoteVideo) {
        this.$refs.remoteVideo.srcObject = null;
      }
    },

    // 开始录制远程视频
    startRecording() {
      if (!this.remoteStream) {
        this.$message.error('当前无法获取远程流进行录制');
        return;
      }
      this.recordedChunks = [];
      this.recorder = new MediaRecorder(this.remoteStream, { mimeType: 'video/webm; codecs=vp9' });
      this.recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
      this.recorder.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: 'video/webm' });
        this.recordedBlobUrl = URL.createObjectURL(blob);
        this.$message.success('录制完成！您可以下载视频');
      };
      this.recorder.start();
      this.isRecording = true;
      this.$message.info('开始录制...');
    },

    stopRecording() {
      if (this.recorder && this.recorder.state === 'recording') {
        this.recorder.stop();
        this.isRecording = false;
      }
    },
  },
  mounted() {
    // 确保 WebRTC 初始化完成后再连接 Socket.IO
    this.initWebRTC().then(() => {
      this.connectSocket();
    });
  },
  beforeDestroy() {
    this.disconnect();
  },
};
</script>

<style scoped>
.interview-room {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.video-box {
  width: 45%;
  text-align: center;
}

video {
  width: 100%;
  height: auto;
  background-color: #000;
}

.actions {
  display: flex;
  align-items: center;
}
</style>
