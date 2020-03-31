// Gets all users
async function listUsers() {
    const request = await fetch('http://localhost:8070/users/', {
        method: 'GET'
    })
    const data = await request.json()
    return data.responsiveJSON
}

// Creates a new user
async function createUser(name, surname, username, email, password) {
    const request = await fetch('http://localhost:8070/users/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            surname: surname,
            username: username,
            email: email,
            password: password
        })
    })
    const data = await request.json()
    return data
}

// Gets all posts
async function listPosts() {
    const request = await fetch('http://localhost:8070/post/', {
        method: 'GET'
    })
    const data = await request.json()
    return data.responsiveJSON
}


// Creates a new post
async function createPost(title, content, author) {
    const request = await fetch('http://localhost:8070/post/', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            content: content,
            author: author
        })
    })
    const data = await request.json()
    return data
}


// Render posts
function renderPost(posts){    
    const div = document.createElement('div')
    div.classList.add('Posts__Container-right')
    
    // const postContainer = document.querySelector('ProfilePost__Post')
    document.body.append(div)

    for (let post of posts) {
        let headline = document.createElement("h1")
        headline.classList.add('ProfilePost__Headline')
        let paragraph = document.createElement("p")
        paragraph.classList.add('ProfilePost__Paragraph')

        headline.innerHTML = post.title
        paragraph.innerHTML = post.content

        div.append(headline)
        div.append(paragraph)
    }
}


// Init post
function initPost() {
    const publishPostBtn = document.querySelector('.Profile__Right-Form-button'); 
    publishPostBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const titleValue = document.querySelector('.Profile__Right-Form-inputTitle').value
        const contentValue = document.querySelector('.Profile__Right-Form-inputContent').value

        if(titleValue == "" || contentValue == ""){ 
             alert('title is empty')
        } else {
           createPost(titleValue, contentValue)
        }
    })
}
initPost()



// all pages
const pages = {
    'page-1': {
        element: document.querySelector('.page-1'),
        title: 'page-1'
    },

    'page-2': {
        element: document.querySelector('.page-2'),
        title: 'page-2'
    },
    'page-3': {
        element: document.querySelector('.page-3'),
        title: 'page-3'
    },
    'page-4': {
        element: document.querySelector('.page-4'),
        title: 'page-4'
    },
}

//Temporary Nav
function initNav() {
    const keys = Object.keys(pages)
    const nav = document.querySelector('nav')
    for (let pageKey of keys) {
        const pageObject = pages[pageKey]
        let anchor = document.createElement('a')
        anchor.addEventListener('click', () => {
            renderView(pageKey)
        })
        anchor.innerText = pageObject.title
        nav.append(anchor)
    }
}
//Temporary Nav
function renderView(page) {
    if (!pages[page]) { throw new Error('Page not found') }
    const pageObjects = Object.values(pages)
    for (let page of pageObjects) {
        page.element.classList.add('hidden')
    }
    pages[page].element.classList.remove('hidden')
}


// TOGGLE SIGNUP AND LOGIN, IN LOGIN 
async function signUpButton(){
    const signUp = document.querySelector('.Form__Login-link')
    signUp.addEventListener('click', (event) => {
        event.preventDefault()
        pages[Object.keys(pages)[1]].element.classList.remove('hidden')
        pages[Object.keys(pages)[2]].element.classList.add('hidden')
        
    })
}
signUpButton()

// TOGGLE PROFILE AND FEED, IN PROFILE 
async function feedButton(){
    const feed = document.querySelector('.Profile__ToFeed-link')
    feed.addEventListener('click', (event) => {
        event.preventDefault()
        pages[Object.keys(pages)[3]].element.classList.remove('hidden')
        pages[Object.keys(pages)[0]].element.classList.add('hidden')
    })
}
feedButton()

// Login
async function initLoginForm(){
    const form = document.querySelector('#Form__Login')
    form.addEventListener('submit', async(event) => {
        event.preventDefault()
        const username = document.querySelector('.Name').value
        const password = document.querySelector('.Password').value
        const error = document.querySelector('.Form__Login__Error')
        
        const response = await fetch('http://localhost:8070/login/',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
              username: username,
              password: password
            })

        })     
       
        if(response.status == 200){
            pages[Object.keys(pages)[0]].element.classList.remove('hidden')
            pages[Object.keys(pages)[2]].element.classList.add('hidden')
            passvalues()
            const result = document.querySelector('.USERNAME').innerHTML=localStorage.getItem('textvalue')
        } else {
            error.classList.toggle('hide')
            error.innerHTML = 'Username password missmatch'
        }
    })
}

// Registration
function initForm() {
    const form = document.querySelector('#Form__Signup')
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        const name = form.querySelector('.name').value
        const surname = form.querySelector('.surname').value
        const username = form.querySelector('.username').value
        const email = form.querySelector('.email').value
        const password = form.querySelector('.password').value
        const passwordAgain = form.querySelector('.passwordAgain').value
        const errorName = document.querySelector('.Error__Name')
        const errorSurname = document.querySelector('.Error__Surname')
        const errorUsername = document.querySelector('.Error__Username')
        const errorEmail = document.querySelector('.Error__Email')
        const errorPassword = document.querySelector('.Error__Password')
        const errorPasswordRepeat = document.querySelector('.Error__Password__Repeat')

        if (name.length < 2) {
            errorName.classList.toggle('hide')
            errorName.innerHTML = 'At least two characters'

        }
        if (surname.length < 2) {
            errorSurname.classList.toggle('hide')
            errorSurname.innerHTML = 'At least two characters'

        }
        if (username.length < 2) {
            errorUsername.classList.toggle('hide')
            errorUsername.innerHTML = 'At least two characters'

        }
        if (email.length < 2) {
            errorEmail.classList.toggle('hide')
            errorEmail.innerHTML = 'Email alreaty exist'

        }
        if (password.length < 2) {
            errorPassword.classList.toggle('hide')
            errorPassword.innerHTML = 'At least two characters'

        }
        if (passwordAgain != password) {
            errorPasswordRepeat.classList.toggle('hide')
            errorPasswordRepeat.innerHTML = 'Password does not match!'
        } else {
            createUser(name, surname, username, email, password)
            pages[Object.keys(pages)[2]].element.classList.remove('hidden')
            pages[Object.keys(pages)[1]].element.classList.add('hidden')
        }
    })
}

// Stores user data
function passvalues() {
    const username = document.querySelector('.Name').value
    localStorage.setItem('textvalue', username)
    return false
}

// Run all functions
async function run() {
    initForm()
    const users = await listUsers()
    const posts = await listPosts()
    initNav()
    initLoginForm()
    renderPost(posts)
}
run()

// UPLOAD PROFILEPICTURE 
function toggleDefaultUpload() {
    const realUpload = document.querySelector('.Profile__Upload-profilePicture')
    const customUpload = document.querySelector('.Profile__Upload-profilePicture-Custom')
    
    customUpload.addEventListener('click', function() {
        realUpload.click(); 
    })
}
window.addEventListener('load', function() {
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        if  (this.files && this.files[0]) {
            var img = document.querySelector('.UserProfilePicture'); 
            img.src = window.URL.createObjectURL(this.files[0]); 
            img.onload = imageIsLoaded; 
        }
    });
});

// EDIT & DELETE-BUTTON -  PROFILEPAGE 
function hideShow() {
    const edit = document.querySelector('.Toggle__Edit');
    if (edit.style.display === 'none') {
        edit.style.display = 'block';
    } else {
        edit.style.display = 'none';
    }
}


// UPLOAD MP3
// const loadFile = function(event) {

//     let mp3 = document.getElementById('output');
//     mp3.src = URL.createObjectURL(event.target.files[0]);

//     if (mp3.style.display === 'block') {
//         mp3.style.display === 'block';
//     } else {
//         mp3.style.display = 'grid';
//     }
// }