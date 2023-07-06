let popUp = document.getElementById("popUp");

export const createPopUp = (title, text)=>{
    const titleH1 = document.createElement("h1");
    const textP = document.createElement("p");
    titleH1.setAttribute("id", "titleP");
    textP.setAttribute("id", "popP");
    titleH1.appendChild(document.createTextNode(title));
    textP.appendChild(document.createTextNode(text));

    if(popUp){
        const oldP = document.getElementById("popP");
        popUp.replaceChild(textP, oldP);
        popUp.classList.add("open-popUp");
    }else{
        const textContainer = document.createElement("div");
        textContainer.setAttribute("id", "textContainer");
        const popUpDiv = document.createElement("div");
        popUpDiv.setAttribute("id", "popUp");
        popUpDiv.setAttribute("class", "popUp");
        popUpDiv.appendChild(titleH1);
        popUpDiv.appendChild(textContainer);

        const closeButton = document.createElement("button");
        closeButton.onclick = ()=>{
            if(popUp){
                popUp.classList.remove("open-popUp")
            }
        };
        closeButton.setAttribute("id", "closePopUpButton")
        closeButton.textContent = "Ok!";
        popUpDiv.appendChild(closeButton);
        document.body.appendChild(popUpDiv);
        popUpDiv.classList.add("open-popUp");
        popUp = popUpDiv;
    }

    const textContainer = document.getElementById("textContainer");
    textContainer.innerHTML = "";

    text.forEach(t => {
        const textP = document.createElement("p");
        textP.setAttribute("class", "popP");
        textP.appendChild(document.createTextNode(t));
        textContainer.appendChild(textP);
      });
}