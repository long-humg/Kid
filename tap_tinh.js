// Các phép toán có thể sử dụng
const operations = ['+', '-', '*', '/'];

// Tạo một câu hỏi với các phép toán kết hợp
function generateQuestion(numOperations) {
    while (true) {
        const numbers = Array.from({ length: numOperations + 1 }, () => Math.floor(Math.random() * 9) + 1);
        const ops = Array.from({ length: numOperations }, () => operations[Math.floor(Math.random() * operations.length)]);

        // Điều chỉnh các phép chia để tránh chia cho 0 và đảm bảo chia hết
        for (let i = 0; i < numOperations; i++) {
            if (ops[i] === '/') {
                while (numbers[i] % numbers[i + 1] !== 0) {
                    numbers[i + 1] = Math.floor(Math.random() * 9) + 1;
                }
            }
        }

        // Tạo câu hỏi dưới dạng chuỗi
        let question = `${numbers[0]}`;
        for (let i = 0; i < numOperations; i++) {
            question += ` ${ops[i]} ${numbers[i + 1]}`;
        }

        // Tính kết quả
        const correctAnswer = eval(question);

        // Chuyển đổi các ký hiệu trong câu hỏi hiển thị cho người dùng
        const displayQuestion = question.replace(/\*/g, 'x').replace(/\//g, ':');

        // Đảm bảo kết quả là số nguyên dương
        if (Number.isInteger(correctAnswer) && correctAnswer > 0) {
            return { question, correctAnswer, explanation: getExplanation(question), displayQuestion };
        }
    }
}

// Giải thích từng bước tính toán cho câu hỏi
function getExplanation(question) {
    // Giải thích từng bước theo thứ tự toán học đúng
    const steps = [];
    const tokens = question.split(' ');
    
    // Tạo các nhóm phép tính theo thứ tự đúng
    const evalSteps = [];
    let intermediateResult = eval(tokens.join(''));
    let expression = tokens.join(' ');

    steps.push(`${expression.replace(/\*/g, 'x').replace(/\//g, ':')} = ${intermediateResult}`);

    // Quá trình tính toán sẽ được lưu thành các bước giải thích
    return steps.join(', sau đó, ');
}

// Hiển thị quiz
function displayQuiz(quizData) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <label>${index + 1}. ${item.displayQuestion} = </label>
            <input type="number" id="answer-${index}" class="answer-input" />
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Bắt đầu quiz với số lượng câu hỏi và phép toán được chỉ định
function startQuiz() {
    const numQuestions = parseInt(document.getElementById('num-questions').value);
    const numOperations = parseInt(document.getElementById('num-operations').value);
    
    const quizData = Array.from({ length: numQuestions }, () => generateQuestion(numOperations));

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
        if (userAnswer === item.correctAnswer) {
            score++;
            listItem.textContent = `Câu ${index + 1}: Đúng! (${item.displayQuestion} = ${item.correctAnswer})`;
        } else {
            listItem.innerHTML = `
                Câu ${index + 1}: Sai. Đáp án đúng là ${item.correctAnswer}.
                <br>Giải thích: ${item.explanation}
            `;
        }
        resultList.appendChild(listItem);
    });

    resultContainer.appendChild(resultList);
    resultContainer.innerHTML += `<p>Bạn đã trả lời đúng ${score}/${quizData.length} câu.</p>`;
    resultContainer.style.display = 'block';
}
