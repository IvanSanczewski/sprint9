<template>
    <div>
        <form class="signin-form" @submit.prevent="storeGetUser.validateSignInUser">
            <button @click="storeGetUser.toggleDisplaySignIn">X</button>
            <h3>BECOME A MEMBER OF THE NATIONAL LIBRARY</h3>
            <input type="text" v-model="storeGetUser.signInUser.firstName">
            <span v-show="storeGetUser.firstNameErr" class="{ firstNameErr }"> {{ storeGetUser.firstNameErrMsg }}</span>

            <input type="text" v-model="storeGetUser.signInUser.lastName">
            <span v-show="storeGetUser.lastNameErr" class="{ lastNameErr }"> {{ storeGetUser.lastNameErrMsg }}</span>
            
            <input type="text" v-model="storeGetUser.signInUser.email">
            <span v-show="storeGetUser.emailErr" class="{ emailErr }"> {{ storeGetUser.emailErrMsg }}</span>
            <span v-show="storeGetUser.emptyEmailErr" class="{ emptyEmailErr }"> {{ storeGetUser.emptyEmailErrMsg }}</span>
            
            <!-- v-bind type to toggle attribute  -->
            <input type="password" v-model="storeGetUser.signInUser.password">
            <span v-show="storeGetUser.passwordErr" class="{ passwordErr }"> {{ storeGetUser.passwordErrMsg }}</span>
            <!-- <p class="show-password"><input type="checkbox" @click="toggleInputType">Show password</p> -->
            
            <button>SIGN IN</button>
        </form>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

console.log('signin component accessed')

const storeGetUser = useGetUserStore()
</script> 