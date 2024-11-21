<template>
  <div class="page">
    <h2 class="text-center my-4">Mượn sách</h2>

    <!-- Form Borrow -->
    <BookBorrowForm
      :bookDetailId="bookDetailId"
      :bookName="bookName"
      @submit:bookBorrow="borrowBook"
    />

    <!-- Message display -->
    <p v-if="message" class="text-center text-success mt-4">{{ message }}</p>
  </div>
</template>

<script>
import bookDetailService from "@/services/bookDetail.service";
import BookBorrowForm from "../components/BorrowForm.vue";

export default {
  components: {
    BookBorrowForm,
  },
  data() {
    return {
      message: "",
      bookDetailId: this.$route.query.BorrowId
        ? this.$route.query.BorrowId
        : "",
      bookName: this.$route.query.BookName ? this.$route.query.BookName : "",
    };
  },
  methods: {
    async borrowBook(data) {
      await bookDetailService.borrow(data.bookDetailId, data.username);
      this.message = "Mượn sách thành công!";
      setTimeout(() => {
        this.$router.push({ path: "/" });
      }, 2000); // Redirect after 2 seconds
    },
  },
};
</script>

<style scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.regulation {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.regulation-body {
  font-size: 16px;
  line-height: 1.8;
  color: #495057;
}

.regulation-body li {
  padding-left: 1.5rem;
}

.regulation-body i {
  margin-right: 0.5rem;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #343a40;
}

.text-center {
  text-align: center;
}

.my-4 {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.text-success {
  color: #28a745;
}

.text-success p {
  font-size: 18px;
  font-weight: 600;
}

button {
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #007bff;
}
</style>
