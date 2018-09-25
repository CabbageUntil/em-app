<template>
  <div>
    <div
      class="inline field"
      v-if="tel">
      <label>{{ $t('table.detailRow.memberList.tel') }}：</label>
      <div
        :key="item.id"
        v-for="item in tel">
        {{ item.label + ': ' + item.content }}
      </div>
    </div>
    <div
      class="inline field"
      v-if="email">
      <label>{{ $t('table.detailRow.memberList.email') }}：</label>
      <div
        :key="item.id"
        v-for="item in email">
        {{ item.label + ': ' + item.content }}
      </div>
    </div>
    <div
      class="inline field"
      v-if="address">
      <label>{{ $t('table.detailRow.memberList.address') }}：</label>
      <div
        :key="item.id"
        v-for="item in address">
        {{ item.label + ': ' + item.content }}
      </div>
    </div>
    <div
      class="inline field"
      v-if="other">
      <label>{{ $t('table.detailRow.memberList.address') }}：</label>
      <div
        :key="item.id"
        v-for="item in other">
        {{ item.label + ': ' + item.content }}
      </div>
    </div>
  </div>
</template>

<script>
import { fetchListDetail } from '@/api/member'

export default {
  name: 'MemberDetailRow',
  data () {
    return {
      tel: [],
      email: [],
      address: [],
      other: []
    }
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      default: null
    }
  },
  mounted () {
    fetchListDetail(this.rowData.id).then(response => {
      const data = response.data
      this.tel = data.tel
      this.email = data.email
      this.address = data.email
      this.other = data.other
    })
  }
}
</script>
