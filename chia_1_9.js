// Tạo câu hỏi chia với số chia từ 1 đến 9
function generateQuestion() {
    const divisor = Math.floor(Math.random() * 9) + 1; // Số chia từ 1-9
    const quotient = Math.floor(Math.random() * 9) + 1; // Thương số từ 1-9
    const dividend = divisor * quotient; // Số bị chia

    const question = `${dividend} : ${divisor}`;
    const correctAnswer = quotient;

    return { question, correctAnswer };
}

// Hiển thị quiz với số lượng câu hỏi do người dùng nhập
function displayQuiz(quizData) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <label>${index + 1}. ${item.question} = </label>
            <input type="number" id="answer-${index}" class="answer-input" />
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Bắt đầu quiz
function startQuiz() {
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const quizData = Array.from({ length: numQuestions }, () => generateQuestion());

    displayQuiz(quizData);

    // Hiển thị quiz và nút submit
    document.getElementById('quiz').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'block';

    // Lưu quizData để sử dụng khi nộp bài
    window.quizData = quizData;
}

// Kiểm tra và hiển thị kết quả
function submitQuiz() {
    const quizData = window.quizData;
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    let score = 0;
    const resultList = document.createElement('ul');

    quizData.forEach((item, index) => {
        const userAnswer = parseInt(document.getElementById(`answer-${index}`).value);
        const listItem = document.createElement('li');
        listItem.classList.add('result-item');
        if (userAnswer === item.correctAnswer) {
            score++;
            listItem.classList.add('correct');
            listItem.textContent = `Câu ${index + 1}: Đúng! (${item.question} = ${item.correctAnswer})`;
        } else {
            listItem.classList.add('incorrect');
            listItem.innerHTML = `
                Câu ${index + 1}: Sai. Đáp án đúng là ${item.correctAnswer}.
            `;
        }
        resultList.appendChild(listItem);
    });

    resultContainer.appendChild(resultList);
    resultContainer.innerHTML += `<p>Bạn đã trả lời đúng ${score}/${quizData.length} câu.</p>`;
    resultContainer.style.display = 'block';
}