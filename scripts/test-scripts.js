const questions = document.querySelectorAll('.question');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const resultBlock = document.getElementById('resultBlock');
const restartBtn = document.getElementById('restartBtn');

let currentQuestion = 0;

function showQuestion(index) {
  questions.forEach(q => q.classList.remove('active'));
  questions[index].classList.add('active');
  currentQuestion = index;

  const progress = ((index + 1) / questions.length) * 100;
  progressFill.style.width = progress + '%';

  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === questions.length - 1 ? 'Завершить' : 'Далее →';
}

function isAnswered(index) {
  const question = questions[index];
  const radios = question.querySelectorAll('input[type="radio"]');
  for (let radio of radios) {
    if (radio.checked) return true;
  }
  return false;
}

function calculateResult() {
  let total = 0;
  for (let i = 1; i <= 5; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (selected) {
      total += parseInt(selected.value);
    }
  }
  return total;
}

function showResult() {
  const score = calculateResult();
  document.getElementById('resultScore').textContent = score;

  const resultLevel = document.getElementById('resultLevel');
  const resultDesc = document.getElementById('resultDesc');

  if (score >= 13) {
    resultLevel.textContent = '🛡️ ВЫСОКИЙ УРОВЕНЬ';
    resultLevel.style.color = '#00ff00';
    resultDesc.textContent = 'Ты настоящий кибер-самурай! Твоя защита на высоте, но не расслабляйся — вирусы эволюционируют.';
  } else if (score >= 9) {
    resultLevel.textContent = '⚠️ СРЕДНИЙ УРОВЕНЬ';
    resultLevel.style.color = '#ffff00';
    resultDesc.textContent = 'Неплохо, но есть уязвимости. Установи антивирус и используй сложные пароли.';
  } else if (score >= 5) {
    resultLevel.textContent = '🔻 НИЗКИЙ УРОВЕНЬ';
    resultLevel.style.color = '#ff9900';
    resultDesc.textContent = 'Ты в зоне риска! Срочно обнови защиту и не кликай на подозрительные ссылки.';
  } else {
    resultLevel.textContent = '💀 КРИТИЧЕСКИЙ УРОВЕНЬ';
    resultLevel.style.color = '#ff0000';
    resultDesc.textContent = 'Твой компьютер — рассадник вирусов! Немедленно установи антивирус и проверь систему.';
  }

  document.querySelector('.test-container').style.background = 'rgba(8, 8, 12, 0.95)';
  questions.forEach(q => q.classList.remove('active'));
  resultBlock.classList.add('active');
}

function resetTest() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => radio.checked = false);

  resultBlock.classList.remove('active');

  showQuestion(0);

  document.querySelector('.test-container').style.background = 'rgba(5, 5, 8, 0.9)';
}

nextBtn.addEventListener('click', () => {
  if (!isAnswered(currentQuestion)) {
    alert('🔥 Выбери вариант ответа!');
    return;
  }

  if (currentQuestion === questions.length - 1) {
    showResult();
  } else {
    showQuestion(currentQuestion + 1);
  }
});

prevBtn.addEventListener('click', () => {
  showQuestion(currentQuestion - 1);
});

restartBtn.addEventListener('click', resetTest);

showQuestion(0);