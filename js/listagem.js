const API_URL = "http://localhost:8080/notes";

const carregarTreinos = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Erro ao buscar treinos');
        const data = await response.json();
        const table = document.getElementById('treino-table');
        table.innerHTML = '';
        data.forEach(treino => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${treino.weekdayMuscle}</td>
                <td>${treino.exercises}</td>
                <td>${treino.observations}</td>
                <td>
                    <button class="acao-btn" data-id="${treino.id}">Editar</button>
                    <button class="acao-btn excluir" data-id="${treino.id}">Excluir</button>
                </td>
            `;
            tr.querySelector('.acao-btn').addEventListener('click', () => editarLinha(tr, treino));
            tr.querySelector('.excluir').addEventListener('click', () => deletarTreino(treino.id));
            table.appendChild(tr);
        });
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar treinos.");
    }
};

const editarLinha = (tr, treino) => {
    tr.innerHTML = `
        <td><input type="text" value="${treino.weekdayMuscle}" /></td>
        <td><input type="text" value="${treino.exercises}" /></td>
        <td><input type="text" value="${treino.observations}" /></td>
        <td>
            <button class="acao-btn salvar">Salvar</button>
            <button class="acao-btn cancelar">Cancelar</button>
        </td>
    `;
    tr.querySelector('.salvar').addEventListener('click', async () => {
        const inputs = tr.querySelectorAll('input');
        const [weekdayMuscle, exercises, observations] = Array.from(inputs).map(input => input.value);
        try {
            const response = await fetch(`${API_URL}/${treino.id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ weekdayMuscle, exercises, observations })
            });
            if (!response.ok) throw new Error('Erro ao salvar edição');
            await carregarTreinos();
        } catch (error) {
            console.error(error);
            alert("Erro ao salvar edição.");
        }
    });
    tr.querySelector('.cancelar').addEventListener('click', carregarTreinos);
};

const deletarTreino = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este treino?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error('Erro ao excluir treino');
        await carregarTreinos();
    } catch (error) {
        console.error(error);
        alert("Erro ao excluir treino.");
    }
};

document.addEventListener('DOMContentLoaded', carregarTreinos);