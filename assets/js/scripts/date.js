// script para gerar a data

function dataAtual() {
    const date = moment().locale("pt-br").format('LLL');
    return date;
}