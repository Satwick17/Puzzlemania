function validate(){
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if(username == "Phuspa" && password == "1234")
    {
       
        window.open("/game.html");
    }
    else
        alert("Wrong username or Password")
}