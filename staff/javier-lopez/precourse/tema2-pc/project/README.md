# Sintaxis básica markdown

## Título
### Subtítulo

### Lista genérica:
Ejemplo de texto que da entrada a una lista genérica de elementos:

- Elemento 1
- Elemento 2
- Elemento 3

### Lista numerada:

Ejemplo de lista numerada:
1. Elemento 1
2. Elemento 2
    - Anidando dentro de la lista ordenada
    - Otro elemento de la lista
3. Elemento 3

### Encabezados:

# Encabezado 1
## Encabezado 2 
### Encabezado 3
#### Encabezado 4
##### Encabezado 5
###### Encabezado 6

Se puede hacer una regla horizontal para separar cada sección en cada párrafo insertando signos como;
***
---
___
Ejemplo:
### Encabezado 3
---
***
---

## Citas
Para hacer citas podemos utilizar el carácter ">"

> Disfrutaremos mucho en Skylab -.Gerard Basté

## Listas desordenadas
Para crear listas utiliza * asteriscos, - guiones, o + símbolo de suma.

- Elemento de lista 1
- Elemento de lista 2
  * Elemento de lista 3
  * Elemento de lista 4
    + Elemento de lista 5
    + Elemento de lista 6

Da igual el que escoges, se verá igual al procesarse.
Se pueden anidar, en ese caso se modificará el elemento que las precede.

## Códigos de Bloque
Para crear elementos de bloque que contengan código
~~~
Creando códigos de bloque.
Puedes añadir tantas líneas y párrafos como quieras.  
~~~

## Énfasis (negrita y cursiva)

*cursiva*
_cursiva_
**negrita**
__negrita__

Si quieres combinar los dos énfasis sólo tienes que añdir un tercer elemento de la sintaxis de uno de los dos: 
Ejemplo:

***cursiva y negrita***
___cursiva y negrita___

## Link o enlaces
[Página web](http://www.google.es)

## Escribir código puro
Para escribir cógido se envuelve el código en comillas simples: 
Ejemplo:

` Codido puro en markdown `

Otra manera es insertar 4 espacios en cada linea.

    Otra manera de escribir código

Estas dos formas pueden servir para insertar codigo dentro de un bloque de texto

### Insertar código 
Si quieres insertar código de un lenguaje especifico se recomiendo usar los 3 acentos graves para encerrar el código.
"```" "```";

Ejemplo:
```js
function greeting(name){
  console.log("hello" + name);
}
```
## Imagenes
![Texto alternativo](/ruta/a/la/imagen.jpg)


NOTA: Si quieres escribir un elemento reservado de markdown sin que los interprete pon delante la barra invertida "\".
Ejemplo:
\# Markdown 

De esta manera mostramos el asterisco en vez de hacer un título.