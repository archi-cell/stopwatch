// Elements
const questionForm = document.getElementById('new-question-form');
const responseForm = document.getElementById('response-form');
const questionList = document.getElementById('question-list');
const displayTitle = document.getElementById('display-title');
const displayQuestion = document.getElementById('display-question');
const responsesList = document.getElementById('responses-list');
const questionDisplay = document.getElementById('question-display');
const resolveBtn = document.getElementById('resolve-btn');
const questionFormSection = document.getElementById('question-form');

// Error messages
const titleError = document.getElementById('title-error');
const questionError = document.getElementById('question-error');
const nameError = document.getElementById('name-error');
const commentError = document.getElementById('comment-error');

// Data store for questions and responses
let questions = [];

// Add question
questionForm.addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value.trim();
    const questionText = document.getElementById('question').value.trim();

    // Form validation
    if (!title) {
        titleError.textContent = 'Title is required!';
        titleError.style.display = 'block';
    } else {
        titleError.style.display = 'none';
    }

    if (!questionText) {
        questionError.textContent = 'Question is required!';
        questionError.style.display = 'block';
    } else {
        questionError.style.display = 'none';
    }

    if (title && questionText) {
        const newQuestion = {
            id: questions.length + 1,
            title: title,
            question: questionText,
            responses: []
        };

        questions.push(newQuestion);
        addQuestionToList(newQuestion);
        questionForm.reset();
    }
});

// Function to add question (title + question) to the left pane
function addQuestionToList(question) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${question.title}</strong><br>${question.question}`;
    li.style.marginBottom = '10px'; // Add some space between the items
    li.addEventListener('click', function() {
        displayQuestionDetails(question);
    });
    questionList.appendChild(li);
}

// Function to display question details on the right pane
function displayQuestionDetails(question) {
    displayTitle.innerText = question.title;
    displayQuestion.innerText = question.question;
    responsesList.innerHTML = ''; // Clear previous responses
    question.responses.forEach(response => addResponseToList(response));
    questionDisplay.classList.remove('hidden');
    questionFormSection.classList.add('hidden');
    resolveBtn.classList.remove('hidden');

    // Attach resolve button functionality
    resolveBtn.onclick = function() {
        const confirmed = confirm("Are you sure you want to resolve this question?");
        if (confirmed) {
            questionFormSection.classList.remove('hidden');
            questionDisplay.classList.add('hidden');
        }
    };
    
    // Handle response form submission
    responseForm.onsubmit = function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const comment = document.getElementById('comment').value.trim();
        
        // Response form validation
        if (!name) {
            nameError.textContent = 'Name is required!';
            nameError.style.display = 'block';
        } else {
            nameError.style.display = 'none';
        }

        if (!comment) {
            commentError.textContent = 'Comment is required!';
            commentError.style.display = 'block';
        } else {
            commentError.style.display = 'none';
        }

        if (name && comment) {
            const response = { name, comment };
            question.responses.push(response);
            addResponseToList(response);
            responseForm.reset();
        }
    };
}

// Function to add response to the response list
function addResponseToList(response) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${response.name}:</strong> ${response.comment}`;
    responsesList.appendChild(li);
}
