// Initialize global variable
// npm install crypto-js;
// var MD5 = require("crypto-js/md5");
// console.log(MD5("1ca4759fbaedee1c428b433efc677af7f57ebbf6bd1f80b9302af38eef2de8d68d3693ffd").toString());

const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
let marvelData = [];
let charactersContainer = document.getElementById("characters-container");
let searchBtn = document.getElementById("searchBtn");
let searchBox = document.getElementById("searchBox");
let searchResult = document.getElementById("searchResult");


// get local [favorite characters] from local storage (ref: addFavorite.js)
function getStorage() {
	let data = JSON.parse(localStorage.getItem("favorite")) || [];
	return data;
}

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ develop div tag of HTML code for character using javascript @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function createCommonDivContainer(ele,favorite) {
	// Select these 3 attribute from marvelData elements
	const { id, thumbnail, name } = ele;
	let div = document.createElement("div");
	div.classList.add("character-card");
	div.setAttribute("id", id);
	// character details page link
	let characterdetailsPagePath = `../3%20SuperHero/pages/characterdetails.html#${id}`;

	div.innerHTML = `
		<a href=${characterdetailsPagePath}><img class="poster" src="${thumbnail.path}.jpg"></a>
		<div class="card-body">
			<a href=${characterdetailsPagePath}>${name}</a>
			<input type="button" value=${favorite} id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${thumbnail.path}"}' onclick="updateFavorite(this)"/>
		</div>
	`;
	return div;
}

// ******************* Update favorite button value **************************
function checkLocalStorageData(ele){
	// get local favorite character from local storage
	let favoriteData = getStorage();
	let favorite = "favorite";

     // check character is already favorite or not
	for (let j = 0; j < favoriteData.length; j++) {
		if (ele.id == favoriteData[j].id) {
	      favorite = "UnFavorite";
	      break;
		}
	}
	return favorite;
}

// ******************* create seperate div tag for each character and append it to the charactersContainer **************************
function renderList () {
	charactersContainer.innerHTML = "";
	for(let i=0; i<marvelData.length; i++){
		let favorite = checkLocalStorageData(marvelData[i]);
		let div = createCommonDivContainer(marvelData[i],favorite);
		charactersContainer.appendChild(div);
	}
}


// async function fetchData() {
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// }

// ################################## Fetch marvel data using url #######################################

function fetchData(){
	fetch(url)
		.then(function(response){
			// console.log(response);
			return response.json();
		}).then(function(data){
			// console.log(data);
			console.log(data.data.results);
			marvelData = data.data.results;
			renderList ();
		})
		.catch(function(error){
			console.log("error", error);
		})
}



// ########################### Search Button Functions #######################################



function handleSearchHelper(ele) {
	console.log("helper", ele);
	searchResult.innerHTML = "";
	let favorite = checkLocalStorageData(ele);
	let div = createCommonDivContainer(ele, favorite);
	searchResult.appendChild(div);
}

function handleSearch(event){
	console.log("handleSearch function start");
	let searchVal = searchBox.value;
	if(searchVal == ""){
		alert("Please write your Superhero name");
		return;
	}
	// console.log("searchVal: ", searchVal.length);
	searchBox.value = "";
	let url2 = `${url}&name=${searchVal}`;

	// fetch data based on the searchVal provided by user
	fetch(url2)
	.then(function(response){
		return response.json();
	}).then(function(data){
		let superhero = data.data.results[0];
		handleSearchHelper(superhero);
	})
	.catch(function(error){
		console.log("error", error);
		alert("Please write Valid Superhero name");
		return;
	})	
}


// ###########################  initializeApp() functions list #############################

function initializeApp(){
	console.log('Start Superhero Hunter Application');
	// Fetch marvel data using url
	fetchData();
	// added click event on search button
	searchBtn.addEventListener("click", handleSearch);
}

initializeApp();



// Reference: 
// variable- ts, publicKey, hashValue	: 	api-data.js file
// onclick="updateFavorite(this)		: 	addFavorite.js file