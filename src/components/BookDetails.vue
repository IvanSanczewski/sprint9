<template>
    <h4>Book Details:</h4>
    <div class="book-card">
        <img :src="`${storeGetBooks.COVER_URL}${storeGetBooks.editionDetails.isbn}-L.jpg`" />
        <div class="book-info">

            <h3>Title: {{ storeGetBooks.editionDetails.title }}</h3>
            <p>Pages: {{ storeGetBooks.editionDetails.pages }}</p>
            <p>Language: {{ storeGetBooks.editionDetails.language }}</p>
            <p>ISBN: {{ storeGetBooks.editionDetails.isbn }}</p>
            <p>Available: {{ storeGetBooks.editionDetails.available }}</p>
            <button v-if="storeGetBooks.editionDetails.available">Borrow this item</button>
            <button v-else>Reserve this item</button>
            <button>Check borrow policy</button>
            <button>Make another search</button>
        </div>  
    </div> 
  
</template>

<script setup>
// import Books from '../pages/Books.vue';
import { useGetBooksStore } from '../stores/getBooks'

const storeGetBooks = useGetBooksStore()

</script>

<style>

</style>