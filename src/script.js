/*

Different options based on the type of search

<option value="All">
<option value="Usershow"></option>
<option value="Genre"></option>
<option value="showsWatched"></option>

*/


const chosenModel = document.querySelector('.model')

const typeOfSearch = document.querySelector('#modesOfSearch')
const typeOfSearchValues = document.querySelector('.typeOfSearch')


const searcher = document.querySelector('#search')


const content = document.querySelector('#content')
const contentCreator = document.querySelector('.contentCreator')


function populateTypeUser(){

    typeOfSearch.innerHTML = ''


    const one = document.createElement('option')
    const two = document.createElement('option')
    const three = document.createElement('option')
    one.setAttribute('value', 'All')
    two.setAttribute('value', 'By Id')
    three.setAttribute('value', 'Shows Watched')

    typeOfSearch.append(one, two, three)   
}


function populateTypeShow(){

    typeOfSearch.innerHTML = ''


    const one = document.createElement('option')
    const two = document.createElement('option')
    const three = document.createElement('option')
    one.setAttribute('value', 'All')
    two.setAttribute('value', 'By Id')
    three.setAttribute('value', 'Genre')

    typeOfSearch.append(one, two, three)   

}






typeOfSearchValues.addEventListener('input', (e) => {
    console.log(e.target.value)
    if (e.target.value === 'All'){
        searcher.setAttribute('disabled', '')
    }else{
        searcher.removeAttribute('disabled')
    }
})





chosenModel.addEventListener('input', (e) => {
    console.log(typeof e.target.value)
    if (e.target.value === 'Users'){
        populateTypeUser()
    }
    else if (e.target.value === 'Shows'){
        populateTypeShow()
    }else{
        chosenModel.innerHTML = ' '
    }
})


async function searchAllUsers(){
    let searchUser = 'searchUser'
    fetch("http://localhost:3000/user/all")
        .then((response) => response.json())
        .then((data) => makeContent(data, searchUser))
}

async function seachByUserId(id){
    let searchUser = 'searchUser'
    fetch(`http://localhost:3000/user/${id}`)
        .then((response) => response.json())
        .then((data) => makeContent([data], searchUser))
}

async function searchAllShows(){
    const searchShows = 'searchShows'
    fetch('http://localhost:3000/shows/all')
        .then((response) => response.json())
        .then((data) => makeContent(data, searchShows))
}

async function searchShowsByID(id){
    const searchShows = 'searchShows'
    fetch(`http://localhost:3000/shows/oneShow/${id}`)
        .then((response) => response.json())
        .then((data) => makeContent([data], searchShows))
}


const submit = document.querySelector("#submit")

submit.addEventListener('click', () => {
    console.log(searcher.value, typeOfSearchValues.value, chosenModel.value)

    if (typeOfSearchValues.value === 'All' && chosenModel.value === 'Users'){
        searchAllUsers()
    }
    if(typeOfSearchValues.value === 'By Id' && chosenModel.value === 'Users' && searcher.value){
        seachByUserId(searcher.value)
    }
    if(typeOfSearchValues.value === 'Shows Watched' && chosenModel.value === 'Users' && searcher.value){
        seachByUserWatched(searcher.value)
    }
    if(typeOfSearchValues.value === 'All' && chosenModel.value === 'Shows'){
        searchAllShows()
    }
    if(typeOfSearchValues.value === 'By Id' && chosenModel.value === 'Shows' && searcher.value){
        searchShowsByID(searcher.value)
    }

})



function makeContent(obj, type){
    content.innerHTML = ''
    console.log(obj)
    if (type === 'searchUser'){
        content.style.display = 'flex'
        content.style.justifyContent = 'space-around'
        for(i = 0; i <= obj.length -1; i++){
            const div = document.createElement('div')
            const id = document.createElement('h1')
            const username = document.createElement('h2')
            const password = document.createElement('h2')
            id.innerHTML = obj[i].id
            username.innerHTML = obj[i].username
            password.innerHTML = obj[i].password

            div.setAttribute('class', 'contentDiv')
            console.log(id, username, password)

            div.append(id, username, password)
            content.append(div)
    }}
    else if (type === 'searchShows'){
        content.style.display = 'flex'
        content.style.justifyContent = 'space-around'
        content.style.flexWrap = 'wrap'
        for(i = 0; i <= obj.length -1; i++){
            const div = document.createElement('div')
            const id = document.createElement('h2')
            const title = document.createElement('h1')
            const genre = document.createElement('h2')
            const rating = document.createElement('h2')
            const status = document.createElement('h2')
            id.innerHTML = obj[i].id
            title.innerHTML = obj[i].title
            genre.innerHTML = obj[i].genre
            rating.innerHTML = obj[i].rating
            status.innerHTML = obj[i].status

            div.style.border = '1px solid white'

            div.append(title, id, genre, rating , status)
            content.append(div)

        }
    }

}