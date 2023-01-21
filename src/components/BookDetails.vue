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
            <button v-if="storeGetBooks.editionDetails.available">Borrow this item</button>
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
// import Books from '../pages/Books.vue'


const storeGetBooks = useGetBooksStore()


// TOGGLE BETWEEN DISPLAYBOOK SO IT IS SHOWED ONLY WHEN TRUE
// const toggleDisplayBook = ((storeGetBooks) => {
//     console.log('toggle active')
//     return storeGetBooks.displayBook = true
//     //   storeGetBooks.displayBook = !storeGetBooks.displayBook
// }) 
// toggleDisplayBook()

</script>
