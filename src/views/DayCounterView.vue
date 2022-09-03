<template>
  <div class="day-counter-view-wrapper"><day-counter /></div>
</template>
<script>
import DayCounter from "@/components/day-counter/DayCounter.vue";

export default {
  name: "day-counter-view",
  components: {
    DayCounter,
  },
};
</script>
<style scoped>
.day-counter-view-wrapper {
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
