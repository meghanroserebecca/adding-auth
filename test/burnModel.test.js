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
        return Model()({ whatDoes: 'eats all the cheetos' });
    });
});

//test -invalid
// return (data) => new Model(data)
//         .validate()
//         .then(
//             () => { throw new Error('validation should not have succeeded'); },
//             () => { /* err was expected, nothing to do */ }
//         );
        
// };