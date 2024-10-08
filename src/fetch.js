// Не совсем понял сделать запрос на чистом js или на vue, но по фразе "в отдельном JS файле" - подумал, что на ваниле.
// На vue в целом то же самое можно через axios

fetch('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network error: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error: ', error);
    });