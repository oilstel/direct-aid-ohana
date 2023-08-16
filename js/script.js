fetch('ohana_py/ohana.json')
.then(response => response.json())
.then(data => {
    // The data might be nested since there could be multiple tables
    const flattenedData = data.flat();


    // Randomly select an item
    const randomItem = flattenedData[Math.floor(Math.random() * flattenedData.length)];

    console.log(flattenedData);

    // Update the HTML with the selected item
    document.getElementById('family-name').textContent = randomItem.family_name;
    document.getElementById('donation-link').innerHTML = randomItem.donation_link;
    document.getElementById('description').textContent = randomItem.description;
})
.catch(error => {
    console.error("Error fetching data:", error);
});