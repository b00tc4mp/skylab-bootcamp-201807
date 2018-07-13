var person = {
    set name(name) {
        if (typeof name !== 'string' || !name.length) throw Error('invalid name: ' + name);

        this._name = name;
    },

    get name() { return this._name; }
};

person.name = 'Peter';

console.log(person.name); // Peter

person.name = 123;