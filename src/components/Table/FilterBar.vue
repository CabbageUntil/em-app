<template>
  <div class="ui left aligned nine wide column">
    <div class="ui labeled icon input">
      <div class="ui label">{{ $t('table.searchBar.hint') }}</div>
      <input
        v-model="filterText"
        class="ui input"
        @keyup.enter="setFilter">
      <i class="search icon"/>
    </div>
    <button
      class="ui button primary"
      @click="doFilter">{{ $t('table.searchBar.search') }}</button>
    <button
      class="ui button"
      @click="resetFilter">{{ $t('table.searchBar.clear') }}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterText: ''
    }
  },
  methods: {
    doFilter () {
      // this.$events.fire('filter-set', this.filterText)
      this.$parent.$parent.$parent.$emit('filter-set', this.filterText)
    },
    resetFilter () {
      this.filterText = '' // clear the text in text input
      // this.$events.fire('filter-reset')
      this.$parent.$parent.$parent.$emit('filter-reset')
    }
  }
}
</script>
