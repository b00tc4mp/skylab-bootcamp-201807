document.body.style.color = 'white'

function MyButton(title) {
    var button = document.createElement('button')

    button.innerText = title

    // demo 1

    // button.addEventListener('click', function() {
    // 	this._callback()
    // }.bind(this))

    // button.addEventListener('click', () => this._callback())

    // demo 2

    // var self = this
    // button.addEventListener('click', function () {
    //     self._callback()

    //     this.style.backgroundColor = 'red'
    // })

    button.addEventListener('click', () => {
        this._callback()

        button.style.backgroundColor = 'red'
    })

    this.element = button
}

MyButton.prototype.onClick = function (callback) {
    this._callback = callback
}

var button1 = new MyButton('button 1')

button1.onClick(function () { console.log('i am button 1') })

document.body.appendChild(button1.element)

var button2 = new MyButton('button 2')

button2.onClick(function () { console.log('i am button 2') })

document.body.appendChild(button2.element)