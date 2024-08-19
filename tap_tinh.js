// Các phép toán có thể sử dụng
const operations = ['+', '-', '*', '/'];

// Tạo một câu hỏi với các phép toán kết hợp
function generateQuestion() {
    while (true) {
        const numOperands = Math.floor(Math.random() * 3) + 2; // Số lượng phép toán trong câu hỏi (2 đến 4)
        const numbers = Array.from({ length: numOperands + 1 }, () => Math.floor(Math.random() * 9) + 1);
        const ops = Array.from({ length: numOperands }, () => operations[Math.floor(Math.random() * operations.length)]);

        // Điều chỉnh các phép chia để tránh chia cho 0 và đảm bảo chia hết
        for (let i = 0; i < numOperands; i++) {
            if (ops[i] === '/') {
                while (numbers[i] % numbers[i + 1] !== 0) {
                    numbers[i + 1] = Math.floor(Math.random() * 9) + 1;
                }
            }
        }

        // Tạo câu hỏi dưới dạng chuỗi
        let question = `${numbers[0]}`;
        for (let i = 0; i < numOperands; i++) {
            question += ` ${ops[i]} ${numbers[i + 1]}`;
        }

        // Tính kết quả
        const correctAnswer = eval(question);

        // Đảm bảo kết quả là số nguyên dương
        if (Number.isInteger(correctAnswer) && correctAnswer > 0) {
            return { question, correctAnswer };
        }
    }
}

// Tạo ra 10 câu hỏi
const quizData = Array.from({ length: 10 }, generateQuestion);

// Hiển thị câu hỏi trên trang web
function displayQuiz() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <label>Câu ${index + 1}: ${item.question} = </label>
            <input type="number" id="answer-${index}" class="answer-input" />
        `;
        quizContainer.appendChild(questionDiv);
    });
}

// Kiểm tra và hiển thị kết quả
function submitQuiz() {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    let score = 0;
    const resultList = document.createElement('ul');

    quizData.forEach((item, index) => {
        const userAnswer = parseInt(document.getElementById(`answer-${index}`).value);
        const listItem = document.createElement('li');
        if (userAnswer === item.correctAnswer) {
            score++;
            listItem.textContent = `Câu ${index + 1}: Đúng! (${item.question} = ${item.correctAnswer})`;
        } else {
            listItem.textContent = `Câu ${index + 1}: Sai. Đáp án đúng là ${item.correctAnswer}`;
        }
        resultList.appendChild(listItem);
    });

    resultContainer.appendChild(resultList);
    resultContainer.innerHTML += `<p>Bạn đã trả lời đúng ${score}/10 câu.</p>`;
}

// Khởi động quiz khi tải trang
window.onload = displayQuiz;