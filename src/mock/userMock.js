import mock from '../utils/mock';

mock.onGet('/api/funcionarios/').reply(200, {

    funcionarios: [
        {
            cpf: '4790705',
            nome: 'José Martins da Rosa Júnior',
            Salário: 3.7,
            Jornada: 67,
        },
        {
            cpf: '0540512',
            nome: 'Milene',
            Salário: 3.7,
            Jornada: 67,
        },
        {
            cpf: '405487',
            nome: 'Gustavo',
            Salário: 3.7,
            Jornada: 67,
        },
        {
            cpf: '04545097',
            nome: 'Carlos',
            Salário: 3.7,
            Jornada: 67,
        },
    ],

})