<template>
  <div class="page">
    <h4><b>Đăng nhập</b></h4>
    <Form @submit="submitStaff" :validation-schema="loginFormSchema">
      <div id="username-area" class="form-group">
        <label for="username">Tên người dùng:</label>
        <Field
          name="username"
          type="text"
          class="form-control"
          v-model="staffLogin.username"
          placeholder="Nhập tên người dùng"
        />
        <ErrorMessage name="username" class="error-feedback" />
      </div>
      <div id="password-area" class="form-group">
        <label for="password">Mật khẩu:</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          v-model="staffLogin.password"
          placeholder="Nhập mật khẩu"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>
      <div class="form-group">
        <button id="submit" class="btn btn-primary">Đăng nhập</button>
      </div>
    </Form>
  </div>
</template>

<script>
import "boxicons";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import StaffsService from "@/services/staff.service.js";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data() {
    const loginFormSchema = yup.object().shape({
      username: yup
        .string()
        .required("Thiếu username.")
        .max(100, "Tên có tối đa 100 ký tự."),
      password: yup
        .string()
        .required("Thiếu mật khẩu")
        .max(100, "Mật khẩu có tối đa 100 ký tự"),
    });
    return {
      staff: [],
      localStaff: [],
      staffLogin: [],
      LogStatus: false,
      loginFormSchema,
    };
  },

  methods: {
    async submitStaff() {
      try {
        //Thiếu onSubmit là hiển thị Error message
        this.staff = await StaffsService.login(
          this.staffLogin.username,
          this.staffLogin.password
        );
        console.log(this.staff);
        if (this.staff != []) {
          alert("Login complete");
          this.LogStatus = true;
          localStorage.setItem("user", JSON.stringify(this.staff));
          this.localStaff = JSON.parse(localStorage.getItem("user"));
          this.$router.push("/library");
        } else {
          throw new Error("Không đúng tài khoản hoặc mật khẩu");
        }
      } catch (error) {
        console.error();
        alert("Không đúng mật khẩu!");
      }
    },

    // Đăng xuất
    logOut() {
      this.LogStatus = false;
      localStorage.removeItem("user");
      this.localStaff = [];
    },

    // Lấy danh sách các tài khoản
    async retrieveStaffs() {
      try {
        this.staffs = await StaffsService.getAll();
      } catch (error) {
        console.error();
      }
    },
  },

  // Tự cập nhật danh sách tài khoản khi load trang
};
</script>

<style scoped>
.page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f3f4f8, #e3e6f2);
  padding: 20px;
}

.page h4 {
  margin-bottom: 30px;
  font-size: 2rem;
  color: #333;
  font-weight: 600;
}

.form-group {
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  color: #555;
  font-weight: 600;
  margin-bottom: 10px;
}

.form-control {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-control:focus {
  border-color: #4fa3f7;
  box-shadow: 0 0 8px rgba(79, 163, 247, 0.4);
  outline: none;
}

.error-feedback {
  font-size: 0.85rem;
  color: #e74c3c;
  margin-top: 5px;
}

.btn {
  padding: 12px 20px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  background-color: #4fa3f7;
  color: white;
  transition: background-color 0.3s, box-shadow 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:hover {
  background-color: #3579b5;
  box-shadow: 0 4px 12px rgba(55, 121, 181, 0.3);
}

.box-icon {
  margin-left: 8px;
}
</style>
