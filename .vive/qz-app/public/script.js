document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('quiz-form');
  const res = await fetch('/api/questions');
  const questions = await res.json();

  questions.forEach((q, index) => {
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>${index + 1}. ${q.question}</strong></p>`;

    q.options.forEach((opt, i) => {
      const id = `q${index}_opt${i}`;
      div.innerHTML += `
        <label for="${id}">
          <input type="radio" name="q${index}" id="${id}" value="${i}" />
          ${opt}
        </label><br>
      `;
    });

    const feedback = document.createElement('p');
    feedback.id = `feedback${index}`;
    feedback.style.fontWeight = 'bold';
    div.appendChild(feedback);

    form.appendChild(div);
    form.appendChild(document.createElement('hr'));
  });

  form.addEventListener('change', (e) => {
    if (!e.target.name.startsWith('q')) return;
    const index = parseInt(e.target.name.slice(1));
    const selected = parseInt(e.target.value);
    const correct = questions[index].answer;

    const feedback = document.getElementById(`feedback${index}`);
    if (selected === correct) {
      feedback.textContent = '✅ 정답입니다!';
      feedback.style.color = 'green';
    } else {
      feedback.textContent = '❌ 오답입니다.';
      feedback.style.color = 'red';
    }
  });
});
