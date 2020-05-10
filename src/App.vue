<template>
  <el-container style="border: 1px solid #eee">
    <Aside></Aside>
    <router-view name="main"></router-view>
  </el-container>
</template>

<script>
import Aside from "@/Aside.vue"
export default {
  name: 'app',
  components: {
    Aside
  }
}
</script>

<style>

</style>
