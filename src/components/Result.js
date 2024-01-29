function Result({ userAnswers, questions }) {
    // questions 配列が空または未定義の場合のエラーハンドリング
    if (!questions || questions.length === 0) {
        return <p>No questions available.</p>;
    }

    // スコアの計算
    const score = userAnswers.reduce((totalScore, userAnswer) => {
        const questionIndex = questions.findIndex(q => q.correct_answer === userAnswer.answer);
        if (questionIndex !== -1 && userAnswer.isCorrect) {
            return totalScore + 1;
        }
        return totalScore;
    }, 0);

    // 結果の表示
    return (
        <div>
            <h2>Your Score: {score} / {questions.length}</h2>
            {/* その他の結果表示 */}
        </div>
    );
}

export default Result;