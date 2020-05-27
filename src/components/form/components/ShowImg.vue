<template>
  <div class="show-box">
    <template v-if="formItem.isImage">
      <el-image class="show-image" :src="formItem.initVal" :preview-src-list="[formItem.initVal]"></el-image>
    </template>
    <template v-else>{{ formItem.initVal }}</template>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    ruleForm: Object,
    formItem: Object,
    showWordLimit: Boolean
  },
  data() {
    return {};
  },
  computed: {},

  methods: {}
};
</script>

<style lang='scss' scoped>
.show-box {
  color: #606266;
  .show-image {
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 1);
    border-radius: 4px;
  }
}
</style>
