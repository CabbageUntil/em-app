<template>
  <div class="calendar-wrapper">
    <el-row
      type="flex"
      justify="center">
      <el-date-picker
        v-model="datetimeRange"
        type="datetimerange"
        :picker-options="pickerOptions"
        :range-separator="$t('datetime.common.datePicker.separator')"
        :start-placeholder="$t('datetime.common.datePicker.startPlaceholder')"
        :end-placeholder="$t('datetime.common.datePicker.endPlaceholder')"
        align="right"/>
      <el-button
        icon="el-icon-search"
        circle
        @click="handleSearchClick"
      />
    </el-row>
    <full-calendar
      ref="calendar"
      :header="header"
      :events="eventSources"
      @event-selected="eventSelected"
      @event-created="eventCreated"
      @event-render="eventRender"
      :config="config"/>
    <!--<full-calendar :config="config" :events="eventSources"/>-->
  </div>
</template>

<script>
import { FullCalendar } from 'ljl-vue-full-calendar'

import 'bootstrap/dist/js/bootstrap.min.js'

import { fetchCalendar } from '@/api/member'

import { parseTime } from '@/utils'

export default {
  name: 'MemberCalendar',
  components: {
    FullCalendar
  },
  data () {
    return {
      pickerOptions: this.getPickerOptions(),
      eventSources: [],
      config: {
        locale: this.$i18n.locale.indexOf('en') >= 0 ? 'zh-cn' : 'en',
        buttonIcons: false,
        weekNumbers: true,
        editable: false,
        eventLimit: true,
        navLinks: true,
        views: {
          listRange: {
            buttonText: 'listRange',
            type: 'list',
            visibleRange: {
              start: '2018-08-16',
              end: '2018-08-19'
            }
          }
        },
        eventRender: function (eventObj, $el) {
          if (eventObj.hasOwnProperty('description')) {
            $el.popover({
              title: eventObj.title,
              content: eventObj.description,
              trigger: 'hover',
              placement: 'top',
              container: 'body'
            })
          }
        },
        eventClick: (event) => {
          this.selected = event
        }
      },
      selected: {},
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listYear,listRange'
      },
      datetimeRange: ''
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    }
  },
  watch: {
    lang (newVal, oldVal) {
      if (newVal.indexOf('zh') >= 0) {
        this.$refs.calendar.$emit('change-locale', 'zh-cn')
      } else {
        this.$refs.calendar.$emit('change-locale', 'en')
      }
    }
  },
  methods: {
    refreshEvents () {
      console.log('refreshEvents')
      this.$refs.calendar.$emit('refetch-events')
    },
    removeEvent () {
      this.$refs.calendar.$emit('remove-event', this.selected)
      this.selected = {}
    },
    eventSelected (event) {
      console.log(event)
      this.selected = { ...event, source: {} }
    },
    eventCreated (...test) {
      console.log(test)
    },
    eventRender (...test) {
      console.log(test)
    },
    getPickerOptions () {
      let transPrefix = 'datetime.common.datePicker.shortcuts.'
      return {
        shortcuts: [{
          text: this.$t(transPrefix + 'latestWeek'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t(transPrefix + 'lastMonth'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: this.$t(transPrefix + 'lastThreeMonths'),
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    },
    handleSearchClick () {
      let memberId = this.$route.params.id
      fetchCalendar(memberId,this.datetimeRange[0], this.datetimeRange[1]).then(response => {
        const data = response.data.data
        this.eventSources = data
        // 根据查询日期范围设置视图的显示日期范围
        this.$refs.calendar.fireMethod('option', 'visibleRange', {
          start: parseTime(this.datetimeRange[0], '{y}-{m}-{d}T{h}:{i}:{s}'),
          end: parseTime(this.datetimeRange[1], '{y}-{m}-{d}T{h}:{i}:{s}')
        })
      })
    }
  }
}
</script>
