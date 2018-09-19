function calculateCost()
{
    //Room type
    var selector = document.getElementById("roomType");
    var roomType = selector.options[selector.selectedIndex].text;
    //Set price based on room type
    var roomCost;
    if (roomType == "Studio")
    {
        roomCost = 100;
    }
    else if (roomType == "One Room")
    {
        roomCost = 200;
    }
    else
    {
        roomCost = 300;
    }
    //Number of Rooms
    selector = document.getElementById("numRooms");
    var numRooms = selector.options[selector.selectedIndex].text;
    //Working out number of days
    selector = document.getElementById("startDay");
    var startDate = new Date(selector.value);
    selector = document.getElementById("endDay");
    var endDate = new Date(selector.value);
    var diffInMilliseconds = endDate.getTime() - startDate.getTime();
    var numDays = Math.ceil(diffInMilliseconds / (1000 * 3600 * 24));
    if (numDays < 1)
    {
        // THIS CHANGE IS NEW AS OF ASSIGNMENT 2. PREVIOUSLY DISPLAY AN ALERT. NOW IT DISPLAYS AN APPROPRIATE ERROR MESSAGE
        displayError(selector, "Invalid set of dates. Try again");
    }
    else
    {
        // REMOVE AN ERROR MESSAGE IF THERE IS ONE
        removeError(selector);
        //Is breakfast selected
        selector = document.getElementById("breakfast");
        var breakfast = selector.checked;
        var totalCost = roomCost * numRooms * numDays;
        if(breakfast)
        {
            //Work out number of people
            selector = document.getElementById("numAdults");
            var numAdults = selector.options[selector.selectedIndex].text;
            selector = document.getElementById("numChildren");
            var numChildren = selector.options[selector.selectedIndex].text
            var totalGuests = +numAdults + +numChildren;
            totalCost += 20 * (numDays * totalGuests);
        }
        if(isNaN(totalCost))
        {
            alert("You have missed a compulsory field for calculating price. Make sure all fields are filled then enter an end date again");
        }
        else
        {
            //Display the ETA field
            var eta = document.getElementById("timeArrival");
            eta.style.display = "block";
            selector = document.getElementById("cost");
            selector.innerText = "Cost: $" + totalCost;
        }
    }
}

function resetPage()
{
    location.reload();
}

function showPayment()
{
    var paymentDiv = document.getElementsByClassName("paymentDiv");
    console.log(paymentDiv);
    paymentDiv.style.display = "block";
}

// VALIDATION MANAGER

function validationManager(element)
{

    if(element.type == "email")
    {
        if(isEmpty(element))
        {
            return;
        }
        if(invalidEmail(element))
        {
            return;
        }
    }
    else if (element.type == "text")
    {
        isEmpty(element);
    }

}

// VALIDATION FUNCTIONS

function isEmpty(element)
{
    if(element.value == "")
    {
        displayError(element, "This field shouldn't be empty")
        return true;
    }
    else
    {
        removeError(element);
        return false;
    }
}

function invalidEmail(element)
{
    var regex = /^\w+@[a-z]+(\.[a-z]+)+$/;
    var valid = regex.test(element.value);
    if (!valid)
    {
    	displayError(element, "invalid email address");
    	return true;
    }
    else
    {
    	return false;
    }
}



// VALIDATION HANDLERS

function displayError(element, errorMessage)
{
    if (element.nextSibling.tagName=="SPAN" && element.nextSibling.textContent===errorMessage)
    {
        return;
    }
    var errorElement = document.createElement("span");
    errorElement.id = "error";
    errorElement.textContent = errorMessage;
    // This is just for CSS purposes
    errorElement.classList.toggle("inputField");
    errorElement.style.color = "red";
    errorElement.style.textAlign = "center";
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    element.style.border = "red solid 1px";
}

function removeError(element)
{

    if (element.nextSibling.tagName=="SPAN")
    {
        var toRemove = element.nextSibling;
        toRemove.parentNode.removeChild(toRemove);
        element.style.border = "";
    }

}