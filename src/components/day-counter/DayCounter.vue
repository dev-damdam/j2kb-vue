<template>
  <div class="day-counter-wrapper">
    <section class="select-day-wrapper">
      <span class="select-message">카운트 다운 날짜를 선택해주세요.</span>
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
    <section class="countdown-d-day">
      <span>D-DAY {{ countdownText }}</span>
    </section>
    <section class="anniversary-wrapper">
      <b-input v-model="anniversaryDate.name" class="anniversary-name-input" />
      <date-picker v-model="anniversaryDate.anniversary" mode="date">
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="px-2 py-1 border rounded focus:outline-none focus:border-blue-300"
            :value="inputValue"
            v-on="inputEvents"
          />
        </template>
      </date-picker>
      <b-button
        @click="addAnniversary(anniversaryDate)"
        class="anniversary-add-button"
        >기념일 등록</b-button
      >
    </section>
    <section class="anniversary-list">
      <anniversary-card
        v-for="(anniversary, index) in anniversaryList"
        :key="index"
        :anniversary="anniversary"
      />
    </section>
  </div>
</template>
<script>
import { DatePicker } from "v-calendar";
import AnniversaryCard from "./AnniversaryCard.vue";

export default {
  name: "day-counter",
  components: {
    DatePicker,
    AnniversaryCard,
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
      anniversaryDate: {
        anniversary: 0,
        name: "",
      },
      timeDiff: {
        totalSeconds: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      countdownText: "",
      anniversaryList: [],
    };
  },
  mounted() {
    if (!localStorage.getItem("anniversary-list"))
      localStorage.setItem("anniversary-list", JSON.stringify([]));

    this.anniversaryList = JSON.parse(localStorage.getItem("anniversary-list"));
  },
  methods: {
    calcTimeDiff() {
      const diff = this.selectDate - new Date();
      this.timeDiff.totalSeconds = Math.floor(Math.floor(diff / 1000));
      this.timeDiff.days = Math.floor(diff / (1000 * 24 * 60 * 60));
      this.timeDiff.hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      this.timeDiff.minutes = Math.floor((diff / (1000 * 60)) % 60);
      this.timeDiff.seconds = Math.floor((diff / 1000) % 60);

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
    addAnniversary(anniversary) {
      const isDuplicated = this.anniversaryList.find(
        (el) => el.name === anniversary.name
      );

      if (anniversary.name == "") {
        alert("기념일명을 입력해주세요.");
        return;
      }

      if (anniversary.anniversary == 0) {
        alert("기념일을 선택해주세요.");
        return;
      }

      if (isDuplicated !== undefined) {
        alert("이미 등록된 기념일 입니다.");
        return;
      }

      const anni = {
        date: anniversary.anniversary,
        name: anniversary.name,
      };

      this.anniversaryList.push(anni);

      localStorage.setItem(
        "anniversary-list",
        JSON.stringify(this.anniversaryList)
      );

      this.anniversaryDate.name = "";
      this.anniversaryDate.anniversary = 0;
    },
  },
};
</script>
<style scoped>
.day-counter-wrapper {
  width: 100%;
  height: 100%;

  padding: 30px;
  background-color: black;

  color: white;
}

.select-message {
  padding: 10px;
  font-size: 1.4rem;
}

.countdown-d-day {
  font-size: 1.2rem;
}

.anniversary-wrapper {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding-top: 40px;
}

.anniversary-wrapper > .anniversary-name-input {
  width: 60%;
  height: 34px;
}

.anniversary-wrapper > .anniversary-add-button {
  height: 34px;
}

.anniversary-list {
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  gap: 10px;
}
</style>
