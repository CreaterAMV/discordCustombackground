//META{"name":"CustomBackgrounds","author":"YourName","version":"1.0.0","description":"Заменяет фон div-ов на изображения пользователей."}*//

class CustomBackgrounds {
    constructor() {
        this.userImages = {
            "Creater_AMV": "https://i.ytimg.com/vi/zzycLWAbkz0/maxresdefault.jpg",
            "Douglas": "https://avatars.mds.yandex.net/i?id=a5e15755eb4199d519ba47dbe2ec8d66f3518a5e-9833405-images-thumbs&n=13",
            "Ilytess": "https://avatars.mds.yandex.net/i?id=c661a9a334a85c206fced563a34b7529_l-5310457-images-thumbs&n=13",
	    "BazzOf": "https://avatars.mds.yandex.net/i?id=1f5a34f10e4cdd547723134e856145f5a272c59f49776f67-3693813-images-thumbs&n=13",
	    "_Nikman": "https://i.ytimg.com/vi/9wOAyDY4Q4g/maxresdefault.jpg",
	    "artx_fellw": "https://i.pinimg.com/736x/08/77/3e/08773e2ba1e34956e2d3c2e1a1516ac5.jpg",
	    "огурец": "https://i.pinimg.com/736x/db/58/c3/db58c3bd59652e9b0e9fa7ca9206f8c4.jpg",
	    "Z_FURRY_V": "https://avatars.mds.yandex.net/i?id=39daee1d62daa8044d04b16509c5fb356e0571a5-4143030-images-thumbs&n=13",
	    "Ivaigor_Zone": "https://m.media-amazon.com/images/M/MV5BM2ZlZWRkZjgtYmU4MS00MjY3LThmMzEtNWE3NTRhMGYwNGNlXkEyXkFqcGdeQXVyMTIwODk1NTQ@._V1_.jpg"
		
        };

        // Создаем массив ключей для регулярного выражения
        this.userKeys = Object.keys(this.userImages).map(user => user.replace(/([.*+?^${}()|\[\]\\])/g, '\\\$1')); // Экранируем специальные символы
    }

    start() {
        console.log("Таймер запущен");
        this.updateBackgrounds();
        this.interval = setInterval(() => this.updateBackgrounds(), 4000);
    }

    stop() {
        clearInterval(this.interval);
    }

    updateBackgrounds() {
        console.log("Обновление фонов");
        const divs = document.querySelectorAll('div');
        const regexVoiceUser  = /^voiceUser_/;

        // Фильтрация div-ов по классу, который начинается с "voiceUser _"
        const voiceUsers = Array.from(divs).filter(div => {
            return Array.from(div.classList).some(className => regexVoiceUser.test(className));
        });

        console.log("Фильтрация", voiceUsers.length); // Выводим количество отфильтрованных элементов

        voiceUsers.forEach(div => {
            const username = div.textContent.trim(); // Удаляем лишние пробелы
            console.log("Назначение имени:", username);

            // Проверяем, существует ли изображение для данного имени пользователя
            const matchedUser  = this.userKeys.find(userKey => username.startsWith(userKey));
            if (matchedUser ) {
                console.log("Имя найдено:", matchedUser );
                // Заменяем фон на изображение из userImages
                div.style.backgroundImage = `url(${this.userImages[matchedUser ]})`;
                div.style.backgroundSize = 'cover'; // Устанавливаем размер фона
                div.style.backgroundPosition = 'center'; // Центрируем изображение
            } else {
                console.log("Имя не найдено:", username);
                div.style.backgroundImage = 'none';
            }
        });
    }
}

module.exports = CustomBackgrounds;
