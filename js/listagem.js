window.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http//:localhost:8080/cadastrar'); 
    const treinos = await response.json();

    const table = document.getElementById('treino-table');
    table.innerHTML = '';

    treinos.forEach(treino => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${treino.nome}</td>
            <td>${treino.exercicios}</td>
            <td>${treino.obs}</td>
            <td>
                <!-- Botões de ação, se desejar -->
            </td>
        `;
        table.appendChild(tr);
    });
});