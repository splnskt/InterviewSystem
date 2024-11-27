// StudentInterviewRoom.vue

<template>
  <div class="interview-room">
    <div class="header">
      <h2>学生面试房间</h2>
      <div class="actions">
        <el-button size="mini" @click="exitRoom">退出房间</el-button>
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
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  name: 'StudentInterviewRoom',
  data() {
    return {
      roomId: this.$route.query.id || '', // 假设使用 id 参数
      socket: null,
      localStream: null,
      peerConnection: null,
      remoteSocketId: null,
      isAnswerSent: false,
    };
  },
  methods: {
    /**
     * 获取当前用户的用户名
     */
    getUsername() {
      return this.$cookies.get("cname") || '';
    },

    /**
     * 初始化 WebRTC 连接
     */
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
        console.log('PeerConnection 已创建');
      } catch (error) {
        console.error('无法获取本地媒体流', error);
        this.$message.error('无法获取本地媒体流');
      }
    },

    /**
     * 创建 PeerConnection 并设置事件监听
     */
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

    /**
     * 连接到 Socket.IO 信令服务器
     */
    connectSocket() {
      this.socket = io('http://localhost:3000'); // server.js 的地址

      this.socket.on('connect', () => {
        console.log('Socket.IO 已连接');
        this.socket.emit('join', this.roomId);
      });

      this.socket.on('new-user', (socketId) => {
        console.log('新用户加入:', socketId);
        this.remoteSocketId = socketId;
        // 学生端不发送 Offer，而是等待教师发送 Offer
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
          this.isAnswerSent = true;
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
        this.$router.push('/student/interviewlist'); // 根据需要修改重定向路径
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

    /**
     * 发送 Offer 给远程用户
     */
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

    /**
     * 退出房间并断开连接
     */
    exitRoom() {
      this.disconnect();
      this.$router.push('/student/interviewlist');
    },

    /**
     * 断开所有连接并清理资源
     */
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
