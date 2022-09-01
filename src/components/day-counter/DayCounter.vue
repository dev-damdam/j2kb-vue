<template>
  <div class="day-counter-wrapper">
    <section class="select-day-wrapper">
      <span>카운트 다운 날짜를 선택해주세요.</span>
      <date-picker v-model="selectDate" mode="dateTime">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </date-picker>
    </section>
    <section class="countdown-dday">
      <span>D-DAY {{ countdownText }}</span>
    </section>
  </div>
</template>
<script>
import { DatePicker } from "v-calendar";

export default {
  name: "day-counter",
  components: {
    DatePicker,
  },
  computed: {
    selectDate: {
      set(date) {
        this.countdown();
        this.date = date;
      },
      get() {
        return this.date;
      },
    },
  },
  data() {
    return {
      date: 0,
      timeDiff: {
        totalSeconds: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      countdownText: "",
    };
  },
  mounted() {
    //this.date = new Date();
  },
  methods: {
    calcTimeDiff() {
      const diff = this.selectDate - new Date();
      this.timeDiff.totalSeconds = Math.round(Math.round(diff / 1000));
      this.timeDiff.days = Math.round(diff / (1000 * 24 * 60 * 60));
      this.timeDiff.hours = Math.round((diff / (1000 * 60 * 60)) % 24);
      this.timeDiff.minutes = Math.round((diff / (1000 * 60)) % 60);
      this.timeDiff.seconds = Math.round((diff / 1000) % 60);

      this.countdownText =
        this.timeDiff.days +
        "days " +
        this.timeDiff.hours +
        ":" +
        this.timeDiff.minutes +
        ":" +
        this.timeDiff.seconds;
    },
    countdown() {
      let interval = setInterval(() => {
        this.calcTimeDiff();
        if (this.timeDiff.totalSeconds <= 0) {
          clearInterval(interval);
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.day-counter-wrapper {
  width: 100%;
  height: 100%;

  background-color: black;

  color: white;
}

.select-day-wrapper {
  display: flex;
  flex-direction: column;
}
</style>
