import axios from 'axios'
import { defineStore } from 'pinia'

// const AUTHOR_URL = 'http://openlibrary.org/search.json?author='
const AUTHOR_URL = 'https://openlibrary.org/search/authors.json?q='
const AUTHOR_KEY_URL = 'https://openlibrary.org/authors/'

// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        author: 'Pérez Reverte',
        authorsMatch: [],
        authorsMatchEdited: [],
        authorBooks: []
    }),
    getters: {
        // authorsMatchEdited: this.authorsMatch.map(item => item.work_count > 0)
    },
    actions: {
        // getAuthorBooks() {
        //     fetch(`${AUTHOR_URL}${this.author}`)
        //         .then(item => item.json())
        //         .then(response => console.log(response.docs))
        // }
        
                
        // getAuthorBooks() {
        //     axios(`${AUTHOR_URL}${this.author}`)
        //         .then(response => console.log(response.data.data.docs))
        // }

        async getAuthorKey() {
            try {
                const authorData = await axios.get(`${AUTHOR_URL}${this.author}`)
                this.authorsMatch = authorData.data.docs
            }
            catch(err){
                console.log(err)
            } 
            // filter names with property work_count = 0
            this.authorsMatchEdited = this.authorsMatch.filter(author => author.work_count > 0)
        },
        
        async getBooks() {
            console.log('searhing books');
            try {
                const authorBooksData = await axios.get(`${AUTHOR_KEY_URL}${this.authorsMatchEdited[key].key}/works.json`)
                console.log(authorBooksData)
                // this.authorBooks = authorBooksData
            }
            catch(err) {
                console.log(err)
            }
        }
    }
})


