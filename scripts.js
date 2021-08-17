
// Edit option
let editFlag = false;

// Loading list from cookies
$(document).ready(function () {
    let y = document.cookie;
    y = y.split(",");
    console.log(y);
    for(let i=0; i<y.length; i++){
        // Appending new element
        if(y[i] != ""){
            $(".listContainer").append(`
            <div class="listitem">
                <p>${y[i]}</p>
                <div class="icons">
                    <i class="fas fa-edit"></i>
                    <i class="delete fas fa-trash-alt"></i>
                </div>
            </div>`);
        }
        
    }
});


// EDIT
// 
$(".listContainer").on("click", ".fa-edit", function(){
    let itemContainer = $(this).parent().parent().html();

    $(this).parent().parent().addClass("editele");
    editFlag = true;
    $(".btn").text("Edit");
    let putval = $(itemContainer+" p").text().trim();
    $("input[type=search]").val(putval);
    
});



// CREATE
// 
$(".btn").click(function (e) { 
    e.preventDefault();
    let value = $(".inputField input").val();

    if(value != "" && !editFlag){
        // Appending new element
        $(".listContainer").append(`
            <div class="listitem">
                <p>${value}</p>
                <div class="icons">
                    <i class="fas fa-edit"></i>
                    <i class="delete fas fa-trash-alt"></i>
                </div>
            </div>`);
        // Empty field after adding
        $(".inputField input").val("");
        // Flash message
        flash(".addmsg");
    }
    // EDIT part
    else if(value !=""){
        $(".editele p").text(value);
        $(".btn").text("Add");
        editFlag = false;
        $(".inputField input").val("");
        // Flash message
        flash(".editmsg");
        $(".editele").removeClass("editele");
    }
    
});


// DELETE
// 
$(".listContainer").on("click", ".delete", function(){
    // console.log($(this).parent().parent().html());
    $(this).parent().parent().remove();
    // Flash message
    flash(".delmsg");
});
// Clear list
$(".clearitems").click(function (e) { 
    e.preventDefault();
    $(".listContainer").empty();
    // Flash message
    flash(".delmsg");
});




// Flash messages hidden by default
$(".addmsg").css("visibility", "hidden");
$(".delmsg").css("visibility", "hidden");
$(".editmsg").css("visibility", "hidden");
// Flash message function
function flash(ele){
    $(ele).css("visibility", "visible");
    setTimeout(function(){
        $(ele).css("visibility", "hidden");
    }, 1200);
}

// Hide clear items if the list is empty
setInterval(function(){
    let l = $(".listitem").length;
    if(l>0){
    $(".clearitems").css("visibility", "visible");
    }
    else{
    $(".clearitems").css("visibility", "hidden");
    }
}, 50);


// Setting up enter key press for add event
$(document).keydown(function (e) { 
    // 13 is keycode for ENTER
    if(e.keyCode == 13){
        $(".btn").click();
    }
});


// Set cookies on exit
window.onbeforeunload = function() {
    let cookiearr = [];
    let totalItems = $(".listitem").length;
    for(let i=0; i<totalItems; i++){
        let x = $(".listitem p");
        let txt = x[i].innerHTML;
        cookiearr.push(txt);
        // console.log(cookiearr);
    }
    // document.cookie = cookiearr+";expires=Thu, 18 Dec 2013 12:00:00 UTC";
    document.cookie = cookiearr + "; path=/";
}
