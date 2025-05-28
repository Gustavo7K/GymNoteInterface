window.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:8080/notes")
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById('treino-table');
            table.innerHTML = '';
            data.forEach(treino => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${treino.weekdayMuscle}</td>
                    <td>${treino.exercises}</td>
                    <td>${treino.observations}</td>
                `;
                table.appendChild(tr);
            });
        });
});