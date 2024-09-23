const toggleButton = document.querySelector("#mode-toggle")
toggleButton.addEventListener("click", switchMode)

function switchMode(){

    document.body.classList.toggle("dark-mode")
    toggleButton.classList.toggle("dark-mode")


    if(document.body.classList.contains("dark-mode")){
        toggleButton.textContent = "Toggle Light mode"
        // xogta ku heneyso
        localStorage.setItem("mode", "dark")
    }else{
         toggleButton.textContent = "Toggle Dark mode"
         localStorage.setItem("mode", "light")
    }
}