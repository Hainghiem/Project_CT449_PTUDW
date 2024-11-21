<template>
  <div class="page">
    <div class="content-wrapper">
      <BookSearchCard />
    </div>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";
import BookSearchCard from "@/components/BookSearchCard.vue";

export default {
  components: {
    BookSearchCard,
    RouterLink,
  },
};
</script>
