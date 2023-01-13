<template>
    <div>
        <form class="signin-form" @submit.prevent="validateUser">
            <h3>BECOME A MEMBER OF THE NATIONAL LIBRARY</h3>
            <input type="text" value="Pau" ref="name">
            <span v-show="firstNameErr" :class="{ firstNameErr }"> {{ firstNameErrMsg }}</span>

            <input type="text" value="Sánchez" ref="surname" >
            <span v-show="lastNameErr" :class="{ lastNameErr }"> {{ lastNameErrMsg }}</span>
            
            <input type="text" value="c@3.c" ref="email">
            <span v-show="emailErr" :class="{ emailErr }"> {{ emailErrMsg }}</span>
            <span v-show="emptyEmailErr" :class="{ emptyEmailErr }"> {{ emptyEmailErrMsg }}</span>
            
            <!-- v-bind type to toggled attribute  -->
            <input :type="passwordType" value="1234" placeholder="Password" ref="password">
            <span v-show="passwordErr" :class="{ passwordErr }"> {{ passwordErrMsg }}</span>
            <p class="show-password"><input type="checkbox" @click="toggleInputType">Show password</p>
            
            <button>Sign In</button>
        </form>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

console.log('login component accessed')

const storeGetUser = useGetUserStore
</script> 