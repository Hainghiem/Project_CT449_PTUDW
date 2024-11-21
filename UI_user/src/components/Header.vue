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
        Circle library
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="col-lg-6">
          <ul class="navbar-nav"></ul>
        </div>
      </div>
      <div class="float-right"><LogNav /></div>
    </div>
  </nav>
</template>

<script>
import LogNav from "@/components/LogNav.vue";
import { RouterLink } from "vue-router";
import router from "../router";

export default {
  components: {
    LogNav,
    RouterLink,
    router,
  },
};
</script>

<style>
/* Tổng thể */
.navbar {
  background: linear-gradient(
    145deg,
    #0047ab,
    #0066cc
  ); /* Tông lạnh, sang trọng */
  height: 4.5rem;
  padding: 0 1rem;
}

/* Logo và tiêu đề */
.navbar-brand {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  text-transform: uppercase;
}

.navbar-brand img {
  box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.5);
}

/* Link trong menu */
.nav-link {
  color: #e6f7ff; /* Màu nhạt */
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #80d4ff; /* Hiệu ứng hover */
  text-decoration: underline;
}

/* Phần Log */
.log-container {
  display: flex;
  align-items: center;
}

/* Định dạng cho menu khi trên thiết bị nhỏ */
.navbar-toggler {
  border: none;
  outline: none;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 30 30'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
}
</style>
