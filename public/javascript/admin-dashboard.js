
// function generateQuestionInputs() {
//   const quizTitle = document.getElementById('quizTitle').value.trim();
//   const quizType = document.getElementById('quizType').value;
//   const numQuestions = parseInt(document.getElementById('numQuestions').value, 10);

//   if (!quizTitle || isNaN(numQuestions) || numQuestions <= 0) {
//     alert('Please enter a valid quiz title and a positive number of questions.');
//     return;
//   }

//   const questionInputsContainer = document.getElementById('questionInputs');
//   questionInputsContainer.innerHTML = '';

//   for (let i = 1; i <= numQuestions; i++) {
//     const questionContainer = document.createElement('div');
//     questionContainer.classList.add('question-container');

//     const questionLabel = document.createElement('label');
//     questionLabel.textContent = `${quizType} Question ${i}:`;

//     const questionInput = document.createElement('textarea');
//     questionInput.placeholder = `Enter ${quizType} question ${i}`;
//     questionInput.classList.add('question-input');
//     questionInput.id = `question-input-${i}`;

//     questionContainer.appendChild(questionLabel);
//     questionContainer.appendChild(questionInput);

//     if (quizType === 'mcq') {
//       const optionsContainer = document.createElement('fieldset');
//       optionsContainer.classList.add('options-container');

//       // Add input fields for MCQ options
//       for (let j = 1; j <= 4; j++) {
//         const optionContainer = document.createElement('div');
//         optionContainer.classList.add('option-container');

//         const optionRadio = document.createElement('input');
//         optionRadio.type = 'radio';
//         optionRadio.name = `correct-option-${i}`;
//         optionRadio.value = `Option ${j}`;
//         optionRadio.classList.add('option-radio');

//         const optionInput = document.createElement('input');
//         optionInput.type = 'text';
//         optionInput.placeholder = `Option ${j}`;
//         optionInput.classList.add('option-input');

//         optionContainer.appendChild(optionRadio);
//         optionContainer.appendChild(optionInput);
//         optionsContainer.appendChild(optionContainer);
//       }

//       questionContainer.appendChild(optionsContainer);
//     } else if (quizType === 'trueFalse') {
//       const trueFalseOptionsContainer = document.createElement('div');
//       trueFalseOptionsContainer.classList.add('true-false-options');

//       // Add radio buttons for True/False options
//       const trueOption = document.createElement('input');
//       trueOption.type = 'radio';
//       trueOption.name = `true-false-options-${i}`;
//       trueOption.value = 'True';
//       trueOption.classList.add('true-false-option');

//       const trueLabel = document.createElement('label');
//       trueLabel.textContent = 'True';

//       const falseOption = document.createElement('input');
//       falseOption.type = 'radio';
//       falseOption.name = `true-false-options-${i}`;
//       falseOption.value = 'False';
//       falseOption.classList.add('true-false-option');

//       const falseLabel = document.createElement('label');
//       falseLabel.textContent = 'False';

//       trueFalseOptionsContainer.appendChild(trueOption);
//       trueFalseOptionsContainer.appendChild(trueLabel);
//       trueFalseOptionsContainer.appendChild(falseOption);
//       trueFalseOptionsContainer.appendChild(falseLabel);

//       questionContainer.appendChild(trueFalseOptionsContainer);
//     }

//     questionInputsContainer.appendChild(questionContainer);
//   }

//   // Show the "Submit Questions" button after generating questions
//   document.getElementById('submitBtn').style.display = 'block';
// }


function generateQuestionInputs() {
  const quizTitle = document.getElementById('quizTitle').value.trim();
  const quizType = document.getElementById('quizType').value;
  const numQuestions = parseInt(document.getElementById('numQuestions').value, 10);

  if (!quizTitle || isNaN(numQuestions) || numQuestions <= 0) {
    alert('Please enter a valid quiz title and a positive number of questions.');
    return;
  }

  const questionInputsContainer = document.getElementById('questionInputs');
  questionInputsContainer.innerHTML = '';

  const questions = []; // Array to store the questions

  for (let i = 1; i <= numQuestions; i++) {
    const questionContainer = document.createElement('div');
    questionContainer.classList.add('question-container');

    const questionLabel = document.createElement('label');
    questionLabel.textContent = `${quizType} Question ${i}:`;

    const questionInput = document.createElement('textarea');
    questionInput.placeholder = `Enter ${quizType} question ${i}`;
    questionInput.classList.add('question-input');
    questionInput.id = `question-input-${i}`;

    questionContainer.appendChild(questionLabel);
    questionContainer.appendChild(questionInput);

    questions.push({ question: questionInput.value.trim(), options: [] });

    if (quizType === 'mcq') {
      const optionsContainer = document.createElement('fieldset');
      optionsContainer.classList.add('options-container');

      // Add input fields for MCQ options
      for (let j = 1; j <= 4; j++) {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option-container');

        const optionRadio = document.createElement('input');
        optionRadio.type = 'radio';
        optionRadio.name = `correct-option-${i}`;
        optionRadio.value = `Option ${j}`;
        optionRadio.classList.add('option-radio');

        const optionInput = document.createElement('input');
        optionInput.type = 'text';
        optionInput.placeholder = `Option ${j}`;
        optionInput.classList.add('option-input');

        optionContainer.appendChild(optionRadio);
        optionContainer.appendChild(optionInput);
        optionsContainer.appendChild(optionContainer);
      }

      questionContainer.appendChild(optionsContainer);
    } else if (quizType === 'trueFalse') {
      const trueFalseOptionsContainer = document.createElement('div');
      trueFalseOptionsContainer.classList.add('true-false-options');

      // Add radio buttons for True/False options
      const trueOption = document.createElement('input');
      trueOption.type = 'radio';
      trueOption.name = `true-false-options-${i}`;
      trueOption.value = 'True';
      trueOption.classList.add('true-false-option');

      const trueLabel = document.createElement('label');
      trueLabel.textContent = 'True';

      const falseOption = document.createElement('input');
      falseOption.type = 'radio';
      falseOption.name = `true-false-options-${i}`;
      falseOption.value = 'False';
      falseOption.classList.add('true-false-option');

      const falseLabel = document.createElement('label');
      falseLabel.textContent = 'False';

      trueFalseOptionsContainer.appendChild(trueOption);
      trueFalseOptionsContainer.appendChild(trueLabel);
      trueFalseOptionsContainer.appendChild(falseOption);
      trueFalseOptionsContainer.appendChild(falseLabel);

      questionContainer.appendChild(trueFalseOptionsContainer);
    }

    questionInputsContainer.appendChild(questionContainer);
  }

  // Show the "Submit Questions" button after generating questions
  document.getElementById('submitBtn').style.display = 'block';

  // Log the collected questions for debugging
  console.log(questions);
}



async function submitQuestions() {
  const quizTitle = document.getElementById('quizTitle').value.trim();
  const quizType = document.getElementById('quizType').value;
  const numQuestions = parseInt(document.getElementById('numQuestions').value, 10);

  if (!quizTitle || isNaN(numQuestions) || numQuestions <= 0) {
    alert('Please enter a valid quiz title and a positive number of questions.');
    return;
  }

  const questions = [];
  const options = []; // For MCQs
  const correctAnswers = [];

  for (let i = 1; i <= numQuestions; i++) {
    const questionInput = document.getElementById(`question-input-${i}`);
    questions.push(questionInput.value.trim());

    if (quizType === 'mcq') {
      const selectedOption = document.querySelector(`input[name="correct-option-${i}"]:checked`);

      if (!selectedOption) {
        alert(`Please select an option for MCQ Question ${i}`);
        return;
      }

      options.push(Array.from(document.querySelectorAll(`input[name="correct-option-${i}"]`)).map(input => input.nextElementSibling.value.trim()));
      correctAnswers.push(selectedOption.value.trim());
    } else if (quizType === 'trueFalse') {
      const trueOption = document.querySelector(`input[name="true-false-options-${i}"][value="True"]:checked`);
      const falseOption = document.querySelector(`input[name="true-false-options-${i}"][value="False"]:checked`);

      if (!trueOption || !falseOption) {
        alert(`Please select True/False for Question ${i}`);
        return;
      }

      options.push(['True', 'False']);
      correctAnswers.push(trueOption.value.trim());
    } else {
      // For short answer, no options are needed
      options.push([]);
      correctAnswers.push('');
    }
  }

  try {
    // Send a POST request to your server
    const response = await fetch('/saveQuestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        quizTitle,
        quizType,
        numQuestions,
        questions,
        options,
        correctAnswers,
      }),
    });

    if (response.ok) {
      // Optionally, you can reset the form or perform any other actions after submitting
      alert('Questions submitted successfully!');
    } else {
      console.error('Failed to submit questions:', response.statusText);
      alert('Failed to submit questions. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('An error occurred. Please try again.');
  }
}



