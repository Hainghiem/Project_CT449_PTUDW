<template>
  <div class="signup-container">
    <div class="form-card">
      <div class="form-header">
        <h2>Đăng ký</h2>
      </div>
      <Form @submit="submitStaff" :validation-schema="SignInSchema">
        <div class="form-body">
          <div class="input-group">
            <label for="username">Tên người dùng:</label>
            <Field
              name="username"
              id="username"
              type="text"
              placeholder="Nhập tên đăng nhập"
              class="input-field"
              v-model="staffSignIn.username"
            />
            <ErrorMessage name="username" class="error-message" />
          </div>

          <div class="input-group">
            <label for="phone">Số điện thoại:</label>
            <Field
              name="phone"
              id="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              class="input-field"
              v-model="staffSignIn.phone"
            />
            <ErrorMessage name="phone" class="error-message" />
          </div>

          <div class="input-group">
            <label for="address">Địa chỉ:</label>
            <Field
              name="address"
              id="address"
              type="text"
              placeholder="Nhập địa chỉ"
              class="input-field"
              v-model="staffSignIn.address"
            />
            <ErrorMessage name="address" class="error-message" />
          </div>

          <div class="input-group">
            <label for="password">Mật khẩu:</label>
            <Field
              name="password"
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              class="input-field"
              v-model="staffSignIn.password"
            />
            <ErrorMessage name="password" class="error-message" />
          </div>

          <div class="input-group">
            <label for="confirm_password">Nhập lại mật khẩu:</label>
            <Field
              name="confirm_password"
              id="confirm_password"
              type="password"
              placeholder="Xác nhận mật khẩu"
              class="input-field"
            />
            <ErrorMessage name="confirm_password" class="error-message" />
          </div>

          <div class="input-group">
            <label for="role">Chức danh:</label>
            <Field
              name="role"
              id="role"
              as="select"
              class="input-field"
              v-model="staffSignIn.role"
            >
              <option value="">chọn chức danh</option>
              <option value="staff">CSR</option>
              <option value="manager">SM</option>
              <option value="more">khác</option>
            </Field>
            <ErrorMessage name="role" class="error-message" />
          </div>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn btn-submit">Đăng ký</button>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import StaffsService from "@/services/staff.service.js";
import router from "../router";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const SignInSchema = yup.object().shape({
      username: yup
        .string()
        .required("vui lòng nhập tên người dùng.")
        .max(50, "Username có nhiều nhất 50 ký tự"),
      password: yup
        .string()
        .required("vui lòng nhập mật khẩu.")
        .max(50, "Mật khẩu không được quá 50 ký tự"),
      confirm_password: yup
        .string()
        .required("vui lòng nhập lại mật khẩu.")
        .oneOf([yup.ref("password")], "Không đúng mật khẩu"),
      address: yup
        .string()
        .required("vui lòng nhập địa chỉ.")
        .max(200, "Địa chỉ không được vượt quá 200 ký tự."),
      phone: yup.string().required("vui lòng nhập số điện thoại."),
      role: yup.string().required("vui lòng chọn.").max(50, "Chức vụ quá dài."),
    });

    return {
      SignInSchema,
      staffSignIn: {
        username: "",
        password: "",
        address: "",
        phone: "",
        role: "",
      },
    };
  },
  methods: {
    async submitStaff() {
      try {
        await StaffsService.create(this.staffSignIn);
        alert("Đăng ký thành công!");
        router.push("/");
      } catch (error) {
        alert("Lỗi xảy ra khi đăng ký");
      }
    },
    goBack() {
      router.push("/");
    },
  },
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(
    135deg,
    #ffffff,
    #d2dff2
  ); /* Gradient nhẹ nhàng */
  padding: 30px;
  box-sizing: border-box;
}

.form-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 40px;
  max-width: 450px;
  width: 100%;
}

.form-header {
  text-align: center;
  margin-bottom: 25px;
}

.form-header h2 {
  margin: 0;
  color: #333;
  font-size: 1.8rem;
  font-weight: bold;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  font-weight: 600;
  color: #444;
  margin-bottom: 5px;
}

.input-field {
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 12px;
  background: #f9f9f9;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #5c8aff;
  box-shadow: 0 0 8px rgba(92, 138, 255, 0.5);
}

.error-message {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 5px;
}

.form-footer {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
  font-weight: 600;
}

.btn-submit {
  background: linear-gradient(135deg, #5c8aff, #6f96ff);
  color: #fff;
  box-shadow: 0 4px 12px rgba(92, 138, 255, 0.3);
}

.btn-submit:hover {
  background: linear-gradient(135deg, #4b6fc3, #566dcc);
  box-shadow: 0 6px 18px rgba(75, 111, 195, 0.4);
}

.btn-cancel {
  background: #ddd;
  color: #555;
}

.btn-cancel:hover {
  background: #bbb;
}
</style>
