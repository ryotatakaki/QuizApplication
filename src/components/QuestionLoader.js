import React, { useState } from 'react';
import Quiz from './Quiz';
import styled  from 'styled-components';

const StartButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 100px;
height: 40px;
padding: 10px;
margin: 10px 0;
border: 2px solid cyan;
background-color: #fff;
color: #081b29;
letter-spacing: 1px;
border-radius: 8px;
cursor: pointer;
transition: background-color 0.5s, border-color 0.5s;

&:hover {
  background-color: cyan;
  border-color: #fff;
}
`

function QuestionLoader() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleStartQuiz = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.response_code !== 0) {
                throw new Error('Failed to load questions');
            }
            setQuestions(data.results);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading questions...</p>;
    }

    if (error) {
        return <p>Error loading questions: {error}</p>;
    }

    return (
        <div>
            {questions.length > 0 ? (
                <Quiz questions={questions} />
            ) : (
                <StartButton onClick={handleStartQuiz}>Start Quiz</StartButton>
            )}
        </div>
    );
}

export default QuestionLoader;
