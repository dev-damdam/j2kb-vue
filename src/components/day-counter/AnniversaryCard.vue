<template>
  <div class="anniversary-card-wrapper">
    <span>{{ anniversary }}</span>
    <b-card :title="anniversary.name">
      <b-card-text> {{ anniversaryDate }} </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "anniversary-card",
  props: {
    anniversary: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    anniversaryDate() {
      const date = new Date(this.anniversary.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return year + "년 " + month + "월 " + day + "일";
    },
  },
};
</script>
<style scoped>
.anniversary-card-wrapper {
  width: 100%;
  height: 100%;

  color: black;
}
</style>
