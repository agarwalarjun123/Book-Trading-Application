
$("#search").click(function(){
$("#main").text("");
var name=document.getElementById("name").value;

$.ajax({
url:"https://www.googleapis.com/books/v1/volumes?q="+$("#t1").val(),
success:function(data){
console.log(data);
for(i=0;i<8;i++){
var cont=document.createElement("div");
cont.id="s"+i;

var bt=$("<a class='links'></a>").text("Add +");
$(bt).addClass("btn");
$(bt).addClass("btn-danger");
$(bt).css({"margin-top":"4px"});
var hr=document.createElement("hr");
cont.style.borderStyle='solid';
cont.style.borderRadius='4px';
cont.style.borderColor='lightblue';

cont.style.backgroundColor='lightblue';
$("#main").append(cont);
var content=$("<p></p>").text(data.items[i].volumeInfo.description);
var title=$("<h2></h2>").text(data.items[i].volumeInfo.title);
if(data.items[i].volumeInfo.authors)
var author=$("<h6></h6>").text(data.items[i].volumeInfo.authors[0]);
var rating=data.items[i].volumeInfo.averageRating;
var rating=$("<h6></h6>").text(rating);
console.log(rating);
var im=document.createElement("img");
if(data.items[i].volumeInfo.imageLinks){
im.src=data.items[i].volumeInfo.imageLinks.smallThumbnail;
im.style.display="block";
im.style.margin="auto";
}
$("#s"+i).append(title);
$("#s"+i).append(author);
$("#s"+i).append(rating);
$("#s"+i).append(im);
$("#s"+i).append(content);
$("#s"+i).append(bt);
$("#s"+i).append(hr);

}
$(".links").click(function(){
console.log("sS");
var Jstext={
title:$(this).parent().find("h2").text(),
description:$(this).parent().find("p").text(),
img:$(this).parent().find("img").attr("src"),
authors:$(this).parent().find("h6").text()
};

var u=JSON.stringify(Jstext);

console.log(u);
$.ajax({
url:'/details/'+name,
async:false,
data:u,
contentType:"application/json",
type:"POST",
success:function(data){
	alert('book added');
}


});
});

}

});
});
