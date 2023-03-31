<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu default-active="/center/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" router>
          <el-menu-item index="/center/home">
            <i class="el-icon-menu"></i>
            <span slot="title">后台中心</span>
          </el-menu-item>

          <el-menu-item index="/center/order">
            <i class="el-icon-s-order"></i>
            <span slot="title">命令控制</span>
          </el-menu-item>

          <el-menu-item index="/center/room">
            <i class="el-icon-s-home"></i>
            <span slot="title">机房查询</span>
          </el-menu-item>

          <el-menu-item index="/center/air">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">空调查询</span>
          </el-menu-item>

          <el-menu-item index="/center/echarts">
            <i class="el-icon-s-data"></i>
            <span slot="title">Echarts</span>
          </el-menu-item>
          <!-- <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试3</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">测试3-1</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->

        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
var $this = {};
export default {
  data() {
    return {};
  },
  beforeCreate() {
    $this = this;
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>

<style scoped>
.el-row {
  height: 100%;
}

.el-menu {
  border-right: none;
}

.el-aside {
  border-right: 1px solid #f5f1f1;
}
</style>
