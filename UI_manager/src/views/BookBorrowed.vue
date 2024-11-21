<template>
  <div>
    <h4><b>SÁCH ĐANG ĐƯỢC MƯỢN</b></h4>
    <br />

    <!-- Loading Spinner -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Borrow Cards -->
    <div v-else>
      <div v-if="borrows.length === 0" class="no-borrows">
        <p>Không có sách đang mượn</p>
      </div>
      <div v-else class="borrow-cards">
        <div
          v-for="(borrow, index) in borrows"
          :key="index"
          class="borrow-card"
        >
          <div class="card-header">
            <h3>{{ borrow.bookName }}</h3>
            <p class="mt-3">Mã số sách: {{ borrow._id }}</p>
          </div>
          <div class="card-body">
            <div class="card-row">
              <span class="card-field">Tên tài khoản:</span>
              <span class="card-value">{{ borrow.username }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Ngày mượn:</span>
              <span class="card-value">{{
                formatDate(borrow.borrowDate)
              }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Ngày hết hạn:</span>
              <span class="card-value">{{ formatDate(borrow.dueDate) }}</span>
            </div>
            <div class="card-row">
              <span class="card-field">Trạng thái:</span>
              <strong class="card-value status">Đang mượn</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import borrowCardService from "@/services/borrowCard.service";

export default {
  data() {
    return {
      borrows: [],
      loading: true,
    };
  },

  methods: {
    async fetchBorrowCards() {
      try {
        const response = await borrowCardService.getAll();
        this.borrows = response; // assuming response is an array of borrowing card objects
      } catch (error) {
        console.error("Error fetching borrow cards:", error);
      } finally {
        this.loading = false;
      }
    },

    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("vi-VN", options);
    },
  },

  mounted() {
    this.fetchBorrowCards();
  },
};
</script>

<style scoped>
.borrow-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h4 {
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.loading-spinner {
  text-align: center;
  margin-top: 20px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-borrows {
  text-align: center;
  font-size: 20px;
  color: #1a15a4; /* Màu sắc sang trọng */
  font-weight: bold;
  margin-top: 20px;
  letter-spacing: 1px;
  font-family: "Helvetica Neue", sans-serif;
}

.borrow-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
}

.borrow-card {
  width: 300px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.borrow-card:hover {
  transform: translateY(-10px);
}

.card-header {
  background-color: #f2f2f2;
  padding: 15px;
  text-align: center;
}

.card-header h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 5px;
}

.book-id {
  color: #666;
  font-size: 14px;
}

.card-body {
  padding: 15px;
}

.card-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.card-field {
  font-weight: bold;
  color: #555;
}

.card-value {
  color: #333;
}

.status {
  color: green;
}

@media (max-width: 768px) {
  .borrow-card {
    width: 100%;
  }
}
</style>
