import { defineStore } from 'pinia'
import { projectFirestore } from '../firebase/config'
// import axios from 'axios'

// users endpoints
const USERS_FIREBASE = ''

export const useGetUserStore = defineStore('getUsers', {
    state: () => ({
        users:[],
        user:'',
        isLogged: false
    }),
    actions: {
        // fetch user FROM LOGIN
        async getRegisteredUser() {
            this.isLogged = !this.isLogged
            try {
                const userData = await projectFirestore.collection('users').get()
                console.log(userData.docs)
                this.users = userData.docs.map(doc => {
                    console.log(doc.data())
                    return { ...doc.data(), id: doc.id}
                })
            }
            catch (err) {
                console.log(err)
            }
            console.log(this.users)
        }
    }
})