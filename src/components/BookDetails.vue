<template>
    <div class="book-card">
    <h4>Book Details:</h4>
        <img :src="`${storeGetBooks.COVER_URL}${storeGetBooks.editionDetails.isbn}-L.jpg`" />
        <div class="book-info">
            <h3>Title: {{ storeGetBooks.editionDetails.title }}</h3>
            <p>Pages: {{ storeGetBooks.editionDetails.pages }}</p>
            <p>Language: {{ storeGetBooks.editionDetails.language }}</p>
            <p>ISBN: {{ storeGetBooks.editionDetails.isbn }}</p>
            <!-- <p>Available: {{ storeGetBooks.editionDetails.available }}</p> -->

            <button v-if="storeGetBookAvailability.bookIsAvailable" @click="storeGetBookAvailability.borrowToUser(storeGetUser.user.email, storeGetBooks.editionDetails)">Borrow this item</button>
            <button v-else>Reserve this item</button>
            <div class="extras">
                <button>Check borrow policy</button>
                <button>Make another search</button>
            </div>
        </div>  
    </div> 
  
</template>

<script setup>
import { useGetBooksStore } from '../stores/getBooks'
import { useGetUserStore } from '../stores/getUser'
import { useGetBookAvailability } from '../stores/getBookAvailability'

// import Books from '../pages/Books.vue'


const storeGetBooks = useGetBooksStore()
const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailability()

console.log(storeGetBooks.editionDetails.isbn)
console.log(storeGetUser.user.email)
console.log(storeGetBooks.editionDetails)

// storeGetBookAvailability.isAvailable(storeGetBooks.editionDetails.isbn)
storeGetBookAvailability.isAvailable(storeGetBooks.editionDetails.isbn)

// TODO: TOGGLE BETWEEN DISPLAYBOOK SO IT IS SHOWED ONLY WHEN TRUE
// const toggleDisplayBook = ((storeGetBooks) => {
//     console.log('toggle active')
//     return storeGetBooks.displayBook = true
//     //   storeGetBooks.displayBook = !storeGetBooks.displayBook
// }) 
// toggleDisplayBook()

</script>
