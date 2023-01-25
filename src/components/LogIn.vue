<template>
    
    <div class="backdrop" @click.self="storeGetUser.toggleDisplayLogIn">
        <div v-if="storeGetUser.displayLogIn" class="login-signin-modal">
            <p class="close" @click="storeGetUser.toggleDisplayLogIn" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <span>the</span>
                <span class="title-logo">NAT</span>
                <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo">
                <span class="title-logo">LIB</span>
                <span>.lt</span>
            </div>
            <!-- <form class="user-login-form" @submit.prevent="storeGetUser.checkUser"> -->
            <form class="modal-form" @submit.prevent="storeGetUser.validateLogInUser">
                
                <div class="input-wrap">
                    <label>Email</label>
                    <input :class="{inputFail : (storeGetUser.emailErr || storeGetUser.emptyEmailErr)}" type="text" v-model="storeGetUser.existingEmail">
                    <span v-show="storeGetUser.emailErr" class="emailErr"> {{ storeGetUser.emailErrMsg }}</span>
                    <span v-show="storeGetUser.emptyEmailErr" class="emptyEmailErr"> {{ storeGetUser.emptyEmailErrMsg }}</span>
                </div>
                
                <div class="input-wrap">
                    <label>Password</label>
                    <input :class="{inputFail : storeGetUser.passwordErr}" :type="storeGetUser.passwordInputType" v-model="storeGetUser.existingPassword">
                    <span v-show="storeGetUser.passwordErr" class="passwordErr"> {{ storeGetUser.passwordErrMsg }}</span>
                    <p class="show-password"><input type="checkbox" @click="storeGetUser.togglePasswordInputType">Show password</p>
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