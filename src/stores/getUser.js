import { defineStore } from 'pinia'
import { projectFirestore } from '../firebase/config'
// import { projectAuth } from '../firebase/config'

import router from '../router/index'


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
        // inputStatus: 'empty',

        lastNameErr: false,
        lastNameErrMsg: 'Please provide your Last name',

        emptyEmailErr: false,
        emptyEmailErrMsg: 'Please provide your email',

        emailErr: false,
        mailRegEx: /^([a-zA-Z0-9\._-]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/,
        emailErrMsg: 'This is an invalid email, please provide a valid one',

        exixtingEmailErr: false,
        exixtingEmailErrMsg: 'This email has already been registered',

        passwordErr: false,
        passwordRegEx: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/,
        passwordErrMsg:'Your password must be 8 to 20 characters and contain at least one lowercase, one uppercase, one number and one special character',
        
        passwordInputType: 'password'



    }),
    getters:{
        isLogged: (state) => {
            return (state.user.firstName === '')? false : true // CHECK
        }

        // inputStatus: (state) => {
        //     if (state.firstNameErr) {
        //         console.log('input fail');
        //         return 'input-fail'
        //     }
        // }
    },
    actions: {
        // D I S P L A Y
        toggleDisplaySignIn() {
            this.displayLogIn = false
            this.displaySignIn = !this.displaySignIn
            this.signInUser.firstName = ''
            this.signInUser.lastName = ''
            this.signInUser.email = ''
            this.signInUser.password = ''
            this.passwordInputType = 'password'
            this.firstNameErr = false
            this.lastNameErr = false
            this.emptyEmailErr = false
            this.emailErr = false
            this.exixtingEmailErr = false
            this.passwordErr = false

            console.log('entered SIGNIN component')
        },
        toggleDisplayLogIn() {
            this.displaySignIn = false
            this.displayLogIn = !this.displayLogIn
            this.existingEmail = ''
            this.existingPassword = ''
            this.passwordInputType = 'password'
            this.firstNameErr = false
            this.lastNameErr = false
            this.emptyEmailErr = false
            this.emailErr = false
            this.exixtingEmailErr = false
            this.passwordErr = false

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
        togglePasswordInputType() {
            (this.passwordInputType === 'password')? this.passwordInputType = 'text' : this.passwordInputType = 'password'
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
            } else if (!this.passwordRegEx.test(this.signInUser.password.trim())) {
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
        },

        borrowNthDocToUser(user, title, author, isbn) {
            console.log(user, title, author, isbn)
            if (!user.borrow.doc1) {
                this.borrowDoc1ToUser(user, title, author, isbn)
                console.log('create doc1')
            } else if (user.borrow.doc1 && !user.borrow.doc2) {
                this.borrowDoc2ToUser(user, title, author, isbn)
                console.log('create doc2')
                
            } else if (user.borrow.doc1 && user.borrow.doc2 && !user.borrow.doc3) {
                this.borrowDoc3ToUser(user, title, author, isbn)
                console.log('create doc3')

            } else {
                alert('You have reached the maximum (3) number of borrowed documents. Please return at least one of them before attempting to borrow or reserve another one.')
            }
        },

        // asign doc1 to user
        async borrowDoc1ToUser(user, title, author, isbn) {
            let initialDate = new Date
            user.borrow = {
                doc1: {
                    title,
                    author,
                    isbn,
                    borrowDate: new Date().toLocaleDateString('lt-LT'),
                    returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)).toLocaleDateString('lt-LT'),
                    extendedBorrow: 0
                }
            }
            console.log(user)
            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: {
                    doc1: {
                        title,
                        author,
                        isbn,
                        borrowDate: new Date().toLocaleDateString('lt-LT'),
                        returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)).toLocaleDateString('lt-LT'),
                        extendedBorrow: 0
                    }
                }
            })
        },
        
        // asign doc2 to user
        async borrowDoc2ToUser(user, title, author, isbn) {
            let initialDate = new Date
            let doc2 ={ title, author, isbn, borrowDate: new Date().toLocaleDateString('lt-LT'), returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)).toLocaleDateString('lt-LT'), extendedBorrow: 0 }
            
            user.borrow = {...this.user.borrow, doc2}
            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: user.borrow})
        },
        
        // asign doc3 to user
        async borrowDoc3ToUser(user, title, author, isbn) {
            let initialDate = new Date
            let doc3 ={ title, author, isbn, borrowDate: new Date().toLocaleDateString('lt-LT'), returnDate: new Date(initialDate.setDate(initialDate.getDate() + 28)).toLocaleDateString('lt-LT'), extendedBorrow: 0 }
            
            user.borrow = {...this.user.borrow, doc3}
            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: user.borrow})
        },

        //TODO: DELETE DOC FROM USER
        async deleteDocFromUser(isbn, user){
            console.log(isbn)
            console.log(user.email)
            let docUser = [this.users.find(item => item.email === user.email)]
            console.log(docUser)
            let doc = docUser.borrow.map(item => console.log(item))
            console.log(doc)

            // FIXME: I CANNOT ITERATE THROUGH USER, THEREFORE I CANNOT DETERMINE WHETHER doc1, doc2 or doc3 HAS TO BE UPDATED

            user.borrow = {...this.user.borrow, doc2}
            await projectFirestore.collection('users')
                .doc(user.id)
                .update({borrow: user.borrow})
                    
        },

        //TODO: EXTRA FEATURES --> EXTEND BORROW & BAN USER
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