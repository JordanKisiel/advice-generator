//grab elements
const btn = document.getElementById('getMessageBtn');
const adviceID = document.getElementById('adviceNum');
const adviceContainer = document.getElementById('adviceContainer');


//add listener
btn.addEventListener('click', getAdvice);


//get data from API and insert it in html
function getAdvice(){
    fetch('https://api.adviceslip.com/advice')
        .then(response => {
            if(!response.ok){
                throw new Error('Network response not ok');
            }
            return response.json();
        })
        .then(data => {
            let { id, advice } = data.slip;
            
            //prepend with 0's if necessary
            if(id < 10){
                id = '00' + id;
            }
            else if(id < 100){
                id = '0' + id;
            }

            adviceID.innerHTML = id;
            adviceContainer.innerHTML = `&ldquo;${advice}&rdquo;`;
        })
        .catch(error => {
            console.log('There was an unexpected problem getting the data: ', error);
        });

    //disable button for 2.1 secs so that the user doesn't
    //click too fast and get the same advice again as the
    //request is cached for 2 secs and won't give new advice
    //before then
    disableButton();
    setTimeout(enableButton, 2100);
}


function disableButton(){
    btn.disabled =  true;

    btn.classList.toggle('bg-lightCyan');
    btn.classList.toggle('bg-neonGreen');
}

function enableButton(){
    btn.disabled =  false;

    btn.classList.toggle('bg-lightCyan');
    btn.classList.toggle('bg-neonGreen');
}

//initial call to fill advice on page load
getAdvice();