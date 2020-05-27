<template>
  <div>
    <el-radio
      v-for="item in radioOptions"
      :key="item.value"
      v-model="ruleForm[formItem.key]"
      :label="item.value"
    >{{ item.label }}</el-radio>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    remoteMethod: Function
  },
  data() {
    return {};
  },
  computed: {
    radioOptions() {
      const options = this.formItem.options;
      if (options) {
        return options;
      } else {
        // 请求接口
        return [];
      }
    }
  },

  methods: {}
};
</script>

<style lang="scss"></style>
