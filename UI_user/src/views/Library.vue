<template>
  <div class="page row">
    <div class="col-md-1"></div>
    <div class="col-md-10">
      <BookSearchCard />
    </div>
    <div class="col-md-1"></div>
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

<style scoped>
/* Ảnh bìa với overlay */
.cover-container {
  position: relative;
  height: 350px; /* Chiều cao cố định */
  overflow: hidden;
}

/* Overlay trên ảnh bìa */
.cover-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  z-index: 2;
}

.cover-title {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.cover-subtitle {
  font-size: 1.2rem;
  font-weight: 300;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

/* Phần nền trang */
.page {
  background-color: #f5f7fa;
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

/* Card tìm kiếm */
.col-12 {
  margin-top: -50px; /* Kéo card lên gần ảnh bìa */
}

.BookSearchCard {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.BookSearchCard:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
