var fNameValid = false;
var lNameValid = false;
var emailValid = false;
var contactNumber = false;
var costCalculated = false;



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
			costCalculated = true;
        }
    }
}

function resetPage()
{
	document.getElementById("paymentDiv").style.display = "none";
    location.reload();
}

function showPayment()
{
	validateAll();
	document.getElementById ("paymentDiv").style.display = "block";
}

function validateAll()
{
	var selector = document.getElementById("fname");
	fNameValid = validationManager(selector);
	selector = document.getElementById("lname");
	lNameValid = validationManager(selector);
	selector = document.getElementById("email");
	emailValid = validationManager(selector);
	selector = document.getElementById("contactNumber");
	contactNumber = validationManager(selector);
}

// VALIDATION MANAGER

function validationManager(element)
{

    if(element.type == "email")
    {
        if(isEmpty(element))
        {
			emailValid = false;
            return false;
        }
        if(invalidEmail(element))
        {
			emailValid = false;
            return false;
        }
		return true;
    }
    else if (element.type == "text")
    {
        if(isEmpty(element))
		{
			return false;
		}
		if(element.className == "paymentInput" && element.id == "cardNum")
		{
			if(invalidCardNumber(element))
			{
				return false;
			}			
		}
		if(element.className == "paymentInput" && element.id == "CVV")
		{
			if(invalidCVV(element))
			{
				return false;
			}
		}
		return true;
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
    	displayError(element, "Invalid email address");
    	return true;
    }
    else
    {
    	return false;
    }
}

function invalidCardNumber(element)
{
	var regex = /\d{16}/g;
	var valid = regex.test(element.value);
	if (!valid)
	{
		displayError(element, "Invalid Card Number");
		return true;
	}
	return false;
	
}

function invalidCVV(element)
{
	var regex = /\d{3}/g;
	var valid = regex.test(element.value);
	if (!valid)
	{
		displayError(element, "Invalid CVV");
		return true;
	}
	return false;
	
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
	if( element.className == "paymentInput")
	{
		console.log("Got here");		
		errorElement.classList.toggle("paymentInput");
		errorElement.classList.remove("inputField");
	}
    errorElement.style.color = "red";
    errorElement.style.textAlign = "center";
    element.parentNode.insertBefore(errorElement, element.nextSibling);
    element.style.border = "red solid 1px";
}

function removeError(element)
{
    while (element.nextSibling.tagName=="SPAN")
    {
        var toRemove = element.nextSibling;
        toRemove.parentNode.removeChild(toRemove);
        element.style.border = "";
    }
}