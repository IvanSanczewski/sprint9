import { defineStore } from 'pinia'
import router from '../router/index'

const borrowedBooks_db_URL = 'http://localhost:3000/borrowedBooks'

export const useGetBookAvailabilityStore = defineStore('getBookAvailability', {
    state: () => ({
        borrowedBooks: [],
        newBorrowedBook: {},
        bookIsAvailable: null
    }),
    getters: {
    },
    actions: {
        getBorrowedBooks() {
            fetch (borrowedBooks_db_URL)
                .then(response => response.json())
                .then (data => this.borrowedBooks = data)
        },

        isAvailable(isbn) {
            if (this.borrowedBooks.some(book => book.isbn === isbn)) {
                console.log('this book is borrowed')
                this.bookIsAvailable = false
            } else {
                this.bookIsAvailable = true
                console.log('this book is available')
            }
        },

        // asign borrowing user to book 
        linkToUser(user, book) {
            console.log(router)
            book.available = false
            let borrowDate = new Date
            let initialDate = new Date // this date is used to calculate the 4 weeks borrow period, but when setDate method is applied, it sets the new date also to initialDate, therefore we do not use borrowDate to make the calculation
            let returnDate = new Date(initialDate.setDate(initialDate.getDate() + 28))
            
            let borrow = {
                user,
                borrowDate,
                returnDate
            }
            this.newBorrowedBook = { ...book, borrow}

            // AN ALTERNATIVE WAY TO ADD NESTED PROPERTIES TO AN OBJECT
            // this.newBorrowedBook = Object.assign(book,
            //     {borrow: {
            //         user,
            //         borrowDate: new Date
            // }})
        

            this.borrowedBooks.push(this.newBorrowedBook)

            fetch(borrowedBooks_db_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.newBorrowedBook)
            })
            .then(() => router.push({name: 'User'}))
            // .then(() => this.router.push('/user'))


        },

        // delete book drom db
        deleteDocFromBorrowedBooks(isbn) {
            let deleteBook = this.borrowedBooks.filter(item => item.isbn === isbn)
            let deleteBookId = deleteBook[0].id
        
            fetch(`${borrowedBooks_db_URL}/${deleteBookId}`, {method: 'DELETE'})
                .then(() => this.borrowedBooks = this.borrowedBooks.filter(item => item.isbn !== isbn))
        }
    }
})
