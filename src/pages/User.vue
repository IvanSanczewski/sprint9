<template>
    <div class="user-container">
        <h2>Welcome {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }} - <span v-if="storeGetUser.user.isAdmin">Library Administrator</span><span v-else>Library User</span></h2>
        <div class="user-panel">
            <button class="user-btn-panel">Edit account</button>
            <button class="user-btn-panel">Delete account</button>
        </div>


        <!-- D O C S -->
        <div class="user-borrow">
            <!-- TODO: IMPLEMENT RETURNED BOOKS -->
            <!-- <div class="read">LIST OF RETURNED BOOKS</div> -->
            <h3 class="reading">LIST OF BORROWED DOCUMENTS</h3>
                // TODO: DETERMINE ARRAY TO ITERATE
                <div v-for="doc in storeGetUser.user.borrow" :key="doc.title" class="borrowed-docs">
                    <span> {{ doc.title }} - </span> 
                    //TODO: ADD AUTHOR
                    <!-- <span> {{ doc.author }} - </span>  -->
                    <span> {{ doc.borrowDate }} - </span>
                    <span> {{ doc.returnDate }} - </span>
                </div>
        </div>



        <!-- A D M I N S -->
        <div v-show="storeGetUser.user.isAdmin">
        <button @click="storeGetUser.toggleDisplayUsersList">Get Users</button>
            <div v-show="storeGetUser.displayUsersList" class="users-list">
                <h5>USERS LIST</h5>
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
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

const storeGetUser = useGetUserStore()

</script>

<style>

</style>