function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
    const percentage = points / maxPossiblePoints * 100;
    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage < 100 && percentage >= 75) emoji = "🎉";
    if (percentage >= 50 && percentage < 75) emoji = "👍";
    if (percentage >= 10 && percentage < 50) emoji = "🤷‍♂️";
    if (percentage < 10) emoji = "🤦‍♂️";
    return (
        <>
            <p className="result">
                {emoji} You scored <strong>{points}</strong> out of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highScore} points)</p>
            <button onClick={() => dispatch({type:"restart"})} className="btn btn-ui">Restart Quiz</button>
        </>
    )
}

export default FinishScreen
