<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="timestamp" label="时间"></el-table-column>
      <el-table-column prop="username" label="作者"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state != 2 && scope.row.state != 3"
            size="mini"
            @click="handleAudit(scope.row.id, scope.row.content, scope.row.title, scope.row.username, scope.row.keywordList, scope.row.advice)"
          >审核</el-button>
          <el-button size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="游记审核" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">{{ form.title }}</el-form-item>
        <el-form-item label="作者">{{ form.username }}</el-form-item>
        <el-form-item label="正文">{{ form.content }}</el-form-item>
        <el-form-item label="关键词">
          <div style="display:inline; margin-right: 5px" v-for="k in form.keywordList" :key="k.id">{{ k.keyword }}</div>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input v-model="form.advice"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">审核通过</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit2">审核不通过</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  name: "app",
  data: function() {
    return {
      dialogFormVisible: false,
      form: {
        id: null,
        title: null,
        content: null,
        username: null,
        keywordList: null,
        advice: null
      },
      tableData: null
    };
  },
  created: function() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get("http://39.106.60.24:30208/travel/").then(response => {
        this.tableData = response.data;
      });
    },
    handleAudit(id, content, title, username, keywordList, advice) {
      window.console.log(content);
      this.form.id = id;
      this.form.content = content;
      this.form.title = title;
      this.form.username = username;
      this.form.keywordList = keywordList;
      this.form.advice = advice;
      this.dialogFormVisible = true;
    },
    submit() {
      let _this = this;
      this.$axios
        .post("http://39.106.60.24:30208/travel/change/admin", {
          id: this.form.id,
          advice: this.form.advice
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .post("http://39.106.60.24:30208/travel/state/admin", {
          id: this.form.id,
          state: 2
        })
        .then(function(response) {
          console.log(response);
          _this.dialogFormVisible = false;
          _this.refresh();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit2() {
      let _this = this;
      this.$axios
        .post("http://39.106.60.24:30208/travel/change/admin", {
          id: this.form.id,
          advice: this.form.advice
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.$axios
        .post("http://39.106.60.24:30208/travel/state/admin", {
          id: this.form.id,
          state: 3
        })
        .then(function(response) {
          console.log(response);
          _this.dialogFormVisible = false;
          _this.refresh();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleDelete(id) {
      let _this = this;
      window.console.log(id);
      this.$axios
        .post("http://39.106.60.24:30208/travel/deletetravel/admin", {
          id: id,
        })
        .then(function(response) {
          console.log(response);
          _this.refresh();
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
