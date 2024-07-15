const accessKey = "oI5LCGHz9bdLncq3xZrWrwiZisQNtp7RjpOOkG5bM08"

const searchButton = document.getElementById("button")
const searchBar = document.getElementById("searchBar")
const block = document.getElementById("columns")
const seeMore = document.getElementById("seeMore")

let per_page = 11;
let page = 1;
currentQuery = "";

async function fetchrandomImage(){
    try {
        apiUrl = `https://api.unsplash.com/photos?per_page=${per_page}&page=${page}&client_id=${accessKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data;
    }
    catch (error){
        console.error("Error", error)
    }
}

async function fetchqueryImage(query){
    
    try {
        apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`;
        const response = await fetch(apiUrl)
        const data = await response.json()
        console.log(data);
        return data.results;
        
    } catch (error) {
        console.error("Error", error) 
    }

}

searchButton.addEventListener('click' , async function(){
    const query = searchBar.value.trim()
    if(!query==""){
        currentQuery = query
        page = 1;
        const images =  await fetchqueryImage(query)
        display(images)
    }
})

searchBar.addEventListener('keypress' , async function(e){
    if(e.key=="Enter"){
        const query = searchBar.value.trim()
        if(!query==""){
            currentQuery = query
            page = 1;
            const images =  await fetchqueryImage(query)
            display(images)
        }
    }
})

seeMore.addEventListener('click', async function(){
    page++;
    if(currentQuery === ''){
        const images = await fetchrandomImage();
        display(images, true);
    } else {
        const images = await fetchqueryImage(currentQuery);
        display(images, true);
    }
});



async function display(images , append = false) {
    if (!append) {
        block.innerHTML = "";
    }
    if (images && images.length > 0) {
        images.forEach(image => {
            const box = document.createElement("div");
            box.classList.add("column");

            const ige = document.createElement("img");
            ige.classList.add("img");
            ige.src = image.urls ? image.urls.raw + "&w=400&h=380" : "images/images.png";
            
            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = image.alt_description || "No title available";

            box.append(ige);
            box.append(title);
            block.append(box);
        });
    } else {
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "No images found.";
        block.append(errorMessage);
    }
}

(async function run(){
    const images = await fetchrandomImage()
    display(images)
})()