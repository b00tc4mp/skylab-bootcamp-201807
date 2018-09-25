
//     /**
//      * Comandos perfil usuario
//      */

//     registerHostess(email, password) { return true },

//     registerBusiness(email, password) { return true },

//     authenticateHostess(email, password) { return hostess._doc._id },

//     authenticateBusiness(email, password) { return business._doc._id},

//     updatePasswordHostess(email, password, newPassword) { return true },

//     updatePasswordBusiness(email, password, newPassword) { return true },

//     retrieveHostess(idH) { return hostess },

//     retrieveBusiness(idB) { return business},

//     editHostessProfile(id, password, name, birth, origin, phone, myself, gender, languages, jobType, photo) { return true},

//     editBusinessProfile(id, password, name, web, boss, phone, philosophy, businessCard) { return true },

//     unregisterHostess(email, password) { return true},

//     unregisterBusiness(email, password) { true },

//     /**
//      * Comandos hostess
//      */

//     searchWorkers(gender, languages, jobType) { return hostesses }, tested

//     sendRequest(idB, idH) { return true }, tested

//     acceptRequest(idH, idB) { return business._doc }, PUTISIMO TEST

//     businessEvents(idB) { return business }, DEEP POPULATION

//     joinToEvent(idH, idE) { return true}, HACER BIEN EL PUTO TEST

//     newEvent(idB, location, date, hours, title, goal) { return idE }, tested

//     makeBriefing(idE, contactName, contactPhone, briefing) { true }, tested

//     closeEvent(idE, idH) { return true }, tested

//     iAssist(idE, idH) { return true } tested





    // false && describe('return all details of the event', () => {
    //     let id

    //     beforeEach(() => {
    //         return Events.insertMany(events)
    //             .then(() => {
    //                 return Events.findOne({ "location": "barcelona" })
    //             })
    //             .then((event) => {
    //                 return id = event._id
    //             })
    //     })

    //     it('should retrieve an event', () =>
    //         logic.retrieveEvent(id)

    //             .then(event => {
    //                 expect(event).to.exist
    //                 expect(event.title).to.equal("the title")
    //             })
    //     )
    // })



    // false && describe('show the company events to the hostess', () => {
    //     beforeEach(() => Business.insertMany(businesses))

    //     it('should show the company events', () =>
    //         logic.authenticateBusiness('business1@mail.com', password)
    //             .then(idB => {
    //                 return logic.newEvent(idB, 'Barcelona', 'dates', 'hours to work', 'title of the event', 'final goal')
    //                     .then(() => logic.newEvent(idB, 'Kiribati', 'data', 'afterworks', 'eventus', 'asi sera'))
    //                     .then(() => logic.showEventsAsHostess(idB))
    //                     .then(events => {
    //                         expect(events).to.exist
    //                         expect(events.length).to.equal(2)
    //                         expect(events[0].goal).to.equal('final goal')
    //                         expect(events[1].goal).to.equal('asi sera')


    //                     })
    //             })
    //     )
    // })

    /**
     * Como puedo meter ids en hostess.events ????????? es una liada sino
     */

    // false && describe('show the hostess events', () => {
    //     beforeEach(() => {
    //         Business.insertMany(businesses)
    //         return Hostess.insertMany(hostesses)
    //     })

    //     it('should show the hostess events', () =>
    //         logic.authenticateBusiness('business1@mail.com', password)
    //             .then(idB => {
    //                 return logic.newEvent(idB, 'Barcelona', 'dates', 'hours to work', 'title of the event', 'final goal')
    //                     .then(() => logic.newEvent(idB, 'Kiribati', 'data', 'afterworks', 'eventus', 'asi sera'))
    //                     .then(() => logic.authenticateHostess('host1@mail.com', password))
    //                     .then(() => logic.showEvents(idB))
    //                     .then(events => {
    //                         
    //                         expect(events).to.exist
    //                         expect(events.length).to.equal(2)
    //                         expect(events[0].goal).to.equal('final goal')
    //                         expect(events[1].goal).to.equal('asi sera')
    //                     })
    //             })
    //     )
    // })
    /**
     * claro, dice que events no exist, porque no estan añadidos pero la funcion funciona
     * populeo todo? quiero que se vena las demas candidatas. YES las confirmed
     */

    // false && describe('show the hostess events', () => {
    //     beforeEach(() => Hostess.insertMany(hostesses))

    //     it('should show the hostess events', () =>
    //         logic.authenticateHostess('host1@mail.com', password)
    //             .then(idH => logic.myEvents(idH))
    //             .then(events => {
    //                 
    //                 expect(events).to.exist
    //             })
    //     )
    // })

    /**
     * mirar lo que dice el test
     * en mongo se crea el evento y se suma la candidata
     */

 

    /**
     * hay algo mal en este test. Me borra toda la base de datos antes de finalizar la funcion
     */
    false && describe('send request to the host', () => {
        beforeEach(() => {
            Business.insertMany(businesses)
            return Hostess.insertMany(hostesses)
        })

        let idHost = ''

        it('should send a busines request to the hostess', () => {
            logic.authenticateHostess('host1@mail.com', password)
                .then(idH => {
                    idHost = idH
                    
                    return logic.authenticateBusiness('business1@mail.com', password)
                        .then(idB => logic.sendRequest(idB, idHost))
                        .then(res => {
                            
                            expect(res).to.be.true
                        })
                })
            // .then(idB => {
            //     
            //     return logic.sendRequest(idB, idHost)
            // })
            // .then(res => {
            //     
            //     expect(res).to.be.true
            // })
        })
    })



//         // beforeEach(() => {
//         //     return Hostess.insertMany(hostesses)
//         //         .then(hostesses => {
//         //             return hostesses
//         //         })
//         //         .then(hostesses => {
//         //             return Business.create(business1)
//         //                 .then(business => {
//         //                     business.selected.push(...hostesses.map(hostess => hostess._id))

//         //                     return business.save()
//         //                 })
//         //         })
//         // })


//         /**
//          * GOD BLES YOU
//          */
// //  db.students.update(
// //    { _id: 1 },
// //    { $push: { scores: 89 } }
// // )



//     /**
//      * usless function
//      */

//     retrieveEvent(idE) {
//         return Promise.resolve()
//             .then(() => {
//                 return Events.findById(idE).populate('candidates').populate('approved').populate('confirmed').populate('business')
//             })
//             .then(event => {
//                 if (!event) throw new LogicError('can not find the event')
//                 return event
//             })
//     },




//     /** BORRROR DOS FUNCIONES
//      * hacer el maldito test y comprovar que se repopula todo
//      * juntar con la funcion de abajo si esta repopulacion extrema funciona
//      * showEvents(id)
//      * se puede mandar todo a retrieveBusines
//      */

//     showEvents(idB) {
//         return Promise.resolve()
//             .then(() => {
//                 return Business.findById(idB).populate({ path: 'events', populate: { path: 'candidates', path: 'approved', path: 'confirmed' } })

//                 // return Business.findById(idB).populate('events')
//             })
//             .then(business => {
//                 return business._doc.events
//             })
//     },

//     /**
//      * se puede repopular? si
//      */
//     showEventsAsBusiness(idB) {
//         return Promise.resolve()
//             .then(() => {
//                 return Business.findById(idB).populate({ path: 'events', populate: { path: 'candidates' } })
//             })
//     },

//     /**
//      * myEvents funciona pero no se como añadirle eventos desde el test
//      * se une a retrieveHostess
//      * 
//      * BORRARLA
//      */

//     myEvents(idH) {
//         return Promise.resolve()
//             .then(() => {
//                 debugger
//                 return Hostess.findById(idH).populate('toConfirm').populate('toAssist')
//             })
//             .then(hostess => {
//                 return hostess._doc
//             })
//     },









//     /**
//      * CONTINU HERE
//      */


//     addFavs(emailHost, emailBus) {

//         let idHost

//         return Promise.resolve()
//             .then(() => Hostess.findOne({ email: emailHost }))
//             .then(host => {
//                 idHost = host.id
//                 return Business.findOne({ email: emailBus })
//             })
//             .then(business => {
//                 business._doc.favs.push(idHost)
//                 return business.save()
//             })
//             .then(() => true)

//     },

//     addHostess(emailBus, emailHost) {

//         let idHost

//         return Promise.resolve()
//             .then(() => {
//                 if (!emailBus) throw new LogicError('Missing the business in charge of this event')
//                 if (!emailHost) throw new LogicError('You should select at least one hostess for your event')

//                 return Hostess.findOne({ email: emailHost })
//             })
//             .then(host => {
//                 idHost = host.id
//                 return Business.findOne({ email: emailBus })
//             })
//             .then(business => {
//                 business._doc.selected.map(selectedId => {
//                     if (selectedId === idHost) throw new LogicError('Hostess already selected')
//                 })

//                 business._doc.selected.push(idHost)
//                 return business.save()
//             })
//             .then(() => true)
//     },


    

//     false && describe('list hostesses', () => {
//         beforeEach(() => Hostess.insertMany(hostesses))

//         it('should list correctly', () =>
//             logic.hostesDetails('host1@mail.com')
//                 .then(listed => {
//                     expect(listed).to.exist
//                     expect(listed.length).to.equal(1)
//                     expect(listed[0].email).to.equal('host1@mail.com')
//                     expect(listed[0].height).to.equal(150)
//                 })
//         )

//         it('should fail with empty email', () =>
//             logic.hostesDetails('')
//                 .catch(err => err)
//                 .then(({ message }) => expect(message).to.equal('There is no hostess selected'))
//         )
//     })

//     false && describe('add to favorites', () => {
//         beforeEach(() =>
//             Promise.all([
//                 Hostess.insertMany(hostesses),
//                 Business.insertMany(business1)])
//         )

//         it('should add a hostess to the favorites of a company', () =>
//             logic.addFavs('host1@mail.com', 'business1@mail.com')
//                 .then(res => expect(res).to.be.true)

//         )
//     })

//     false && describe('select hostesses', () => {
//         beforeEach(() =>
//             Promise.all([
//                 Hostess.insertMany(hostesses),
//                 Business.insertMany(business1)])
//         )

//         it('should select hostess for an event', () =>
//             logic.addHostess('business1@mail.com', 'host1@mail.com')
//                 .then(res => {
//                     expect(res).to.be.true
//                 })
//         )

//         it('should fail if the business email is missing', () =>
//             logic.addHostess()
//                 .catch(err => err)
//                 .then(({ message }) => {
//                     expect(message).to.equal('Missing the business in charge of this event')
//                 })
//         )

//         it('should fail if the hostess email is missing', () =>
//             logic.addHostess('business1@mail.com', '')
//                 .catch(err => err)
//                 .then(({ message }) => expect(message).to.equal('You should select at least one hostess for your event'))
//         )

//         it('should fail if the hostess is already selected', () =>
//             logic.addHostess('business1@mail.com', 'host1@mail.com')
//                 .then(() => {
//                     return logic.addHostess('business1@mail.com', 'host1@mail.com')
//                         .catch(err => {
//                             debugger
//                             return err
//                         })
//                         .then(({ message }) => {
//                             debugger
//                             expect(message).to.equal('Hostess already selected')
//                         })
//                 })
//         )
//     })