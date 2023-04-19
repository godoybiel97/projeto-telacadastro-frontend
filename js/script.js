let validator = {
    //Função que envia o formulário e confere se os campos estão preenchidos
    handleSubmit: (event) => {
        event.preventDefault()
        let send = true
        let inputs = form.querySelectorAll("input")

        validator.clearErrors()

        for(let i = 0; i < inputs.length; i++) {
            let input = inputs[i]
            let check = validator.checkInput(input)

            if(check !== true) {
                send = false
                validator.showError(input, check) //Apresenta os erros de validação na tela
            }
        }
        
        if(send) {
            form.submit()
            validator.resetForm() //Após enviar os campos são limpos
        }
    },

    //Conferir se todos os campos estão preenchidos de acordo com as regras estabelecidas
    checkInput: (input) => {
        let rules = input.getAttribute("data-rules")

        if(rules !== null) {
            rules = rules.split("|")

            for(let j in rules) {
                let details = rules[j].split("=")

                switch(details[0]) {
                    case "required": //Campos obrigatórios
                        if(input.value == "") {
                            return "O preenchimento dos campos é obrigatório"
                        }
                    break

                    //Quantidade mínima de caracteres
                    case "min": 
                        if(input.value.length < details[1]) {
                            return `O campo precisa de pelo menos ${details[1]} caracteres`
                        }
                    break

                    //Verificar através de uma expressão regular se o e-mail é válido
                    case "email":
                        if(input.value != "") {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

                            if(!regex.test(input.value.toLowerCase())) {
                                return "O e-mail digitado não é válido"
                            }
                        }
                    break
                }
            }
        }

        return true
    },

    //Criar os elementos de erro e adicioná-los depois do input
    showError: (input, error) => {
        input.style.borderColor = "#FF0000"

        let errorElement = document.createElement("div")
        errorElement.classList.add("error")
        errorElement.innerHTML = error
        input.parentElement.insertBefore(errorElement, input.ElementSibling)
    },

    //Remover o estlo do erro após todos requisitos forem preenchidos
    clearErrors: () => {
        let inputs = form.querySelectorAll("input")
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style = ""
        }

        let errorElements = document.querySelectorAll(".error")
        for(let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove()
        }
    },

    //Limpar os dados que foram preenchidos nos campos
    resetForm: () => {
        let inputs = form.querySelectorAll("input")
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
        }
    }
}

let form = document.querySelector(".validator")
form.addEventListener("submit", validator.handleSubmit)