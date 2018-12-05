let days = 5;
let countDownDate = new Date(closestFriday(days)).getTime();
let clock = ['days','hours','minutes','seconds'];

setInterval(function() {
    timeUntilFriday();
}, 500);

//Get the date of the closest Friday.
function closestFriday(days){
    let curr_date = new Date();
    let day_info = 8.64e+7; // milliseconds per day
    let next_friday = new Date(curr_date.getTime() + (days - curr_date.getDay()) * day_info); // Friday in date object
    next_friday.setHours(17,0,0);
    return next_friday;
}

//Get time until it's Friday
function timeUntilFriday(){

    let now = new Date().getTime();
    let distance = countDownDate - now;

    //Check if the next Friday 17:00h is past
    if(distance < 0){
        days = days + 7;
        countDownDate = new Date(closestFriday(days)).getTime();
        distance = countDownDate - now;
    }

    let degrees = [
        Math.floor(distance / (1000 * 60 * 60 * 24)) * 30,
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) * 30,
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) * 6,
        Math.floor((distance % (1000 * 60)) / 999) * 6
    ];

    for (let i = 0; i < clock.length; i++) {
        let degree = (i == 1) ? degrees[i] + ((degrees[2] /6)/2 ) : degrees[i];
        setRotation(clock[i], degree);
    }

    setText('nextFriday' , closestFriday(days).toUTCString().split(' ').slice(0,4).join(' '));
    setText('amountDays', (degrees[0] / 30) + "D:" + (degrees[1] / 30) + "H:" + (degrees[2] / 6)  + "M:" + (degrees[3] / 6)  + "S");
    setText('daysToFriday', (degrees[0] / 30));
}

function setRotation(element,rotation){
    document.getElementById(element).style.transform = 'rotateZ('+(rotation) +'deg)';
}

function setText(element, value){
    document.getElementById(element).innerHTML = value;
}
