function getRandomFamily() {
    fetch('ohana_py/ohana.json')
    .then(response => response.json())
    .then(data => {
        const flattenedData = data.flat();

        const randomItem = flattenedData[Math.floor(Math.random() * flattenedData.length)];

        console.log(flattenedData);

        document.getElementById('family-name').textContent = randomItem.family_name;
        document.getElementById('donation-link').innerHTML = randomItem.donation_link;
        document.getElementById('description').textContent = randomItem.description;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

document.getElementById('support').addEventListener('click', getRandomFamily);