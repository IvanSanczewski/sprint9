import { defineStore } from 'pinia'
import axios from 'axios'
import { isArray } from '@vue/shared'

// title endpoints
const TITLE_URL = 'https://openlibrary.org/search.json?q='
// const TITLE_URL = 'https://openlibrary.org/search/json?title='

// author endpoints
// author endpoints
const AUTHOR_URL = 'https://openlibrary.org/search/authors.json?q='
const AUTHOR_KEY_URL = 'https://openlibrary.org/authors/'
// const AUTHOR_URL = 'http://openlibrary.org/search.json?author='

// book & edition endpoints
const BOOK_KEY_URL = 'https://openlibrary.org'
const ISBN_KEY_URL = 'https://openlibrary.org/isbn/'
// const EDITION_KEY_URL = 'https://openlibrary.org'

// cover endpoints
// const COVER_URL = 'https://covers.openlibrary.org/b/isbn/'


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
        editionDetails: {},
        editionDetailsPages: '',
        COVER_URL: 'https://covers.openlibrary.org/b/isbn/'
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
            this.editionDetails = {}
            console.log('book details')
            console.log(bookKey)
            try {
                const bookData = await axios.get(`${BOOK_KEY_URL}${bookKey}/editions.json`)
                console.log(bookData)
                console.log(bookData.data)
                console.log(bookData.data.entries)
                console.log(bookData.data.entries[0])
                
                // because OpenLibrary offers several editions of the same work(book), occasionally even hudreds, for simplicity and ease of use, we take the first given option (bookData.data.entries[0]) as the unique edition, and offer it to the user
                this.bookDetails = bookData.data.entries[0]
                console.log(bookData.data.entries[0].languages[0].key)
                
                this.editionDetails = {
                    isbn: Number(bookData.data.entries[0].isbn_13[0]),
                    title: bookData.data.entries[0].title,
                    pages: bookData.data.entries[0].number_of_pages,
                    language: bookData.data.entries[0].languages[0].key,
                    key: bookData.data.entries[0].key,
                    cover: bookData.data.entries[0].covers
                }

                // some books may have several covers given as an array of numbers, if so we take the the first number in the array
                if (this.editionDetails.cover !== Number && this.editionDetails.cover !== undefined) {
                    console.log('NOT NUMBER!!') 
                    this.editionDetails.cover = bookData.data.entries[0].covers[0]
                } else {
                    console.log('IS NUMBER!!') 
                }
                
                // some books have no such parameter as 'number_of_pages' (therefore throwing an 'undefined' value), instead they may have the parameter 'pagination', in such case we look for it. Most of these cases are a string, so we convert them into number
                if (this.editionDetails.pages === undefined) {
                    console.log('UNDEFINED NUMBER OF PAGES --> PAGINATION!!') 
                    this.editionDetails.pages = Number(bookData.data.entries[0].pagination)
                }
            }
            catch(err) {
                console.log(err)
            }
            console.log(this.editionDetails.pages)


        },
        
        // fetch specific edition's details: cover, pages, language
        // async getEditionDetails(bookKey) {
            // console.log('book details')
            // console.log(bookKey)
            // try {
                // const editionData = await axios.get(`${BOOK_KEY_URL}${bookKey}/editions.json`)
                // OpenLibrary offers several editions of the same work, occasionally even hudreds, therefore we take the first given option (entries[0]) as the unique edition, and offer it to the user
                // this.editionDetails = {
                    // isbn: editionData.data.entries[0].isbn_13[0],
                    // title: editionData.data.entries[0].title,
                    // pages: editionData.data.entries[0].number_of_pages,
                    // key: editionData.data.entries[0].key,
                    // cover: editionData.data.entries[0].covers[0]
                // }
                // this.getIsbn(editionData.data.entries[0].isbn_13[0])
                // console.log(editionData)
                // console.log(this.editionDetails)
            // }
            // catch(err) {
                // console.log(err)
            // }
        // },

        // ISBN
        
        
        // async getIsbn(isbn) {
        //     console.log('book details')
        //     console.log(isbn)
        //     try {
        //         const editionFullData = await axios.get(`${ISBN_KEY_URL}${isbn}.json`)
        //         console.log(editionFullData.data)               
        //         console.log(Number(editionFullData.data.pagination))               
        //         console.log(editionFullData.data.number_of_pages)               

        //         // this.editionDetails = {
        //         //     isbn: editionFullData.data.isbn,
        //         //     title: editionFullData.data.title,
        //         //     pages: editionFullData.data.pagination,
        //         //     key: editionFullData.data.key,
        //         //     cover: editionFullData.data.covers[0]
        //         // }
        //         console.log(this.editionDetails)
        //     }
        //     catch(err) {
        //         console.log(err)
        //     }
        // },

    }
})


