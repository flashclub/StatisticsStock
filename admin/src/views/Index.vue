<template>
  <div class="about">
    <h1>
      用户总数
    </h1>
    <h1>
      昨日新增
    </h1>
    <h1>
      昨日登录
    </h1>
    <h1>
      近一周新增
    </h1>
    <h1>
      近一周登录
    </h1>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: []
    };
  },
  mounted() {},
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("userinfo");
      this.items = res.data;
    }
  }
};
</script>
<style lang="less">
</style>

