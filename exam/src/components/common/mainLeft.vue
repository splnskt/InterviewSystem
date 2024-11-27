<!--左边下拉导航栏-->
<template>
  <div id="left">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#124280"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="flag"
      router
    >
      <el-submenu
        v-for="(item, index) in menu"
        :key="index"
        :index="item.index"
      >
        <template slot="title">
          <div class="left-width">
            <i class="iconfont" :class="item.icon"></i>
            <span class="title">{{ item.title }}</span>
          </div>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(listItem, idx) in item.content"
            :key="idx"
            :index="listItem.path"
            @click="handleTitle(item.index)"
          >
            {{ listItem.item1 || listItem.item2 || listItem.item3 }}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "mainLeft",
  data() {
    return {
      
    }
  },
  computed: mapState(["flag","menu"]),
  created() {
    this.addData()
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    //点击标题传递参数给navigator组件
    handleTitle(index) {
      this.bus.$emit('sendIndex',index)
    },
    addData() {
      let role = this.$cookies.get("role")
      if(role == 0) {
        this.menu.push({
          index: '5',
          title: '教师管理',
          icon: 'icon-Userselect',
          content:[{item1:'教师管理',path:'/teacherManage'},{item2: '添加教师',path: '/addTeacher'}],
        })
      }
    }
    
    
  },
}
</script>

<style>
.el-menu-vertical-demo .el-submenu__title {
  overflow: hidden;
}
.left-width .iconfont {
  font-size: 18px;
  color: #fff;
}
.left-width {
  width: 213px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 900px;
}
#left {
  height: 900px;
  background-color: #124280;
  z-index: 0;
}
#left .el-menu-vertical-demo .title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  margin-left: 14px;
}
.el-submenu {
  border-bottom: 1px solid #eeeeee0f !important;
}
.el-submenu__title:hover {
  background-color: #fff;
}
.el-submenu__title i {
    color: #fbfbfc !important;
}
/* 在您的样式文件中，添加 icon-interview 图标样式 */
.icon-interview {
  font-size: 18px;
  color: #fff;
  /* 其他样式 */
}
</style>
