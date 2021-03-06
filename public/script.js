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

/*
function renderPost() {
    const PostFeed = document.querySelector('.ProfilePost');
    event.preventDefault()
    const PostFeedTitle = document.querySelector('.Porfile_Right-form-inputTitle').value
    const PostFeedValue = document.querySelector('.profile_Right-Form-inputContent').value

    if (PostFeedTitle == "" || PostFeedValue == "") {
        alert('this section is empty')
    } else {
        createPost(PostFeedtitle, PostFeedValue)
    }
}
renderPost();
*/

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
function renderPost(posts, postContainer) {
    for (let post of posts) {
        let div = document.createElement('div')
        div.classList.add('Posts')

        let postC = document.querySelector(postContainer)
        postC.append(div)

        //ADD EDIT & DELETE BUTTON 
        let btnContainer = document.createElement('div')
        btnContainer.classList.add('ProfilePost__Post__Btn-container')
        btnContainer.addEventListener('click', (event) => {
            event.preventDefault()
            if (toggleContainer.style.display === 'none') {
                toggleContainer.style.display = 'block';
            } else {
                toggleContainer.style.display = 'none';
            }
        })

        let btnEditDelete = document.createElement('div')
        btnEditDelete.classList.add('ProfilePost__Btn')

        let btnEditDelete2 = document.createElement('div')
        btnEditDelete2.classList.add('ProfilePost__Btn')

        let btnEditDelete3 = document.createElement('div')
        btnEditDelete3.classList.add('ProfilePost__Btn')
        div.append(btnContainer)
        btnContainer.append(btnEditDelete)
        btnContainer.append(btnEditDelete2)
        btnContainer.append(btnEditDelete3)

        //TOGGLE 
        let toggleContainer = document.createElement('div')
        toggleContainer.classList.add('Toggle__Edit')
        btnContainer.append(toggleContainer)

        //Activate Edit
        let editParagraph = document.createElement("p")
        editParagraph.classList.add('Toggle__Edit-paragraph')
        editParagraph.innerHTML = "Edit"
        toggleContainer.append(editParagraph)

        editParagraph.addEventListener('click', async (event) => {
            event.preventDefault()

            if (headline.style.display === 'none') {
                headline.style.display = 'block';
            } else {
                headline.style.display = 'none';
            }

            if (paragraph.style.display === 'none') {
                paragraph.style.display = 'block';
            } else {
                paragraph.style.display = 'none';
            }

            //EDIT TITLE
            const newTitle = document.createElement("input")
            newTitle.setAttribute("type", "text");
            newTitle.value = post.title
            newTitle.classList.add('ProfilePost__NewTitle')
            div.append(newTitle)

            //EDIT CONTENT
            const newContent = document.createElement("input")
            newContent.setAttribute("type", "text");
            newContent.value = post.content
            newContent.classList.add('ProfilePost__NewContent')
            div.append(newContent)

            //UDATE BUTTON
            const updateBtn = document.createElement("BUTTON")
            updateBtn.innerHTML = "Update"
            updateBtn.classList.add('ProfilePost__Update-btn')
            div.append(updateBtn)

            updateBtn.addEventListener('click', async (event) => {
                event.preventDefault()
                console.log("Hej")
                refreshPage()
                const request = await fetch('http://localhost:8070/post/' + post._id, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        title: newTitle.value,
                        content: newContent.value
                    })
                })
                const data = await request.json()
                return data
            })
        })

        //Activate Delete
        let deleteParagraph = document.createElement("p")
        deleteParagraph.classList.add('Toggle__Delete-paragraph')
        deleteParagraph.innerHTML = "Delete"
        toggleContainer.append(deleteParagraph)
        deleteParagraph.addEventListener('click', async (event) => {
            event.preventDefault()
            const request = await fetch('http://localhost:8070/post/' + post._id, {
                method: 'DELETE',
            })
            div.remove()
            const data = await request.json()
            return data
        })

        //POST 
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

        if (titleValue == "" || contentValue == "") {
            alert('please create content before publish')
        } else {
            createPost(titleValue, contentValue)
            refreshPage()


        }
    })
}
initPost()


// REFRESH PAGE 
function refreshPage() {
    window.location.reload();
}

// EDIT & DELETE
async function deletePost(title, content) {
    const request = await fetch('http://localhost:8070/post/:id', {
        method: 'DELETE',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify({
            title: title,
            content: content,
        })
    })
    const data = await request.json()
    return data
}

async function initDeletePost() {
    const errase = document.querySelector('.Toggle__Delete-paragraph')
    errase.addEventListener('click', async (event) => {
        console.log('its working');
        event.preventDefault()
        const response = await fetch('http://localhost:8070/post/:id')
    })
}

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

// //Temporary Nav
// function initNav() {
//     const keys = Object.keys(pages)
//     const nav = document.querySelector('nav')
//     for (let pageKey of keys) {
//         const pageObject = pages[pageKey]
//         let anchor = document.createElement('a')
//         anchor.addEventListener('click', () => {
//             renderView(pageKey)
//         })
//         anchor.innerText = pageObject.title
//         nav.append(anchor)
//     }
// }

// //Temporary Nav
// function renderView(page) {
//     if (!pages[page]) { throw new Error('Page not found') }
//     const pageObjects = Object.values(pages)
//     for (let page of pageObjects) {
//         page.element.classList.add('hidden')
//     }
//     pages[page].element.classList.remove('hidden')
// }

// TOGGLE SIGNUP AND LOGIN, IN LOGIN 
async function signUpButton() {
    const signUp = document.querySelector('.Form__Signup-link')
    signUp.addEventListener('click', (event) => {
        event.preventDefault()
        // pages[Object.keys(pages)[1]].element.classList.remove('hidden')
        // pages[Object.keys(pages)[2]].element.classList.add('hidden')
        setCurrentPage([".Signup"])
    })
}
signUpButton()

async function loginButton() {
    const login = document.querySelector('.Feed__ToLogin-link')
    login.addEventListener('click', (event) => {
        event.preventDefault()
        setCurrentPage([".Login"])
    })
}
loginButton()

async function logoutButton() {
    const login = document.querySelector('.Profile__LogOut-link')
    login.addEventListener('click', (event) => {
        event.preventDefault()
        setCurrentPage([".Login"])
    })
}
logoutButton()

// TOGGLE PROFILE AND FEED, IN PROFILE 
async function feedButton() {
    const feed = document.querySelector('.Profile__ToFeed-link')
    feed.addEventListener('click', (event) => {
        event.preventDefault()
        // pages[Object.keys(pages)[3]].element.classList.remove('hidden')
        // pages[Object.keys(pages)[0]].element.classList.add('hidden')
        setCurrentPage([".page-4"])
    })
}
feedButton()

// Login
async function initLoginForm() {
    const form = document.querySelector('#Form__Login')
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const username = document.querySelector('.Name').value
        const password = document.querySelector('.Password').value
        const error = document.querySelector('.Form__Login__Error')

        const response = await fetch('http://localhost:8070/login/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })

        })

        if (response.status == 200) {
            // pages[Object.keys(pages)[0]].element.classList.remove('hidden')
            // pages[Object.keys(pages)[2]].element.classList.add('hidden')
            passvalues()
            setCurrentPage([".page-1"])
            const result = document.querySelector('.USERNAME').innerHTML = sessionStorage.getItem('textvalue')
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
            // pages[Object.keys(pages)[2]].element.classList.remove('hidden')
            // pages[Object.keys(pages)[1]].element.classList.add('hidden')
            setCurrentPage([".Login"])
        }
    })
}

// Stores user data
function passvalues() {
    const username = document.querySelector('.Name').value
    sessionStorage.setItem('textvalue', username)
    return false
}

// Set the current page in sessionStorage
function setCurrentPage(curr) {
    let current = document.querySelectorAll(".current")
    for (let i = 0; i < current.length; i++) {
        let element = current[i]
        if (!element.classList.contains("hidden")) {
            element.classList.toggle("hidden")
        }
    }
    for (let j = 0; j < curr.length; j++) {
        let element = document.querySelector(curr[j])
        element.classList.toggle("hidden")
        let currentPage = window.sessionStorage.setItem("currentPage", curr[j])
    }
}

// Get current page key value from sessionStorage
window.addEventListener('load', async (event) => {
    const currentPage = window.sessionStorage.getItem('currentPage')
    if (currentPage) {
        let curr = currentPage.split(',')
        setCurrentPage(curr)
        const result = document.querySelector('.USERNAME').innerHTML = sessionStorage.getItem('textvalue')
    } else {
        setCurrentPage(['.Login'])
        const result = document.querySelector('.USERNAME').innerHTML = sessionStorage.getItem('textvalue')
    }
})

// Run all functions
async function run() {
    initForm()
    const users = await listUsers()
    const posts = await listPosts()
    // initNav()
    initLoginForm()
    renderPost(posts, '.Posts__Container-right')
    renderPost(posts, '.Posts__Container-left')
}
run()

// UPLOAD PROFILEPICTURE 
function toggleDefaultUpload() {
    const realUpload = document.querySelector('.Profile__Upload-profilePicture')
    const customUpload = document.querySelector('.Profile__Upload-profilePicture-Custom')

    customUpload.addEventListener('click', function () {
        realUpload.click();
    })
}
window.addEventListener('load', function () {
    document.querySelector('input[type="file"]').addEventListener('change', function () {
        if (this.files && this.files[0]) {
            var img = document.querySelector('.UserProfilePicture');
            img.src = window.URL.createObjectURL(this.files[0]);
            img.onload = imageIsLoaded;
        }
    });
});