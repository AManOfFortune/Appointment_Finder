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
        hideContainer.style.transform = 'translateX(-250%) translateY(-50%)'
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