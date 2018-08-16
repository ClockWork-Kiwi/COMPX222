var index = 1;
showImages(index);

function changeIndex(n)
{
	showImages(index += n);
}

function showImages(n)
{
	var i;
	var imageArray = document.getElementsByClassName("mySlides");
	if ( n > imageArray.length)
	{
		index = 1;
	}
	if (n < 1)
	{
	index = imageArray.length;
	}
	for(i = 0; i < imageArray.length; i++)
	{
		imageArray[i].style.display = "none";
	}
	imageArray[index-1].style.display = "inline";
}