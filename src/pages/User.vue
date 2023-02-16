<template>
    <div class="user-container">
        <div class="user-header">
            <h2>Welcome, {{ storeGetUser.user.firstName }} {{ storeGetUser.user.lastName }} </h2>
            <div class="role" v-show="storeGetUser.user.isAdmin !== null"> Role:
                <span v-if="storeGetUser.user.isAdmin">Library Administrator</span>
                <span v-else>Library User</span>
            </div>
        </div>
        
        <div class="user-panel">
            <button class="user-panel-btn-edit" @click="storeGetUser.toggleDisplayUserPanel">Edit account</button>
            <button class="user-panel-btn-delete" @click="storeGetUser.deleteUser(storeGetUser.user)">Delete account</button>
        </div>
        <UserDetails 
            v-if="storeGetUser.displayUserPanel"/>

        <!-- D O C S -->
        <div class="user-docs">
            <!-- TODO: IMPLEMENT RETURNED BOOKS -->
            <!-- <div class="read">LIST OF RETURNED BOOKS</div> -->
            <h3>LIST OF BORROWED DOCUMENTS</h3>
            <div class="borrowed-docs-list-titles">
                <span class="doc-tiitle">Title</span>
                <span class="doc-author">Author</span>
                <span class="doc-date doc-borrow">Borrowed on</span>
                <span class="doc-date doc-return">Return date</span>
            </div>
            <div class="borrowed-docs" v-for="doc in storeGetUser.user.borrow" :key="doc.title">
                <span class="doc-tiitle"> {{ doc.title }} </span> 
                <span class="doc-author"> {{ doc.author }} </span> 
                <span class="doc-date doc-borrow"> {{ doc.borrowDate }} </span>
                <span class="doc-date doc-return"> {{ doc.returnDate }} </span>
                
                <!-- TODO: CLEAR DOC FROM USER -->
                <!-- <span class="doc-action-return" @click="storeGetBookAvailability.deleteDocFromBorrowedBooks(doc.isbn)"> Return </span> -->
                <!-- <span class="doc-action-return" @click="storeGetUser.deleteDocFromUser(doc.isbn, storeGetUser.user)"> Return </span> -->
                <span class="doc-action-return" 
                    @click="storeGetBookAvailability.deleteDocFromBorrowedBooks(doc.isbn), storeGetUser.deleteDocFromUser(doc.isbn, storeGetUser.user)"> Return </span>
                <span class="doc-action-extend"> Extend</span>
            </div>

        </div>

        <!-- A D M I N S -->
        <div class="user-admin" v-show="storeGetUser.user.isAdmin">
        <button @click="storeGetUser.toggleDisplayUsersList">Display Users</button>
            <div v-show="storeGetUser.displayUsersList" class="users-list">
                <h5>USERS LIST</h5>
                
                <div class="admin-list" v-for="user in storeGetUser.users" :key="user.id">
                    <span> {{ user.firstName }} </span>
                    <span> {{ user.lastName }} - </span>
                    <span> {{ user.email }} - </span>
                    <span> {{ user.isAdmin }} - </span>
                    <span> {{ user.id }} - </span>
                    <span class="user-control">
                        <button class="action-btn" v-show="storeGetUser.user.isAdmin" @click="storeGetUser.makeAdmin(user.id)"> Make admin</button>
                        <button class="action-btn" @click="storeGetUser.deleteUser(user.id)">Delete</button>
                    </span>
                    <!-- <span @click="storeGetUSer.banUser(user.id)"> Ban User </span> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'
import { useGetBookAvailabilityStore } from '../stores/getBookAvailability'
import UserDetails from '../components/userDetails.vue'

const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailabilityStore()

storeGetBookAvailability.getBorrowedBooks() 

</script>

<style>

</style>