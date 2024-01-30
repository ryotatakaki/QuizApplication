function Result({ userAnswers, questions }) {
    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
    }

    const score = userAnswers.reduce((totalScore, userAnswer) => {
        const questionIndex = questions.findIndex(q => q.correct_answer === userAnswer.answer);
        if (questionIndex !== -1 && userAnswer.isCorrect) {
            return totalScore + 1;
        }
        return totalScore;
    }, 0);

    return (
        <div>
            <h2>Your Score: {score} / {questions.length}</h2>
        </div>
    );
}

export default Result;