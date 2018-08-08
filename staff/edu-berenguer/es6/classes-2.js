class Component {
	constructor(tag) {
		this.element = document.createElement(tag)
    }
	size(width, height) {
		this.element.style.width = width
		this.element.style.height = height
    }
	move(x, y) {
		this.element.style.top = y
		this.element.style.left = x
    }
}

class Panel extends Component {
	constructor(tag, title) {
		super(tag)

		var h1 = document.createElement('h1')
		h1.innerText = title

		this.element.appendChild(h1)
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
	panel.move(`${++x}px`, `${++y}px`)
	
	if(x === 100) clearInterval(interval)
}, 100)