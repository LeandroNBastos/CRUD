
document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("user-form");
    const userTable = document.getElementById("user-table").getElementsByTagName("tbody")[0];
    const deleteModal = document.getElementById("delete-modal");
    const closeButton = document.querySelector(".close-button");
    const confirmDeleteButton = document.getElementById("confirm-delete");
    const cancelDeleteButton = document.getElementById("cancel-delete");

    const editModal = document.getElementById("edit-modal");
    const editCloseButton = document.querySelector(".edit-close-button");
    const editForm = document.getElementById("edit-form");
    const editName = document.getElementById("edit-name");
    const editEmail = document.getElementById("edit-email");

    let users = [];
    let editIndex = null;
    let userIdToDelete = null;

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
            // Open Edit Modal
            const index = event.target.dataset.index;
            const user = users[index];
            editName.value = user.name;
            editEmail.value = user.email;
            editIndex = index;
            editModal.style.display = "block";
        } else if (event.target.classList.contains("delete")) {
            // Open Delete Modal
            userIdToDelete = event.target.dataset.index;
            deleteModal.style.display = "block";
        }
    });

    // Function to render table
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

    // Function to close delete modal
    function closeModal() {
        deleteModal.style.display = "none";
        userIdToDelete = null;
    }

    // Function to close edit modal
    function closeEditModal() {
        editModal.style.display = "none";
        editForm.reset();
        editIndex = null;
    }

    // Event listeners for modal buttons
    closeButton.addEventListener("click", closeModal);
    cancelDeleteButton.addEventListener("click", closeModal);
    confirmDeleteButton.addEventListener("click", () => {
        if (userIdToDelete !== null) {
            users.splice(userIdToDelete, 1);
            renderTable();
            closeModal();
        }
    });

    editCloseButton.addEventListener("click", closeEditModal);

    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (editIndex !== null) {
            users[editIndex].name = editName.value;
            users[editIndex].email = editEmail.value;
            renderTable();
            closeEditModal();
        }
    });

    // Initial render
    renderTable();
});
