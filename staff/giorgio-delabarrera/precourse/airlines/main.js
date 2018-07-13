
// Skylab Airlines! ✈️🛩

// (Los datos de los vuelos están al final del enunciado, podéis usarlos en vuestro código)

// Programa una inferfaz de usuario para una aerolinea (por terminal...). Esta aerolinea 
// dispondrá de 10 vuelos para el dia de hoy, para empezar, estos vuelos estarán declarados de manera 
// global, cuando se llame a la función:

// Se preguntará por el nombre de usuario y dará la bienvenida.
// El usuario visualizará todos los vuelos disponibles de una forma amigable: El vuelo con origen: 
// Barcelona, y destino: Madrid tiene un coste de XXXX€ y no realiza ninguna escala.
// A continuación, el usuario verá el coste medio de los vuelos.
// También podrá ver cuantos vuelos efectúan escalas.
// Y, sabiendo que los ultimos 5 vuelos (los últimos 5 ID's) son los últimos del día, muestra al 
// usuario sus destinos.

const flights = [
  {id: 00, from: "Barcelona", to: "New York", cost: 700, scale: false},
  {id: 01, from: "Madrid",    to: "Los Angeles", cost: 1100, scale: true},
  {id: 02, from: "Barcelona", to: "Paris", cost: 210, scale: false},
  {id: 03, from: "Barcelona", to: "Roma", cost: 150, scale: false},
  {id: 04, from: "Madrid",    to: "London", cost: 200, scale: false},
  {id: 05, from: "Barcelona", to: "Madrid", cost: 90, scale: false},
  {id: 06, from: "Madrid",    to: "Tokyo", cost: 1500, scale: true},
  {id: 07, from: "Barcelona", to: "Shangai", cost: 800, scale: true},
  {id: 08, from: "Barcelona", to: "Sydney", cost: 150, scale: true},
  {id: 09, from: "Madrid",    to: "Tel-Aviv", cost: 150, scale: false}
];

// @TODO: parametro por defecto default
const dialog = (message, initial = '') => {
  let response = prompt(message, initial);
  if (response) response = response.trim();
  return (response) ? response : '';
}

const getName = () => {
  let name = '';
  do {
    name = dialog('Introduce tu nombre por favor');
  }
  while (!name);
  return name;
};

const printWelcome = (name) => {
  console.log(`\nBienvenido ${name}`);
}

const printTodayFlights = (flights) => {
  console.log('\nEstos son los vuelos para hoy...');
  flights.forEach(flight => {
    // @TODO: format currency
    let scaleMsg = (flight.scale) ? 'realiza alguna escala' : 'no realiza ninguna escala';
    console.log(`El vuelo con origen: ${flight.from}, y destino: ${flight.to} tiene un coste de ${flight.cost}€ y ${scaleMsg}.`);
  });
};

const getAvgCosts = (flights) => {
  const summation = flights.reduce((accumulator, flight) => accumulator + flight.cost, 0);
  return summation / flights.length;
}

const printAvgFlightCosts = (avg) => {
  // @TODO: format currency
  console.log(`\nEl coste medio de los vuelos es ${avg}€`);
}

const getWithScale = (flights) => {
  return flights.filter(flight => flight.scale === true);
}

const printFlightsWithScale = (flightsWithScale) => {
  console.log(`\nVuelos con escala ${flightsWithScale.length}`);
  flightsWithScale.forEach(flight => {
    // @TODO: format currency
    console.log(`Vuelo ${flight.from} - ${flight.to}, coste ${flight.cost}€.`);
  });
}

const getLastFlights = (flights, lastNum) => {
  return flights.slice(-lastNum);
}

const printLastFlights = (lastFlights) => {
  console.log(`\nÚltimos ${lastFlights.length} vuelos con destino a`);
  lastFlights.forEach(flight => {
    // @TODO: format currency
    console.log(`${flight.to}`);
  });
}

const main = () => {
  
  console.log('---- Skylab Airlines ----');
  const user = {};

  // bienvenida
  user.name = getName();
  printWelcome(user.name);

  // vuelos disponibles
  printTodayFlights(flights);

  // coste medio
  let avg = getAvgCosts(flights);
  printAvgFlightCosts(avg);

  // numero de vuelos con escalas.
  let flightsWithScale = getWithScale(flights);
  printFlightsWithScale(flightsWithScale);

  // ultimos 5 vuelos
  let lastFlights = getLastFlights(flights, 5);
  printLastFlights(lastFlights);
};

main();