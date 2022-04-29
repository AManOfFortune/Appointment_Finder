//--------------------- Start of UI functions --------------------------

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

//Selects the checkbox if row element was clicked
function selectDateCheckbox(clickedRow) {
    const checkbox = clickedRow.querySelector('input[type="checkbox"]')
    if(checkbox.checked) {
        checkbox.checked = false
    }
    else {
        checkbox.checked = true
    }
}

//Disables / Enables the vote button
function voteInputMade(nameElement) {
    const voteButton = document.querySelector('#confirmVoteButton')
    if(nameElement.value != "") {
        voteButton.removeAttribute("disabled")
    }
    else {
        voteButton.setAttribute('disabled', 'true')
    }
}

//Shows/Hides the loading screen
function loadingScreen(doWhat) {
    const loadingScreen = document.querySelector('.loading-screen');

    if(doWhat == 'show') {
        loadingScreen.classList.add('animation')
    }
    else if(doWhat == 'hide') {
        loadingScreen.classList.remove('animation')
    }
}

//Displays an error banner for 3 seconds
async function showError() {
    const errorContainer = document.querySelector('.error-message')

    errorContainer.style.transform = 'translateY(0)'
    await delay(3000)
    errorContainer.removeAttribute('style')
}

//Displays a success banner for 3 seconds
async function showSuccess() {
    const successContainer = document.querySelector('.success-message')

    successContainer.style.transform = 'translateY(0)'
    await delay(3000)
    successContainer.removeAttribute('style')
}

//--------------------------- End of UI ----------------------------------

//Performs a fetch request, returns the result as json (or text in case of a php error)
async function queryData(method, params) {
    var url = "../backend/serviceHandler.php?method=" + method + "&param=" + params

    var result;

    await fetch(
        url, 
        {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    .then((response) => response.text())
    .then(text => {
        try {
            result = JSON.parse(text)

            if(result == "") {
                showError();
            }
        }
        catch(err) {
            showError();
            result = text
        }
    })

    return result;
}

//Fetches and displays public appointments
async function viewAppointmentList() {
    loadingScreen("show")

    const result = await queryData('queryAllPublicAppointments', [])

    const publicSelect = document.querySelector("#publicAppointmentID")
    publicSelect.innerHTML = "<option value='Invalid' selected>Select here</option>"

    for(let i = 0; i < result.length; i++) {
        const newOption = document.createElement('option')
        newOption.value = result[i][0]
        newOption.textContent = result[i][1]

        publicSelect.appendChild(newOption)
    }

    loadingScreen("hide")

    show('viewAppointment', 'start', 'left')
}

//Fetches and displays single view
async function viewAppointment() {
    loadingScreen("show")

    var appointmentID;
    if(document.querySelector('#privateAppointmentID').disabled) {
        appointmentID = document.querySelector('#publicAppointmentID').value
    } 
    else {
        appointmentID = document.querySelector('#privateAppointmentID').value
    }

    params = {
        appointmentID: appointmentID
    }

    params = JSON.stringify(params)

    const result = await queryData('selectAppointmentViaIDAndReturnAll', params)

    console.log(result)

    const returnedAppointmentID = result[0][0]
    const title = result[0][1]
    const description = result[0][2]
    const voteEndsOn = new Date(result[0][5])
    const comments = result[1]
    const termine = result[2]

    document.querySelector('#viewTitle').innerHTML = title
    document.querySelector('#viewTitle').dataset.id = returnedAppointmentID

    if(description != "") {
        document.querySelector('#viewDescription').removeAttribute('style')
        document.querySelector('#viewDescription').innerHTML = description
    }
    else {
        document.querySelector('#viewDescription').style.display = 'none'
    }

    const commentsWrapper = document.querySelector('#comments')

    if(comments.length > 0) {
        commentsWrapper.innerHTML = ""

        for(let i = 0; i < comments.length; i++) {
            //JS straight outta hell, I am aware
            var commentElement = 
                `<div class="comment">
                <p class="comment-name">${comments[i][1]}</p>
                <p class="comment-text">${comments[i][2]}</p>
                </div>`
            
            commentsWrapper.innerHTML += commentElement
        }
    }
    else {
        commentsWrapper.innerHTML = "<p>No comments yet</p>"
    }

    //If vote has ended
    if(voteEndsOn < new Date()) {
        var winnerIndex = 0
        var winnerVotes = 0
        for(let i = 0; i < termine.length; i++) {
            if(termine[i][3] > winnerVotes) {
                winnerVotes = termine[i][3]
                winnerIndex = i
            }
        }

        var winner = new Date(termine[winnerIndex][1])

        document.querySelector('#voteEndDate').innerHTML = "Vote has ended!"
        document.querySelector('#voteButton').disabled = true
        document.querySelector('#voteWinner').innerHTML = winner.toLocaleString()
        document.querySelector('#voteWinner').style.display = "flex"
    }
    else {
        document.querySelector('#voteEndDate').innerHTML = voteEndsOn.toLocaleString()
        document.querySelector('#voteButton').disabled = false
        document.querySelector('#voteWinner').removeAttribute('style')
    }

    document.querySelector('#voteName').value = ""
    document.querySelector('#voteComment').value = ""

    const termineWrapper = document.querySelector('#voteDates')
    termineWrapper.innerHTML = ""

    for(let i = 0; i < termine.length; i++) {

        const date = new Date(termine[i][1])
        const weekday = date.toDateString().slice(0, 3)
        const day = date.toDateString().slice(8, 10)
        const month = date.toDateString().slice(4, 7)
        const time = date.toLocaleTimeString()

        //JS straight outta hell, I am aware
        var terminElement = 
            `<div class="row" onclick="selectDateCheckbox(this);">
                <p class="date-votes">${termine[i][3]} Votes</p>

                <div class="container">
                    <p class="date-month">${month}</p>
                    <p class="date-day">${day}</p>
                    <p class="date-weekday">${weekday}</p>
                </div>

                <p class="date-time">${time}</p>

                <input type="checkbox" data-id="${termine[i][0]}">
            </div>`
        
        termineWrapper.innerHTML += terminElement
    }

    loadingScreen("hide")

    show('joinAppointment', 'viewAppointment', 'left')
}

//Puts votes of single user into database
async function voteOnAppointment() {
    loadingScreen("show")

    var params = {
        appointmentID: document.querySelector('#viewTitle').dataset.id,
        userName: document.querySelector('#voteName').value,
        userComment: document.querySelector('#voteComment').value
    }

    datesArray = []
    const dates = document.querySelector('#voteDates').children

    for(let i = 0; i < dates.length; i++) {
        if(dates[i].lastElementChild.checked) {
            datesArray.push(dates[i].lastElementChild.dataset.id)
        }
    }

    params.votedDates = datesArray

    params = JSON.stringify(params)

    const response = await queryData('addVotes', params)

    loadingScreen("hide")

    if(response == "false") {
        showError()
    } 
    else {
        showSuccess()
            
        viewAppointment()

        show('joinAppointment', 'voteAppointment', 'right')
    }
}

//Creates a new appointment in database from user input
async function createNewAppointment() {
    loadingScreen("show")

    const title = document.querySelector('#createTitle').value
    const description = document.querySelector('#createDescription').value
    const closesOn = document.querySelector('#createVotingEnd').value
    const dates = document.querySelector('#dates').children

    var params = {
        "name": title, //Title
        "description": description, //Description
    }

    //Public private flag
    if(document.querySelector("input[name='createType']:checked").value == "private") {
        params.pub_pri = 1
    }
    else {
        params.pub_pri = 0
    }

    //Closed_flag
    params.closed = 0

    //Closes_on
    params.closes_on = closesOn

    //Dates
    datesArray = []

    for(let i = 0; i < dates.length; i++) {
        datesArray.push(dates[i].firstElementChild.value)
    }

    params.dates = datesArray

    params = JSON.stringify(params)

    //Perform the query
    const response = await queryData('createNewAppointment', params)

    if(response == "false") {
        showError();
    } else {
        showSuccess();
        document.querySelector('#shareMeetingCode').innerHTML = "Meetingcode: " + response
    }

    //Remove all data from input fields
    document.querySelector('#createTitle').value = ""
    document.querySelector('#createDescription').value = ""
    document.querySelector('#createVotingEnd').value = ""

    while(dates.length > 1) {
        dates[dates.length - 1].remove()
    }
    dates[0].firstElementChild.value = ""

    loadingScreen("hide")

    show('shareID', 'createAppointment', 'left')
}

//Helperfunction to delay code execution for x milliseconds
function delay(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, milliseconds);
    });
}