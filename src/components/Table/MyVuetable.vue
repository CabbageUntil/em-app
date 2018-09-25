<script>
import Vue from 'vue'
import VueEvents from 'vue-events'

import Vuetable from 'vuetable-2/src/components/Vuetable'
import TableHeader from './TableHeader'
import MyModal from './MyModal'
import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
import VuetablePaginationDropdown from 'vuetable-2/src/components/VuetablePaginationDropdown'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'

import { formatEducation, formatMaritalStatus, formatApartmentStatus, formatSex, formatSymbolicAnimal, formatMemberStatus } from '@/utils/fieldFormatter'
import request from '@/utils/request'

Vue.use(VueEvents)

/* var filterEventMixin = {
  created () {
    console.log('filterEventMixin')
  }
} */

export default {
  // mixins: [filterEventMixin],
  components: {
    TableHeader,
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo,
    MyModal
  },
  props: {
    trackBy: {
      type: String,
      default: 'id'
    },
    apiUrl: {
      type: String,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    sortOrder: {
      type: Array,
      default () {
        return []
      }
    },
    appendParams: {
      type: Object,
      default () {
        return {}
      }
    },
    detailRowComponent: {
      type: String,
      default: ''
    },
    paginationType: {
      type: String,
      default () {
        return 'vuetable-pagination-dropdown'
      }
    },
    paginationPage: {
      type: Number,
      default () {
        return 10
      }
    },
    tableHeight: {
      type: String,
      default () {
        return null
      }
    },
    loaded: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      dialogVisible: false,
      vuetableFields: false,
      loading: '',
      myTableHeight: this.tableHeight,
      myPaginationType: this.paginationType,
      myPaginationPage: this.paginationPage
    }
  },
  render (h) {
    return h(
      'div',
      {
        class: [{ ui: true, basic: true, segment: true }, this.loading]
      },
      [
        this.renderTableHeader(h),
        this.renderVuetable(h),
        this.renderPagination(h),
        this.renderMyModal(h)
      ]
    )
  },
  methods: {
    // render related functions
    renderTableHeader (h) {
      return h(
        'table-header',
        {
          on: {
            'filter-set': this.onFilterSet,
            'filter-reset': this.onFilterReset
          }
        }
      )
    },
    renderVuetable (h) {
      return h(
        'vuetable',
        {
          ref: 'vuetable',
          props: {
            apiUrl: this.apiUrl,
            fields: this.fields,
            paginationPath: '',
            perPage: this.myPaginationPage,
            multiSort: true,
            trackBy:this.trackBy,
            sortOrder: this.sortOrder,
            appendParams: this.appendParams,
            detailRowComponent: this.detailRowComponent,
            tableHeight: this.myTableHeight,
            httpFetch: this.httpFetch
          },
          on: {
            'vuetable:cell-clicked': this.onCellClicked,
            'vuetable:pagination-data': this.onPaginationData,
            'vuetable:loading': this.showLoader,
            'vuetable:loaded': this.hideLoader,
            'vuetable:initialized': this.onInitialized
          },
          scopedSlots: this.$vnode.data.scopedSlots
        }
      )
    },
    renderPagination (h) {
      return h(
        'div',
        { class: {'vuetable-pagination': true, 'ui': true, 'basic': true, 'segment': true, 'grid': true} },
        [
          h('vuetable-pagination-info', { ref: 'paginationInfo' }),
          h(this.myPaginationType, {
            ref: 'pagination',
            on: {
              'vuetable-pagination:change-page': this.onChangePage
            }
          })
        ]
      )
    },
    renderMyModal (h) {
      return h(
        'my-modal',
        {
          props: {
            dialogVisible: this.dialogVisible,
            vuetableFields: this.vuetableFields
          },
          on: {
            'update:visible': this.handleDialogClose
          }
        }
      )
    },

    // 格式化字段
    formatDate (value) {
      if (value) {
        let rawDate = new Date(value)
        return rawDate.getFullYear() + '-' +
          (rawDate.getMonth() + 1) + '-' +
          rawDate.getDate()
      } else {
        return null
      }
    },
    formatEducation (val) {
      return formatEducation(val)
    },
    formatApartmentStatus (val) {
      return formatApartmentStatus(val)
    },
    formatMaritalStatus (val) {
      return formatMaritalStatus(val)
    },
    formatSex (val) {
      return formatSex(val)
    },
    formatSymbolicAnimal (val) {
      return formatSymbolicAnimal(val)
    },
    formatMemberStatus (val) {
      return formatMemberStatus(val)
    },

    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onAction (action, data, index) {
    },
    onCellClicked (data, field, event) {
      this.$refs.vuetable.toggleDetailRow(data.id)
    },
    onFilterSet (filterText) {
      let self = this

      this.appendParams.filter = filterText
      Vue.nextTick(() => self.$refs.vuetable.refresh())
    },
    onFilterReset () {
      let self = this

      delete this.appendParams.filter
      Vue.nextTick(() => self.$refs.vuetable.refresh())
    },
    onSettingBtnClicked (e) {
    },
    onInitialized (fields) {
      this.vuetableFields = fields
    },
    showLoader () {
      this.loading = 'loading'
    },
    hideLoader () {
      this.loading = ''
      this.$emit('finishLoadData')
    },
    handleDialogClose () {
      this.dialogVisible = false
    },

    // 自定义请求方法
    httpFetch (apiUrl, httpOptions) {
      return request['get'](apiUrl, httpOptions)
    }
  },
  mounted () {
    // this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    // this.$events.$on('filter-reset', e => this.onFilterReset())
  },
  beforeDestroy () {
    // this.$event.$off('filter-set')
    // this.$events.$off('filter-reset')
  },
  watch: {
    myTableHeight (val, oldVal) {
      this.$nextTick(function () {
        this.$refs.vuetable.refresh()
      })
    },
    myPaginationPage (val, oldVal) {
      this.$nextTick(function () {
        this.$refs.vuetable.refresh()
      })
    },
    myPaginationType (val, oldVal) {
      this.$nextTick(function () {
        this.$refs.pagination.setPaginationData(this.$refs.vuetable.tablePagination)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  div.segment >>> td
    word-wrap: break-word
  div.segment >>> table
    table-layout: fixed
</style>
