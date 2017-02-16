const Burner = require('../lib/models/burnPeeps.js');


describe('Burner model', () => {

    const Model = function(Burner) {

        return(data) => new Burner(data)
            .validate()
            .then(
                () => {throw new Error('validation should not have succeeded!');},
                () => {}
            );
    };

    it('requires a name', () => {
        return Model(Burner)({ whatDoes: 'eats all the cheetos', thereFor: 'no known reason' });
    });

    it('requires a whatDoes', () => {
        return Model(Burner)({name: 'deep playa dust bunny', thereFor: 'contemplating the barren landscape'});
    });

    it('requires thereFor', () => {
        return Model(Burner)({name: 'basic bro', whatDoes: 'wanders around trying to find other bros and/or an orgy dome'});
    });

    it('is valid with name, whatDoes and thereFor', () => {
        return new Burner({ name: 'sparklepony', whatDoes: 'looks fab, shirks work', thereFor: 'visual furniture'}).validate();
    })
});
