<template>
  <!-- H E A D E R -->
  <header>
    <div class="container-header">
      
      <div class="sitcky-menu">

        <!-- SOCIAL ICONS -->
        <div class="social-icons">
          <a href="#" class="social-fb"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
          <a href="#" class="social-tw"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
          <a href="#" class="social-ytb"><font-awesome-icon :icon="['fab', 'youtube']" /></a>
        </div>
        <!-- NATLIB -->
        <div class="natlib">
          <span class="title">the logo</span>
          <span class="title">the NATLIB</span>
        </div>
        <!-- USER -->
        <div class="user-actions">
          <div class="user-log">
            <!-- <span class="user-action">LogIn</span> -->
            <!-- <div v-show="!storeGetUser.isLogged" @click="storeGetUser.getRegisteredUser" class="user-action">LogIn</div> --> <!-- DELETE?? -->
        
            <a href="#" v-show="!storeGetUser.isLogged" @click="storeGetUser.toggleDisplayLogIn" class="user-action">LogIn</a>
            <a href="#" v-show="storeGetUser.isLogged" @click="storeGetUser.logOutUser" class="user-action">LogOut</a>
            <LogIn v-if="storeGetUser.displayLogIn"/>
            <!-- <div v-show="storeGetUser.isLogged" > User: {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }}</div> -->
          </div>
        
          <div class="user-sign">
            <a href="#" @click="storeGetUser.toggleDisplaySignIn" class="user-action">SignIn</a>
            <SignIn v-if="storeGetUser.displaySignIn"/>
          </div>
        </div>
      </div>

      <div class="active-user" v-show="storeGetUser.isLogged" > User: {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }}</div>
      
      
      <div>
        <Navbar />
        <!-- <div class="active-user" v-show="storeGetUser.isLogged" > User: {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }}</div> -->
      </div>
      
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
import { useGetBookAvailabilityStore } from './stores/getBookAvailability'


const storeGetUser = useGetUserStore()
// const storeGetBookAvailability = useGetBookAvailabilityStore()


storeGetUser.getRegisteredUsers()
// storeGetBookAvailability.getBorrowedBooks()


</script>
