window.onload = init;

var devLink;
var designLink;
var cvLink;
var dev;
var design;
var cv;
var divs;
var mappy = {"dev-link": "#development", "design-link": "#design", "cv-link": "#cv"};

function handleMenuClick(e) {
  var id = e.target.id;
  var mappyKeys = Object.keys(mappy);
  mappyKeys.forEach(function(element) {
    console.log(element);

    if (element === id) {
      TweenMax.to(mappy[element],0.25, {opacity:1,display:"grid"});
    } else {
      TweenMax.to(mappy[element],0.25, {opacity:0,display:"none"});
    }
    document.getElementById('location').innerHTML = mappy[id].substring(1);
  });

}

function init() {
  window.removeEventListener('onload', init);

  devLink = document.getElementById('dev-link');
  designLink = document.getElementById('design-link');
  cvLink = document.getElementById('cv-link');
  dev = document.getElementById('development');
  design = document.getElementById('design');
  cv = document.getElementById('cv');

  divs = [dev, design, cv];


  devLink.addEventListener('click', handleMenuClick);
  designLink.addEventListener('click', handleMenuClick);
  cvLink.addEventListener('click', handleMenuClick);
  console.log("loaded");

}


