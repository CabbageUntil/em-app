<template>
  <div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.tel') }}：</label>
      <div>
        {{ rowData.data.tel }}
      </div>
    </div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.email') }}：</label>
      <div>
        {{ rowData.data.email }}
      </div>
    </div>
    <div class="inline field">
      <label>{{ $t('table.detailRow.existCompany.address') }}：</label>
      <div>
        {{ rowData.data.address }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ExistComDetailRow',
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
