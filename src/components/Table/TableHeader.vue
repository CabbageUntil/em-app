<template>
  <el-row>
    <el-col :span="20">
      <filter-bar/>
    </el-col>
    <el-col
      class="right-area"
      :span="4">
      <settings-btn/>
    </el-col>
  </el-row>
</template>

<script>
import FilterBar from './FilterBar'
import SettingsBtn from './SettingsBtn'

export default {
  components: {
    FilterBar,
    SettingsBtn
  }
}
</script>

<style lang="stylus" scoped>
  .right-area
    text-align: right
</style>
