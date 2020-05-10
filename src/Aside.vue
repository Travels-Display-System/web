<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :router="true">
      <el-menu-item index="/user">
        <i class="el-icon-menu"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="/travel">
        <i class="el-icon-menu"></i>
        <span slot="title">游记管理</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <i class="el-icon-menu"></i>
        <span slot="title">举报管理</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
