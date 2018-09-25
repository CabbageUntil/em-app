<template>
  <el-dialog
    :title="$t('table.setting.dialog.title')"
    :visible="dialogVisible"
    width="70%"
    :before-close="handleClose"
  >
    <el-row
      type="flex"
      align="middle">
      <el-col :span="4">
        <el-checkbox
          :checked="enableCustomHeight"
          @change="handleCustomHeightChange"
        >
          {{ $t('table.setting.dialog.height.label') }}
        </el-checkbox>
      </el-col>
      <el-col :span="4">
        <el-input
          v-model="$parent.myTableHeight"
          :placeholder="$t('table.setting.dialog.height.hint')"
          size="mini"
        />
      </el-col>
    </el-row>
    <el-row>
      <div>{{ $t('table.setting.dialog.pagination.label') }}</div>
      <div>
        <el-select
          v-model="$parent.myPaginationType"
          :placeholder="$t('table.setting.dialog.pagination.hint')"
          size="mini"
        >
          <el-option
            :label="$t('table.setting.dialog.pagination.type.horizontal')"
            value="vuetable-pagination"
          />
          <el-option
            :label="$t('table.setting.dialog.pagination.type.vertical')"
            value="vuetable-pagination-dropdown"
          />
        </el-select>
      </div>
    </el-row>
    <el-row>
      <div>{{ $t('table.setting.dialog.perPage.label') }}</div>
      <div>
        <el-select
          v-model="$parent.myPaginationPage"
          :placeholder="$t('table.setting.dialog.perPage.hint')"
          size="mini"
        >
          <el-option
            v-for="(pageNumber, index) of perPage"
            :key="index"
            :label="pageNumber"
            :value="pageNumber"
          />
        </el-select>
      </div>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div
          slot="header"
          class="clearfix">
          <span>{{ $t('table.setting.dialog.visibleCols.label') }}</span>
        </div>
        <div v-if="vuetableFields">
          <div
            v-for="(item, idx) in vuetableFields"
            :key="idx"
          >
            <el-checkbox
              class="text item"
              :checked="item.visible"
              :key="item.name"
              @change="toggleField(idx, $event)"
            >
              {{ item.title() }}
            </el-checkbox>
          </div>
        </div>
      </el-card>
    </el-row>
  </el-dialog>
</template>

<script>
export default {
  props: {
    vuetableFields: {
      type: [Boolean, Array],
      default () {
        return []
      }
    },
    dialogVisible: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      perPage: [10, 15, 20, 25]
    }
  },
  methods: {
    handleClose (done) {
      this.$emit('update:visible')
    },
    handleCustomHeightChange (val) {
      let parent = this.$parent.$parent

      if (val === true) {
        parent.tableHeight = '600px'
        return
      }
      parent.tableHeight = null
    },
    toggleField (index, val) {
      this.$parent.$refs.vuetable.toggleField(index)
    }
  },
  computed: {
    enableCustomHeight () {
      return this.$parent.$parent.tableHeight !== null
    }
  }
}
</script>

<style lang="stylus" scoped>
  .el-row
    margin-bottom: 10px
    &:last-child
      margin-bottom: 0
</style>
