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
        alert("You have entered an invalid set of dates. Try again");
    }
    else
    {
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