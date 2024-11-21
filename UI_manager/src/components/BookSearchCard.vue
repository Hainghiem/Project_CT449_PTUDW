<template>
  <div class="library-container">
    <!-- Search Input -->
    <div class="input-group">
      <InputSearch v-model="searchedBook" placeholder="Tìm kiếm sách..." />
    </div>

    <!-- Add Book Button -->
    <div class="add-book">
      <router-link class="btn btn-add" to="/addBook">+ Thêm Sách</router-link>
    </div>

    <!-- Book List -->
    <div class="search-items-group">
      <BookList
        v-if="filteredBooksCount > 0"
        :books="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else class="no-books-message">Không có sách bạn tìm.</p>
    </div>
  </div>
</template>

<script>
import BooksService from "@/services/book.service.js";
import BookList from "@/components/BookList.vue";
import InputSearch from "./InputSearch.vue";

export default {
  data() {
    return {
      books: [],
      searchedBook: "",
      activeIndex: -1,
    };
  },

  components: {
    BookList,
    InputSearch,
  },

  methods: {
    async retrieveBooks() {
      try {
        this.books = await BooksService.getAll(); // Lấy tất cả sách
      } catch (error) {
        console.error(error);
      }
    },

    refreshList() {
      this.retrieveBooks(); // Gọi lại retrieveBooks để refresh lại trang
    },
  },

  mounted() {
    this.refreshList();
  },

  computed: {
    bookString() {
      return this.books.map((book) => {
        const { name, price, authorName, publisherName, publishYear } = book;
        return [name, price, authorName, publisherName, publishYear].join(""); // Tạo một string các thông tin của book để filter
      });
    },

    filteredBooks() {
      if (!this.searchedBook) return this.books;
      return this.books.filter(
        (_book, index) =>
          this.bookString[index]
            .toLowerCase()
            .includes(this.searchedBook.toLowerCase()) // Không phân biệt hoa thường
      );
    },

    filteredBooksCount() {
      return this.filteredBooks.length;
    },
  },
};
</script>
