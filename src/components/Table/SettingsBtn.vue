<template>
  <div>
    <el-button
      @click="showSettingsModal"
      size="medium"
    >
      <i class="el-icon-setting"/>
      {{ $t('table.setting.btnText') }}
    </el-button>
  </div>
</template>

<script>
export default {
  methods: {
    showSettingsModal () {
      this.$parent.$parent.$parent.$parent.dialogVisible = true
    }
  }
}
</script>
