// script.js
document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("user-form");
    const userTable = document.getElementById("user-table").getElementsByTagName("tbody")[0];
    let users = [];
    let editIndex = null;

    userForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (editIndex === null) {
            // Create
            const newUser = { id: Date.now(), name, email };
            users.push(newUser);
        } else {
            // Update
            users[editIndex].name = name;
            users[editIndex].email = email;
            editIndex = null;
        }

        userForm.reset();
        renderTable();
    });

    userTable.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit")) {
            // Edit
            const index = event.target.dataset.index;
            const user = users[index];
            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;
            editIndex = index;
        } else if (event.target.classList.contains("delete")) {
            // Delete
            const index = event.target.dataset.index;
            users.splice(index, 1);
            renderTable();
        }
    });

    function renderTable() {
        userTable.innerHTML = "";
        users.forEach((user, index) => {
            const row = userTable.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Editar</button>
                    <button class="delete" data-index="${index}">Excluir</button>
                </td>
            `;
        });
    }
});
