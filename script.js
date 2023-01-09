 class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }
    clear(){
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    //put the current clicked number and add the previously clicked before it,all strings to avaoid computation
    appendNumber(number){
        if(number =="."&& this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.currentOperand===' ') return//wont compute if lacks current op
        if(this.previousOperand!==' '){
            this.compute() //allows chaining of computations
        }
         this.operation = operation
         this.previousOperand = this.currentOperand
         this.currentOperand = ' '
    }
    compute(){
        let computation
        const prev =parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev)|| isNaN(current)) return
        switch(this.operation){
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ' '
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }

 }

//obtaining the DOM elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandTextElement =document.querySelector('[data-prev-operand]')
const currentOperandTextElement =document.querySelector('[data-curr-operand]')

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)
//after clicking a number
numberButtons.forEach( button =>{
    button.addEventListener("click",()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
//after clicking a sign
operationButtons.forEach( button =>{
    button.addEventListener("click",()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click",button=>{
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener("click",button=>{
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener("click",button=>{
    calculator.delete()
    calculator.updateDisplay()
})
 