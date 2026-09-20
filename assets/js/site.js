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
    '<p>I research ways to secure systems and networks, including with AI and machine learning. Before RIT Dubai, I worked on routing protocols for ad-hoc mesh networks at Khalifa University.</p>' +
    '<h3>Timeline</h3>' +
    '<table class="bio-table">' +
      '<tr><td class="muted">2025&ndash;now</td><td>Research Assistant, Cybersecurity and AI<br><i>Rochester Institute of Technology, Dubai</i></td></tr>' +
      '<tr><td class="muted">2024&ndash;25</td><td>Research Assistant, Electrical Engineering and Computer Science<br><i>Khalifa University</i></td></tr>' +
      '<tr><td class="muted">2024</td><td>BSc, Computer Engineering (graduated Jan 2024)<br><i>Khalifa University</i></td></tr>' +
    '</table>' +
    '<h3>Highlights</h3>' +
    '<ul class="bio-list">' +
      '<li>Certified Red Team Operator (CRTO), Apr 2025</li>' +
      '<li>eLearnSecurity Junior Penetration Tester (eJPT), Jun 2024</li>' +
      '<li>Sustainability Expert Award, GITEX AI InnovateFest 2023 (Alibaba Cloud)</li>' +
      '<li>2nd place, Cyber Energy Drill at ADIPEC 2023 (UAE Cyber Security Council)</li>' +
    '</ul>';
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

