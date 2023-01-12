<template>
    <div class="login">
        <button @click="storeGetUser.getRegisteredUser">LOG IN</button>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

console.log('login component accessed')

const storeGetUser = useGetUserStore
</script> 