<template>
  <header>
    <div class="social">Social Icons</div>
    <h1>THE NATIONAL LIBRARY</h1>
    <div class="user-actions">LogIn SignIn LogOut</div>
    <div class="header">
      <Navbar />
    </div>
  </header>
  <RouterView />
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

