<template>
  <div class="books-container">

    <div class="books-header">
      <p style="fontStyle: italic">L'imaginazione è un posto dove ci piove dentro</p>
      <p>Italo Calvino</p>
      <h1>YOUR READING JOURNEY STARTS HERE</h1>
    </div>


    
    <form class="search-form" @submit.prevent="storeGetBooks.setSearch(storeGetBooks.search)">
      <div class="select-wrap">
        <label> Choose search term: author / title </label>
        <!-- <select v-model="searchType" v-model:searchItem="searchItem"> -->
        <select v-model="storeGetBooks.searchItem">
          <option value="author">Author</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div class="input-wrap-books">
        <input v-model="storeGetBooks.search" type="text">
        <button class="action-btn">SEARCH</button>
      </div>
    </form>

    <!-- T I T L E -->
    <!-- <div v-if="searchType === 'title'"> -->
      <div class="title-search" v-if="storeGetBooks.searchItem === 'title'">
        <div class="match">
          <h4>Matching Titles:</h4>
        <div v-for="work in storeGetBooks.titleWorks" :key="work.key">
          <a href="#" @click="storeGetBooks.getBookDetails(work.key, work.author_name[0])">
            <span class="search-primary-output"> {{ work.title }} </span>
          </a>
            <span class="search-secondary-output"> - {{ work.author_name }}</span>
        </div>
        </div>
      </div>

    <!-- A U T H O R -->
    <!-- <div v-if="searchType === 'author'"> -->         
    <div class="author-serach">
      <div v-if="storeGetBooks.searchItem === 'author'">
        <div class="match">
          <h4>Matching Authors:</h4>
          <div v-for="author in storeGetBooks.authorsMatchFiltered" :key="author.key">
            <a href="#" @click="storeGetBooks.getBooks(author.key, author.name)">
              <span class="search-primary-output"> {{ author.name }} </span>
            </a>
              <span class="search-secondary-output"> - {{ author.work_count }}</span>
          </div>
        </div>
      
        <div class="match">
          <div v-if="storeGetBooks.authorBooks.length > 0">
            <h4>Books:</h4>
            <div class="books">
              <div v-for="book in storeGetBooks.authorBooks" :key="book.key">
                <a href="#" @click="storeGetBooks.getBookKey(book.key)">{{ book.title }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- //FIXME:< CONVERT IT INTO A PAGE & GUARD THE ROUTE> -->
  <BookDetails 
    v-if="storeGetBooks.editionDetails.title !== '' && storeGetUser.user.firstName !== ''" />
  <div v-if="storeGetBooks.editionDetails.title !== '' && storeGetUser.user.firstName === ''" class="missing-user">
    You need to be logged in order to see the book datails and borrow or reserve it. Please log in or create an account.
  </div>
</template>

<script setup> 
import { useGetBooksStore } from '../stores/getBooks'
import { useGetUserStore } from '../stores/getUser'
import { useGetBookAvailabilityStore } from '../stores/getBookAvailability'
import  BookDetails from '../components/BookDetails.vue'

const storeGetBooks = useGetBooksStore()
const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailabilityStore()
//TODO: storeGetBooks.getAuthorBooks() <-- IS IT REALLY NEEDED NOW THAT WE HAVE SET AUTHOR THROUGH A DIFFERENT PATH?

storeGetBookAvailability.getBorrowedBooks()

storeGetBooks.search = ''
storeGetBooks.searchItem = ''
storeGetBooks.editionDetails.title = ''
storeGetBooks.editionDetails.author = ''
storeGetBooks.titleWorks = []
storeGetBooks.authorsMatch = []
// storeGetBooks.authorsMatchFiltered = []
storeGetBooks.authorBooks = []

console.log('books page')



//TODO: MAKE IT A CALLBACK FUNCTION

// if (storeGetBooks.editionDetails.title !== '' && storeGetUser.user.firstName === '') {
//   console.log('BOOK FOUND - USER NOT FOUND')
//   alert('You need to log to check book details')
// }

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

.search {
  cursor: pointer;
}

span.key {
  color: lightblue
}
</style>