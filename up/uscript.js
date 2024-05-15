async function fetchUsers() {
    try {
        const response = await axios.get('https://fd7fc8909d3c9f4a.mokky.dev/users');
        const users = response.data;
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        users.forEach(user => {
            const listItem = document.createElement('li');
            const avatarElement = document.createElement('img');
            const userDetails = document.createElement('div');
            const nameElement = document.createElement('h2');
            const lastNameElement = document.createElement('p');
            avatarElement.src = user.avatar;
            nameElement.textContent = `${user.name} ${user.lastname}`;
            lastNameElement.textContent = `ID: ${user.id}`;
            userDetails.appendChild(nameElement);
            userDetails.appendChild(lastNameElement);
            listItem.appendChild(avatarElement);
            listItem.appendChild(userDetails);
            usersList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function searchUser() {
    const userId = document.getElementById('userId').value;
    try {
        const response = await axios.get(`https://fd7fc8909d3c9f4a.mokky.dev/users/${userId}`);
        const user = response.data;
        const usersList = document.getElementById('usersList');
        usersList.innerHTML = '';
        if (user && Object.keys(user).length > 0) {
            const listItem = document.createElement('li');
            const avatarElement = document.createElement('img');
            const userDetails = document.createElement('div');
            const nameElement = document.createElement('h2');
            const lastNameElement = document.createElement('p');
            avatarElement.src = user.avatar;
            nameElement.textContent = `${user.name} ${user.lastname}`;
            lastNameElement.textContent = `ID: ${user.id}`;
            userDetails.appendChild(nameElement);
            userDetails.appendChild(lastNameElement);
            listItem.appendChild(avatarElement);
            listItem.appendChild(userDetails);
            usersList.appendChild(listItem);
        } else {
            usersList.innerHTML = '<li>Пользователь с указанным ID не найден</li>';
        }
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error);
    }
}

window.onload = fetchUsers;
