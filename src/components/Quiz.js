import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import Result from './Result';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;

const OptionButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center; 
  width: 600px; 
  height: 80px;
  margin: 10px auto;
  padding: 10px;
  border: 2px solid cyan;
  background-color: #fff;
  color: #081b29;
  font-size: 19px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.5s, border-color 0.5s;

  &:hover {
    background-color: cyan;
    border-color: #fff;
  }

  @media (max-width: 600px) {
    width: 100%; 
    font-size: 16px; 
    height: 60px; 
  }
`;

const QuestionText = styled.h2`
  width: 100%; 
  padding: 10px;
  margin: 10px 0;
  text-align: center; 

  @media (max-width: 600px) {
    font-size: 18px; 
  }
`;

const ReplayButton = styled.button`
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

const ReplayButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; 
`;


function Quiz({ questions, onRestart}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [key, setKey] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [options, setOptions] = useState([]);

    const currentQuestion = questions[currentQuestionIndex];

    useEffect(() => {
        if (questions[currentQuestionIndex]) {
            const newOptions = [questions[currentQuestionIndex].correct_answer, ...questions[currentQuestionIndex].incorrect_answers]
                .sort(() => Math.random() - 0.5)
                .map(option => decodeHtml(option));
            setOptions(newOptions);
        }
        setKey(prevKey => prevKey + 1);
        setFeedback('');
    }, [currentQuestionIndex, questions]);

    const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    };

    const handleRestart = () => {
        onRestart();
    };

    const handleTimeUp = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setShowResult(true);
        }
    };

    const handleAnswer = (answer) => {
        if (isAnswered) return; 

        const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
        setFeedback(isCorrect ? "Correct!" : "Incorrect");
        setUserAnswers([...userAnswers, {answer, isCorrect}]);

        setIsAnswered(true); 

        setTimeout(() => {
            setIsAnswered(false); 
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    if (!questions || questions.length === 0) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {!showResult ? (
                <>
                    <GlobalStyle />
                    <Timer key={key} initialTime={30} onTimeUp={handleTimeUp} />
                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
                    <div>
                        <QuestionText>{decodeHtml(currentQuestion.question)}</QuestionText>
                        <div>
                            {options.map((option, index) => (
                                <OptionButton 
                                  key={index} 
                                  onClick={() => handleAnswer(option)}
                                  disabled={isAnswered} 
                                >
                                    {option}
                                </OptionButton>
                            ))}
                        </div>
                        {feedback && <p>{feedback}</p>}
                    </div>
                </>
            ) : (
                <div>
                    <Result userAnswers={userAnswers} questions={questions} />
                    <ReplayButtonContainer>
                        <ReplayButton onClick={handleRestart}>Play again</ReplayButton>
                    </ReplayButtonContainer>
                </div>
            )}
        </div>
    );
}

export default Quiz;
