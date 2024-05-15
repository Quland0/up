function parseDate(dateStr) {
    const cleanDateStr = dateStr.replace(' GM', '');
    return new Date(cleanDateStr);
}

async function fetchAnnouncements() {
    try {
        const response = await axios.get('https://fd7fc8909d3c9f4a.mokky.dev/announcement');
        const announcements = response.data;
        const announcementList = document.getElementById('announcementList');
        announcementList.innerHTML = '';
        announcements.forEach(announcement => {
            const announcementHTML = `
                <div class="announcement">
                    <div class="media">
                        <img src="${announcement.user_avatar}" alt="Аватар пользователя">
                        <div class="media-info">
                            <h5 class="mt-0">${announcement.a_title}</h5>
                            <p>${announcement.a_description}</p>
                            <small class="small-text">Добавлено: ${announcement.username} ${announcement.lastname} - ${parseDate(announcement.date_created).toLocaleString()}</small>
                        </div>
                        <button class="btn-delete" onclick="deleteAnnouncement(${announcement.id})">Удалить</button>
                    </div>
                </div>
            `;
            announcementList.innerHTML += announcementHTML;
        });
    } catch (error) {
        console.error('Ошибка при получении объявлений:', error);
    }
}

async function deleteAnnouncement(announcementId) {
    try {
        await axios.delete(`https://fd7fc8909d3c9f4a.mokky.dev/announcement/${announcementId}`);
        fetchAnnouncements();  // Обновляем список после удаления
    } catch (error) {
        console.error('Ошибка при удалении объявления:', error);
    }
}

async function addAnnouncement(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    try {
        await axios.post('https://fd7fc8909d3c9f4a.mokky.dev/announcement', {
            a_title: title,
            a_description: description
        });
        fetchAnnouncements(); 
        document.getElementById('title').value = '';  
        document.getElementById('description').value = '';
    } catch (error) {
        console.error('Ошибка при добавлении объявления:', error);
    }
}

document.getElementById('addAnnouncementForm').addEventListener('submit', addAnnouncement);

window.onload = fetchAnnouncements;
