<!--左边下拉导航栏-->
<template>
  <div id="left">
    <!-- 新增顶部导航栏 -->
    <div class="top-nav">
      <el-menu
        :default-active="$route.path"
        class="horizontal-menu"
        background-color="#fff"
        text-color="#333"
        active-text-color="#3CB371"
        mode="horizontal"
        router
      >
        <el-submenu
          v-for="(item, index) in menu"
          :key='index+"_top"'
          :index="item.index+'_top'"
        >
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(listItem, idx) in item.content"
              :key="idx"
              :index="listItem.path"
              @click="handleTitle(item.index)"
              v-if="listItem.item1 || listItem.item2 || listItem.item3">
              {{ listItem.item1 || listItem.item2 || listItem.item3 }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
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
  computed: mapState(["menu"]),
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
          title: '面试官管理',
          icon: 'icon-Userselect',
          content:[{item1:'面试官管理',path:'/teacherManage'},{item2: '添加面试官',path: '/addTeacher'}],
        })
      }
    }


  },
}
</script>

<style>
#left {
  width: 100%;
  z-index: 0;
  top: 80px;
}

.top-nav {
  top: 80px;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1;
}

.horizontal-menu {
  border-bottom: none;
  padding: 0 20px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.horizontal-menu > .el-submenu {
  flex: 1;
  text-align: center;
}

.horizontal-menu .el-submenu__title {
  height: 50px;
  line-height: 50px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.horizontal-menu .el-submenu__title i {
  margin-right: 5px;
}

.horizontal-menu .el-submenu__icon-arrow {
  position: relative;
  margin-left: 5px;
}

.horizontal-menu .el-submenu__title:hover {
  color: #3CB371 !important;
}

.horizontal-menu .el-submenu.is-active .el-submenu__title {
  border-bottom: 2px solid #3CB371;
  color: #3CB371;
}

.horizontal-menu .el-menu--popup {
  min-width: 200px;
  margin-top: 5px;
}

.horizontal-menu .el-menu-item {
  padding: 0 20px;
  text-align: center;
}

</style>

