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
const BOOK_KEY_URL = 'https://openlibrary.org'
const ISBN_KEY_URL = 'https://openlibrary.org/isbn/'
// const EDITION_KEY_URL = 'https://openlibrary.org'

// cover endpoints
// const COVER_URL = 'https://covers.openlibrary.org/b/isbn/'



export const useGetBooksStore = defineStore('getBooks', {
    state: () => ({
        // SEARCH
        search: 'In viaggio con Erodoto',
        searchItem: '',
        // TITLE
        // title: 'Ebano',
        titleWorks: [],
        
        // AUTHOR
        // author: 'Gabriel Márquez',
        authorsMatch: [],
        // authorsMatchFiltered: [],
        authorBooks: [],
        // bookDetails: [],
        
        // EDITION
        // initialize all parameters of the object in ordert to assign 'N/A' to isbn, this way we avoid console error on loading the template containing API call
        editionDetails: {
            isbn:'N/A',
            title:'',
            pages:'',
            language:'',
            key:'',
            available:''
        },
        showBook: false,
        lastSearch: null,

        // COVER
        COVER_URL: 'https://covers.openlibrary.org/b/isbn/'
    }),
    getters: {
        // authorsMatchEdited: this.authorsMatch.map(item => item.work_count > 0)
        authorsMatchFiltered: (state) => {
            return state.authorsMatch.filter(author => author.work_count > 0)
        },

        searchType: (state) => {
            return state.searchItem
            console.log('hola');
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
            console.log(title);
            try {
                // const titleData = await axios.get(`${TITLE_URL}${this.title}`)
                const titleData = await axios.get(`${TITLE_URL}${title}`)
                console.log(titleData.data.docs)
                this.titleWorks = titleData.data.docs
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
        async getBooks(authorKey) {
            console.log('searhing books')
            console.log(authorKey)
            try {
                const authorBooksData = await axios.get(`${AUTHOR_KEY_URL}${authorKey}/works.json`)
                // this.authorBooks = authorBooksData.data
                this.authorBooks = authorBooksData.data.entries
                
                // because OpenLibrary has an enormous amount of books and different editions, for simpilcity it is convenient to restrict number of books for each author to 40
                this.authorBooks.splice(40,Infinity)

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
                console.log(bookData.data.entries)
                // because OpenLibrary offers several editions of the same work(book), occasionally even hudreds, for simplicity and ease of use, we take the first given option (bookData.data.entries[0]) as the unique edition, and offer it to the user
                console.log(bookData.data.entries[0])
                
                // Editions can have both, one or none of ISBN numbers which are needed to collect cover info collected in {editionDetails}. Since only one of both is needed, first we find out if ISBN_10 exist and create our object from it. Otherwise, we try to create it from ISBN_13 
                console.log(bookData.data.entries[0].isbn_10)

                // if (bookData.data.entries[0].isbn_10 !== null) {
                if (bookData.data.entries[0].isbn_10 !== undefined) {
                    console.log('THERE IS ISBN 10')
                    this.editionDetails = {
                        isbn: bookData.data.entries[0].isbn_10[0],
                        // isbn: (Number(bookData.data.entries[0].isbn_10[0]).length === 9) ? ('0' + Number(bookData.data.entries[0].isbn_10[0]).toString) : Number(bookData.data.entries[0].isbn_10[0]),
                        
                        title: bookData.data.entries[0].title,
                        
                        // some books have no such parameter as 'number_of_pages' (therefore throwing an 'undefined' value), instead they may have the parameter 'pagination', in such case we look for it. Most of these cases are a string, so we convert them into number
                        pages: (bookData.data.entries[0].number_of_pages !== undefined) ? Number(bookData.data.entries[0].number_of_pages) : Number(bookData.data.entries[0].pagination),
                        // pages: bookData.data.entries[0].number_of_pages,
                        
                        // language: bookData.data.entries[0].languages[0].key.slice(11,14),
                        // language is not always available, in such cases we assign 'N/A' string to it
                        language: (bookData.data.entries[0].languages !== undefined) ? bookData.data.entries[0].languages[0].key.slice(11,14) : 'N/A',
                        
                        key: bookData.data.entries[0].key,
                        
                        available: true,
                        
                        // cover: bookData.data.entries[0].covers,
                    }
                } else {
                    console.log('LETS TRY WITH ISBN 13…')
                    this.editionDetails = {
                        // isbn13: bookData.data.entries[0].isbn_13[0],
                        // since we're not sure ISBN_13 exists for every edition that have no ISBN_10, we assign string 'N/A' to those were we cannot collect this parameter. Later we'll use the lack of isbn to display a 'Cover Not Available' image
                        isbn: (bookData.data.entries[0].isbn_13 !== undefined) ? Number(bookData.data.entries[0].isbn_13) : 'N/A',

                        title: bookData.data.entries[0].title,

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
                }
                console.log(this.editionDetails)
            }
            catch(err) {
                console.log(err)
            }
        }
    }
})



// this.editionDetails = {
                //     title: bookData.data.entries[0].title,
                //     key: bookData.data.entries[0].key,

                //     isbn10: (bookData.data.entries[0].isbn_10 !== null) ? Number(bookData.data.entries[0].isbn_10) : 'N/A',
                //     isbn13: (bookData.data.entries[0].isbn_13 !== null) ? Number(bookData.data.entries[0].isbn_13) : 'N/A',
                    
                //     language: (bookData.data.entries[0].languages !== null) ? bookData.data.entries[0].languages[0].key.slice(11,14) : 'N/A',
                    
                //     pages: (bookData.data.entries[0].number_of_pages !== null) ? bookData.data.entries[0].number_of_pages : Number(bookData.data.entries[0].pagination),
                //     // pages: (bookData.data.entries[0].number_of_pages !== null) ? bookData.data.entries[0].number_of_pages : 'N/A',
                // }

                // if (this.editionDetails.isbn13.length === 13) {
                //     console.log('delete does work')
                //     delete this.editionDetails[isbn10]
                // }
                // console.log(this.editionDetails)
                

                // if (bookData.data.entries[0].isbn_10 !== null) {
                //     console.log('ISBN 10')
                //     this.editionDetails = {
                //         isbn10: bookData.data.entries[0].isbn_10[0],
                //         title: bookData.data.entries[0].title,
                //         pages: bookData.data.entries[0].number_of_pages,
                //         // language: bookData.data.entries[0].languages[0].key.slice(11,14),
                //         key: bookData.data.entries[0].key,
                //         // cover: bookData.data.entries[0].covers,
                //         available: true,
                //     }
                // } else if (bookData.data.entries[0].isbn_13 !== null) {
                //     console.log('ISBN 13')
                //     this.editionDetails = {
                //         isbn13: bookData.data.entries[0].isbn_13[0],
                //         title: bookData.data.entries[0].title,
                //         pages: bookData.data.entries[0].number_of_pages,
                //         language: bookData.data.entries[0].languages[0].key.slice(11,14),
                //         key: bookData.data.entries[0].key,
                //         // cover: bookData.data.entries[0].covers,
                //         available: true,
                //     }
                // } else {
                //     console.log('NO ISBN')
                //     this.editionDetails = {
                //         title: bookData.data.entries[0].title,
                //         pages: bookData.data.entries[0].number_of_pages,
                //         language: bookData.data.entries[0].languages[0].key.slice(11,14),
                //         key: bookData.data.entries[0].key,
                //         // cover: bookData.data.entries[0].covers,
                //         available: true,
                //     }
                // }

                // this.bookDetails = bookData.data.entries[0]

                // this.editionDetails = {
                //     // isbn: Number(bookData.data.entries[0].isbn_10[0]),
                //     isbn10: bookData.data.entries[0].isbn_10[0],
                //     isbn13: bookData.data.entries[0].isbn_13[0],
                //     title: bookData.data.entries[0].title,
                //     pages: bookData.data.entries[0].number_of_pages,
                //     language: bookData.data.entries[0].languages[0].key.slice(11,14),
                //     key: bookData.data.entries[0].key,
                //     // cover: bookData.data.entries[0].covers,
                //     available: true,
                // }

                // this.editionDetails = [
                //     Number(bookData.data.entries[0].isbn_13[0]),
                //     bookData.data.entries[0].title,
                //     bookData.data.entries[0].number_of_pages,
                //     bookData.data.entries[0].languages[0].key.slice(11,14),
                //     bookData.data.entries[0].key,
                //     bookData.data.entries[0].covers

                // ]

                // some books may have several covers given as an array of numbers, if so we take the the first number in the array
                // if (this.editionDetails.cover !== Number && this.editionDetails.cover !== undefined) {
                //     console.log('NOT NUMBER!!')
                //     this.editionDetails.cover = bookData.data.entries[0].covers[0]
                // } else {
                //     console.log('IS NUMBER!!')
                // }

                // some books have no such parameter as 'number_of_pages' (therefore throwing an 'undefined' value), instead they may have the parameter 'pagination', in such case we look for it. Most of these cases are a string, so we convert them into number
                // if (this.editionDetails.pages === undefined) {
                //     console.log('UNDEFINED NUMBER OF PAGES --> PAGINATION!!')
                //     this.editionDetails.pages = Number(bookData.data.entries[0].pagination)
                // }









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