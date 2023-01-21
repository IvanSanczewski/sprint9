import { defineStore } from 'pinia'
import axios from 'axios'


const borrowedBooks_db_URL = 'http://localhost:3000/borrowedBooks'

export const useGetBookAvailability = defineStore('getBookAvailability', {
    state: () => ({
        borrowedBooks: {}
    }),
    getters: {

    },
    actions: {
        getBorrowedBooks() {
            fetch (borrowedBooks_db_URL)
                .then(response => response.json())
                .then (data => this.borrowedBooks = data)
        },


        //     .then(data => this.borrowedBooks = data)
        // console.log(this.borrowedBooks)

        // TODO: borrowToUser(email)       
        // async borrowToUser(email) {

        // }
    }
})