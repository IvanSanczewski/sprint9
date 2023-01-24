import { defineStore } from 'pinia'
import { projectFirestore } from '../firebase/config'
// import { projectAuth } from '../firebase/config'



// users endpoints
const USERS_FIREBASE = ''

export const useGetUserStore = defineStore('getUser', {
    state: () => ({
        // display components
        displaySignIn: false,
        displayLogIn: false,
        displayUsersList: false,
        // isLogged: false, // PASSED AS A GETTER

        //user
        users:[],
        user:{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            isAdmin: null,
            borrow: {}
        },
        signInUser:{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },

        // LogIn checks
        existingEmail: '',
        existingPassword:'',

        // validation errors
        firstNameErr: false,
        firstNameErrMsg: 'Please provide your first name',

        lastNameErr: false,
        lastNameErrMsg: 'Please provide your Last name',

        emptyEmailErr: false,
        emptyEmailErrMsg: 'Please provide your email',

        emailErr: false,
        mailRegEx: /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/,
        emailErrMsg: 'The provided email is invalid, please provide a valid one',

        exixtingEmailErr: false,
        exixtingEmailErrMsg: 'This email has already been registered',

        passwordErr: false,
        passwordErrMsg:'Your password must be 8 to 20 characters and contain at least one lowercase, one uppercase, one number and one special character',
        passwordType: 'password'

       


    }),
    getters:{
        isLogged: (state) => {
            return (state.user.firstName === '')? false : true // CHECK
        }
    },
    actions: {
        // D I S P L A Y
        toggleDisplaySignIn() {
            this.displayLogIn = false
            this.displaySignIn = !this.displaySignIn
            console.log('entered SIGNIN component')
        },
        toggleDisplayLogIn() {
            this.displayLogIn = !this.displayLogIn
            this.displaySignIn = false

            console.log('entered LOGIN component')

        },
        toggleDisplayUsersList() {
            this.displayUsersList = !this.displayUsersList
        },
        logOutUser() {
            this.user.firstName = ''
            this.user.lastName = ''
            this.user.email = ''
            this.user.password = ''
            this.user.isAdmin = null
            this.existingEmail = ''
            this.existingPassword = ''
            this.displayLogIn = false
            //TODO: PUSH ROUTE HOME
        },

        // C R U D  (create)
        // S I G N   I N
        validateSignInUser() {

            //first name validation
            if (this.signInUser.firstName.trim() === '' || this.signInUser.firstName.trim() === null) {
                this.firstNameErr = true
            } else {
                // this.user.firstName = this.signInUser.firstName.trim()
                this.firstNameErr = false
            }

            //last name validation
            if (this.signInUser.lastName.trim() === '' || this.signInUser.lastName.trim() === null) {
                this.lastNameErr = true
            } else {
                // this.user.lastName = this.signInUser.lastName.trim()
                this.lastNameErr = false
            }

            //email validation
            if (this.signInUser.email.trim() === '' || this.signInUser.email.trim() === null) {
                this.emptyEmailErr = true
                this.emailErr = false
            } else if (!this.mailRegEx.test(this.signInUser.email.trim())) {
                this.emailErr = true
                this.emptyEmailErr = false
            } else if (this.users.some(item => item.email === this.signInUser.email)) {
                this.exixtingEmailErr = true
                this.signInUser.email = ''
                this.signInUser.password = ''
            } else {
                // this.user.email = this.signInUser.email.trim()
                this.emailErr = false
                this.emptyEmailErr = false
            }

            // password validation
            if (this.signInUser.password.trim() === '' || this.signInUser.password.trim() === null) {
                this.passwordErr = true
            } else {
                // this.user.password = this.signInUser.password.trim()
                this.passwordErr = false
            }

            if (!this.firstNameErr && !this.lastNameErr && !this.emailErr && !this.emptyEmailErr && !this.exixtingEmailErr && !this.passwordErr) {
                if (this.signInUser.email.includes('@natlib.lt')) {
                    this.user = {
                        firstName: this.signInUser.firstName.trim(),
                        lastName: this.signInUser.lastName.trim(),
                        email: this.signInUser.email.trim(),
                        password: this.signInUser.password.trim(),
                        isAdmin: true,
                        borrow: {}
                    }
                } else {
                    this.user = {
                        firstName: this.signInUser.firstName.trim(),
                        lastName: this.signInUser.lastName.trim(),
                        email: this.signInUser.email.trim(),
                        password: this.signInUser.password.trim(),
                        isAdmin: false,
                        borrow: {}
                    }
                }
                this.checkUser(this.user.email)                 
            }
        },
        
        checkUser(email) {
            if (this.users.some(item => item.email === email)) {
                console.log('This email already exists in the users DB')
            } else {
                this.addUser(this.user)
                this.displaySignIn = false
                //TODO: PUSH ROUTE USER
            }
        },

        async addUser(user) {
            console.log(user)
            await projectFirestore.collection('users').add(user)
            this.users.push(user)
            this.signInUser = {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }
        },

        // C R U D  (read)
        // fetch user     FROM LOGIN
        // tool for admins so they can ban and delete users (AS WELL AS EXTEND THE BORROW PERIOD FOR DOCUMENTS)
        //TODO: ADD INDIVIDUAL SEARCH
        async getRegisteredUsers() {
            // this.isLogged = !this.isLogged // PASAR AL FINAL DEL TRY
            try {
                const usersData = await projectFirestore.collection('users').get()
                console.log(usersData.docs)
                this.users = usersData.docs.map(doc => {
                    return { ...doc.data(), id: doc.id}
                })
            }
            catch (err) {
                console.log(err)
            }
        },

        // C R U D  (update)
        // update user to be admins is a feature available only to admins (this way staff can make new staff an admin)
        async makeAdmin(userId) {
            await projectFirestore.collection('users').doc(userId).update({isAdmin: true})
            this.getRegisteredUsers()
            // this.users.filter(item => item.id === userId)
            
        },

        borrowNthDocToUser(user, title, isbn) {
            console.log(user)
            console.log(user.borrow)
            console.log(user.borrow.doc1)
            console.log(!user.borrow.doc1)
            console.log(user.borrow.doc2)
            console.log(!user.borrow.doc2)
            console.log(user.borrow.doc3)
            console.log(!user.borrow.doc3)

            if (!user.borrow.doc1) {
                console.log('doc1')
                this.borrowDoc1ToUser(user, title, isbn)
            } else if (user.borrow.doc1 && !user.borrow.doc2) {
                console.log('doc2')
                this.borrowDoc2ToUser(user, title, isbn)
            } else if (user.borrow.doc1 && user.borrow.doc2 && user.borrow.doc3) {
                console.log('doc3')
                this.borrowDoc3ToUser(user, title, isbn)
            } else {
                alert('You have reached the maximum (3) number of borrowed documents. Please return at least one of them before attempting to borrow or reserve another one.')
            }
            
            
        },

        // TODO: IMPLEMENT BORROWED BOOK IN USER DB & USER IN BOOK DB
        async borrowDoc1ToUser(user, title, isbn) {
            let initialDate = new Date
            //FIXME: DESTRUCTURATE THE WHOLE OBJECT
            user.borrow = {
                doc1: {
                    title,
                    isbn,
                    borrowDate: new Date,
                    returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)),
                    extendedBorrow: 0
                }
            }
            console.log(user)
            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: {
                    doc1: {
                        title,
                        isbn,
                        borrowDate: new Date,
                        returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)),
                        extendedBorrow: 0
                    }
                }
            })
        },
        
        // async borrowDoc2ToUser(user, title, isbn) {
        async borrowDoc2ToUser(user, title, isbn) {
            let initialDate = new Date
            //FIXME: DESTRUCTURATE THE WHOLE OBJECT
            
            let doc2 ={ title, isbn, borrowDate: new Date, returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)), extendedBorrow: 0 }
            user.borrow = {...this.user.borrow, doc2}

            // user.borrow = { doc2: { title, isbn, borrowDate: new Date, returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)), extendedBorrow: 0 }}
            
            console.log(user)

            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: user.borrow})
                // .update({borrow: {
                //     doc2: {
                //             title,
                //             isbn,
                //             borrowDate: new Date,
                //             returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)),
                //             extendedBorrow: 0
                //         }
                //     }
                // })
            },
                
        // async borrowDoc3ToUser(user, title, isbn) {
            //     let initialDate = new Date
            //FIXME: DESTRUCTURATE THE WHOLE OBJECT
            //     user.borrow = {
        //         doc3: {
        //             title,
        //             isbn,
        //             borrowDate: new Date,
        //             returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)),
        //             extendedBorrow: 0
        //         }
        //     }
        //     console.log(user)
        //     await projectFirestore.collection('users')
        //         .doc(user.id)
        //         .update({borrow: {
        //             doc3: {
        //                 title,
        //                 isbn,
        //                 borrowDate: new Date,
        //                 returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)),
        //                 extendedBorrow: 0
        //             }
        //         }
        //     })
        // },
        
        // extendDocumentBorrow(xxxx) {

        // },
        // banUser(mail){

        // },

        // C R U D  (delete)
        async deleteUser(id) {
            await projectFirestore.collection('users').doc(id).delete()
            this.users = this.users.filter(item => item.id !== id)
        },

        // L O G   I N
        validateLogInUser() {
            // email validation 
            if (this.existingEmail.trim() === '' || this.existingEmail.trim() === null) {
                this.emptyEmailErr = true
                this.emailErr = false
            } else if (!this.mailRegEx.test(this.existingEmail.trim())) {
                this.emailErr = true
                this.emptyEmailErr = false
            } else {
                // this.user.email = this.signInUser.email.trim()
                this.emailErr = false
                this.emptyEmailErr = false
            }

            // password validation
            if (this.existingPassword.trim() === '' || this.existingPassword.trim() === null) {
                this.passwordErr = true
            } else {
                // this.user.password = this.signInUser.password.trim()
                this.passwordErr = false
            }

            if (!this.emailErr && !this.emptyEmailErr && !this.passwordErr) {
                if (this.users.some(item => item.email === this.existingEmail)) {
                    let checkIsUser = this.users.find(item => item.email.includes(this.existingEmail))
                    if (this.existingPassword === checkIsUser.password ) {
                        this.user = checkIsUser
                        this.displayLogIn = false
                        //TODO: PUSH ROUTE USER
                    } else {
                        alert('Invalid email & password combination')
                    }
                } else {
                    alert('This user does not exists. Please sign in first.')
                }
            }
        }
    }
})































let borrowDate = new Date
let initialDate = new Date // this date is used to calculate the 4 weeks borrow period, but when setDate method is applied, it sets the new date also to initialDate, therefore we do not use borrowDate to make the calculation
let returnDate = new Date(initialDate.setDate(initialDate.getDate() + 28))


   // async logInUser(email, password) {
        //     console.log(email, password)
        //     // MAKE ERROR NULL IF NEEDED
        //     try {
        //         await projectAuth.signInWithEmailAndPassword(email, password)
        //         // MAKE ERROR NULL IF NEEDED
        //         // console.log(actualUser)
        //         return actualUser
        //     } catch (err) {
        //         console.log('user and password combination is wrong');
        //     }
        // },