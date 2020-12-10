import React, { useEffect, useState } from 'react';
import Timer from './components/Timer';
import shuffleArray from './helper/shuffle';
// import CreateQuestion from './components/create-question.component';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Navbar from './components/navbar.component';
// import stopPrntScr from './helper/preventScreenshot'
// import { Form, TextArea } from 'semantic-ui-react'

const questionsList = [
	{
		questionText: 'What is the capital of France?',
		questionType: 'MCQ',
		answerOptions: [
			{ answerText: 'New York', isCorrect: false },
			{ answerText: 'London', isCorrect: false },
			{ answerText: 'Paris', isCorrect: true },
			{ answerText: 'Dublin', isCorrect: false },
		],
	},
	{
		questionText: 'Who is CEO of Tesla?',
		answerOptions: [
			{ answerText: 'Jeff Bezos', isCorrect: false },
			{ answerText: 'Elon Musk', isCorrect: true },
			{ answerText: 'Bill Gates', isCorrect: false },
			{ answerText: 'Tony Stark', isCorrect: false },
		],
	},
	{
		questionText: 'The iPhone was created by which company?',
		answerOptions: [
			{ answerText: 'Apple', isCorrect: true },
			{ answerText: 'Intel', isCorrect: false },
			{ answerText: 'Amazon', isCorrect: false },
			{ answerText: 'Microsoft', isCorrect: false },
		],
	},
	{
		questionText: 'How many Harry Potter books are there?',
		answerOptions: [
			{ answerText: '1', isCorrect: false },
			{ answerText: '4', isCorrect: false },
			{ answerText: '6', isCorrect: false },
			{ answerText: '7', isCorrect: true },
		],
	},
];

export default function App() {
	const [questions, setQuestions] = useState(questionsList);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [startQuiz, setStartQuiz] = useState(false);

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		}

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	const renderQuestions = () => {
		return (
			showScore ? (
				<div className='score-section'>
					You scored {score} out of {questions.length}
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Question {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			))
		
	}


	useEffect(()=>{
		document.addEventListener('contextmenu', (e) => {
			e.preventDefault();
		  });
		setQuestions(shuffleArray(questionsList));
	}, []);

	const TextArea= () =>{
		// var value = this.state.currentValue.replace('\\n', '\n');
		return (
		  <textarea name="body"
			// onChange={this.handleChange}
			// value={value}
			placeholder='Write your answer here' 
			/>
		)
	  }
	return (

		<>
		{startQuiz && !showScore && <Timer value={questions.length} />}
		{showScore && <h1>Test completed!</h1>}
		<div className='app' style={{userSelect:"none"}}>
			{startQuiz ? renderQuestions() : <button style={{justifyContent: 'center'}} onClick={()=>setStartQuiz(true)}><h1>Start Test</h1></button>}	
		</div>
		{/* <TextArea /> */}
		
		</>
	);
}

