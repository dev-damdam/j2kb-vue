<template>
  <main class="cf-main-wrapper">
    <b-card-group columns>
      <b-card
        data-aos="fade-up"
        data-aos-offset="200"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="1000"
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
import AOS from "aos";
import "aos/dist/aos.css";

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
  created() {
    AOS.init();
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
