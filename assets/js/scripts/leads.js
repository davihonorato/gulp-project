// script para contagem de leads com jquery
$(".btn.curso").on("click", function() {
    const data = dataAtual();
    const mensagem =  "Se isso fosse um projeto real, você seria redirecionado para a página do curso e seria um possível lead. Obrigado pelo interesse no projeto. \n\n" + data;
    
    window.alert(mensagem);
});