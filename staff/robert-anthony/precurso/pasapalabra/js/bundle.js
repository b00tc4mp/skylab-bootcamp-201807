(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){


window.addEventListener('load',init);

let master;

const log = console.log.bind(null);

function init() {
    master = document.getElementById('letter-display');

    const count = 8;
    for (let i=0; i<count;i++){
        const diva = document.createElement('div');
        diva.id = i;
        master.appendChild(diva);
        let {x,y} = returnCoords(100,100,degreesToRad((360/count) * i),50);
        let width = window.getComputedStyle(diva).getPropertyValue('width');
        let height = window.getComputedStyle(diva).getPropertyValue('height');
        diva.style.left = x - Number.parseFloat(width) + "px";
        diva.style.top =  y - Number.parseFloat(height) + "px";
    }

}

function degreesToRad(degrees) {
   return degrees * (Math.PI / 180);

}

function radToDegrees(rad) {
    return radians * (180 / Math.PI);

}

function returnCoords(originX = 0, originY = 0,radians,radius) {
    let x = originX + (Math.cos(radians) * radius);
    let y = originY + (Math.sin(radians) * radius);
    return ({x,y});
}



},{}]},{},[1]);
