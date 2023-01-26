<template>
    <div class="book-details-container">
        <h2>Book Details:</h2>
        <div class="book-card">
            <img v-if="storeGetBooks.coverExists" :src="`${storeGetBooks.COVER_URL}${storeGetBooks.editionDetails.isbn}-L.jpg`" />
            <img v-else src="@/assets/img/NA.png" />
            <div class="book-info">
                <h3>Title: {{ storeGetBooks.editionDetails.title }}</h3>
                <h4>Author: {{ storeGetBooks.editionDetails.author }}</h4>
                <p>Pages: {{ storeGetBooks.editionDetails.pages }}</p>
                <p>Language: {{ storeGetBooks.editionDetails.language }}</p>
                <p>ISBN: {{ storeGetBooks.editionDetails.isbn }}</p>
        
                <div class="borrow-reserve">
                    <button v-if="storeGetBookAvailability.bookIsAvailable"
                        @click="storeGetBookAvailability.linkToUser(storeGetUser.user.email, storeGetBooks.editionDetails);
                            storeGetUser.borrowNthDocToUser(storeGetUser.user, storeGetBooks.editionDetails.title, storeGetBooks.editionDetails.author, storeGetBooks.editionDetails.isbn)">
                        Borrow this item
                    </button>
                    <button v-else>Reserve this item</button>
                </div>
            </div>
                <!-- <div class="extras">
                     TODO: IMPLEMENT GO TO SEARCH, FIRST EMPTY FIELD
                </div> -->
        </div>
        <div class="extra-actions">
            <button class="action-btn">Check borrow policy</button>
            <button class="action-btn">Make another search</button>
        </div>
    </div>
  
</template>

<script setup>
import { useGetBooksStore } from '../stores/getBooks'
import { useGetUserStore } from '../stores/getUser'
import { useGetBookAvailabilityStore } from '../stores/getBookAvailability'
// import Books from '../pages/Books.vue'

const storeGetBooks = useGetBooksStore()
const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailabilityStore()

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
