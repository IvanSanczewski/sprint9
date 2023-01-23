<template>
    <div class="backdrop">
        <div v-if="storeGetUser.displayLogIn" class="login-signin-modal">
            <p class="close" @click="storeGetUser.toggleDisplayLogIn" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo">
            </div>
            <!-- <form class="user-login-form" @submit.prevent="storeGetUser.checkUser"> -->
            <form class="modal-form" @submit.prevent="storeGetUser.validateLogInUser">
                
                <div class="input-wrap">
                    <label>Email:</label>
                    <input type="text" v-model="storeGetUser.existingEmail">
                    <!-- <span v-show="emailErr" :class="{ emailErr }"> {{ emailErrMsg }}</span> -->
                    <!-- <span v-show="emptyEmailErr" :class="{ emptyEmailErr }"> {{ emptyEmailErrMsg }}</span> -->
                </div>
                
                <div class="input-wrap">
                    <label>Password:</label>
                    <input type="password" v-model="storeGetUser.existingPassword">
                    <!-- <span v-show="passwordErr" :class="{ passwordErr }"> {{ passwordErrMsg }}</span> -->
                </div>

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