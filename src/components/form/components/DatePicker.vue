<template>
  <div>
    <el-date-picker
      v-model="timeInterval"
      style="float: left;"
      size="large"
      :type="datatype"
      :placeholder="placeholder"
      :clearable="clearable"
      :default-time="defaultTime"
      :picker-options="pickerOptions"
      :value-format="format"
      @change="onChage"
    ></el-date-picker>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  components: {},
  props: {
    ruleForm: Object,
    formItem: Object,
    pickerOptions: {
      type: Object,
      default() {
        return {};
      }
    },
    clearable: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      defaultTime: "",
      timeInterval: "",
      placeholder: this.formItem.placeholder,
      datatype: this.formItem.datatype,
      format: this.formItem.format
    };
  },
  watch: {},
  created() {
    console.log(this.placeholder);
  },
  methods: {
    onChage($data) {
      this.$emit("select", $data);
      this.ruleForm[this.formItem.key] = $data;
    }
  }
};
</script>
<style type="text/css" lang="scss" rel="stylesheet/scss" scoped>
.date-item {
  float: left;
  height: 40px;
  width: 77px;
  //   padding: 5px;
  margin-left: 15px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: #b0b2b8;
  cursor: pointer;
  -moz-user-select: none; /* 火狐 */
  -webkit-user-select: none; /* webkit浏览器 */
  -ms-user-select: none; /* IE10 */
  -khtml-user-select: none; /* 早期浏览器 */
  user-select: none;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.select {
  color: #409eff;
  border: 1px solid #409eff;
}
</style>
