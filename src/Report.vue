<template>
  <el-main>
    <el-table :data="tableData">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="userid" label="作者编号"></el-table-column>
      <el-table-column prop="travelid" label="游记编号"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.state != 2 && scope.row.state != 3"
            size="mini"
            @click="handleAudit(scope.row.id, scope.row.content, scope.row.travelid)"
          >审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="举报审核" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题">{{ form.title }}</el-form-item>
        <el-form-item label="作者">{{ form.username }}</el-form-item>
        <el-form-item label="正文">{{ form.content }}</el-form-item>
        <el-form-item label="举报信息">{{ form.reportContent }}</el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">通过-删除游记</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit2">不通过-删除举报</el-button>
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
        ReportContent: null,
        travelid: null
      },
      tableData: null
    };
  },
  created: function() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.$axios.get("http://39.106.60.24:30208/report/query").then(response => {
        this.tableData = response.data;
      });
    },
    handleAudit(id, content, travelid) {
      let _this = this;
      window.console.log(content);
      this.form.id = id;
      this.$axios
        .get("http://39.106.60.24:30208/travel/" + travelid)
        .then(function(response) {
          console.log(response);
          _this.form.title = response.data.title;
          _this.form.content = response.data.content;
          _this.form.title = response.data.title;
          _this.form.username = response.data.username;
          _this.form.travelid = response.data.id;
        })
        .catch(function(error) {
          console.log(error);
        });
      this.form.reportContent = content;
      this.dialogFormVisible = true;
    },
    submit() {
      this.$axios
        .post("http://39.106.60.24:30208/travel/deletetravel", {
          id: this.form.travelid,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
        this.dialogFormVisible = false;
        this.refresh();
    },
    submit2() {
      this.$axios
        .post("http://39.106.60.24:30208/report/noreport", {
          id: this.form.id,
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      this.dialogFormVisible = false;
      this.refresh();
    }
  }
};
</script>
