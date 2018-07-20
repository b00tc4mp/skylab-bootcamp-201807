class Component {
	constructor(tag) {
		this.element = document.createElement(tag)
    }
	size(width, height) {
		this.element.style.width = width
		this.element.style.height = height
    }
	move(x, y) {
		this.element.style.top = `${++y}px`
		this.element.style.left = `${++x}px`
    }
}

class Panel extends Component {
	constructor(tag, title) {
		super(tag)

		var h1 = document.createElement('h1')
		h1.innerText = title

		this.element.appendChild(h1)
    }
	move(x, y) {
		//this.element.style.top = y
		//this.element.style.left = x
		super.move(3 * x, 3 * y) // make step 3 times bigger for panels
    }
}

//var panel = new Component('div')

var panel = new Panel('div', 'hola mundo')

panel.size('100px', '100px')

panel.element.style.backgroundColor = 'red'
panel.element.style.position = 'absolute'

document.body.appendChild(panel.element)


let x = 0, y = 0;
const interval = setInterval(() => {
	panel.move(++x, ++y)
	
	if(x === 100) clearInterval(interval)
}, 100)