import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router/index'

// IMPORT & USE OF store/getUsers.js WILL FAIL, THEREFORE I CANNTO USE ITS STATE -> COMMENT GETTER watchUserEmail & IF STATEMENTES & ALERTS IN getBookDetails ACTION
// import useGetUserStore from '../stores/getUser'
// const storeGetUser = useGetUserStore()

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



export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        // SEARCH
        search: '',
        searchItem: '',
        titleWorks: [],
        
        // AUTHOR
        author: '',
        authorsMatch: [],
        // authorsMatchFiltered: [],
        authorBooks: [],
        // bookDetails: [],
        
        // EDITION
        // initialize all parameters of the object in ordert to assign 'N/A' to isbn, this way we avoid console error on loading the template containing API call
        editionDetails: {
            isbn:'N/A',
            author: '',
            title:'',
            pages:'',
            language:'',
            key:'',
            available:''
        },
    
        // COVER
        COVER_URL: 'https://covers.openlibrary.org/b/isbn/',
        coverExists: null
    }),
    getters: {
        // authorsMatchEdited: this.authorsMatch.map(item => item.work_count > 0)
        authorsMatchFiltered: (state) => {
            return state.authorsMatch.filter(author => author.work_count > 0)
        },

        searchType: (state) => {
            state.searchItem
            state.search = ''
            state.editionDetails = {
                isbn:'N/A',
                author: '',
                title:'',
                pages:'',
                language:'',
                key:'',
                available:''
            }
            return state.searchItem
        }
    },
    actions: {
        // triggers the appropiate tree of functions that will populate {editionDetails} according to the search type
        setSearch(search) {
            this.editionDetails.title = ''
            console.log(search);
            if (this.searchItem === 'title') {
                this.getTitle(search)
            } else if (this.searchItem === 'author') {
                this.getAuthorKey(search)
            } else {
                alert('You must provide a search term')
            }
        },

        // fetch title data according to user's search
        async getTitle(title) {
            // this.searchItem = 'title'
            // this.search = ''
            console.log(title);
            try {
                const titleData = await axios.get(`${TITLE_URL}${title}`)
                this.titleWorks = titleData.data.docs
                // this.titleWorks = titleData.data.docs
                // because OpenLibrary DB contains several ammount of books with the same name, sometimes even hundreds, we cutoff the total ammount of works offered to the user to the first 20
                this.titleWorks.splice(20, Infinity)
                console.log(this.titleWorks)
            }
            catch(err) {
                console.log(err)
            }
        },

        // fetch author data according to user's search
        async getAuthorKey(author) {
            console.log(author);
            // this.searchItem = 'author'
            try {
                const authorData = await axios.get(`${AUTHOR_URL}${author}`)
                this.authorsMatch = authorData.data.docs
            }
            catch(err){
                console.log(err)
            }
            // // filter names with property work_count = 0
            // this.authorsMatchFiltered = this.authorsMatch.filter(author => author.work_count > 0)
            // this.authorsMatchFiltered.forEach((item, index) => {
            //     item.id = index
            //     // this.authorBooks.push(item)
            // })
            // console.log(this.authorsMatchFiltered)

        },

        // fetch author's books according to authors key reference
        async getBooks(authorKey, author) {
            console.log('searhing books')
            console.log(authorKey, author)
            try {
                const authorBooksData = await axios.get(`${AUTHOR_KEY_URL}${authorKey}/works.json`)
                // this.authorBooks = authorBooksData.data
                this.authorBooks = authorBooksData.data.entries
                this.author = author
                
                // because OpenLibrary has an enormous amount of books and different editions, for simpilcity it is convenient to restrict number of books for each author to 40
                this.authorBooks.splice(40,Infinity)

                console.log(this.authorBooks)
            }
            catch(err) {
                console.log(err)
            }
        },

        getBookKey(bookKey){
            console.log(bookKey)
            console.log(this.author)
            this.getBookDetails(bookKey, this.author)
        },

        // fetch book's details
        async getBookDetails(bookKey, authorName) {
            console.log('book details')
            console.log(bookKey)
            console.log(authorName)
            this.author = authorName
            try {
                const bookData = await axios.get(`${BOOK_KEY_URL}${bookKey}/editions.json`)
                console.log(bookData.data.entries)
                // because OpenLibrary offers several editions of the same work(book), occasionally even hudreds, for simplicity and ease of use, we take the first given option (bookData.data.entries[0]) as the unique edition, and offer it to the user
                console.log(bookData.data.entries[0])
                
                // Editions can have both, one or none of ISBN numbers which are needed to collect cover info collected in {editionDetails}. Since only one of both is needed, first we find out if ISBN_10 exist and create our object from it. Otherwise, we try to create it from ISBN_13 
                console.log(bookData.data.entries[0].isbn_10)

                // if (bookData.data.entries[0].isbn_10 !== null) {
                if (bookData.data.entries[0].isbn_10 !== undefined) {
                    console.log('THERE IS ISBN 10')
                    // if ( this.watchUserEmail !== undefined) {// READ >>4
                    this.editionDetails = {
                        isbn: bookData.data.entries[0].isbn_10[0],
                        // isbn: (Number(bookData.data.entries[0].isbn_10[0]).length === 9) ? ('0' + Number(bookData.data.entries[0].isbn_10[0]).toString) : Number(bookData.data.entries[0].isbn_10[0]),
                    
                        title: bookData.data.entries[0].title,
                        //TODO: DETERMINE AUTHOR
                        author: this.author,
                        // some books have no such parameter as 'number_of_pages' (therefore throwing an 'undefined' value), instead they may have the parameter 'pagination', in such case we look for it. Most of these cases are a string, so we convert them into number
                        pages: (bookData.data.entries[0].number_of_pages !== undefined) ? Number(bookData.data.entries[0].number_of_pages) : Number(bookData.data.entries[0].pagination),
                        // pages: bookData.data.entries[0].number_of_pages,
                    
                        // language: bookData.data.entries[0].languages[0].key.slice(11,14),
                        // language is not always available, in such cases we assign 'N/A' string to it
                        language: (bookData.data.entries[0].languages !== undefined) ? bookData.data.entries[0].languages[0].key.slice(11,14) : 'N/A',
                    
                        key: bookData.data.entries[0].key,
                    
                        available: true,
                    }
                    // } else {// READ >>4
                        // alert('You need to log to check book details')
                    // }
                } else {
                    console.log('LETS TRY WITH ISBN 13…')
                    // if ( this.watchUserEmail !== undefined) {// READ >>4
                    this.editionDetails = {
                        // isbn13: bookData.data.entries[0].isbn_13[0],
                        // since we're not sure ISBN_13 exists for every edition that have no ISBN_10, we assign string 'N/A' to those were we cannot collect this parameter. Later we'll use the lack of isbn to display a 'Cover Not Available' image
                        isbn: (bookData.data.entries[0].isbn_13 !== undefined) ? Number(bookData.data.entries[0].isbn_13) : 'N/A',

                        title: bookData.data.entries[0].title,
                        //TODO: DETERMINE AUTHOR
                        author: this.author,

                        // some books have no such parameter as 'number_of_pages' (therefore throwing an 'undefined' value), instead they may have the parameter 'pagination', in such case we look for it. Most of these cases are a string, so we convert them into number
                        pages: (bookData.data.entries[0].number_of_pages !== undefined) ? Number(bookData.data.entries[0].number_of_pages) : Number(bookData.data.
                        entries[0].pagination),
                        // pages: bookData.data.entries[0].number_of_pages,
                        
                        // language: bookData.data.entries[0].languages[0].key.slice(11,14),
                        // language is not always available, in such cases we assign 'N/A' string to it
                        language: (bookData.data.entries[0].languages !== undefined) ? bookData.data.entries[0].languages[0].key.slice(11,14) : 'N/A',
                        
                        key: bookData.data.entries[0].key,
                        
                        available: true,
                        
                        // cover: bookData.data.entries[0].covers,
                        }
                    // } else {// READ >>4
                        // alert('You need to log to check book details')
                    // }    


                }
                console.log(this.editionDetails)
            }
            catch(err) {
                console.log(err)
            }


            // check if cover image exists
            

            
            const checkImgExists = (`${this.COVER_URL}${this.editionDetails.isbn}-L.jpg`)
            console.log(checkImgExists)
            fetch(checkImgExists)
                .then(response => { 
                    if (response.status === 200 ) {
                        this.coverExists = true
                    } else {
                        this.coverExists = false
                    }
                })
        }
    }
})
