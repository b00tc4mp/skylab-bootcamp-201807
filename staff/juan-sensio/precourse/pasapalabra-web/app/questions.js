// preguntas para el juego
var questions = [{
		letter: "a",
		status: 0,
		qArray: [{
				answer: "abducir",
				question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien")
			},
			{
				answer: "albatros",
				question: ("CON LA A. Ave palmípeda marina de hasta 130 cm de longitud, con el plumaje blanco manchado de oscuro en las alas, el pico grande y ganchudo de color naranja, y las alas estrechas y de gran envergadura; habita en los océanos meridionales.")
			},
			{
				answer: "autoridad",
				question: ("CON LA A. Facultad o derecho de mandar o gobernar a personas que están subordinadas.")
			}
		]
	},
	{
		letter: "b",
		status: 0,
		qArray: [{
				answer: "bingo",
				question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso")
			},
			{
				answer: "balbucear",
				question: ("CON LA B. Hablar con dificultad, eliminando sonidos o cambiándolos de lugar, en especial como lo hacen los niños pequeños cuando están aprendiendo a hablar.")
			},
			{
				answer: "brillante",
				question: ("CON LA B. Diamante tallado en facetas por el haz y por el envés.")
			},
		]
	},
	{
		letter: "c",
		status: 0,
		qArray: [{
				answer: "churumbel",
				question: ("CON LA C. Niño, crío, bebé")
			},
			{
				answer: "coco",
				question: ("CON LA C. Fruto del cocotero, de forma casi redonda, corteza muy dura, semilla de carne blanca de sabor agradable y con un líquido dulce en el interior.")
			},
			{
				answer: "cabeza",
				question: ("CON LA C. Parte superior del cuerpo del hombre y superior o anterior del de muchos animales, donde se encuentran algunos órganos de los sentidos y el cerebro.")
			}
		]
	},
	{
		letter: "d",
		status: 0,
		qArray: [{
				answer: "diarrea",
				question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida")
			},
			{
				answer: "dado",
				question: ("CON LA D. Pieza cúbica que se usa en juegos de azar y en cuyas caras hay puntos, de uno hasta seis, o figuras distintas.")
			},
			{
				answer: "dioptría",
				question: ("CON LA D. Unidad de medida que expresa el grado de defecto visual de un ojo.")
			}
		]
	},
	{
		letter: "e",
		status: 0,
		qArray: [{
				answer: "ectoplasma",
				question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación.")
			},
			{
				answer: "eructo",
				question: ("CON LA E. Conjunto de gases del estómago expulsados de una vez por la boca de manera sonora o ruidosa.")
			},
			{
				answer: "evolución",
				question: ("CON LA E. Cambio o transformación gradual de algo, como un estado, una circunstancia, una situación, unas ideas, etc.")
			}
		]
	},
	{
		letter: "f",
		status: 0,
		qArray: [{
				answer: "fácil",
				question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad.")
			},
			{
				answer: "filántropo",
				question: ("CON LA F. Persona que se caracteriza por su amor a las personas en general y que se dedica a trabajar por ellas y procurar su progreso y su bien de manera desinteresada.")
			},
			{
				answer: "fusta",
				question: ("CON LA F. Vara delgada y flexible, generalmente con una correa en uno de sus extremos, que se emplea para estimular al caballo y darle órdenes.")
			}
		]
	},
	{
		letter: "g",
		status: 0,
		qArray: [{
				answer: "galaxia",
				question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partícula.")
			},
			{
				answer: "garabato",
				question: ("CON LA G. Trazo realizado con un instrumento manual de escritura, como un lápiz o una pluma, con el que no se quiere representar nada.")
			},
			{
				answer: "gruñir",
				question: ("CON LA G. Emitir [una persona] sonidos no articulados o palabras murmuradas entre dientes que muestran su enfado o desagrado.")
			}
		]
	},
	{
		letter: "h",
		status: 0,
		qArray: [{
				answer: "harakiri",
				question: ("CON LA H. Suicidio ritual japonés por desentrañamiento.")
			},
			{
				answer: "hippy",
				question: ("CON LA H. Del movimiento contracultural juvenil de carácter pacifista surgido en la década de 1960 que propugnaba principalmente la vida en comunas, la vuelta a la naturaleza y el gusto por la música pop.")
			},
			{
				answer: "honrar",
				question: ("CON LA H. Mostrar respeto y consideración hacia una persona.")
			}
		]
	},
	{
		letter: "i",
		status: 0,
		qArray: [{
				answer: "iglesia",
				question: ("CON LA I. Templo cristiano.")
			},
			{
				answer: "ilustración",
				question: ("CON LA I. Fotografía, dibujo o lámina que se coloca en un texto o impreso para representar gráficamente lo expuesto, ejemplificarlo o hacer más atractivo el resultado.")
			},
			{
				answer: "intruso",
				question: ("CON LA I. [persona] Que se ha introducido en un lugar o reunión sin derecho o autorización.")
			}
		]
	},
	{
		letter: "j",
		status: 0,
		qArray: [{
				answer: "jabalí",
				question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba.")
			},
			{
				answer: "jugar",
				question: ("CON LA J. Realizar una actividad o hacer una cosa, generalmente ejercitando alguna capacidad o destreza, con el fin de divertirse o entretenerse.")
			},
			{
				answer: "jolgorio",
				question: ("CON LA J. Diversión o fiesta animada y bulliciosa.")
			}
		]
	},
	{
		letter: "k",
		status: 0,
		qArray: [{
				answer: "kamikaze",
				question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria.")
			},
			{
				answer: "kiwi",
				question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria.")
			},
			{
				answer: "karma",
				question: ("CON LA K. En la religión budista y en el hinduismo, creencia según la cual toda acción tiene una fuerza dinámica que se expresa e influye en las sucesivas existencias del individuo.")
			}
		]
	},
	{
		letter: "l",
		status: 0,
		qArray: [{
				answer: "licántropo",
				question: ("CON LA L. Hombre lobo.")
			},
			{
				answer: "lámpara",
				question: ("CON LA L. Utensilio que proporciona luz artificialmente.")
			},
			{
				answer: "lustro",
				question: ("CON LA L. Período de cinco años.")
			}
		]
	},
	{
		letter: "m",
		status: 0,
		qArray: [{
				answer: "misantropo",
				question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas")
			},
			{
				answer: "madera",
				question: ("CON LA M. Sustancia dura y fibrosa que forma el tronco y las ramas de los árboles.")
			},
			{
				answer: "motocicleta",
				question: ("CON LA M. Vehículo automóvil de dos ruedas y manubrio, que tiene capacidad para una o dos personas.")
			}
		]
	},
	{
		letter: "n",
		status: 0,
		qArray: [{
				answer: "necedad",
				question: ("CON LA N. Demostración de poca inteligencia.")
			},
			{
				answer: "novedoso",
				question: ("CON LA N. [persona] Que se deja llevar por la imaginación y que suele inventar o explicar historias fantásticas o imaginarias.")
			},
			{
				answer: "nutria",
				question: ("CON LA N. Mamífero del orden de los carnívoros, de unos 90 a 130 cm de longitud (cola incluida), cuerpo alargado muy flexible, cabeza pequeña, hocico afilado, patas cortas, dedos unidos por membranas, cola larga y gruesa, y pelo corto, denso e impermeable, de color pardo brillante, más claro en la garganta; tiene costumbres acuáticas, se alimenta principalmente de peces y vive en madrigueras que construye en las riberas de los ríos.")
			}
		]
	},
	{
		letter: "ñ",
		status: 0,
		qArray: [{
				answer: "señal",
				question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.")
			},
			{
				answer: "patraña",
				question: ("CONTIENE LA Ñ. Mentira o falsedad grande y complicada que se cuenta o se dice a alguien.")
			},
			{
				answer: "ponzoña",
				question: ("CONTIENE LA Ñ. Veneno, sustancia nociva para la salud.")
			}
		]
	},
	{
		letter: "o",
		status: 0,
		qArray: [{
				answer: "orco",
				question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien.")
			},
			{
				answer: "ornamento",
				question: ("CON LA O. Adorno o motivo decorativo que sirve para embellecer una cosa.")
			},
			{
				answer: "orfanato",
				question: ("CON LA O. Establecimiento benéfico en el que se recoge a niños húerfanos.")
			}
		]
	},
	{
		letter: "p",
		status: 0,
		qArray: [{
				answer: "protoss",
				question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft.")
			},
			{
				answer: "pan",
				question: ("CON LA P. Alimento básico que se elabora con una mezcla de harina, generalmente de trigo, agua, sal y levadura, que se amasa y se cuece en un horno en piezas de distintas formas y tamaños; su sabor, color y textura pueden variar según el tipo de harina empleado y los ingredientes secundarios añadidos, como leche, mantequilla, frutos secos, etc.")
			},
			{
				answer: "payaso",
				question: ("CON LA P. Artista de circo, generalmente vestido y maquillado de forma llamativa, que hace gestos y escenificaciones graciosos o grotescos y cuenta chistes para divertir y hacer reír al público.")
			}
		]
	},
	{
		letter: "q",
		status: 0,
		qArray: [{
				answer: "queso",
				question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche.")
			},
			{
				answer: "quilla",
				question: ("CON LA Q. Pieza alargada de madera o de hierro, que va de proa a popa por la parte inferior de una embarcación, y en la que se apoya toda su armazón.")
			},
			{
				answer: "química",
				question: ("CON LA Q. Ciencia que estudia la composición y las propiedades de la materia y de las transformaciones que esta experimenta sin que se alteren los elementos que la forman.")
			}
		]
	},
	{
		letter: "r",
		status: 0,
		qArray: [{
				answer: "ratón",
				question: ("CON LA R. Roedor.")
			},
			{
				answer: "rivalidad",
				question: ("CON LA R. Enfrentamiento, oposición o enemistad entre varios que aspiran a lograr una misma cosa.")
			},
			{
				answer: "rubicón",
				question: ("CON LA R. Nombre de un río de Italia, que César decidió atravesar con su ejército después de muchas vacilaciones.")
			}
		]
	},
	{
		letter: "s",
		status: 0,
		qArray: [{
				answer: "stackoverflow",
				question: ("CON LA S. Comunidad salvadora de todo desarrollador informático.")
			},
			{
				answer: "sociedad",
				question: ("CON LA S. Conjunto de personas que se relacionan entre sí, de acuerdo a unas determinadas reglas de organización jurídicas y consuetudinarias, y que comparten una misma cultura o civilización en un espacio o un tiempo determinados.")
			},
			{
				answer: "suciedad",
				question: ("CON LA S. Facultad o derecho de mandar o gobernar a personas que están subordinadas.")
			}
		]
	},
	{
		letter: "t",
		status: 0,
		qArray: [{
				answer: "terminator",
				question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984.")
			},
			{
				answer: "tomate",
				question: ("CON LA T. Fruto de esta planta, comestible, de piel roja, lisa y brillante, pulpa muy jugosa y semillas amarillas y planas.")
			},
			{
				answer: "tungsteno",
				question: ("CON LA T. Elemento químico de número atómico 74, masa atómica 183,85 y símbolo W (antiguamente Tg ); es un metal sólido de color blanco plateado, dúctil y difícil de fundir, que en la naturaleza aparece combinado con otros metales en sus menas; se usa especialmente en los filamentos de las lámparas incandescentes y en aleaciones de acero duras y resistentes.")
			}
		]
	},
	{
		letter: "u",
		status: 0,
		qArray: [{
				answer: "unamuno",
				question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914.")
			},
			{
				answer: "ultramar",
				question: ("CON LA U. País o territorio situado al otro lado del mar, considerado desde el lugar en que se habla.")
			},
			{
				answer: "uno",
				question: ("CON LA U. Que no está dividido o que forma una unidad.")
			}
		]
	},
	{
		letter: "v",
		status: 0,
		qArray: [{
				answer: "vikingos",
				question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa.")
			},
			{
				answer: "volátil",
				question: ("CON LA V. [sustancia] Que se volatiliza fácilmente en contacto con el aire.")
			},
			{
				answer: "vilipendiar",
				question: ("CON LA V. Mostrar desprecio por una persona o cosa mediante la palabra o los actos.")
			}
		]
	},
	{
		letter: "w",
		status: 0,
		qArray: [{
				answer: "sandwich",
				question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso.")
			},
			{
				answer: "windsurf",
				question: ("CON LA W. Actividad recreativa o deportiva que consiste en deslizarse por el mar sobre una tabla de surf que lleva acoplada una vela; para navegar, la vela se coloca de manera que sea impulsada por la acción del viento, y se maneja mediante un óvalo de madera que va asido al mástil.")
			},
			{
				answer: "wifi",
				question: ("CON LA W. Tecnología que permite conectar diferentes equipos informáticos a través de una red inalámbrica de banda ancha.")
			}
		]
	},
	{
		letter: "x",
		status: 0,
		qArray: [{
				answer: "botox",
				question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética.")
			},
			{
				answer: "xilófono",
				question: ("CON LA X. Instrumento musical de percusión formado por una serie de láminas de madera dispuestas horizontalmente y ordenadas según su tamaño que, al ser golpeadas, emiten sonidos correspondientes a diferentes notas musicales; se toca con dos o cuatro macillas.")
			},
			{
				answer: "xenón",
				question: ("CON LA X. Elemento químico de número atómico 54, masa atómica 131,3 y símbolo Xe ; es un gas noble incoloro e inodoro, que está presente en la atmósfera en cantidades mínimas y se usa en ciertos mecanismos de iluminación.")
			}
		]
	},
	{
		letter: "y",
		status: 0,
		qArray: [{
				answer: "peyote",
				question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos.")
			},
			{
				answer: "yelmo",
				question: ("CON LA Y. Parte de una armadura antigua que cubre y protege la cabeza y el rostro; generalmente se compone de un casco con visera movible.")
			},
			{
				answer: "yacimiento",
				question: ("CON LA Y. Lugar en el que se encuentran de forma natural minerales, rocas o fósiles, especialmente cuando puede ser objeto de explotación.")
			}
		]
	},
	{
		letter: "z",
		status: 0,
		qArray: [{
				answer: "zen",
				question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional.")
			},
			{
				answer: "zapato",
				question: ("CON LA Z. Calzado que cubre total o parcialmente el pie sin sobrepasar el tobillo, con una suela de un material casi siempre más duro que el resto.")
			},
			{
				answer: "zócalo",
				question: ("CON LA Z. Banda horizontal de madera, azulejos, tela, papel pintado, etc., con que se adorna o protege la parte inferior de una pared, que puede levantar pocos centímetros o llegar a media altura.")
			}
		]
	}
];