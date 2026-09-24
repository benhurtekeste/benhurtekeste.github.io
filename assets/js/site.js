document.getElementById('theme-toggle').addEventListener('click', function () {
  var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  try { localStorage.setItem('theme', next); } catch (e) {}
});

document.querySelectorAll('.more-authors').forEach(function (el) {
  var collapsed = el.textContent;
  el.addEventListener('click', function () {
    var expanded = el.dataset.expanded === '1';
    el.textContent = expanded ? collapsed : el.dataset.more;
    el.dataset.expanded = expanded ? '0' : '1';
  });
});

(function () {
  var links = document.querySelector('.nav-links');
  var toggle = document.getElementById('theme-toggle');
  if (!links || !toggle || typeof HTMLDialogElement === 'undefined') return;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'navbar-link bio-trigger';
  btn.textContent = 'Bio';
  links.insertBefore(btn, toggle);

  var dlg = document.createElement('dialog');
  dlg.className = 'bio-dialog';
  dlg.setAttribute('aria-labelledby', 'bio-title');
  dlg.innerHTML =
    '<button type="button" class="bio-close" aria-label="Close bio">&times;</button>' +
    '<div class="bio-head">' +
      '<img src="/assets/img/prof_pic.jpg" alt="Benhur Tekeste">' +
      '<div><h2 id="bio-title">Benhur Tekeste</h2>' +
      '<p class="muted">Researcher in Cybersecurity and AI &middot; RIT Dubai</p></div>' +
    '</div>' +
    '<p>Benhur Tekeste, originally from Eritrea, is a research assistant in Cybersecurity and AI at Rochester Institute of Technology, Dubai. His research interests include securing data, networks and systems. He has published in reputable venues and holds several industry-recognized certifications. He graduated in Computer Engineering from Khalifa University in 2023.</p>';
  document.body.appendChild(dlg);

  btn.addEventListener('click', function () { dlg.showModal(); });
  dlg.querySelector('.bio-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

(function () {
  var section = document.querySelector('.news-section');
  if (!section || typeof HTMLDialogElement === 'undefined') return;
  var items = section.querySelectorAll('.news-item');
  var link = section.querySelector('h2 a');
  if (!link) return;

  var LIMIT = 5;
  items.forEach(function (el, i) { if (i >= LIMIT) el.classList.add('news-extra'); });

  var dlg = document.createElement('dialog');
  dlg.className = 'bio-dialog news-dialog';
  dlg.setAttribute('aria-labelledby', 'news-title');
  var body = document.createElement('div');
  items.forEach(function (el) {
    var c = el.cloneNode(true);
    c.classList.remove('news-extra');
    body.appendChild(c);
  });
  dlg.innerHTML = '<button type="button" class="bio-close" aria-label="Close news">&times;</button><h2 id="news-title">All News</h2>';
  dlg.appendChild(body);
  document.body.appendChild(dlg);

  link.addEventListener('click', function (e) { e.preventDefault(); dlg.showModal(); });
  dlg.querySelector('.bio-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
})();

