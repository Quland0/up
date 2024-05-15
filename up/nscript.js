
async function fetchNews() {
    try {
        const response = await axios.get('https://fd7fc8909d3c9f4a.mokky.dev/news');
        const news = response.data;
        const newsList = document.getElementById('newsList');
        newsList.innerHTML = '';
        news.forEach(newsItem => {
            const listItem = document.createElement('li');
            const titleElement = document.createElement('h2');
            const descriptionElement = document.createElement('p');
            const deleteButton = document.createElement('button');
            titleElement.textContent = newsItem.title;
            descriptionElement.textContent = newsItem.description;
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => deleteNews(newsItem.id));
            deleteButton.classList.add('btn-delete');
            listItem.appendChild(titleElement);
            listItem.appendChild(descriptionElement);
            listItem.appendChild(deleteButton);
            newsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}

async function addNews(event) {
    event.preventDefault(); 
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    try {
  
        await axios.post('https://fd7fc8909d3c9f4a.mokky.dev/news', { title, description });
        fetchNews();
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    } catch (error) {
        console.error('Error adding news:', error);
    }
}


async function deleteNews(newsId) {
    try {
        await axios.delete(`https://fd7fc8909d3c9f4a.mokky.dev/news/${newsId}`);
        fetchNews();
    } catch (error) {
        console.error('Error deleting news:', error);
    }
}

window.onload = fetchNews;

document.getElementById('addNewsForm').addEventListener('submit', addNews);
