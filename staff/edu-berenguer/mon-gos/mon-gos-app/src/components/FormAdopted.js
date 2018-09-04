import React from 'react'

function FormAdopted() {
    return <div>
    <nav></nav>
    <h1>Formulario de Adopción</h1>

    <p>Datos del Solicitante</p>
    <form>
    <input type="text" name="name" placeholder="Nombre"/>
    <input type="text" name="email" placeholder="Email"/>
    <input type="text" name="phone" placeholder="Teléfono"/>
    <input type="text" name="adress" placeholder="Dirección"/>
    <textarea name="info" id="" cols="30" rows="10" placeholder=""></textarea>
    <input type="submit" value="Enviar"/>
    </form>
    <a href="/"><button>Salir</button></a>
</div>
}

export default FormAdopted