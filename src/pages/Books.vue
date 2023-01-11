<template>
  <div class="books">
    <h1>This is the Books page</h1>
    
    <!-- T I T L E -->
     <!--<form class="search" @submit.prevent="storeGetBooks.getTitle">
      <p>Title: </p>
      <input type="text" v-model="storeGetBooks.title">
      <div class="btn-container">
        <button class="search-btn">Search Title</button>
      </div>
    </form>
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  -->
    
    <!-- A U T H O R -->
    <form class="search" @submit.prevent="storeGetBooks.getAuthorKey">
      <p>Author: </p>
      <input type="text" v-model="storeGetBooks.author">
      <div class="btn-container">
        <button class="search-btn">Search Author</button>
      </div>
    </form>

    <!-- R E S U L T S -->
    <h4>Matches:</h4>
    <div v-if="storeGetBooks.searchItem === 'author'" class="match">
      <div v-for="author in storeGetBooks.authorsMatchFiltered" :key="author.key">
        <span @click="storeGetBooks.getBooks">{{ author.name }}</span> <span> - {{ author.work_count }}</span>
        <span class="index"> {{ author.id }}</span>
        <span class="key"> - {{ author.key }}</span>
      </div>
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
.search {
  display: flex;
  flex-flow: column;
}

.btn-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.search-btn {
  margin-top: 1em;
}

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