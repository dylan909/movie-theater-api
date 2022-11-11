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
    fetch("http:localhost:3000/user/all")
        .then((response) => response.json())
        .then((data) => console.log(data))
}





const submit = document.querySelector("#submit")

submit.addEventListener('click', () => {
    console.log(searcher.value, typeOfSearchValues.value, chosenModel.value)

    if (typeOfSearchValues.value === 'All' && chosenModel.value === 'Users'){
        searchAllUsers()
    }

})