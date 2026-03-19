// Переключатель темы
const themeToggle = document.getElementById("themeToggle");

themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  if(document.body.classList.contains("dark")){
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
};

// AI чат
const aiButton = document.getElementById("aiButton");
const aiChat = document.getElementById("aiChat");
const closeAI = document.getElementById("closeAI");

aiButton.onclick = () => {
  aiChat.style.display = "flex"; // открыть
};

closeAI.onclick = () => {
  aiChat.style.display = "none"; // закрыть
};
