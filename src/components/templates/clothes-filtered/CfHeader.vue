<template>
  <header class="cf-header-wrapper">
    <span class="title">{{ titleUpperCase }}</span>
    <b-button size="lg" variant="transparent" @click="openNav">
      <b-icon icon="filter-circle" />
    </b-button>
  </header>
</template>
<script>
export default {
  name: "cf-header",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  computed: {
    titleUpperCase() {
      return this.title.toUpperCase();
    },
  },
  methods: {
    openNav() {
      this.$emit("open-nav");
    },
  },
};
</script>

<style scoped>
.cf-header-wrapper {
  padding: 15px;
  width: 100%;
  text-align: left;

  background-color: #ffd8e0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: sticky;
  top: 0;
  left: 0;

  z-index: 1;
}

.cf-header-wrapper > .title {
  font-size: 1.6rem;
}
</style>
