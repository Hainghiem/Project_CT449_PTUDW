<template>
  <div class="book-form-container">
    <div class="form-card">
      <h2 class="form-title">Thông tin sách</h2>
      <Form @submit="submitBook" :validation-schema="bookFormSchema">
        <!-- Book Name -->
        <div class="input-group">
          <label for="name">Tên sách:</label>
          <Field
            name="name"
            type="text"
            class="input-field"
            placeholder="Nhập tên sách"
            v-model="book.name"
          />
          <ErrorMessage name="name" class="error-message" />
        </div>

        <!-- Author Name -->
        <div class="input-group">
          <label for="author-name">Tên tác giả:</label>
          <Field
            name="author-name"
            x
            type="text"
            class="input-field"
            placeholder="Nhập tên tác giả"
            v-model="book.authorName"
          />
          <ErrorMessage name="author-name" class="error-message" />
        </div>

        <!-- Publisher Name -->
        <div class="input-group">
          <label for="publisherName">Tên nhà xuất bản:</label>
          <Field
            name="publisherName"
            type="text"
            class="input-field"
            placeholder="Nhập tên nhà xuất bản"
            v-model="book.publisherName"
          />
          <ErrorMessage name="publisherName" class="error-message" />
        </div>

        <!-- Publish Year -->
        <div class="input-group">
          <label for="publishYear">Năm xuất bản:</label>
          <Field
            name="publishYear"
            type="number"
            class="input-field"
            placeholder="Nhập năm xuất bản"
            v-model="book.publishYear"
          />
          <ErrorMessage name="publishYear" class="error-message" />
        </div>

        <!-- Publisher Address -->
        <div class="input-group">
          <label for="publisherAddress">Nhà cung cấp</label>
          <Field
            name="publisherAddress"
            type="text"
            class="input-field"
            placeholder="Nhập nhà cung cấp"
            v-model="book.publisherAddress"
          />
          <ErrorMessage name="publisherAddress" class="error-message" />
        </div>

        <!-- Book Price -->
        <div class="input-group">
          <label for="price">Đơn giá:</label>
          <Field
            name="price"
            type="number"
            class="input-field"
            placeholder="Nhập giá sách"
            v-model="book.price"
          />
          <ErrorMessage name="price" class="error-message" />

          <!-- Display the formatted price with "đ" symbol -->
          <div v-if="book.price">
            <p>{{ formattedPrice }}</p>
          </div>
        </div>

        <!-- Image URL -->
        <div class="input-group">
          <label for="image-url">Ảnh bìa:</label>
          <Field
            name="image-url"
            type="text"
            class="input-field"
            placeholder="Nhập URL ảnh"
            v-model="book.imageURL"
          />
          <ErrorMessage name="image-url" class="error-message" />
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
          <button id="submit" class="btn btn-primary">
            Lưu
            <box-icon color="white" name="save"></box-icon>
          </button>
          <button
            v-if="book._id"
            type="button"
            class="btn btn-danger"
            @click.prevent="deleteBook"
          >
            Xóa
            <box-icon name="folder-minus" color="white"></box-icon>
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import "boxicons";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import publisherService from "@/services/publisher.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  emits: ["submit:book", "delete:book"],

  props: {
    book: { type: Object, required: true },
  },

  data() {
    const bookFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Thiếu tên sách.")
        .min(2, "Tên phải có ít nhất 2 ký tự.")
        .max(100, "Tên có tối đa 100 ký tự."),
      "author-name": yup
        .string()
        .required("Thiếu tên tác giả")
        .max(100, "Tên tác giả có tối đa 100 ký tự"),
      publisherName: yup
        .string()
        .required("Thiếu tên NXB")
        .max(100, "Tên NXB có tối đa 100 ký tự"),
      publisherAddress: yup
        .string()
        .required("Thiếu địa chỉ NXB")
        .max(100, "Địa chỉ NXB có tối đa 100 ký tự"),
      price: yup
        .number()
        .required("Thiếu đơn giá")
        .min(0, "Đơn giá không âm")
        .max(1000000, "Đơn giá tối đa 1.000.000"),
      "image-url": yup.string().required("Thiếu đường link ảnh"),
    });

    return {
      bookLocalInfo: this.book,
      bookFormSchema,
    };
  },

  methods: {
    async submitBook() {
      try {
        // Check if publisher name and address are provided
        if (this.book.publisherName && this.book.publisherAddress) {
          // Create a new publisher if not already in the system
          const publisherData = {
            name: this.book.publisherName,
            address: this.book.publisherAddress,
          };

          await publisherService.add(publisherData); // Add the publisher
          console.log("New Publisher added:", publisherData); // For debugging
        }

        // After publisher is added, submit the book data
        this.$emit("submit:book", this.book);

        this.$router.push("/library");
      } catch (error) {
        console.error("Error adding publisher or book:", error);
      }
    },

    deleteBook() {
      this.$emit("delete:book", this.book._id);
      this.$router.push("/library");
    },
  },

  created() {
    this.bookLocalInfo = this.book;
  },
};
</script>

<style scoped>
.book-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  /* background-color: #f4f6f9; */
}
.form-card {
  background-color: #f7f9fc;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  max-width: 500px;
  width: 100%;
}

.form-title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
}

.input-group {
  margin-bottom: 25px;
}

.input-group label {
  font-weight: 700;
  color: #34495e;
  margin-bottom: 10px;
  display: block;
  font-size: 0.95rem;
}

.input-field {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #bdc3c7;
  background-color: #ecf0f1;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.input-field:focus {
  border-color: #3498db;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0 0 6px rgba(52, 152, 219, 0.3);
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 6px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 25px;
}

.btn {
  padding: 12px 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-primary {
  background-color: #3498db;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
}

.btn-danger {
  background-color: #e74c3c;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(231, 76, 60, 0.3);
}
</style>
