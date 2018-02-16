
$("#search").click(function(){
$("#main").text("");
$.ajax({
url:"https://www.googleapis.com/books/v1/volumes?q="+$("#t1").val(),
success:function(data){
var i;
for(i=0;i<8;i++){
var cont=document.createElement("div");
cont.id="s"+i;
$("#s"+i).addClass("col-md-10");
var bt=$("<button></button>").text("Add +");

cont.style.display="inline";
cont.style.padding="10px";
$("#main").append(cont);
var content=$("<p></p>").text(data.items[i].volumeInfo.description);
var title=$("<h2></h2>").text(data.items[i].volumeInfo.title);
var im=document.createElement("img");
im.src=data.items[i].volumeInfo.imageLinks.smallThumbnail;
$("#s"+i).append(title);
$("#s"+i).append(im);
$("#s"+i).append(content);
$("#s"+i).append(bt);

}
}
});
});