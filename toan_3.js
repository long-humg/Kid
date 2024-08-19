const operations = ['+', '-', '*', '/'];
let currentQuestion = '';
let correctAnswer = 0;

function generateQuestion() {
    while (true) {
        let numOperands = Math.floor(Math.random() * 3) + 2; // số lượng phép toán trong câu hỏi (2 đến 4)
        let numbers = [];
        for (let i = 0; i <= numOperands; i++) {
            numbers.push(Math.floor(Math.random() * 9) + 1);
        }
        let ops = [];
        for (let i = 0; i < numOperands; i++) {
            ops.push(operations[Math.floor(Math.random() * operations.length)]);
        }

        // Điều chỉnh các phép chia để đảm bảo chia hết và không chia cho 0
        for (let i = 0; i < numOperands; i++) {
            if (ops[i] === '/') {
                while (numbers[i + 1] === 0 || numbers[i] % numbers[i + 1] !== 0) {
                    numbers[i + 1] = Math.floor(Math.random() * 9) + 1;
                }
            }
        }

        // Tạo câu hỏi
        let question = `${numbers[0]}`;
        for (let i = 0; i < numOperands; i++) {
            question += ` ${ops[i]} ${numbers[i + 1]}`;
        }

        // Tính toán kết quả đúng
        try {
            let result = eval(question);
            if (Number.isInteger(result) && result > 0) {
                correctAnswer = result;
                currentQuestion = question;
                break;
            }
        } catch (error) {
            // Nếu có lỗi xảy ra khi sử dụng eval, tiếp tục vòng lặp để tạo câu hỏi mới
            continue;
        }
    }
    document.getElementById('question').textContent = currentQuestion + ' = ?';
    console.log(currentQuestion)
}

function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer').value);
    let message = document.getElementById('message');
    console.log(userAnswer)
    if (userAnswer === correctAnswer) {
        message.textContent = 'Correct! Great job!';
        message.style.color = 'green';
        console.log('Correct! Great job!')
    } else {
        message.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        message.style.color = 'red';
        console.log('Incorrect.')
    }
    
}

function nextQuestion() {
    document.getElementById('answer').value = '';
    document.getElementById('message').textContent = '';
    generateQuestion();
}

// Tạo câu hỏi đầu tiên khi trang được tải
window.onload = function() {
    generateQuestion();
};