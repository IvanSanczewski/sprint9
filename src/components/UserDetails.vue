<template>
    <div class="user-details-container">
        <form @submit.prevent="storeGetUser.updateUserData"> 
            <p>Actual name: {{ storeGetUser.user.firstName }}</p>
            <div>
                <label>New name</label>
                <input type="text" v-model="storeGetUser.userUpdate.firstName">
            </div>
            <p>Actual last name: {{ storeGetUser.user.lastName }}</p>
            <div>
                <label>New last name</label>
                <input type="text" v-model="storeGetUser.userUpdate.lastName">
            </div>
            <!-- TODO: IMPLEMENT PASSWORD CHANGE MODAL -->
            <!-- <label type="password">password: {{ storeGetUser.user.password }}</label> -->
            <button>Update data</button>
        </form>
    </div>  
</template>

<script setup>
import { useGetUserStore } from '../stores/getUser'

const storeGetUser = useGetUserStore()

console.log('ENTERED USERDETAILS COMPONENT')  
console.log(storeGetUser.displayUserPanel)  

</script>
