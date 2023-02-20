const randomCats = document.querySelector(".random-kitties");
const selectCatNum = document.querySelector(".num-cats");
const showBreed = document.querySelector(".show-breed");
let btns = document.querySelectorAll("#btn");
let breedNameDisp = document.querySelector('.breed-name');

const getData = async function(numCats){
    const catsRequest = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${numCats}&api_key=live_WwThoDpHXktwq1gdKW0d1FpOAnLe9Fv1S1O0nwGc9Gf9VCs8mLIraQ3RRZBwEStD`);
    const data = await catsRequest.json();
    console.log(data);
    displayCats(data);
}
getData(0);

const displayCats = function(data){
    randomCats.innerHTML = "";
    for(let cat of data) {
        // let country = user.location.country;
        // let name = user.id.name;
        let imageURL = cat.url;
        const catDiv = document.createElement("div");
        catDiv.innerHTML = `

            <img width=200px height=200px src=${imageURL} alt="cat pic" />
        `;
        randomCats.append(catDiv);
    }
}

selectCatNum.addEventListener('change', function(e){
    const numCats = e.target.value;
    getData(numCats);
});


const getBreed = async function(catType){
    const breedRequest = await fetch(`https://api.thecatapi.com/v1/images/search?has_breeds=1&breed_ids=${catType}&limit=3&api_key=live_WwThoDpHXktwq1gdKW0d1FpOAnLe9Fv1S1O0nwGc9Gf9VCs8mLIraQ3RRZBwEStD`);
    const res = await breedRequest.json();
    //console.log(res);
    displayBreed(res);
}
getBreed();

const displayBreed = function(res){
    showBreed.innerHTML = "";
    for (let breed of res){
        let breedName = breed.breeds[0].name;
        //console.log(breedName);
        let imageURL = breed.url;

        const breedDiv = document.createElement("div");
        breedDiv.innerHTML = `
        <div class="breed-pic">
            <img width=200px height=200px src=${imageURL} alt="cat breed pic" />
        </div>
        `;

        showBreed.append(breedDiv);
    }
}

btns.forEach(function(i){
    i.addEventListener('click', function(e){
        const catType = e.target.value;
        //console.log(catType);
        const catName = e.target.name;
        console.log(catName);

        console.log(breedNameDisp.innerText);
        breedNameDisp.classList.remove("hide");
        breedNameDisp.innerText = `Here are some ${catName}'s`;
        getBreed(catType);
    });
})




// click on any of the buttons, send id to getBreed fx