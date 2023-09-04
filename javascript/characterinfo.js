let url="";
let about = document.getElementById("about");
let comics = document.getElementById("comics");
let events = document.getElementById("events");
let series = document.getElementById("series");
let stories = document.getElementById("stories");
let id;

let winurl = window.location.href;
winurl = winurl.substring(winurl.lastIndexOf("#") + 1);
if(winurl.length > 10)
	id = 1017100;		// Default value
else
	id = winurl.substring(winurl.lastIndexOf("#") + 1);

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ develop HTML div tag using javascript @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
function createCommonDivContainer(ele, name) {
	// console.log("character: ", ele);
	const{description, thumbnail} = ele;
	let div = document.createElement("div");
	div.classList.add("character-info");
	div.innerHTML = `
		<div class="poster">
			<img src="${thumbnail.path}.jpg">
		</div>
		<div class="about">
			<h3>${name}</h3>
			<p>${description || "description is not available"}</p>
		</div>
	`;
	return div;
}

// ################################ Superhero Informations ########################################

url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
function superHeroData() {
	fetch(url)
		.then(function(response){
			// console.log(response);
			return response.json();
		}).then(function(data){
			// console.log(data.data.results[0]);
			about.innerHTML = "";
			let result = data.data.results[0];
			const {name} = result;
			let div = createCommonDivContainer(result,name);
			about.appendChild(div);
		})
		.catch(function(error){
			console.log("error", error);
		})
}


// ################################ Superhero Comics Informations ########################################

let urlComics = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
function comicsData() {
	fetch(urlComics)
		.then(function(response){
			console.log("@",response);
			return response.json();
		}).then(function(data){
			// console.log("#",data.data.results);

			let result = data.data.results;
			comics.innerHTML = "";
			for(let i of result){
				console.log("*******",i.title);
				const title = i.title;
				let div = createCommonDivContainer(i, title);
				comics.appendChild(div);
			}
			
		})
		.catch(function(error){
			console.log("error", error);
		})
}


// ################################ Superhero Event Informations ########################################

 let urlEvents = `https://gateway.marvel.com/v1/public/characters/${id}/events?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
 function eventData() {
	fetch(urlEvents)
		.then(function(response){
			console.log("@",response);
			return response.json();
		}).then(function(data){
			let result = data.data.results;
			events.innerHTML = "";
			for(let i of result){
				console.log("*******",i.title);
				const title = i.title;
				let div = createCommonDivContainer(i, title);
				events.appendChild(div);
			}
			
		})
		.catch(function(error){
			console.log("error", error);
		})
}


// ################################ Superhero Series Informations ########################################

 let urlSeries = `https://gateway.marvel.com/v1/public/characters/${id}/series?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
 function seriesData() {
	fetch(urlSeries)
		.then(function(response){
			console.log("@",response);
			return response.json();
		}).then(function(data){
			let result = data.data.results;
			series.innerHTML = "";
			for(let i of result){
				console.log("*******",i.title);
				const title = i.title;
				let div = createCommonDivContainer(i, title);
				series.appendChild(div);
			}
			
		})
		.catch(function(error){
			console.log("error", error);
		})
}


// ################################ Superhero Stories Informations ########################################

 let urlStories = `https://gateway.marvel.com/v1/public/characters/${id}/stories?ts=${ts}&apikey=${publicKey}&hash=${hashValue}`;
 function storyData() {
	fetch(urlStories)
		.then(function(response){
			console.log("@",response);
			return response.json();
		}).then(function(data){
			let result = data.data.results;
			stories.innerHTML = "";
			for(let i of result){
				console.log("*******",i.title);
				const title = i.title;
				let div = createCommonDivContainer(i, title);
				stories.appendChild(div);
			}
			
		})
		.catch(function(error){
			console.log("error", error);
		})
}


// ###########################  initializeApp() functions list #############################
function initializeApp(){
	superHeroData();
	comicsData();
	eventData();
	seriesData();
	storyData();
}

initializeApp();