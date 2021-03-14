import mock from '../utils/mock';

mock.onGet('/api/clientes/').reply(200, {

    clientes: [
        {
            cpf: '126599496-03',
            nome: 'José Martins da Rosa Júnior',
            celular: '33984351985',
            data_nascimento: '19/11/1996',
            endereço: 'Rua Francisco Lopes de Souza, nº 88, Santa Tereznha, Lajinha-MG',
            data_inicio: '13/03/2021',

        },
    ],

})