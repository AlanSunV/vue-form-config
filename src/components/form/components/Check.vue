<template>
  <div>
    <el-checkbox-group v-model="ruleForm[formItem.key]">
      <el-checkbox
        v-for="item in checkOptions"
        :key="item.value"
        :label="item.value"
        :value="item.value"
      >{{ item.label }}</el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object
  },
  data() {
    return {};
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    checkOptions() {
      const options = this.formItem.options;
      if (options) {
        return options;
      } else {
        // jiekouna
      }
    }
  },

  methods: {}
};
</script>

<style lang="scss"></style>
