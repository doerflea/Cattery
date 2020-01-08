var postRequest = new XMLHttpRequest();
var requestURL = "/";

/*Arrays used to stores kitten and adult images sets.
  Corresponding images i.e orange kitten, orange adult are placed in corresponding indices*/
var kittenImgURL = ["images/black-kitten.jpg", "images/orange-kitten.jpg", "images/siamese-kitten.jpg"];
var adultImgURL = ["images/black-adult.jpg", "images/orange-adult.jpg", "images/siamese-adult.jpg"];
var img_num;

//Used to track which cat is currently selected for groom,feed, play incrementation
var cat_in_focus = 0;

//Used to track number of cats and assign to cat# when a cat is made
var cat_tracker = 0;

/*Arrays of cat cards, their images, their stats, and their names
  Used for retrieval of variable when updating*/
var catCards = document.getElementsByClassName('cat-card');
var images = document.getElementsByClassName('catImg');
var play_stats = document.getElementsByClassName("play-stat-text");
var groom_stats = document.getElementsByClassName("groom-stat-text");
var feed_stats = document.getElementsByClassName("feed-stat-text");
var catNames = document.getElementsByClassName("cat-name");

/**
**Function Name: addListToCats
**Input: N/A
**Description: Adds event listener when cat card is created which changes cat_in_focus variable
*/
function addListToCats(){
  for(var i = 0; i < catCards.length; i++){
  catCards[i].addEventListener('click',function(event) {
      catCards[cat_in_focus].style['background-color'] = "white";
      event.currentTarget.style['background-color'] = "#ededf0";
      cat_in_focus = event.currentTarget.getAttribute("data-cat-num");
});
}
}

/**
**Function Name: nameKitten
**Input:N/A
**Description: Opens modal and gets name for new cat card each time a cat card is created.
*/
function nameKitten(){
  var mainModal = document.getElementById('main-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');
  mainModal.classList.remove('hidden');
  modalBackdrop.classList.remove('hidden');

}
//creates a starter cat when window is loaded
window.onload = createCatCard();

//Assigns name or prompts user to enter name when a user selects "enter" on the name modal
var enterButton = document.getElementById("modal-enter");
enterButton.addEventListener('click', function () {getCatName()});

/**
**Function Name: getCatName
**Input:N/A
**Description: Opens modal and gets name for new cat card each time a cat card is created.
*/
function getCatName(){
  var mainModal = document.getElementById('main-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');
  var name = document.getElementById("text-input").value.trim();
  if (!name) {
    alert("Don't be heartless, give you kitty a name!");
  }
  else {
    postRequest.open('POST',requestURL);
    //Send post request with new cat data
    var requestBody = JSON.stringify({
      catName: name,
      catID: "cat" + cat_tracker,
      catNUM: cat_tracker,
      age: 0,
      photoURL: kittenImgURL[img_num],
      color: img_num,
      feedStat: 0,
      groomStat: 0,
      playStat: 0,
      total: 0
    });
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);
    console.log("postSent");

    console.log("name is", name);
        mainModal.classList = 'hidden';
        modalBackdrop.classList = 'hidden';
        catNames[cat_tracker].textContent = name;
        cat_tracker++;
        document.getElementById("text-input").value = "";
  }
}

//detects a button click on enter or return when user is entering cat name
var input = document.getElementById('text-input');
input.addEventListener("keyup", function (event){
  if( event.keyCode === 13){
    var mainModal = document.getElementById('main-modal');
    var modalBackdrop = document.getElementById('modal-backdrop');
    var name = document.getElementById("text-input").value.trim();
    if (!name) {
      alert("Don't be heartless, give you kitty a name!");
    }
    else {
      console.log("name is", name);
      postRequest.open('POST',requestURL);
      //Send post request with new cat data
      var requestBody = JSON.stringify({
        catName: name,
        catID: "cat" + cat_tracker,
        catNUM: cat_tracker,
        age: 0,
        photoURL: kittenImgURL[img_num],
        color: img_num,
        feedStat: 0,
        groomStat: 0,
        playStat: 0,
        total: 0
      });
      postRequest.setRequestHeader('Content-Type', 'application/json');
      postRequest.send(requestBody);
      console.log("postSent");
          mainModal.classList = 'hidden';
          modalBackdrop.classList = 'hidden';
          catNames[cat_tracker].textContent = name;
          cat_tracker++;
          document.getElementById("text-input").value = "";
    }
  }
});



/*
**Function Name: createCatCard
**Input: N/A
**Description: Creates a new cat card using handlebars.
*/
function createCatCard(){
  img_num = 2; // Math.floor(Math.random() * 4); // Generates random number (0-3) in order to select a random cat img from catImage array
  var catHTML = Handlebars.templates.catCard({
    catID: "cat" + cat_tracker,
    catNUM: cat_tracker,
    age: 0,
    photoURL: kittenImgURL[img_num],
    color: img_num,
    feedStat: 0,
    groomStat: 0,
    playStat: 0,
    total: 0
  });
  var cats = document.getElementById('cats');
  cats.insertAdjacentHTML('beforeend',catHTML);
  addListToCats();
  nameKitten();
}



//Event listeners for incrementing stats
var feed = document.getElementById("Feed");
feed.addEventListener('click',  function(){ incrementStat("data-feed-stat", feed_stats) });

var groom = document.getElementById("Groom");
groom.addEventListener('click',  function(){ incrementStat("data-groom-stat", groom_stats) });

var play = document.getElementById("Play");
play.addEventListener('click',  function(){ incrementStat("data-play-stat", play_stats) });



/*
**Function Name: statReset
**Input: N/A
**Description: Resets a cats stats to 0
*/
function statReset(){
  document.getElementById("cat"+cat_in_focus).setAttribute('data-feed-stat', 0);
  document.getElementById("cat"+cat_in_focus).setAttribute('data-groom-stat', 0);
  document.getElementById("cat"+cat_in_focus).setAttribute('data-play-stat', 0);
  document.getElementById("cat"+cat_in_focus).setAttribute('data-total', 0);
  play_stats[cat_in_focus].textContent = "0/2";
  groom_stats[cat_in_focus].textContent = "0/2";
  feed_stats[cat_in_focus].textContent = "0/2";
}


/*
**Function Name: incrementStat
**Input: Attribute being incremented (feed,groom,play).The attribute array.
**Description:Increments currently selected stat(feed,groom,play).
*/
function incrementStat(att,attArray){
  var bored_cat = document.getElementById("cat"+cat_in_focus).getAttribute(att);
  var total = document.getElementById("cat"+cat_in_focus).getAttribute("data-total");
  var age = document.getElementById("cat"+cat_in_focus).getAttribute("data-is-adult");
  var kids = document.getElementById("cat"+cat_in_focus).getAttribute("data-kids");
  if(bored_cat < 2){ //If a stat is less than 2, it is incremeneted
  bored_cat++;
  document.getElementById("cat"+cat_in_focus).setAttribute(att, bored_cat)
  total++;
  document.getElementById("cat"+cat_in_focus).setAttribute('data-total',total);
  attArray[cat_in_focus].textContent = bored_cat + "/2";
  if(total == 6 && age == 1){ //Once total stats hit 6 and the cat is an adult, a kitten is generated
      document.getElementById("cat" + cat_in_focus).setAttribute('data-kids', kids);
      createCatCard();
      alert("A new kitten was born!");
    }
  }
  if(total == 6 && age == 0){ //Once total stats hit 6 if a cat is a kitten, it becomes an adult
    document.getElementById("cat" + cat_in_focus).setAttribute('data-is-adult', 1);
    var color = document.getElementById("cat"+cat_in_focus).getAttribute("data-color");
    images[cat_in_focus].src = adultImgURL[color];
    alert("All grown up!");
    statReset();
  }
}
