<template>
  <b-sidebar
    v-model="navVisible"
    id="sidebar-right"
    title="CATEGORY-FILTER"
    right
    shadow
  >
    <div class="px-3 py-2">
      <div
        v-for="(mainCategory, index) in categories.map((c) => c.main)"
        :key="mainCategory"
      >
        <span class="main-category">{{ mainCategory }}</span>
        <ul>
          <li
            v-for="subCategory in categories[index].sub"
            :key="subCategory"
            @click="selectFilterOption(subCategory)"
          >
            {{ subCategory }}
          </li>
        </ul>
      </div>
    </div>
  </b-sidebar>
</template>
<script>
export default {
  name: "cf-nav",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    categories: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      nav: false,
    };
  },
  mounted() {},
  methods: {
    selectFilterOption(option) {
      this.$emit("category", option);
    },
  },
  computed: {
    navVisible: {
      set(value) {
        this.nav = value;
        this.$emit("change", value);
      },
      get() {
        return this.nav;
      },
    },
  },
  watch: {
    value(value) {
      this.navVisible = value;
    },
  },
};
</script>
<style scoped>
ul {
  display: inline-block;
  list-style: none;
  padding-left: 0;
  width: 100%;
  text-align: left;
}

.main-category {
  text-align: left;
  display: inline-block;
  width: 100%;
  height: 100%;
  font-size: 1.3rem;

  color: #ec3aaa;
}
</style>
