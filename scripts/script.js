function afficherResultat(score,nbMotsProposes){
    
    let zoneScoreSpan = document.querySelector(".zoneScore span")
    let p = `   
            <p>${ + score + " sur " + nbMotsProposes }</p>
    `;
    zoneScoreSpan.innerHTML = p
    return p
}



function lancerJeu(){

    initAddEventListenerPopup()

    let score = 0
    let nbMotsProposes = 0 
    let i = 0
    let listeProposition = listeMots


    let inputRadio = document.querySelectorAll(".optionSource input")
    for ( let input = 0; input < inputRadio.length; input++){
        inputRadio[input].addEventListener("change", (event) => {
            console.log(event.target.value)    
        if (event.target.value === "1"){
            listeProposition = listeMots
        } else {
            listeProposition = listePhrases
        }
        afficherProposition(listeProposition[i])
        })
        }   


    let btnValiderMot = document.getElementById("btnValiderMot")   
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])

    document.addEventListener("DOMContentLoaded", () => {
        inputEcriture.focus()
    })

    document.addEventListener('keydown', (Event) => {
        if (Event.key === "Enter"){
            btnValiderMot.click()
        }
    })

    btnValiderMot.addEventListener("click", ()=> {
        console.log(inputEcriture.value)

        if (inputEcriture.value === listeProposition[i]){
            score++
            afficherResultat(score, listeProposition.length)
        } else {
            afficherResultat(score, listeProposition.length)
        }

        i++


        if( listeProposition[i] === undefined){
            afficherProposition("Le jeu est fini") 
            
            document.addEventListener('keydown', (Event) => {
                if (Event.key === "Enter"){
                    btnValiderMot.click()
                }
            }) 

            btnValiderMot.innerText = "Recommencer"
            btnValiderMot.style.backgroundColor = "black"
            btnValiderMot.style.width = "180px"
            btnValiderMot.addEventListener("click", () => {
                    location.reload()
                })
        }else{
            afficherProposition(listeProposition[i])
        }

        inputEcriture.value = ""  
    })

    afficherResultat(score, nbMotsProposes)

    let form = document.querySelector("form")

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let scoreEmail = '${score} / ${i}'
        gererFormulaire(scoreEmail)
    })  
    afficherResultat(score, i)
}


function afficherProposition(proposition){
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}+?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je vais de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(nom){
    if(nom.length < 2){
        throw new error("Le nom est trop court");
    }
}

function validerEmail(email){
    let regex = new RegExp("^[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+$")

    if(!regex.test(email)){
        throw new error("L'email est mal écrit")
    }
}


function afficherMessageErreur(message) {
    let spanErreurMessage = document.getElementById("erreur message")

    if(!spanErreurMessage){
        let popup = document.querySelector(".popup")

        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreur message"
        popup.append(spanErreurMessage)
    }
    spanErreurMessage.innerHTML = message

}

function gererFormulaire(scoreEmail){
    try{
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)

        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail    )
    } catch(erreur){
        afficherMessageErreur(erreur.message)
    }


}