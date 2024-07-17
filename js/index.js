const navLink = document.querySelectorAll('.nav-link')
const activeLink = document.querySelector('.navbar-nav .active')
// const gameCard = document.querySelectorAll('.card')
const games = document.querySelector('.games')
const details = document.getElementById('details')
const loading = document.querySelector('.loading')
const btnClose = document.getElementById('btnClose')



//! on click on any category on the nav change to this category data
navLink.forEach((link) => {
    link.addEventListener("click", () => {
        activeLink.classList.remove('active');
        link.classList.add('active')

     const category = link.dataset.category

     gitGames(category) //! fetch this category data 
    }) ;
 });
 
 gitGames('MMORPG') //! display MMORPG as a start 


 //! fetch data from the api
 async function gitGames(cat){

    loading.classList.remove('d-none') //todo start with the loading screen
    
    const options ={
        method:'get',
        headers:{
            'x-rapidapi-key': 'a41e72b45cmsha3e275728d1b02fp192426jsncc5614d63ed2' ,
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    } 


    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${cat}` , options )
    const response = await api.json();
    loading.classList.add('d-none') //todo close the loading screen when the data is ready

    console.log(response);
    

    displayGames(response); //! send the data to the card 


    //! on click on card open the details of it by sending the id
    document.querySelectorAll('.card').forEach((card)=>{
        card.addEventListener('click',()=>{
            details.classList.remove('d-none') //todo show the details section
            games.classList.add('d-none') //todo hide the games section
            getDetails(card.dataset.id); //!send the id to the details api
            console.log(card.dataset.id);
        })
    })
    

}

//! close btn fun
function closeBtn(){
    btnClose.addEventListener('click',()=>{
        details.classList.add('d-none')
        games.classList.remove('d-none')
    })
}
closeBtn()




async function getDetails(id){
    loading.classList.remove('d-none')
    const options ={
        method:'get',
        headers:{
            'x-rapidapi-key': 'a41e72b45cmsha3e275728d1b02fp192426jsncc5614d63ed2' ,
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }

    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,options)
    const response = await api.json();
    loading.classList.add('d-none')
    console.log(response);
    displayDetails(response);
}
getDetails();







//////////? Display Section /////////////

function displayGames(data){

    let gamesBox = ``

    for(let i = 0 ; i < data.length ; i++ ){
        gamesBox += `
    
    <div class="col">
                <div data-id="${data[i].id}" class="card h-100 bg-transparent" role="button" "="">
                   <div class="card-body">
                      <figure class="position-relative">
                         <img class="card-img-top object-fit-cover h-100" src="${data[i].thumbnail}">
                      
                      </figure>
          
                      <figcaption>
          
                         <div class="hstack justify-content-between">
                            <h3 class="h6 small">${data[i].title}</h3>
                            <span class="badge text-bg-primary p-2">Free</span>
                         </div>
          
                         <p class="card-text small text-center opacity-50">${data[i].short_description}</p>
          
                      </figcaption>
                   </div>
          
                   <footer class="card-footer small hstack justify-content-between">
          
                      <span class="badge text-white badge-color">${data[i].genre}</span>
                      <span class="badge text-white badge-color">${data[i].platform}</span>
          
                   </footer>
                </div>
             </div>
    
    `
    }

    document.querySelector('#gameData').innerHTML = gamesBox
}


function displayDetails(data){
     
    const detailsBox = `
    
    <div class="col-md-4">
                <img src="${data.thumbnail}" class="w-100" alt="image details">
             </div>
             <div class="col-md-8">
                <h3>Title: ${data.title}</h3>
                <p>Category: <span class="badge text-bg-info"> ${data.genre}</span> </p>
                <p>Platform: <span class="badge text-bg-info"> ${data.platform}</span> </p>
                <p>Status: <span class="badge text-bg-info"> ${data.status}</span> </p>
                <p class="small">${data.description}</p>
                <a class="btn btn-outline-warning" target="_blank" href="${data.game_url}">Show Game</a>
             </div>
    
    `

    document.getElementById('detailsContent').innerHTML = detailsBox;
}