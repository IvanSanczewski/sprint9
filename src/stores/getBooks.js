import { defineStore } from 'pinia'
import axios from 'axios'

// title endpoints
const TITLE_URL = 'https://openlibrary.org/search.json?q='
// const TITLE_URL = 'https://openlibrary.org/search/json?title='

// author endpoints
// author endpoints
const AUTHOR_URL = 'https://openlibrary.org/search/authors.json?q='
const AUTHOR_KEY_URL = 'https://openlibrary.org/authors/'
// const AUTHOR_URL = 'http://openlibrary.org/search.json?author='

// book & edition endpoints
// const BOOK_KEY_URL = 'https://openlibrary.org'
const BOOK_KEY_URL = 'https://openlibrary.org'
const EDITION_KEY_URL = 'https://openlibrary.org'

// cover endpoints
const COVER_URL = 'https://covers.openlibrary.org/b/OL35697077M/1-L.jpg'


// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        searchItem: 'null',
        author: 'Roald Dahl',
        title: 'The Hobbit',
        authorsMatch: [],
        authorsMatchFiltered: [],
        authorBooks: [],
        bookDetails: [],
        editionDetails: {}
    }),
    getters: {
        // authorsMatchEdited: this.authorsMatch.map(item => item.work_count > 0)
    },
    actions: {
        // fetch title data according to user's search
        async getTitle() {
            this.searchItem = 'title'
            try {
                const titleData = await axios.get(`${TITLE_URL}${this.title}`)
                console.log(titleData.data.docs)
            }
            catch(err) {
                console.log(err)
            }
        },

        // fetch author data according to user's search
        async getAuthorKey() {
            this.searchItem = 'author'
            try {
                const authorData = await axios.get(`${AUTHOR_URL}${this.author}`)
                this.authorsMatch = authorData.data.docs
            }
            catch(err){
                console.log(err)
            } 
            // filter names with property work_count = 0
            this.authorsMatchFiltered = this.authorsMatch.filter(author => author.work_count > 0)
            this.authorsMatchFiltered.forEach((item, index) => {
                item.id = index
                // this.authorBooks.push(item)
            })
            console.log(this.authorsMatchFiltered)

        },
        
        // fetch author's books according to authors key reference 
        async getBooks(authorKey) {
            console.log('searhing books')
            console.log(authorKey)
            try {
                const authorBooksData = await axios.get(`${AUTHOR_KEY_URL}${authorKey}/works.json`)
                // this.authorBooks = authorBooksData.data
                this.authorBooks = authorBooksData.data.entries
                // because OpenLibrary has an enormous amount of books and different editions, for simpilcity it is convenient to restrict number of books for each author to 20
                this.authorBooks.splice(20,Infinity)
                console.log(this.authorBooks)
            }
            catch(err) {
                console.log(err)
            }
        },
        
        // fetch book's details
        async getBookDetails(bookKey) {
            console.log('book details')
            console.log(bookKey)
            try {
                const bookData = await axios.get(`${BOOK_KEY_URL}${bookKey}/editions.json`)
                this.bookDetails = bookData.data
                this.getEditionDetails(bookKey)
                console.log(bookData)
            }
            catch(err) {
                console.log(err)
            }
        },
        
        // fetch specific edition's details: cover, pages, language
        async getEditionDetails(bookKey) {
            console.log('book details2')
            console.log(bookKey)
            try {
                const editionData = await axios.get(`${EDITION_KEY_URL}${bookKey}/editions.json`)
                // OpenLibrary offers several editions of the same work, occasionally even hudreds, therefore we take the first given option (entries[0]) as the unique edition, and offer it to the user
                this.editionDetails = {
                    title: editionData.data.entries[0].title,
                    pages: editionData.data.entries[0].number_of_pages,
                    isbn: editionData.data.entries[0].isbn_13[0],
                    key: editionData.data.entries[0].key,
                    cover: editionData.data.entries[0].covers[0]
                }
                console.log(editionData)
                console.log(this.editionDetails)
            }
            catch(err) {
                console.log(err)
            }
        },

        // 
    }
})


