<template>
    <div class="user-container">
        <h2>Welcome {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }}
        <div class="role" v-show="storeGetUser.user.isAdmin !==null"> Role:
            <span v-if="storeGetUser.user.isAdmin">Library Administrator</span>
            <span v-else>Library User</span>
        </div>
        </h2>
        <div class="user-actions">
            <button class="action-btn user-btn-panel">Edit account</button>
            <button class="action-btn user-btn-panel">Delete account</button>
        </div>


        <!-- D O C S -->
        <div class="user-borrow">
            <!-- TODO: IMPLEMENT RETURNED BOOKS -->
            <!-- <div class="read">LIST OF RETURNED BOOKS</div> -->
            <h3 class="reading">LIST OF BORROWED DOCUMENTS</h3>

                <div v-for="doc in storeGetUser.user.borrow" :key="doc.title" class="borrowed-docs">
                    <span> {{ doc.title }} - </span> 
                    <span> {{ doc.author }} - </span> 
                    <span> {{ doc.isbn }} - </span> 
                    <!-- FIXME: DISPLAY DATA -->
                    <span> {{ doc.borrowDate }} - </span>
                    <span> {{ doc.returnDate }} </span>
                    
                    <!-- TODO: DELETE BOOK FROM DB & CLEAR DOC FROM USER -->
                    <span @click="storeGetBookAvailability.deleteDocFromBorrowedBooks(doc.isbn); storeGetUSer.deleteDocFromUser()"> Return Document </span>
                </div>
        </div>



        <!-- A D M I N S -->
        <div v-show="storeGetUser.user.isAdmin">
        <button @click="storeGetUser.toggleDisplayUsersList">Get Users</button>
            <div v-show="storeGetUser.displayUsersList" class="users-list">
                <h5>USERS LIST</h5>
                <div class="admin-list" v-for="user in storeGetUser.users" :key="user.id">
                    <span> {{ user.firstName }} </span>
                    <span> {{ user.lastName }} - </span>
                    <span> {{ user.email }} - </span>
                    <span> {{ user.isAdmin }} - </span>
                    <span> {{ user.id }} - </span>
                    <div class="user-panel">
                        <button class="action-btn" v-show="storeGetUser.user.isAdmin" @click="storeGetUser.makeAdmin(user.id)"> Make admin</button>
                        <button class="action-btn" @click="storeGetUser.deleteUser(user.id)">Delete</button>
                    </div>
                    <!-- <span @click="storeGetUSer.banUser(user.id)"> Ban User </span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'
import { useGetBookAvailability } from '../stores/getBookAvailability'

const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailability()

</script>

<style>

</style>