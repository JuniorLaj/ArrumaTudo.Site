import mock from '../utils/mock';

mock.onGet('/api/serviços/').reply(200, {

    serviços: [
        {
            id: '1',
            modelo: 'Computador RX - 1312',
            defeito: 'Tela não liga',
            status: 'consertado',
            funcionario: 'José Martins da Rosa Júnior'
        },
        {
            id: '2',
            modelo: 'Notebook Acer X5',
            defeito: 'Teclado não funciona',
            status: 'em manutenção',
            funcionario: 'José Martins da Rosa Júnior'

        },
    ]
})
