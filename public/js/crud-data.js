async function getUser() {

    await fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(json => {

            let trHeader = `
                <tr>
                    <th>ID</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            `;

            trBody = '';

            if (json?.data?.length > 0) {
                json.data.map((user, index) => {

                    if (index < 10) {

                        trBody += '<tr>';
                        trBody += '<td>' + user?.id + '</td>';
                        trBody += '<td>' + user?.first_name + '</td>';
                        trBody += '<td>' + user?.last_name + '</td>';
                        trBody += '<td>' + user?.gender + '</td>';
                        trBody += '<td>' + user?.phone + '</td>';
                        trBody += `
                            <td>
                                <button class="button-edit" onClick={handleEditPhoto(${user.id})}>Edit</button>
                                <button class="button-delete">Delete</button>
                            </td>
                            `;
                        trBody += '/<tr>';
                    }

                });

                let displayDataTable = trHeader + trBody;
                document.getElementById('table-user').innerHTML = displayDataTable;

            }

        });

};

getUser();



const handleViewUser = async (id) => {
    await fetch('http://localhost:3000/user/' + id).
        then((response) => response.json()).
        then((json) => {
            document.getElementById('id').value = json?.data.id;
            document.getElementById('first_name').value = json?.data.first_name;
            document.getElementById('last_name').value = json?.data.last_name;
            document.getElementById('gender').value = json?.data.gender;
            document.getElementById('phone').value = json?.data.phone;

        })
}

const handleUpdateUser = () => {

    let newUserInfo = {
        id: document.getElementById('id').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        gender: document.getElementById('gender').value,
        phone: document.getElementById('phone').value,
    }
}

document.getElementById('btn-update').addEventListener('click').handleUpdateUser;