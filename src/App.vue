<template>
  <!-- H E A D E R -->
  <header>
    <div class="social-icons">
      <div class="social-fb"><font-awesome-icon :icon="['fab', 'facebook']" /></div>
      <div class="social-tw"><font-awesome-icon :icon="['fab', 'twitter']" /></div>
      <div class="social-ytb"><font-awesome-icon :icon="['fab', 'youtube']" /></div>
      <div class="user-log">
        <!-- <span class="user-action">LogIn</span> -->
        <!-- <div v-show="!storeGetUser.isLogged" @click="storeGetUser.getRegisteredUser" class="user-action">LogIn</div> --> <!-- DELETE?? -->
        
        <div v-show="!storeGetUser.isLogged" @click="storeGetUser.toggleDisplayLogIn" class="user-action">LogIn</div>
        <div v-show="storeGetUser.isLogged" @click="storeGetUser.logOutUser" class="user-action">LogOut</div>
        <div v-show="storeGetUser.isLogged" > User: {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }}</div>
        <LogIn v-if="storeGetUser.displayLogIn"/>
        
        <div @click="storeGetUser.toggleDisplaySignIn" class="user-action">SignIn</div>
        <SignIn v-if="storeGetUser.displaySignIn"/>
      </div>
    </div>
    <h1 class="title">the NATLIB</h1>
    <div class="user-actions">
      
      <!--<LogIn />  ACTIVATE LOGIN COMPONENT -->
    </div>


      <!--<LogIn />  ACTIVATE LOGIN COMPONENT -->
    <div class="navbar">
      <Navbar />
    </div>
  </header>
  
  <!-- C O N T E N T -->
  <main>
    <RouterView />
  </main>

  <!-- F O O T E R -->
  <footer>
    <Footer />
  </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LogIn from './components/LogIn.vue'
import SignIn from './components/SignIn.vue'


import { useGetUserStore } from './stores/getUser'

console.log('login component accessed')

const storeGetUser = useGetUserStore()
storeGetUser.getRegisteredUsers()


</script>
