import { defineStore } from 'pinia'
import axios from 'axios'

// title endpoints
const TITLE_URL = 'https://openlibrary.org/search/json?q='
// const TITLE_URL = 'https://openlibrary.org/search/json?title='

// author endpoints
const AUTHOR_URL = 'https://openlibrary.org/search/authors.json?q='
const AUTHOR_KEY_URL = 'https://openlibrary.org/authors/'
// const AUTHOR_URL = 'http://openlibrary.org/search.json?author='

// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        searchItem: 'null',
        author: 'Henry D Thoreau',
        title: 'The Hobbit',
        authorsMatch: [],
        authorsMatchFiltered: [],
        authorBooks: []
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
        async getBooks() {
            console.log('searhing books')
            console.log(this.author)
            console.log(this.authorsMatchFiltered)
            console.log(this.authorsMatchFiltered[0])
            console.log(this.authorsMatchFiltered[0].key)
            // console.log(this.authorBooks[this.authorBooks.index].key)


            try {
                const authorBooksData = await axios.get(`${AUTHOR_KEY_URL}${this.authorsMatchFiltered.key}/works.json`)
                console.log(authorBooksData)
                this.authorBooks = authorBooksData
            }
            catch(err) {
                console.log(err)
            }
        },
    }
})


