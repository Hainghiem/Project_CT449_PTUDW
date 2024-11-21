<template>
  <div class="book-list">
    <div class="book-item mt-3" v-for="(book, index) in books" :key="book._id">
      <!-- Image Section -->
      <h3 class="book-title">{{ book.name }}</h3>
      <div class="row">
        <!-- Book Details Section -->
        <div class="book-info col-md-7">
          <p><strong>Tác giả:</strong> {{ book.authorName }}</p>
          <p><strong>Giá mượn:</strong> {{ book.price }}</p>
          <p><strong>Nhà xuất bản:</strong> {{ book.publisherName }}</p>
          <p><strong>Địa chỉ:</strong> {{ book.publisherAddress }}</p>
          <p><strong>Năm:</strong> {{ book.publishYear }}</p>
          <!-- Edit Button -->
          <router-link
            :to="{ name: 'library.edit', params: { id: book._id } }"
            class="btn btn-warning mt-2 ml-5"
          >
            Chỉnh sửa
          </router-link>
        </div>
        <div class="book-image col-md-5">
          <img :src="book.imageURL" alt="Book Image" />
        </div>
      </div>

      <!-- Book Details Section -->
      <div class="book-details border border-2 border-dark">
        <button @click="addDetail(book._id)" class="add-detail-button">
          Thêm số lượng
        </button>

        <div class="detail-list">
          <div
            v-for="(detail, idx) in bookDetails(book._id)"
            :key="detail._id"
            class="detail-item"
          >
            <div class="detail-row">
              <strong>#</strong>
              <span>{{ idx + 1 }}</span>
            </div>
            <div class="detail-row">
              <strong>ID</strong>
              <span>{{ detail._id }}</span>
            </div>
            <div class="detail-row">
              <strong>Số lần mượn</strong>
              <span>{{ detail.borrowCount }}</span>
            </div>
            <div class="detail-row">
              <strong>Trạng thái</strong>
              <span>
                <span v-if="detail.available" class="status available"
                  >Đang có</span
                >
                <span v-else class="status not-available">Đang Mượn</span>
              </span>
            </div>
            <div class="detail-row">
              <strong>Hành động</strong>
              <span v-if="!detail.available"></span>
              <span
                v-else
                @click="deleteDetail(detail._id, book._id)"
                class="delete-action"
                >Xóa</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "boxicons";
import { RouterLink } from "vue-router";
import BookService from "@/services/book.service";
import bookDetailService from "@/services/bookDetail.service";

export default {
  props: {
    books: { type: Array, default: [] },
  },
  data() {
    return {
      details: [],
      bookDetailsMap: {},
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    onClickButton() {
      this.$emit("clicked", "");
    },

    async addDetail(bookId) {
      try {
        // Attempt to add the new detail for the book
        console.log("Attempting to add new book detail...");
        const newDetail = await BookService.addDetail(bookId);

        // If the API call is successful, update the book details
        if (!this.bookDetailsMap[bookId]) {
          this.bookDetailsMap[bookId] = [];
        }
        this.bookDetailsMap[bookId].push(newDetail);

        // Display the success message
        alert("Thêm sách thành công!");

        // Refresh the page or re-fetch details to update the view
        this.$router.go(); // This forces a reload of the current route
      } catch (error) {
        // If something goes wrong, display an error message
        alert("Lỗi thêm sách!");
        console.error(error);
      }
    },

    async getDetailsForBook(bookId) {
      if (!this.bookDetailsMap[bookId]) {
        this.bookDetailsMap[bookId] = await bookDetailService.getDetail(bookId);
      }
      return this.bookDetailsMap[bookId];
    },

    async deleteDetail(detailId, bookId) {
      try {
        await bookDetailService.deleteDetail(detailId);
        this.bookDetailsMap[bookId] = this.bookDetailsMap[bookId].filter(
          (detail) => detail._id !== detailId
        );
        alert("Xóa sách thành công!");
      } catch (error) {
        alert("Lỗi xóa sách!");
        console.error(error);
      }
    },

    borrowBook(borrowId, bookName) {
      this.$router.push({
        name: "library.borrow",
        query: {
          BorrowId: borrowId,
          BookName: bookName,
        },
      });
    },

    async returnBorrow(detailId) {
      await bookDetailService.return(detailId);
      this.$router.go();
      alert("Đã hoàn tất trả sách!");
    },

    bookDetails(bookId) {
      return this.bookDetailsMap[bookId] || [];
    },
  },

  created() {
    this.books.forEach((book) => {
      // Load details for each book once the component is created
      this.getDetailsForBook(book._id);
    });
  },
};
</script>

<style scoped>
/* Container cho danh sách sách */
.book-list {
  padding: 30px;
  background-color: #f8f9fa; /* Màu nền sáng hơn */
  border-radius: 15px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

/* Card từng sách */
.book-item {
  background-color: #ffffff; /* Màu trắng tinh tế */
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.book-item:hover {
  transform: translateY(-10px); /* Tạo cảm giác nổi bật */
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

/* Tiêu đề sách */
.book-title {
  font-size: 1.6rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 10px;
  line-height: 1.4;
  text-transform: capitalize;
}

/* Phần thông tin sách */
.book-info {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 20px;
  line-height: 1.5;
}

.book-info p {
  margin-bottom: 10px;
}

.book-info strong {
  color: #495057; /* Tăng cường sự chú ý */
}

/* Ảnh sách */
.book-image {
  margin-bottom: 20px;
}

.book-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #e1e1e1;
}

/* Nút chỉnh sửa */
.btn-warning {
  background-color: #f39c12;
  color: #fff;
  font-weight: bold;
  padding: 12px 25px;
  border-radius: 25px;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.btn-warning:hover {
  background-color: #e67e22;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  text-decoration: none;
}

/* Phần chi tiết sách */
.book-details {
  padding: 20px;
  border: 2px solid #333;
  border-radius: 12px;
  background-color: #f1f3f5;
  margin-top: 20px;
}

.detail-list {
  margin-top: 15px;
}

.detail-item {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 1rem;
  color: #343a40;
}

.detail-row strong {
  font-weight: bold;
  color: #495057;
}

.detail-row span {
  color: #6c757d;
}

/* Trạng thái sách */
.status {
  font-weight: 600;
  padding: 8px 15px;
  border-radius: 25px;
}

.status.available {
  background-color: #d4edda;
  color: #155724;
}

.status.not-available {
  background-color: #f8d7da;
  color: #721c24;
}

/* Nút thêm chi tiết */
.add-detail-button {
  padding: 12px 18px;
  background-color: #007bff;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-detail-button:hover {
  background-color: #0056b3;
  transform: translateY(-3px);
}

/* Hành động xóa */
.delete-action {
  color: #e74c3c;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.delete-action:hover {
  color: #c0392b;
}
</style>
