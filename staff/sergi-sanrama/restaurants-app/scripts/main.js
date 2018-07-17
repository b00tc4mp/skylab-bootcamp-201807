function Component (type, className){
    var newElement = document.createElement(type || 'div'); //crea el element, y ho igualem per poderho utilitzar

    if(className){
        newElement.classList.add(className);//condicional, si te clase, que l'apliqui amb la funcio classList
    }

    this.element = newElement; // guardem el element creat dins de element. fora per accedir tindriem que fer XXX.element

}


function SearchPanel(){

    Component.call(this, 'form', 'searchPanel'); // li diem q heredi de component

    var input = new Component('input', 'searchPanel__input');
    var button = new Component('button', 'searchPanel__button');

    this.element.appendChild(input.element); 
    this.element.appendChild(button.element);
}

SearchPanel.prototype = Object.create(Component.prototype);
SearchPanel.prototype.constructor = SearchPanel;


var myFirstPanel = new SearchPanel(); // *temporal* per mostrar per pantalla
document.body.appendChild(myFirstPanel.element); //https://www.w3schools.com/jsref/met_node_appendchild.asp

function List (){
    Component.call(this, 'ul', 'searchPanel__list')

    var li 




}