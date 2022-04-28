//Essentially an eventlistener that enables us to listen to changes to an elements height and width and apply them to the content wrapper element
const resizeObserver = new ResizeObserver(entry => {
    const contentWrapper = document.querySelector('.content-wrapper')

    contentWrapper.style.width = entry[0].borderBoxSize[0].inlineSize + 'px'
    contentWrapper.style.height = entry[0].borderBoxSize[0].blockSize + 'px'
})

//Sets the resizeObserver to the start container on load
document.addEventListener('DOMContentLoaded', () => {
    resizeObserver.observe(document.getElementById('start'))
})

//Shows the given elements with a left or right slide animation
function show(what, fromWhere, shoveToThe) {
    const hideContainer = document.getElementById(fromWhere)
    const showContainer = document.getElementById(what)

    if(shoveToThe == "left") {
        hideContainer.style.transform = 'translateX(-200%) translateY(-50%)'
    }
    else {
        hideContainer.style.transform = 'translateX(75%) translateY(-50%)'
    }

    showContainer.style.transform = 'translate(-50%, -50%)'

    resizeObserver.unobserve(hideContainer)
    resizeObserver.observe(showContainer)
}

//Disables/Enables button and input fields when choosing to join a private/public appointment
function idInputMade(inputType) {
    const privateAppointmentID = document.querySelector('#privateAppointmentID')
    const publicAppointmentID = document.querySelector('#publicAppointmentID')
    const joinButton = document.querySelector('#viewButton')

    //If user selected a public appointment
    if(inputType == 'public') {
        //If the selected appointment is not default option
        if(publicAppointmentID.value != "Invalid") {
            //Disable private appointment input field
            privateAppointmentID.setAttribute('disabled', 'true')
            //Remove disabled attribute from button
            joinButton.removeAttribute('disabled')
        }
        //If selected appointment is default option
        else {
            //Remove the disabled attribute of private appointment input field
            privateAppointmentID.removeAttribute('disabled')

            //If private input field is empty, disable the button
            if(privateAppointmentID.value == '') {
                joinButton.setAttribute('disabled', 'true')
            }
        }
    }
    //User input a private appointment
    else {
        //If private input field is not empty
        if(privateAppointmentID.value != '') {
            //Disable public appointment select
            publicAppointmentID.setAttribute('disabled', 'true')
            //Enable the button
            joinButton.removeAttribute('disabled')
        }
        //If private input field is empty
        else {
            //Enable public appointment select
            publicAppointmentID.removeAttribute('disabled')

            //If the public appointment input field is invalid, disable the button
            if(publicAppointmentID.value == "Invalid") {
                //Disable the button
                joinButton.setAttribute('disabled', 'true')
            }
        }
    }
}

//Adds a new date element-pair (a pair is a input field + a remove button)
function addNewDate() {
    const dateContainer = document.querySelector('#dates')

    dateContainer.appendChild(dateContainer.lastElementChild.cloneNode(true))
}

//Removes a date element-pair (if more than 1 date element-pair exists)
function removeDate(buttonClicked) {
    if(document.querySelector('#dates').childElementCount > 1) {
        buttonClicked.parentNode.classList.add('remove-date')

        setTimeout(() => {
            buttonClicked.parentNode.remove()
        }, 450)
    }
}

//Disables/Enables button when creating a new appointment
function createInputMade() {
    const titleInput = document.querySelector('#createTitle')
    const dateWrapper = document.querySelector('#dates')
    const button = document.querySelector('#createButton')

    var datesProvided = true

    for (let i = 0; i < dateWrapper.children.length; i++) {

        if(dateWrapper.children[i].firstElementChild.value == '') {
            datesProvided = false
        }
    }

    if(titleInput.value != '' && datesProvided) {
        button.removeAttribute('disabled')
    }
    else {
        button.setAttribute('disabled', 'true')
    }
}

function selectDateCheckbox(clickedRow) {
    const checkbox = clickedRow.querySelector('input[type="checkbox"]')
    if(checkbox.checked) {
        checkbox.checked = false
    }
    else {
        checkbox.checked = true
    }
}

function voteInputMade(nameElement) {
    const voteButton = document.querySelector('#confirmVoteButton')
    if(nameElement.value != "") {
        voteButton.removeAttribute("disabled")
    }
    else {
        voteButton.setAttribute('disabled', 'true')
    }
}

function loadingScreen(doWhat) {
    const loadingScreen = document.querySelector('.loading-screen');

    if(doWhat == 'show') {
        loadingScreen.classList.add('animation')
    }
    else if(doWhat == 'hide') {
        loadingScreen.classList.remove('animation')
    }
}

async function showError() {
    const errorContainer = document.querySelector('.error-message')

    errorContainer.style.transform = 'translateY(0)'
    await delay(3000)
    errorContainer.removeAttribute('style')
}

async function showSuccess() {
    const successContainer = document.querySelector('.success-message')

    successContainer.style.transform = 'translateY(0)'
    await delay(3000)
    successContainer.removeAttribute('style')
}

async function queryData(method) {
    const response = await fetch(
        "../backend/serviceHandler.php?method=" + method, 
        {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )

    return response.json();
}

async function viewAppointmentList() {
    loadingScreen("show")

    const result = await queryData('queryAllPublicAppointments')

    console.log(result)

    const publicSelect = document.querySelector("#publicAppointmentID")

    for(let i = 0; i < result.length; i++) {
        const newOption = document.createElement('option')
        newOption.value = result[i][0]
        newOption.textContent = result[i][1]

        publicSelect.appendChild(newOption)
    }

    loadingScreen("hide")

    show('viewAppointment', 'start', 'left')
}

async function createNewAppointment() {
    loadingScreen("show")

    //const result = await queryData('createNewAppointment')

    loadingScreen("hide")
}



function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}