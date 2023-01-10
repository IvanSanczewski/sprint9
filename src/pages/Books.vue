<template>
  <div class="books">
    <h1>This is the Books page</h1>
    <form @submit.prevent="storeGetBooks.getAuthorBooks">
      <p>Author: </p>
      <input type="text" v-model="storeGetBooks.author">
      <button class="search">Search Author</button>
    </form>
  </div>
</template>

<script setup>
import { useGetBooksStore } from '../stores/getBooks'

const storeGetBooks = useGetBooksStore()
// storeGetBooks.getAuthorBooks()

console.log('books page')
  
</script>

<style>
.books {
  color: rgb(39, 133, 83)
}

.search {
  cursor: pointer
}
</style>