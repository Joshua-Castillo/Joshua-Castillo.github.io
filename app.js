const form = document.querySelector('#searchForm');
const nomineeRow = document.createElement('DIV');
document.body.append(nomineeRow);

form.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const searchTermText = document.createElement('H3');
    removePriorText();
    // displayRow.appendChild(searchTermText);
    document.body.append(searchTermText);
        searchTermText.classList.add('mx-5');
        searchTermText.innerHTML="Results for "+ "'" +searchTerm+ "'";
        searchTermText.setAttribute("id", "textToRemove");
    const res = await axios.get(`http://www.omdbapi.com/?s=${searchTerm}&?type=movie&apikey=10e873c6`);
    console.log(res.data);
    removePrior();

    listCandidates(res.data.Search);

});

class Candidate{
    constructor(imdbId){
        this.imdbId = imdbId;
        
    }

    getImdbId(){
        return this.imdbId;
    }

    async printCandidateCard(parentNode){
        
        const res = await axios.get(`http://www.omdbapi.com/?i=${this.imdbId}&apikey=10e873c6`);
        console.log(res.data);
        if(res.data.Type === "movie"){
        const cardContainer = document.createElement('DIV');
            const cardImage = document.createElement('DIV');
                const img = document.createElement('IMG');
            const cardBody = document.createElement('DIV');
                const title = document.createElement('H5');
                const year = document.createElement('P');
            const cardBtn = document.createElement('DIV');
                const button = document.createElement('BUTTON');

        img.src = res.data.Poster;
        title.src = res.data.Title;
        year.src = res.data.Year;

        parentNode.appendChild(cardContainer);
        cardContainer.classList.add('card');
        cardContainer.classList.add('container');
        cardContainer.classList.add('text-center');
        cardContainer.classList.add('rounded');
        cardContainer.classList.add('px-0');


        cardContainer.appendChild(cardImage);
            cardImage.appendChild(img);
            cardImage.classList.add('p-0');
            // cardImage.classList.add('py-4');
            cardImage.classList.add('g-0');
                img.classList.add('card-img-top');
                img.classList.add('img-fluid');
                img.classList.add('rounded');

        cardContainer.appendChild(cardBody);
        cardBody.classList.add('card-body');
            cardBody.appendChild(title);
                title.append(title.src);
            cardBody.appendChild(year);
                year.append(year.src);

        cardContainer.appendChild(cardBtn);
            cardBtn.appendChild(button);
            button.classList.add('btn');
            button.classList.add('btn-sm');
            button.classList.add('btn-block');
            button.classList.add('mb-5');

            if(nominees.includes(this.getImdbId())){
                cardContainer.classList.add("nominated");
                    button.classList.add("btn-danger");
                    button.innerHTML = "nominated"
            } else {
                    button.classList.add('btn-primary');
                    button.innerHTML="nominate";
                }

            button.addEventListener('click', () => {
                if(cardContainer.classList.contains("nominated")){
                    // cardContainer.classList.remove("nominated")
                    // button.classList.remove("btn-danger");
                    // button.innerHTML = "nominate";
                    // button.classList.add("btn-primary");
                    // if(nominees.includes(this.getImdbId())){
                    // console.log(title.src + "'s nomination removed");
                    // nominees.splice(nominees.indexOf(this.getImdbId()),1);
                    // if (hasFiveNominees(nominees)) printBanner();
                    }
            
                    // nominees.filter((item, index) => array.indexOf(item)===index);

                 else if(nominees.length<5){
                    cardContainer.classList.add("nominated");
                    button.innerHTML = "nominated"
                    button.classList.add("btn-danger");
                    button.classList.remove("btn-primary");
                    console.log(title.src + " nominated")
                    if(nominees.length<6) nominees.push(this.getImdbId());
                    printNominees();
                    if(hasFiveNominees()) printBanner();
                    }
                    console.log("This works")
                    
                   

                    // if(cardContainer.classList.contains("nominated")){
                    //     cardContainer.classList.remove("nominated")
                    //     button.classList.remove("btn-danger");
                    //     button.innerHTML = "nominate";
                    //     button.classList.add("btn-primary");
                    //     if(nominees.includes(this.getImdbId())){
                    //     console.log(title.src + "'s nomination removed");
                    //     nominees.splice(nominees.indexOf(this.getImdbId()),1);
                    //     if (hasFiveNominees(nominees)) printBanner();
    
                    //     }
                
                    //     // nominees.filter((item, index) => array.indexOf(item)===index);
    
                    // } else {
                    //     cardContainer.classList.add("nominated");
                    //     button.innerHTML = "nominated"
                    //     button.classList.add("btn-danger");
                    //     button.classList.remove("btn-primary");
                    //     console.log(title.src + " nominated")
                    //     if(nominees.length<6) nominees.push(this.getImdbId());
                    //     if(hasFiveNominees()) printBanner();
                    //     }
                    //     printNominees();
                    //     // nominees.filter((item, index) => nominees.indexOf(item)===index);
            })
        }
    }
    
}

const listCandidates = (Search) => {
    const cardGroup = document.createElement('DIV');
    

    document.body.append(cardGroup);        

    cardGroup.setAttribute("id", "toRemove");

    cardGroup.classList.add('card-group');
    cardGroup.classList.add('mx-5');
    cardGroup.classList.add('my-5');
    cardGroup.classList.add('shadow-lg');
    cardGroup.classList.add('p-5');
    cardGroup.classList.add('pg-white');
    cardGroup.classList.add('rounded');
    // cardGroup.classList.add('col');

    const firstBatch = document.createElement('DIV');
    const secondBatch = document.createElement('DIV');
    cardGroup.appendChild(firstBatch);
        firstBatch.classList.add('row');
        firstBatch.classList.add('card-group');
        firstBatch.classList.add('gap-3');
        firstBatch.classList.add('mx-auto');
        firstBatch.classList.add('py-2');


    cardGroup.appendChild(secondBatch);
        secondBatch.classList.add('row');
        secondBatch.classList.add('card-group');
        secondBatch.classList.add('gap-3');
        secondBatch.classList.add('mx-auto');
        secondBatch.classList.add('py-2');
        


    for(let [i, result] of Search.entries()){
        const candidate = new Candidate(result.imdbID);
        if (i%2){
            candidate.printCandidateCard(firstBatch); 
        }
        else candidate.printCandidateCard(secondBatch); 

    }
    

}

let nominees = new Array(0);
class Nominee{
    constructor(imdbId){
        this.imdbId = imdbId;
        
    }

    getImdbId(){
        return this.imdbId;
    }

    async printNomineeCard(parentNode){
        
        const res = await axios.get(`http://www.omdbapi.com/?i=${this.imdbId}&apikey=10e873c6`);
        console.log(res.data);

        const cardContainer = document.createElement('DIV');
            const cardImage = document.createElement('DIV');
                const img = document.createElement('IMG');
            const cardBody = document.createElement('DIV');
                const title = document.createElement('H5');
                const year = document.createElement('P');
            const cardBtn = document.createElement('DIV');
                const button = document.createElement('BUTTON');

        img.src = res.data.Poster;
        title.src = res.data.Title;
        year.src = res.data.Year;
        parentNode.appendChild(cardContainer);
        cardContainer.classList.add('card');
        // cardContainer.classList.add('max-height');        
        cardContainer.classList.add('container');
        cardContainer.classList.add('nomineeList');
        cardContainer.classList.add('text-center');
        cardContainer.classList.add('rounded');
        cardContainer.classList.add('px-0');
        cardContainer.classList.add('h-25');
        cardContainer.classList.add('w-25');



        cardContainer.appendChild(cardImage);
            cardImage.appendChild(img);
            cardImage.classList.add('px-0');
            cardImage.classList.add('max-height');
            // cardImage.classList.add('py-4');
            cardImage.classList.add('g-0');
                img.classList.add('card-img-top');
                img.classList.add('img-fluid');
                img.classList.add('rounded');
                // img.classList.add('max-height');
             


        cardContainer.appendChild(cardBody);
        cardBody.classList.add('card-body');
            cardBody.appendChild(title);
                title.append(title.src);
            cardBody.appendChild(year);
                year.append(year.src);

        cardContainer.appendChild(cardBtn);
            cardBtn.appendChild(button);
            button.classList.add('btn');
            button.classList.add('btn-sm');
            button.classList.add('btn-danger');
            button.classList.add('btn-block');
            button.classList.add('mb-5');
            // button.classList.add('d-flex')
            button.innerHTML="remove";

            button.addEventListener('click', () => {
                // if(cardContainer.classList.contains("nominaee")){
                //     cardContainer.classList.remove("nominated")
                //     button.classList.remove("btn-danger");
                //     button.innerHTML = "nominate";
                //     button.classList.add("btn-primary");
                    console.log(title.src + "'s nomination removed");
                    if(this.getImdbId()){
                        nominees.splice(nominees.indexOf(this.getImdbId()),1);
                        // if(candidate.getImdbId(this.getImdbId())){
                            cardContainer.classList.remove("nominated")
                            button.classList.remove("btn-danger");
                            button.innerHTML = "nominate";
                            button.classList.add("btn-primary");
                            console.log(this.getImdbId());
                            printNominees();
                            if(hasFiveNominees(nominees)) printBanner();


                        // }
                    }
                    
                    // nominees.filter((item, index) => array.indexOf(item)===index);
                    // nominees.filter((item, index) => nominees.indexOf(item)===index);
            })
    }
}

const printNominees = () => {
    if (document.getElementById("nomineeList")){
        document.getElementById("nomineeList").remove();
    }
    if (document.getElementById("removeYourNomineesText")){
        document.getElementById("removeYourNomineesText").remove();
    }

    const yourNomineesText = document.createElement('H3');
    const cardGroup = document.createElement('DIV');

    nomineeRow.appendChild(yourNomineesText);
    yourNomineesText.innerHTML = "Your Nominees";
    yourNomineesText.setAttribute("id", "removeYourNomineesText");
    yourNomineesText.classList.add('mx-5');
    yourNomineesText.classList.add('my-5');
    
    nomineeRow.appendChild(cardGroup);        
    cardGroup.setAttribute("id", "nomineeList");

    cardGroup.classList.add('card-group');
    cardGroup.classList.add('m-5');
    cardGroup.classList.add('shadow-lg');
    cardGroup.classList.add('p-5');
    cardGroup.classList.add('pg-white');
    cardGroup.classList.add('rounded');
    cardGroup.classList.add('gap-3');
    
    // fillPlaceholder(5);
    // cardGroup.classList.add('col');

    for(let [i, each] of nominees.entries()){
        
        const nominee = new Nominee(each);
        nominee.printNomineeCard(cardGroup);
    }
}


const removePrior = () => {
    if (document.getElementById("toRemove")){
        document.getElementById("toRemove").remove();
    }
}
const removePriorText = () => {
    if (document.getElementById("textToRemove")){
        document.getElementById("textToRemove").remove();
    }
}


function hasFiveNominees(){if(nominees.length<5 || nominees.length>5)  return false; else return true;};

function printBanner(){alert("You have 5 nominees!")};


// const placeholderCards = new Array(0);

// function fillPlaceholder(amount, parent){
//     for(let i=0; i<amount; i++){
//         const nom = document.createElement('H2');
//         parent.appendChild(nom);
//         // nom.innerHTML=i+"st nominee";
//         nom.classList.add('card');
//     }
// }
// function removePlaceholder(){
//     placeholderCards.pop();
// }

