<template>
  <div class="page">
    <bookForm :book="book" @submit:book="addBook" />
    {{ message }}
  </div>
</template>

<script>
import bookForm from "@/components/BookForm.vue";
import bookService from "@/services/book.service.js";

export default {
  components: {
    bookForm,
  },

  data() {
    return {
      book: {},
      message: "",
    };
  },

  methods: {
    async addBook(book) {
      try {
        console.log("Book data:", book); // Add this for debugging
        await bookService.add(book);
        this.message = "Thêm sách thành công.";
      } catch (error) {
        console.log(error);
        this.message = "Thêm sách thất bại";
      }
    },
  },
};
</script>
