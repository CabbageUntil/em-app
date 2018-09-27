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
import { FullCalendar } from 'vue-full-calendar'

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
      eventSources: [
      /*  {
          id: '1010',
          title: '工作任务',
          description: '全体杨工范德萨发大水范德萨范德萨发递四方速递收到发送到发送到多少分多少分都是范德萨水电费水电费第三方第三方305发生的反倒是发的说法都是范德萨范德萨发生的法第三十大范德萨发开会',
          start: new Date()
        }*/],
      config: {
        locale: this.$i18n.locale.indexOf('zh') >= 0 ? 'zh-cn' : 'en',
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
      console.log(newVal)
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
      fetchCalendar(memberId).then(response => {
        const data = response.data.data
        this.eventSources = data
        console.log("%o",data)
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
