<template>
  <div class="books">
    <h1>This is the Books page</h1>
    <form @submit.prevent="storeGetBooks.setSearch(storeGetBooks.search)" class="search-form">
      <label> Choose search term: author / title </label>
      <!-- <select v-model="searchType" v-model:searchItem="searchItem"> -->
      <select v-model="storeGetBooks.searchItem">
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <input v-model="storeGetBooks.search" type="text">
      <button>SEARCH</button>
    </form>

    <!-- T I T L E   N E W-->
    <!-- <div v-if="searchType === 'title'"> -->
    <div v-if="storeGetBooks.searchItem === 'title'">
      <div class="match">
        <h4>Matching Titles:</h4>
      <div v-for="work in storeGetBooks.titleWorks" :key="work.key">
        <a href="#" @click="storeGetBooks.getBookDetails(work.key)">{{ work.title }}</a> <span> - {{ work.author_name }}</span>
      </div>
      </div>
    </div> 

    <!-- A U T H O R   N E W -->
    <!-- <div v-if="searchType === 'author'"> -->       
    <div v-if="storeGetBooks.searchItem === 'author'">
      <div class="match">
        <h4>Matching Authors:</h4>
        <div v-for="author in storeGetBooks.authorsMatchFiltered" :key="author.key">
          <a href="#" @click="storeGetBooks.getBooks(author.key)">{{ author.name }}</a> <span> - {{ author.work_count }}</span>
        </div>
      </div>
      
      <div class="match">
        <div v-if="storeGetBooks.authorBooks.length > 0">
          <h4>Books:</h4>
          <div class="books">
            <div v-for="book in storeGetBooks.authorBooks" :key="book.key">
              <a href="#" @click="storeGetBooks.getBookDetails(book.key)">{{ book.title }}</a>
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
import { useGetBookAvailability } from '../stores/getBookAvailability'
import  BookDetails from '../components/BookDetails.vue'

const storeGetBooks = useGetBooksStore()
const storeGetUser = useGetUserStore()
const storeGetBookAvailability = useGetBookAvailability()
//TODO: storeGetBooks.getAuthorBooks()

//TODO: getBorrowedBooks()
storeGetBookAvailability.getBorrowedBooks()


storeGetBooks.search = ''
storeGetBooks.searchItem = ''
storeGetBooks.editionDetails.title = ''
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


    <!-- T I T L E -->
     <!-- <form class="search" @submit.prevent="storeGetBooks.getTitle">
      <h3>Title: </h3>
      <input type="text" v-model="storeGetBooks.title">
      <div class="btn-container">
        <button class="search-btn">Search Title</button>
      </div>
    </form> -->

     <!-- R E S U L T S -->
     <!-- <div v-if="storeGetBooks.searchItem === 'title'" class="match">
      <h4>Matching Titles:</h4>
      <div v-for="work in storeGetBooks.titleWorks" :key="work.key">
        <a href="#" @click="storeGetBooks.getBookDetails(work.key)">{{ work.title }}</a> <span> - {{ work.author_name }}</span>
      </div>
    </div> -->

  <!-- A U T H O R -->
    <!-- <form class="search" @submit.prevent="storeGetBooks.getAuthorKey">
      <h3>Author: </h3>
      <input type="text" v-model="storeGetBooks.author">
      <div class="btn-container">
        <button class="search-btn">Search Author</button>
      </div>
    </form> -->

    <!-- R E S U L T S -->
    <!-- <div v-if="storeGetBooks.searchItem === 'author'" class="match">
      <h4>Matching Authors:</h4>
      <div v-for="author in storeGetBooks.authorsMatchFiltered" :key="author.key">
        <a href="#" @click="storeGetBooks.getBooks(author.key)">{{ author.name }}</a> <span> - {{ author.work_count }}</span>
      </div>
    </div> -->

    <!-- B O O K S -->
    <!-- <div v-if="storeGetBooks.authorBooks.length > 0">
      <h4>Books:</h4>
      <div class="books">
        <div v-for="book in storeGetBooks.authorBooks" :key="book.key">
          <a href="#" @click="storeGetBooks.getBookDetails(book.key)">{{ book.title }}</a>
        </div>
      </div>
    </div> -->


    <!-- B O O K   D E T A I L S --> <!-- LLEVAR A COMPONENTE-->



<!-- <div v-if="storeGetBooks.editionDetails.title !== ''" class="book-details">
      <div class="book-card">
      <h4>Book Details:</h4>
        <img v-if="storeGetBooks.editionDetails.isbn !== 'N/A'" :src="`${storeGetBooks.COVER_URL}${storeGetBooks.editionDetails.isbn}-L.jpg`" />
        <div class="book-info">
          <h3>Title: {{ storeGetBooks.editionDetails.title }}</h3>
          <p>Pages: {{ storeGetBooks.editionDetails.pages }}</p>
          <p>Language: {{ storeGetBooks.editionDetails.language }}</p>
          <p>ISBN: {{ storeGetBooks.editionDetails.isbn }}</p>
          <p>Available: {{ storeGetBooks.editionDetails.available }}</p>
          <button v-if="storeGetBooks.editionDetails.available">Borrow this item</button>
          <button v-else>Reserve this item</button>
          <button>Check borrow policy</button>
        </div>
      </div>
    </div> -->



// import { ref, watch } from 'vue'
// const searchType = ref('')

// watch (() => searchType, (newValue, oldValue) => {
//   console.log('watch triggered')
//   console.log('newValue', newValue)
//   console.log('oldValue', oldValue)
// })
