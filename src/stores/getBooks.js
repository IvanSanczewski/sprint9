import axios from 'axios'
import { defineStore } from 'pinia'

const AUTHOR_URL = 'http://openlibrary.org/search.json?author='

// displays the modal containing the leasing rules of the library, always available in the nav menu
export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        author: 'Reverte'
    }),
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



        async getAuthorBooks() {
            try {
                const authorData = await axios.get(`${AUTHOR_URL}${this.author}`)
                console.log(authorData.data.docs)
            }
            catch(err){
                console.log(err)
            } 
        }
    }
})