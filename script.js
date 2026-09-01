const slides = [...document.querySelectorAll('.slide')];
const notes = [
  'Good day everyone. My South African hero is Natalie du Toit. Natalie is a famous South African swimmer. She was born in Cape Town and loved swimming from a young age.',
  'When Natalie was 17 years old, she was involved in a serious scooter accident. Doctors had to amputate her left leg. That could have stopped her from following her dreams. However, she was brave and did not give up.',
  'Natalie worked hard every day and started swimming again. She became a champion Paralympic swimmer. She even competed against swimmers without disabilities.',
  'Natalie represented South Africa at the 2008 Olympic Games in Beijing. She competed in the 10-kilometre open-water race and showed that courage can take you further than anyone expects.',
  'I chose Natalie du Toit as my South African hero because she was a great swimmer, but more importantly, she never gave up on her dream. Her story makes me feel proud. She showed the world what a South African can achieve with courage and hard work.',
  'Natalie taught me that when something difficult happens, I must keep trying, believe in myself, work hard, and never give up. If Natalie were standing in front of me today, I would say: Natalie, you are a great swimmer, and you inspire me to never give up on my dreams. Thank you for listening.'
];
let index = 0;
let touchStart = 0;
const current = document.querySelector('#current');
const progress = document.querySelector('.progress span');
const notesPanel = document.querySelector('#notesPanel');
const notesText = document.querySelector('#notesText');

function show(next) {
  index = (next + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  current.textContent = String(index + 1).padStart(2, '0');
  progress.style.width = `${((index + 1) / slides.length) * 100}%`;
  notesText.textContent = notes[index];
}

document.querySelector('#next').addEventListener('click', () => show(index + 1));
document.querySelector('#prev').addEventListener('click', () => show(index - 1));
document.querySelector('#notes').addEventListener('click', () => {
  notesPanel.classList.toggle('open');
  notesPanel.setAttribute('aria-hidden', String(!notesPanel.classList.contains('open')));
});
document.querySelector('#closeNotes').addEventListener('click', () => notesPanel.classList.remove('open'));
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight' || event.key === ' ') show(index + 1);
  if (event.key === 'ArrowLeft') show(index - 1);
  if (event.key === 'Escape') notesPanel.classList.remove('open');
});
document.addEventListener('touchstart', (event) => { touchStart = event.changedTouches[0].screenX; }, {passive:true});
document.addEventListener('touchend', (event) => {
  const distance = event.changedTouches[0].screenX - touchStart;
  if (Math.abs(distance) > 55) show(index + (distance < 0 ? 1 : -1));
}, {passive:true});

const sourceDialog = document.querySelector('#sources');
document.querySelector('#sourceButton').addEventListener('click', () => sourceDialog.showModal());
document.querySelector('#closeSources').addEventListener('click', () => sourceDialog.close());
show(0);
