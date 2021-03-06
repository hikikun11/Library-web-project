function ResponseHandler(LoginResult){
    let result = LoginResult.trim();
    Boolean(result)? LoginSucceeded(result): LoginFailed();
}


async function LoginRedirector(permission){
    permission = permission.trim();
    setTimeout(document.querySelector("#wrapper").remove(), 1000);
    await new Promise(resolve => setTimeout(()=>{ resolve();}, 1000)); //sleeping for testing purposes no more
    switch (permission) {
        case "1":
            LoadAdminPage();
            break;
        case "2":
            LoadCustomerPage();
            break;
        default:
            console.log("something went wrong!");
    }
}

async function LoginSucceeded(result){
    sessionStorage.setItem("CurrentUserName", document.querySelector("#user").value);
    document.getElementsByTagName("canvas")[0].style.display = "none";
    $("script[src='../js/index.js']").remove()
    StartTranisition();
    await  LoginRedirector(result); 
    FinishTransition(); // this function wont be calledd before LoginRedirector finishes
}

function LoginFailed(){
    document.querySelector("#error").innerHTML="Your password or username is wrong!";
}



function LoadAdminPage(){
    $.get("html/admin.html", (data) => {
        $("body").append(data);
    });
    $.get("js/admin.js", (data) => {
        $("head").append(data);
    });
    $('head').append('<link rel="stylesheet" href="css/admin.css">');
    $('link[href="css/login.css"]').remove();
    console.log("admin");

}

function LoadCustomerPage(){
    $.get("html/customer.html", (data) =>{
        $("body").append(data);
    });
    $.get("js/customer.js", (data) => {
        $("head").append(data);
    });
    $('head').append('<link rel="stylesheet" href="css/customer.css">');
    console.log("costumer");

}