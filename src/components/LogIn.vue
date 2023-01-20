<template>
    <div class="login">
        
        <div v-if="storeGetUser.displayLogIn" class="login-signin-modal">
            <button @click="storeGetUser.toggleDisplayLogIn">x</button>
            <p class="close" @click="storeGetUser.toggleDisplayLogIn" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo" style="width: 70px">
            </div>
            <!-- <form class="user-login-form" @submit.prevent="storeGetUser.checkUser"> -->
            <form class="user-login-form" @submit.prevent="storeGetUser.logInUser(storeGetUser.existingEmail, storeGetUser.existingPassword)">
                <!-- <p>Enter your email</p> -->
                <input type="text" v-model="storeGetUser.existingEmail">
                <!-- <span v-show="emailErr" :class="{ emailErr }"> {{ emailErrMsg }}</span> -->
                <!-- <span v-show="emptyEmailErr" :class="{ emptyEmailErr }"> {{ emptyEmailErrMsg }}</span> -->
                
                <input type="password" v-model="storeGetUser.existingPassword">
                <!-- <span v-show="passwordErr" :class="{ passwordErr }"> {{ passwordErrMsg }}</span> -->
                <button>ENTER THE NAT-LIB CATALOGUE</button>
            </form>
        </div>


    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

console.log('login component accessed')

const storeGetUser = useGetUserStore()
</script> 