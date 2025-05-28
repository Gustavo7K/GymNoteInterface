const formulario = document.querySelector("form");
const Inome = document.querySelector("[name='nome']");
const Iexercicios = document.querySelector("[name='exercicios']");
const Iobs = document.querySelector("[name='obs']");

function cadastrar(){
    fetch("http://localhost:8080/notes/create", {
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
        weekdayMuscle: Inome.value,
        exercises: Iexercicios.value,
        observations: Iobs.value
})
    })
    .then(res => res.json())
    .then(data => {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "listagem.html";
    })
    .catch(err => console.log(err));
}

function limparCampos(){
    Inome.value = "";
    Iexercicios.value = "";
    Iobs.value = "";
}

formulario.addEventListener ('submit', function(event) {
    event.preventDefault();
    cadastrar();
    limparCampos();
});
