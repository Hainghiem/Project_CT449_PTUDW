<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-light" to="/">
        <img
          src="@/assets/img/library.png"
          alt="Logo"
          width="30"
          height="24"
          class="d-inline-block align-text-top"
          style="background-color: aliceblue"
        />
        Circle Library
      </router-link>

      <!-- Thêm liên kết đăng ký -->
      <div class="d-flex ms-auto">
        <router-link class="btn btn-light" to="/register">Đăng ký</router-link>
      </div>
    </div>
  </nav>
</template>
<script>
import LogNav from "@/components/LogNav.vue";

export default {
  name: "LoginHeader",
  components: {
    LogNav,
  },
};
</script>
<style scoped>
.navbar {
  background-color: rgb(0, 81, 255); /* Màu nền thanh điều hướng */
}

.navbar .btn {
  margin-left: 10px;
  font-size: 1rem;
}
</style>
