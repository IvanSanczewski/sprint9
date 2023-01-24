<template>
    <div class="book-card">
    <h4>Book Details:</h4>
        <img :src="`${storeGetBooks.COVER_URL}${storeGetBooks.editionDetails.isbn}-L.jpg`" />
        <div class="book-info">
            <h3>Title: {{ storeGetBooks.editionDetails.title }}</h3>
            <h4>Author: {{ storeGetBooks.editionDetails.author }}</h4>
            <p>Pages: {{ storeGetBooks.editionDetails.pages }}</p>
            <p>Language: {{ storeGetBooks.editionDetails.language }}</p>
            <p>ISBN: {{ storeGetBooks.editionDetails.isbn }}</p>
            
            <button v-if="storeGetBookAvailability.bookIsAvailable" 
                @click="storeGetBookAvailability.linkToUser(storeGetUser.user.email, storeGetBooks.editionDetails);
                    storeGetUser.borrowNthDocToUser(storeGetUser.user, storeGetBooks.editionDetails.title, storeGetBooks.editionDetails.author, storeGetBooks.editionDetails.isbn)">
                Borrow this item
            </button>
            <button v-else>Reserve this item</button>
            <div class="extras">
                <button>Check borrow policy</button>
                <!-- TODO: IMPLEMENT GO TO SEARCH, FIRST EMPTY FIELD -->
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

console.log('ENTERED BOOKDETAILS COMPONENT')    
console.log(storeGetBooks.editionDetails.isbn)
console.log(storeGetUser.user.email)
console.log(storeGetBooks.editionDetails)

storeGetBookAvailability.isAvailable(storeGetBooks.editionDetails.isbn)

// TODO: TOGGLE BETWEEN DISPLAYBOOK SO IT IS SHOWED ONLY WHEN TRUE --> MAY BE MAKE IT A PAGE & PROTECT ROUTES
// const toggleDisplayBook = ((storeGetBooks) => {
//     console.log('toggle active')
//     return storeGetBooks.displayBook = true
//     //   storeGetBooks.displayBook = !storeGetBooks.displayBook
// }) 
// toggleDisplayBook()

</script>
