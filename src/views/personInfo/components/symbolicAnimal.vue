<template>
  <div>
    <el-form-item :label="$t('form.personalInfo.field.symbolicAnimal.label')">
      <el-select
        clearable
        v-model="animal"
        :placeholder="$t('form.personalInfo.field.symbolicAnimal.hint')"
      >
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Rat')"
          :value="0"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Ox')"
          :value="1"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Tiger')"
          :value="2"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Rabbit')"
          :value="3"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Dragon')"
          :value="4"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Snake')"
          :value="5"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Horse')"
          :value="6"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Goat')"
          :value="7"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Monkey')"
          :value="8"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Rooster')"
          :value="9"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Dog')"
          :value="10"/>
        <el-option
          :label="$t('form.personalInfo.field.symbolicAnimal.option.Pig')"
          :value="11"/>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'SymbolicAnimal',
  data () {
    return {
      animal: this.checkValue
    }
  },
  props: {
    checkValue: {
      type: Number,
      default: null
    }
  },
  watch: {
    checkValue (newVal, oldVal) {
      this.animal = newVal
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
