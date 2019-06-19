document.addEventListener('DOMContentLoaded', function() {

    // Timezone
    function calcTime(city, offset) {
        // create Date object for current location
        var d = new Date();
    
        // convert to msec
        // subtract local time zone offset
        // get UTC time in msec
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
        // create new Date object for different city
        // using supplied offset
        var nd = new Date(utc + (3600000*offset));
    
        // return time as a string
        return nd;
    }

    function loadDate() {
        // Append date to DOM
        var d = calcTime('Honolulu', '-10.0');

        var hr = d.getHours();
        var min = d.getMinutes();
        var sec = d.getSeconds();
        if (min < 10) {
            min = "0" + min;
        }
        if (sec < 10) {
            sec = "0" + sec;
        }
        var ampm = "am";
        if( hr > 12 ) {
            hr -= 12;
            ampm = "pm";
        }
        var date = d.getDate();
        var x = document.getElementById("time");
        x.innerHTML = hr + ":" + min + " " + ampm.toUpperCase();

        console.log(hr + ":" + min + ampm);
    }

    loadDate();


    // Refresh time
    setInterval(function() { loadDate() }, 1000);


}, false);

