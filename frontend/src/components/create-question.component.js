import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CreateQuestion = () => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    const question = {
      questionText,
      questionType,
    };

    console.log('question', question);
    axios
      .post('http://localhost:5050/questions/add', question)
      .then((res) => console.log(res.data));
    // window.location = '/';
  };
  useEffect(() => {
    axios
      .get('http://localhost:5050/users/')
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h3>Create New question</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Question: </label>
          <input
            type='text'
            required
            className='form-control'
            value={questionText}
            onChange={(e) => setQuestionType(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label>Question Type: </label>
          <input
            type='text'
            style={{color:"black" }}
            required
            className='form-control'
            value={questionType}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <input
            type='submit'
            value='Create'
            className='btn btn-primary'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
