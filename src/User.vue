<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="enabled" label="启用"></el-table-column>
      <el-table-column prop="iseditor" label="是否编辑"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDisable(scope.row.id)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      tableData: []
    };
  },
  created: function() {
    this.$axios.get("http://39.106.60.24:30208/user/").then(response => {
      this.tableData = response.data;
    });
  },
  methods: {}
};
</script>

<style>
</style>
