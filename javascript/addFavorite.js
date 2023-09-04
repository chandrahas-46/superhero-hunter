// get local storage favorite list
function getStorage() {
	let data = JSON.parse(localStorage.getItem("favorite")) || [];
	return data;
}

// add favorite list in localstorage
function setStorage(data) {
	let dataString = "";
	dataString = JSON.stringify(data);
	localStorage.setItem("favorite", dataString);
}


// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ updateFavorite() function is called when user click on favorite button @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function updateFavorite(input){
	// localStorage.setItem("data", listItems.innerHTML);
	let data = JSON.parse(input.getAttribute("data-character"));
	 console.log("Favorite/Unfavorite button data: ", data, typeof(data));			// JSON.parse() is used to conver string data to javascript object
	// id: "1017100"
	// name: "A-Bomb (HAS)"
	// path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16"


	let favoriteList = getStorage();
	// if character is alrady in favorite list then unfavorite it
	for (let i = 0; i < favoriteList.length; i++) {
		if (favoriteList[i].id == data.id ||favoriteList[i].id == "undefined" || favoriteList[i].id == null) {
			favoriteList.splice(i, 1);
			input.setAttribute("value", "Favorite");
			setStorage(favoriteList);
			return;
		}
	}
	console.log("length of favoriteList: ",favoriteList.length);

	// if character is not present in favorite list then add it to favorite
	favoriteList.push(data);
	setStorage(favoriteList);
	input.setAttribute("value", "UnFavorite");
}




// ##################################################### START addFavorite.js Code #####################################################################

let favoriteContainer = document.getElementById('favorite-characters');

// render favorite page only if user visits on favorite page
// if user on another page: favoriteContainer value will be "null"
// console.log("fav", favoriteContainer);

function createDivContainer(ele) {
	const { id, path, name } = ele;
	let div = document.createElement("div");
	div.classList.add("character-card");
	div.setAttribute("id", id);

	let characterdetailsPagePath = `../pages/characterdetails.html#${id}`;
	div.innerHTML = `
		<a href=${characterdetailsPagePath}><img class="poster" src="${path}.jpg"></a>
		<div class = "card-body">
			<a href="${characterdetailsPagePath}">${name}</a>
			<input type="button" value="UnFavorite" id=${id} data-character='{"id": "${id}", "name": "${name}", "path": "${path}"}' onclick="updateFavorite(this)"/>
		</div>
	`;

	return div;
}

function renderFavorite(favoriteContainer) {
	console.log("renderFavorite");
	let myFavoriteList = getStorage();
	console.log(myFavoriteList);
  
	if(myFavoriteList.length == 0) {
		return;
	}
	favoriteContainer.innerHTML = "";

	for(let i=0; i<myFavoriteList.length; i++) {
		let div = createDivContainer(myFavoriteList[i]);
		favoriteContainer.append(div);
	}
}


// ###########################  initializeApp() functions list #############################

function startFavoriteSuperheroPage(){
	if(favoriteContainer != null){
		renderFavorite(favoriteContainer);
	}
}

startFavoriteSuperheroPage();
