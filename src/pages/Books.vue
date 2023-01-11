<template>
  <div class="books">
    <h1>This is the Books page</h1>
    <form @submit.prevent="storeGetBooks.getAuthorKey">
      <p>Author: </p>
      <input type="text" v-model="storeGetBooks.author">
      <button class="search">Search Author</button>
    </form>
    <h4>Matches:</h4>
    <!-- <div v-for="author in storeGetBooks.authorsMatchEdited" :key="author.key"> -->
    <div v-for="author in storeGetBooks.authorsMatchEdited" :key="author.index">
      <span @click="storeGetBooks.getBooks">{{ author.name }}</span> <span> - {{ author.work_count }}</span>
      <span class="index"> {{ author.index }}</span>
      <span class="key"> - {{ author.key }}</span>
    </div>
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




span.key {
  color: lightblue
}
</style>