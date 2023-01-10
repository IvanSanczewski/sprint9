import axios from 'axios'
import { defineStore } from 'pinia'

// const AUTHOR_URL = 'http://openlibrary.org/search.json?author='
const AUTHOR_URL = 'https://openlibrary.org/search/authors.json?q='
const AUTHOR_KEY_URL = 'https://openlibrary.org/authors'

// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        author: 'Pérez Reverte',
        authorsMatch: [],
        authorsMatchEdited: []
    }),
    getters: {
        authorsMatchEdited: this.authorsMatch.map(item => item.work_count > 0)
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
                console.log(authorData.data.docs)
                this.authorsMatch = authorData.data.docs
                console.log(this.authorsMatch)

            }
            catch(err){
                console.log(err)
            } 
        }
    }
})


