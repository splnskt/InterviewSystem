<!-- src/components/student/Appointment.vue -->
<template>
    <div class="appointment">
      <h3>面试预约管理</h3>
      <el-form @submit.native.prevent="submitAppointment">
        <el-form-item label="预约时间">
          <el-date-picker v-model="newAppointment.datetime" type="datetime" placeholder="选择日期时间" required></el-date-picker>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newAppointment.note" placeholder="请输入备注"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAppointment">添加预约</el-button>
        </el-form-item>
      </el-form>
  
      <el-table :data="appointments" style="width: 100%">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="datetime" label="预约时间" width="180"></el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
      </el-table>
    </div>
  </template>
  
  <script>
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: 'Appointment',
    data() {
      return {
        newAppointment: {
          datetime: '',
          note: '',
        },
      };
    },
    computed: {
      ...mapGetters(['allAppointments']),
      appointments() {
        return this.allAppointments;
      },
    },
    methods: {
      ...mapActions(['addAppointment']),
      submitAppointment() {
        if (!this.newAppointment.datetime) {
          this.$message.error('请选择预约时间');
          return;
        }
        const appointment = {
          id: Date.now(),
          datetime: this.newAppointment.datetime,
          note: this.newAppointment.note || '',
        };
        this.addAppointment(appointment);
        this.$message.success('预约已添加');
        this.newAppointment.datetime = '';
        this.newAppointment.note = '';
      },
    },
  };
  </script>
  
  <style scoped>
  .appointment {
    padding: 20px;
  }
  </style>
  