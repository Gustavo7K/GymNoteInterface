const formulario = document.querySelector("form");
const Inome = document.querySelector("[name='nome']");
const Iexercicios = document.querySelector("[name='exercicios']");
const Iobs = document.querySelector("[name='obs']");

function cadastrar(){
    fetch("http//:localhost:8080/cadastrar", 
        {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                nome: Inome.value,
                exercicios: Iexercicios.value,
                obs: Iobs.value
            })
        })
        .then(function (res){console.log(res)})
        .catch(function (res){console.log(res)})
}; 

function limparCampos(){
    Inome.value = "";
    Iexercicios.value = "";
    Iobs.value = "";
}

formulario.addEventListener ('submit', function(event) {
    event.preventDefault();
    cadastrar();
    limparCampos();
    alert("Cadastro realizado com sucesso!");
});
