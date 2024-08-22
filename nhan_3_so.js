// Tạo câu hỏi nhân một số có 1 chữ số với một số có 3 chữ số
function generateQuestion() {
    const singleDigit = Math.floor(Math.random() * 9) + 1; // Số có 1 chữ số từ 1-9
    const threeDigit = Math.floor(Math.random() * 900) + 100; // Số có 3 chữ số từ 100-999

    const question = `${singleDigit} x ${threeDigit}`;
    const correctAnswer = singleDigit * threeDigit;

    return { question, correctAnswer, singleDigit, threeDigit };
}

// Hiển thị quiz với một câu hỏi
function displayQuiz(quizData) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizData.forEach((quizItem, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <label>Câu hỏi ${index + 1}: ${quizItem.question} = </label>
            <input type="number" id="answer-${index}" class="answer-input" />
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Bắt đầu quiz
function startQuiz() {
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const quizData = [];

    for (let i = 0; i < numQuestions; i++) {
        quizData.push(generateQuestion());
    }

    displayQuiz(quizData);

    // Lưu quizData để sử dụng khi nộp bài
    window.quizData = quizData;

    document.getElementById('submit-btn').style.display = 'block';
}

// Kiểm tra và hiển thị kết quả
function submitQuiz() {
    const quizData = window.quizData;
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    quizData.forEach((quizItem, index) => {
        const userAnswer = parseInt(document.getElementById(`answer-${index}`).value);
        const resultList = document.createElement('div');
        resultList.classList.add('result-item');

        if (userAnswer === quizItem.correctAnswer) {
            resultList.classList.add('correct');
            resultList.textContent = `Câu ${index + 1}: Đúng! ${quizItem.question} = ${quizItem.correctAnswer}`;
        } else {
            resultList.classList.add('incorrect');
            resultList.textContent = `Câu ${index + 1}: Sai. Đáp án đúng là ${quizItem.correctAnswer}`;
        }

        const explanationDiv = document.createElement('div');
        explanationDiv.classList.add('explanation');
        explanationDiv.innerHTML = generateExplanation(quizItem);

        resultContainer.appendChild(resultList);
        resultContainer.appendChild(explanationDiv);
    });

    resultContainer.style.display = 'block';
}

// Giải thích từng bước làm phép nhân
function generateExplanation(quizItem) {
    const steps = [];
    const digits = quizItem.threeDigit.toString().split('').reverse();
    let stepResult = 0;
    let stepDetails = '';

    for (let i = 0; i < digits.length; i++) {
        const partialResult = quizItem.singleDigit * parseInt(digits[i]) * Math.pow(10, i);
        stepDetails += `${quizItem.singleDigit} x ${digits[i]} = ${quizItem.singleDigit * parseInt(digits[i])} => ${partialResult} (nhân với ${Math.pow(10, i)})<br>`;
        stepResult += partialResult;
    }

    steps.push(`
        <div class="step">
            Bước 1: Tách số ${quizItem.threeDigit} thành các chữ số ${digits.reverse().join(', ')}.
        </div>
    `);
    steps.push(`
        <div class="step">
            Bước 2: Nhân ${quizItem.singleDigit} lần lượt với từng chữ số:
            <br>${stepDetails}
        </div>
    `);
    steps.push(`
        <div class="step">
            Bước 3: Cộng tất cả các kết quả lại: ${stepResult}.
        </div>
    `);

    return steps.join('');
}
