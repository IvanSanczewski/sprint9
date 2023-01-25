<template>
    <div class="backdrop" @click.self="storeGetUser.toggleDisplaySignIn">
        <div class="login-signin-modal">
            <p class="close" @click="storeGetUser.toggleDisplaySignIn" style="cursor: pointer">
                <font-awesome-icon icon="xmark" />
            </p>
            <div class="form-logo">
                <span>the</span>
                <span class="title-logo">NAT</span>
                <img src="@/assets/img/NATLIB_LOGO.png" alt="The NAT-LIB logo">
                <span class="title-logo">LIB</span>
                <span>.lt</span>
            </div>
            <form class="modal-form" @submit.prevent="storeGetUser.validateSignInUser">
            
                <div class="input-wrap">
                    <label>First Name</label>
                    <input :class="{inputFail : (storeGetUser.firstNameErr)}" type="text" v-model="storeGetUser.signInUser.firstName">
                    <span v-show="storeGetUser.firstNameErr" class="firstNameErr"> {{ storeGetUser.firstNameErrMsg }}</span>
                </div>
                <div class="input-wrap">
                    <label>Second Name</label>
                    <input :class="{inputFail : (storeGetUser.lastNameErr)}" type="text" v-model="storeGetUser.signInUser.lastName">
                    <span v-show="storeGetUser.lastNameErr" class="lastNameErr"> {{ storeGetUser.lastNameErrMsg }}</span>
                </div>
            
                <div class="input-wrap">
                    <label>Email</label>
                    <input :class="{inputFail : (storeGetUser.emailErr || storeGetUser.emptyEmailErr)}" type="text" v-model="storeGetUser.signInUser.email">
                    <span v-show="storeGetUser.emailErr" class="emailErr"> {{ storeGetUser.emailErrMsg }}</span>
                    <span v-show="storeGetUser.emptyEmailErr" class="emptyEmailErr"> {{ storeGetUser.emptyEmailErrMsg }}</span>
                </div>
            
                <div class="input-wrap">
                    <label>Password</label>
                    <!-- v-bind type to toggle attribute  -->
                    <input :class="{inputFail : storeGetUser.passwordErr}" :type="storeGetUser.passwordInputType" v-model="storeGetUser.signInUser.password">
                    <span v-show="storeGetUser.passwordErr" class="passwordErr"> {{ storeGetUser.passwordErrMsg }}</span>
                    <p class="show-password"><input type="checkbox" @click="storeGetUser.togglePasswordInputType">Show password</p>
                </div>
            
                <button>BECOME A MEMBER OF THE NAT-LIB</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

console.log('signin component accessed')

const storeGetUser = useGetUserStore()
</script> 