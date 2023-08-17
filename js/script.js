getRandomFamily();

function getRandomFamily() {
    fetch('ohana_py/ohana.json')
    .then(response => response.json())
    .then(data => {
        const flattenedData = data.flat();
        const randomItem = flattenedData[Math.floor(Math.random() * flattenedData.length)];

        console.log(flattenedData);

        document.getElementById('family-name').textContent = randomItem.family_name;

        // Convert the donation_link array back to <a> tags
        const donationLinksHTML = randomItem.donation_links.map(url => `<a href="${url}" target="_blank">${url}</a>`).join('');
        console.log(donationLinksHTML);
        // document.getElementById('donation-links-top').innerHTML = donationLinksHTML;
        document.getElementById('donation-links-bottom').innerHTML = donationLinksHTML;

        document.getElementById('description').textContent = randomItem.description;
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

document.getElementById('support').addEventListener('click', function() {
    getRandomFamily();
    window.scrollTo(0, 0);
});
