
const readyPrograms = [
  {
    title: 'Full Body Foundation',
    goal: 'mass',
    frequency: '3 дня в неделю',
    description: 'Универсальный full body для новичков и тех, кто хочет прогрессировать равномерно по всему телу.',
    days: [
      'День A: присед, жим лежа, тяга верхнего блока, планка.',
      'День B: румынская тяга, жим гантелей сидя, тяга штанги в наклоне, скручивания.',
      'День C: жим ногами, отжимания на брусьях, подтягивания, гиперэкстензия.'
    ]
  },
  {
    title: 'Power Upper / Lower',
    goal: 'strength',
    frequency: '4 дня в неделю',
    description: 'Силовой upper/lower сплит с акцентом на базовые упражнения и прогрессию рабочих весов.',
    days: [
      'Upper 1: жим лежа 5x5, подтягивания 4x6, жим стоя 4x6.',
      'Lower 1: присед 5x5, румынская тяга 4x6, выпады 3x10.',
      'Upper 2: жим гантелей 4x8, тяга штанги 4x8, брусья 3x10.',
      'Lower 2: фронтальный присед 4x6, тяга сумо 4x5, икры 4x15.'
    ]
  },
  {
    title: 'Classic Bodybuilding Split',
    goal: 'classic',
    frequency: '5 дней в неделю',
    description: 'Классический бодибилдерский сплит с отдельными днями на мышечные группы.',
    days: [
      'Понедельник: грудь + пресс.',
      'Вторник: спина + задняя дельта.',
      'Среда: ноги.',
      'Четверг: плечи + трапеция.',
      'Пятница: руки + пресс.'
    ]
  },
  {
    title: 'Shred & Shape',
    goal: 'cut',
    frequency: '4–5 дней в неделю',
    description: 'Программа для сушки: умеренный объем, короткий отдых, финишеры и метаболическая работа.',
    days: [
      'День 1: грудь/спина суперсетами + интервальное кардио.',
      'День 2: ноги + ягодицы + ходьба под наклоном.',
      'День 3: плечи/руки круговой работой.',
      'День 4: full body pump + пресс.'
    ]
  },
  {
    title: 'Hybrid Muscle Builder',
    goal: 'mass',
    frequency: '4 дня в неделю',
    description: 'Комбинация силовых диапазонов и пампинга для набора качественной массы.',
    days: [
      'День 1: тяжелая грудь + трицепс.',
      'День 2: тяжелая спина + бицепс.',
      'День 3: квадрицепс + задняя поверхность бедра.',
      'День 4: плечи + руки в памп-режиме.'
    ]
  },
  {
    title: 'Athletic Recomp Plan',
    goal: 'cut',
    frequency: '3–4 дня в неделю',
    description: 'Для тех, кто хочет одновременно улучшать композицию тела, силу и общую форму.',
    days: [
      'День 1: full body с упором на жимовые движения.',
      'День 2: full body с упором на тяговые движения.',
      'День 3: ноги, кор и кондиция.',
      'Опционально: функциональный день с санями, канатами и кардио.'
    ]
  }
];

const legendaryPrograms = [
  {
    name: 'Arnold-Inspired Volume Split',
    tag: 'classic',
    focus: 'Высокий объем',
    text: 'Подход в духе золотой эры: много подходов, отличный mind-muscle connection и сильный пампинг.'
  },
  {
    name: 'Dorian-Style Intensity',
    tag: 'strength',
    focus: 'Низкий объем / высокая интенсивность',
    text: 'Один тяжелый рабочий сет после качественной разминки, контроль техники и ставка на прогрессию.'
  },
  {
    name: 'Ronnie Power Mass',
    tag: 'mass',
    focus: 'База и масса',
    text: 'Тяжелые базовые движения, большие веса, энергия и силовой характер тренировочного цикла.'
  },
  {
    name: 'Chris Bumstead Aesthetics',
    tag: 'classic',
    focus: 'Пропорции и эстетика',
    text: 'Акцент на форму, пропорции, плечевой пояс, спину и чистую технику для эстетичного силуэта.'
  }
];

const filterLabels = {
  all: 'Все программы',
  mass: 'Набор массы',
  strength: 'Сила',
  cut: 'Рельеф',
  classic: 'Классика'
};

const programGrid = document.getElementById('programGrid');
const legendGrid = document.getElementById('legendGrid');
const filters = document.getElementById('filters');
const customProgramForm = document.getElementById('customProgramForm');
const savedProgramsContainer = document.getElementById('savedPrograms');
const programTemplate = document.getElementById('programCardTemplate');
const savedTemplate = document.getElementById('savedProgramTemplate');
const aiButton = document.getElementById('aiButton');
const focusAssistant = document.getElementById('focusAssistant');
const gptbotsZone = document.getElementById('gptbotsZone');

const STORAGE_KEY = 'ea-gym-custom-workouts';
let currentFilter = 'all';

function renderPrograms() {
  const filtered = currentFilter === 'all'
    ? readyPrograms
    : readyPrograms.filter((program) => program.goal === currentFilter);

  programGrid.innerHTML = '';

  filtered.forEach((program) => {
    const fragment = programTemplate.content.cloneNode(true);
    fragment.querySelector('.program-badge').textContent = filterLabels[program.goal];
    fragment.querySelector('.program-frequency').textContent = program.frequency;
    fragment.querySelector('.program-title').textContent = program.title;
    fragment.querySelector('.program-description').textContent = program.description;

    const daysList = fragment.querySelector('.program-days');
    program.days.forEach((day) => {
      const item = document.createElement('li');
      item.textContent = day;
      daysList.appendChild(item);
    });

    programGrid.appendChild(fragment);
  });
}

function renderLegendaryPrograms() {
  legendGrid.innerHTML = legendaryPrograms.map((program) => `
    <article class="legend-card">
      <div class="program-top">
        <span class="program-badge">${filterLabels[program.tag]}</span>
        <span class="program-frequency">${program.focus}</span>
      </div>
      <h3>${program.name}</h3>
      <p>${program.text}</p>
    </article>
  `).join('');
}

function getSavedPrograms() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

function savePrograms(programs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
}

function renderSavedPrograms() {
  const programs = getSavedPrograms();
  savedProgramsContainer.innerHTML = '';

  if (!programs.length) {
    savedProgramsContainer.innerHTML = '<div class="empty-state">Пока нет пользовательских программ. Создай первую — она сохранится после перезагрузки.</div>';
    return;
  }

  programs.forEach((program, index) => {
    const fragment = savedTemplate.content.cloneNode(true);
    fragment.querySelector('.program-badge').textContent = filterLabels[program.goal] || 'Моя программа';
    fragment.querySelector('.saved-title').textContent = program.title;
    fragment.querySelector('.saved-frequency').textContent = program.frequency;
    fragment.querySelector('.saved-description').textContent = program.description;
    fragment.querySelector('.saved-exercises').textContent = program.exercises;
    fragment.querySelector('.delete-btn').addEventListener('click', () => deleteProgram(index));
    savedProgramsContainer.appendChild(fragment);
  });
}

function deleteProgram(index) {
  const programs = getSavedPrograms();
  programs.splice(index, 1);
  savePrograms(programs);
  renderSavedPrograms();
}

function setupFilters() {
  filters.addEventListener('click', (event) => {
    const button = event.target.closest('.filter-btn');
    if (!button) return;

    currentFilter = button.dataset.filter;
    document.querySelectorAll('.filter-btn').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderPrograms();
  });
}

function setupCustomForm() {
  customProgramForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newProgram = {
      title: document.getElementById('programTitle').value.trim(),
      goal: document.getElementById('programGoal').value,
      frequency: document.getElementById('programFrequency').value.trim(),
      description: document.getElementById('programDescription').value.trim(),
      exercises: document.getElementById('programExercises').value.trim()
    };

    if (!newProgram.title || !newProgram.frequency || !newProgram.description || !newProgram.exercises) {
      return;
    }

    const programs = getSavedPrograms();
    programs.unshift(newProgram);
    savePrograms(programs);
    customProgramForm.reset();
    renderSavedPrograms();
  });
}

function moveAssistantWidget() {
  const widgetFrame = document.querySelector('iframe[src*="gptbots.ai"]');
  if (!widgetFrame || !gptbotsZone) return false;

  gptbotsZone.innerHTML = '';
  gptbotsZone.appendChild(widgetFrame);
  widgetFrame.style.position = 'static';
  widgetFrame.style.left = 'auto';
  widgetFrame.style.bottom = 'auto';
  widgetFrame.style.right = 'auto';
  widgetFrame.style.width = '100%';
  widgetFrame.style.height = '520px';
  widgetFrame.style.zIndex = '1';
  return true;
}

function initAssistant() {
  if (window.GPTBots) {
    window.GPTBots.init({
      botId: '69b77d5df1ecd66163cd29a8',
      botIntroduction: 'Привет! Я твой AI тренер 💪'
    });
  }

  let attempts = 0;
  const intervalId = setInterval(() => {
    attempts += 1;
    if (moveAssistantWidget() || attempts > 20) {
      clearInterval(intervalId);
      if (attempts > 20 && gptbotsZone.querySelector('.assistant-placeholder')) {
        gptbotsZone.querySelector('.assistant-placeholder').textContent = 'Не удалось встроить AI автоматически. Попробуй обновить страницу.';
      }
    }
  }, 800);
}

function scrollToAssistant() {
  document.getElementById('assistant-zone').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

aiButton.addEventListener('click', scrollToAssistant);
focusAssistant.addEventListener('click', scrollToAssistant);

renderPrograms();
renderLegendaryPrograms();
renderSavedPrograms();
setupFilters();
setupCustomForm();
window.addEventListener('load', initAssistant);