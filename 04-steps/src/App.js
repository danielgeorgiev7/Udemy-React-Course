import { useState } from "react";

const messages = [
    "Learn React ⚛️",
    "Apply for jobs 💼",
    "Invest your new income 🤑",
];

export default function App() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious() {
        if(step > 1) {
        setStep((s) => s - 1);
        }
    }

    function handleNext() {
        if(step < 3) {
            setStep((s) => s + 1);
            }
    }

    return (
        <>
        <button className = "close "onClick={() => setIsOpen(!isOpen)}>&times;</button>
        { isOpen && (
            <div className="steps">
            <div className="numbers">
                <div className={step >= 1 ? "active" : ""}>1</div>
                <div className={step >= 2 ? "active" : ""}>2</div>
                <div className={step >= 3 ? "active" : ""}>3</div>
            </div>

            <p className="message">Step {step}: {messages[step - 1]}</p>

            <div className="buttons">
                <button  
                style = {step===1 ? {  backgroundColor: "#cccccc", color: "#666666"} : { backgroundColor: "#7950F2", color: "#FFF" }}  
                onClick = {handlePrevious}>
                    Previous
                </button>
                <button 
                style = {step===3 ? {  backgroundColor: "#cccccc", color: "#666666"} : { backgroundColor: "#7950F2", color: "#FFF" }} 
                onClick = {handleNext}>
                    Next
                </button>
            </div>
        </div> )}
        </>
    )
}