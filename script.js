/* ==========================================================================
   My South African Hero — Natalie du Toit
   Luchelle Crafford · Grade 3A1 · Panorama Primary School
   Deck navigation: buttons, keyboard, swipe, dots, notes, sources.
   ========================================================================== */

(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot'));
  var current = document.getElementById('current');
  var progressFill = document.getElementById('progressFill');
  var notesPanel = document.getElementById('notesPanel');
  var notesText = document.getElementById('notesText');
  var notesSlideName = document.getElementById('notesSlideName');
  var notesBtn = document.getElementById('notesBtn');
  var sourcesDialog = document.getElementById('sourcesDialog');

  var slideNames = [
    'Cover',
    'The accident',
    'Returning to the pool',
    'Beijing 2008',
    'Why she is my hero',
    'What Natalie taught me'
  ];

  var notes = [
    'Good day everyone. My South African hero is Natalie du Toit. Natalie is a famous South African swimmer. She was born in Cape Town and loved swimming from a young age.',
    'When Natalie was 17 years old, she was involved in a serious scooter accident. Doctors had to amputate her left leg. That could have stopped her from following her dreams. However, she was brave and did not give up.',
    'Natalie worked hard every day and started swimming again. She became a champion Paralympic swimmer. She even competed against swimmers without disabilities.',
    'Natalie represented South Africa at the 2008 Olympic Games in Beijing. She competed in the 10-kilometre open-water race and showed that courage can take you further than anyone expects.',
    'I chose Natalie du Toit as my South African hero because she was a great swimmer, but more importantly, she never gave up on her dream. Her story makes me feel proud. She showed the world what a South African can achieve with courage and hard work.',
    'Natalie taught me that when something difficult happens, I must keep trying, believe in myself, work hard, and never give up. If Natalie were standing in front of me today, I would say: Natalie, you are a great swimmer, and you inspire me to never give up on my dreams. Thank you for listening.'
  ];

  var index = 0;
  var touchStartX = 0;
  var touchStartY = 0;

  function show(next, direction) {
    var previous = index;
    index = (next + slides.length) % slides.length;

    slides.forEach(function (slide, i) {
      slide.classList.toggle('from-right', direction === 'back');
      slide.classList.toggle('active', i === index);
      slide.setAttribute('aria-hidden', i === index ? 'false' : 'true');
    });

    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === index);
      dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });

    current.textContent = String(index + 1).padStart(2, '0');
    progressFill.style.width = (((index + 1) / slides.length) * 100) + '%';
    notesText.textContent = notes[index];
    notesSlideName.textContent = slideNames[index];

    if (previous !== index && typeof window.getSelection === 'function') {
      var selection = window.getSelection();
      if (selection && selection.removeAllRanges) { selection.removeAllRanges(); }
    }
  }

  function nextSlide() { show(index + 1, 'forward'); }
  function prevSlide() { show(index - 1, 'back'); }

  /* --- buttons --- */
  document.getElementById('next').addEventListener('click', nextSlide);
  document.getElementById('prev').addEventListener('click', prevSlide);

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      var target = parseInt(dot.getAttribute('data-goto'), 10);
      show(target, target < index ? 'back' : 'forward');
    });
  });

  /* --- speaking words panel --- */
  function openNotes(open) {
    notesPanel.classList.toggle('open', open);
    notesPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    notesBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  notesBtn.addEventListener('click', function () {
    openNotes(!notesPanel.classList.contains('open'));
  });

  document.getElementById('closeNotes').addEventListener('click', function () {
    openNotes(false);
    notesBtn.focus();
  });

  /* --- sources dialog --- */
  document.getElementById('sourcesBtn').addEventListener('click', function () {
    sourcesDialog.showModal();
  });

  document.getElementById('closeSources').addEventListener('click', function () {
    sourcesDialog.close();
  });

  sourcesDialog.addEventListener('click', function (event) {
    if (event.target === sourcesDialog) { sourcesDialog.close(); }
  });

  /* --- keyboard --- */
  document.addEventListener('keydown', function (event) {
    if (sourcesDialog.open) { return; }
    if (event.key === 'ArrowRight' || event.key === ' ' || event.key === 'PageDown') {
      event.preventDefault();
      nextSlide();
    } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
      event.preventDefault();
      prevSlide();
    } else if (event.key === 'Home') {
      event.preventDefault();
      show(0, 'back');
    } else if (event.key === 'End') {
      event.preventDefault();
      show(slides.length - 1, 'forward');
    } else if (event.key === 'Escape') {
      openNotes(false);
    }
  });

  /* --- touch swipe (horizontal only) --- */
  document.addEventListener('touchstart', function (event) {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', function (event) {
    var dx = event.changedTouches[0].screenX - touchStartX;
    var dy = event.changedTouches[0].screenY - touchStartY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) { nextSlide(); } else { prevSlide(); }
    }
  }, { passive: true });

  /* --- image reliability check: log any image that fails to decode --- */
  Array.prototype.slice.call(document.images).forEach(function (img) {
    img.addEventListener('error', function () {
      /* eslint-disable-next-line no-console */
      console.error('Image failed to load: ' + img.getAttribute('src'));
    });
  });

  show(0, 'forward');
})();
