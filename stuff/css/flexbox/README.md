# Flexbox
---

Resources:
- [A Complete Guide to Flexbox | CSS-Tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Flexbox Cheatsheet](http://jonibologna.com/flexbox-cheatsheet/)

- [CSS Templates (Examples)](https://www.w3schools.com/css/css_templates.asp)

[Can I use Flexbox?](https://caniuse.com/#search=flexbox)

Flexbox es "single-direction-layout".

Está hecho para crear layouts de una sóla dimensión

## Flex-container
---

Se necesita un container con la propiedad flex.

Todos los hijos directos de ese "flex-container" se convierten en "flex-items".

Por defecto los items se alinean en una fila de izquierda a derecha.

El flex container es por defecto un "block-element" que ocupa todo el espacio disponible en el ancho. 

```css
.container {
    display: flex | inline-flex    
}
```

### Axis (Main and Cross)

Tienes dos "axes", el main y el cross.

Posicionas los elementos respecto al main-axis, que por defecto es de izquierda a derecha.

### Flex-direction
Con flex-direction cambias la dirección del main-axis.

```css
.container {
    flex-direction: row | row-reverse | column | column-reverse;
}
```

### Justify-content

Define la alineación de los elementos respecto al main-axis

```css
.container {
    justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;
}
```

Para posicionar elementos individuales horizontalmente en el main-axis utilizamos margin auto.

### flex property - Make flex-items responsive

Para hacer los elementos de un flex container responsive usamos la propiedad flex.

```css
.container > .items {
    flex: 1;
}
```

Esto hará que los elementos ocupen cada uno 1 "unidad" del espacio disponible y crezcan y se reduzcan según la resolución de la pantalla.

Si por ejemplo tuvieramos 3 "items" en nuestro container flex cada uno ocuparia un 33.3333% pero si añadieramos un cuarto elemento flexbox calcularía automáticamente el espacio por nostros y daría un 25% del espacio a cada elemento.

flex es un shorthand para otras tres propiedades:

- flex-grow
- flex-shrink
- flex-basis

#### flex-basis

Es el ancho base que ocupa el flex-item (px, % etc) si hay espacio en el flex-container

```css
.item {
    flex-basis: 200px;
}
```

En este caso el .item ocuparía 200px de ancho aunque hubiera mas espacio disponible en el flex-container.

#### flex-grow

Define cuanto espacio "crece" un flex-item dentro de del flex-container.

Por defecto es 0

```css
.item {
    flex-grow: 0;
}
```

#### flex-shrink

Define la habilidad de un flex-item para hacerse más pequeño dentro del flex-container.

Por defecto es 1.

```css
.item {
    flex-shrink: 1;
}
```

### Align-items (cross-axis)

Alinea flex-items en el cross-axis.

Alinear todos los elementos con align-items
```css
.container {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

Alinear elementos concretos con align-self (sobre escribe el align-items)

```css
.container {
      align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

### Align-content

Lo mismo que align-items pero cuando hay más de una línea de flex-items.

```css
.container {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### Flex-wrap

[flex-wrap | CSS-Tricks](https://css-tricks.com/almanac/properties/f/flex-wrap/)

Por defecto todos los flex-items se posicionan en una sola fila o columna, depende del flex-direction del main-axis.

Esto es por la propiedad flex-wrap que por defecto es "nowrap".

Si cambiamos esta propiedad a wrap o wrap-reverse.

```css
.container{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

### Flex-flow (shorthand)

```css
.container {
    flex-flow: <flex-direction> || <flex-wrap>
}
```

### Order

Controla el orden de los flex-items en el main axis.

Acepta un valor númerico que puede ser negativo.
Por defecto es 0.



