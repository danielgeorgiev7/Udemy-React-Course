import Timer from "./Timer"

function Question({ question, dispatch, answer, index, length, points, maxPossiblePoints, secondsRemaining }) {
    return (
        <>
            <header className="progress">
                <progress max={length} value={index}></progress>
                <p>
                    Question: <strong>{index + 1}</strong> / {length}
                </p>
                <p>
                    <strong>{points}</strong> / {maxPossiblePoints}
                </p>
            </header>
            <div>
                <h4>{question.question}</h4>

                <div className="options">
                    {question.options.map((option, i) =>
                        <button
                            className={`btn btn-option 
                        ${i === answer ? "answer" : ""}
                         ${answer !== null ?
                                    (i === question.correctOption
                                        ? "correct"
                                        : "wrong")
                                    : ""}`}
                            key={option}
                            onClick={() => dispatch({ type: "newAnswer", payload: i })}
                            disabled={answer !== null}
                        >
                            {option}
                        </button>)}
                </div>
            </div>
            <div>
            <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
                {answer !== null &&
                    <button
                        className="btn btn-ui"
                        onClick={() => dispatch(index === length - 1 ?
                            { type: "finish" } :
                            { type: "newQuestion" })}
                    >
                        {index === length - 1 ? 'Finish' : 'Next'}
                    </button>}
            </div>
        </>
    )
}

export default Question
