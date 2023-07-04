let popUp = document.getElementById("popUp");

function createPopUp(text){
    const textP = document.createElement("p");
    textP.setAttribute("id", "popP");
    textP.appendChild(document.createTextNode(text));

    if(popUp){
        const oldP = document.getElementById("popP");
        const oldD = document.getElementById("popUp");
        popUp.replaceChild(textP, oldP);
        popUp.classList.add("open-popUp");
    }else{
        const popUpDiv = document.createElement("div");
        popUpDiv.setAttribute("id", "popUp");
        popUpDiv.setAttribute("class", "popUp");
        popUpDiv.appendChild(textP);

        const closeButton = document.createElement("button");
        closeButton.setAttribute("onclick", "removePopUp()");
        closeButton.textContent = "Ok!";
        popUpDiv.appendChild(closeButton);
        document.body.appendChild(popUpDiv);
        popUpDiv.classList.add("open-popUp");
        popUp = popUpDiv;
    }
}
function removePopUp(){
    if(popUp){
        popUp.classList.remove("open-popUp")
    }
}