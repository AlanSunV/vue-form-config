<template>
  <div>
    <el-cascader
      v-model="ruleForm[formItem.key]"
      :options="formItem.options"
      @change="handleChange"
    ></el-cascader>
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
  computed: {},
  created() {},

  methods: {
    handleChange(val) {
      const options = JSON.parse(JSON.stringify(this.formItem.options));
      const obj = [];
      obj[0] = options.find(item => {
        return item.value === val[0];
      });
      obj[1] = obj[0].children.find(item => {
        return item.value === val[1];
      });
      obj[2] = obj[1].children.find(item => {
        return item.value === val[2];
      });
      obj.forEach(item => {
        delete item.children;
      });
      this.ruleForm.addressObj = obj;
    }
  }
};
</script>

<style></style>
