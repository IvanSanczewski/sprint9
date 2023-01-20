<template>
    <div class="user-container">
        <h2>Welcome USER NAME, USER SURNAME</h2>
        <div class="user-panel">
            <button class="user-btn-panel">Edit account</button>
            <button class="user-btn-panel">Delete account</button>
            <button @click="storeGetUser.getRegisteredUsers">Get Users</button> <!-- v-show IF isAdmni -->
        </div>
        <div class="user-borrow"> // COMPLETE LIST OF READ AND READING BOOKS
            <div class="read">LIST OF RETURNED BOOKS</div>
            <div class="reading">LIST OF ACTUAL BORROWED BOOKS</div>
        </div>
        <!-- <div v-if="storeGetUser.user.isAdmin"> Users list -->
        <div> Users list <!-- ELIMINAR-->
            <div v-for="user in storeGetUser.users" :key="user.id">
                <span> {{ user.firstName }} - </span>
                <span> {{ user.lastName }} - </span>
                <span> {{ user.email }} - </span>
                <span> {{ user.isAdmin }} - </span>
                <span> {{ user.id }} - </span>
                <button v-show="storeGetUser.user.isAdmin" @click="storeGetUser.makeAdmin(user.id)"> Make admin</button>
                <span @click="storeGetUser.deleteUser(user.id)"> Delete User </span>
                <!-- <span @click="storeGetUSer.banUser(user.id)"> Ban User </span> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

const storeGetUser = useGetUserStore()

</script>

<style>

</style>