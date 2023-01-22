import { defineStore } from 'pinia'
// import axios from 'axios'    

const borrowedBooks_db_URL = 'http://localhost:3000/borrowedBooks'

export const useGetBookAvailability = defineStore('getBookAvailability', {
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
        borrowToUser(user, book) {
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

            // this.newBorrowedBook = Object.assign(book,
            //     {borrow: {
            //         user,
            //         borrowDate: new Date
            // }})
        
            // this.addBorrowedBook(this.newBorrowedBook)

            fetch(`https//localhost:3000/borrowedBooks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.newBorrowedBook)
            })
        },
        




        // addBorrowedBook(book) {
        //     console.log(book)

        //     fetch('http://localhost:3000/borrowedBooks', {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(book)
        //     })

        // }

    }
})
