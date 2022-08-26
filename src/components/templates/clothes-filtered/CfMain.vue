<template>
  <main class="cf-main-wrapper">
    <b-card-group columns>
      <b-card
        v-for="clothes in clothesList"
        :key="clothes.productID"
        :title="clothes.productName"
        :img-src="clothes.productImg"
        img-alt="Image"
        img-top
      >
        <b-card-text> ₩ {{ clothes.productPrice }} </b-card-text>
      </b-card>
    </b-card-group>
  </main>
</template>
<script>
export default {
  name: "cf-main",
  props: {
    clothesList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  mounted() {
    console.log(this.clothesList);
  },
};
</script>
<style scoped>
.cf-main-wrapper {
  padding: 10px;
}
</style>
