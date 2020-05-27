<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      displayLoadingBox: false
    };
  },
  created() {

  },
  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" type="text/scss">
#app {
    width: 100%;
    height: 100%;
    margin: 0;
}

body {
    margin: 0;
}
</style>
