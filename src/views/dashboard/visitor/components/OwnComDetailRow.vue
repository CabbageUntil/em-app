<template>
  <div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.tel') }}：</label>
      <div>
        {{ rowData.tel }}
      </div>
    </div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.email') }}：</label>
      <div>
        {{ rowData.email }}
      </div>
    </div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.address') }}：</label>
      <div>
        {{ rowData.address }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'JoinComDetailRow',
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      default: null
    }
  }
}
</script>
