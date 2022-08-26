<template>
  <div class="clothes-filtered-view-wrapper">
    <cf-header title="clothes-filtered" @open-nav="openFilteredNav" />
    <cf-nav
      v-model="navVisible"
      :categories="categories"
      @change="updateNavState"
      @category="selectedCategory"
    />
    <cf-main :clothes-list="filteredClothesList" />
  </div>
</template>
<script>
import CfHeader from "@/components/templates/clothes-filtered/CfHeader.vue";
import CfNav from "@/components/templates/clothes-filtered/CfNav.vue";
import CfMain from "@/components/templates/clothes-filtered/CfMain.vue";

import clothesList from "@/components/clothes-filtered/clothes-list";

export default {
  name: "clothes-filtered-view",
  components: {
    CfHeader,
    CfNav,
    CfMain,
  },
  data() {
    return {
      navVisible: false,
      category: "",
      categories: [],
    };
  },
  mounted() {
    this.categories = [];
    this.setCategories();
  },
  computed: {
    filteredClothesList: {
      get() {
        if (this.category == "") return clothesList;
        else {
          return clothesList.filter(
            (clothes) => clothes.category.sub == this.category
          );
        }
      },
    },
  },
  methods: {
    openFilteredNav() {
      this.navVisible = true;
    },
    updateNavState(value) {
      this.navVisible = value;
    },
    selectedCategory(value) {
      this.category = value;
    },
    setCategories() {
      let map = new Map();
      clothesList.forEach((clothes) => {
        const main = clothes.category.main;
        const sub = clothes.category.sub;
        if (map.has(main)) {
          map.get(main).add(sub);
        } else {
          map.set(main, new Set([sub]));
        }
      });

      this.categories = [...map].map(([main, [...sub]]) => ({
        main,
        sub,
      }));
    },
  },
};
</script>
<style scoped>
.clothes-filtered-view-wrapper {
  position: relative;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
}
</style>
