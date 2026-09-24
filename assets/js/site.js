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
    '<div class="bio-terminal">' +
      '<div class="bio-terminal-bar">' +
        '<span class="bio-dot bio-dot-r"></span><span class="bio-dot bio-dot-y"></span><span class="bio-dot bio-dot-g"></span>' +
        '<span class="bio-terminal-title">guest@benhurtekeste: ~</span>' +
      '</div>' +
      '<div class="bio-terminal-body">' +
        '<div class="term-line">' +
          '<span class="term-prompt">guest@benhurtekeste</span><span class="term-sep">:</span><span class="term-path">~</span><span class="term-sep">$&nbsp;</span>' +
          '<span class="term-typed"></span><span class="term-cursor">&#9608;</span>' +
        '</div>' +
        '<div class="term-output"></div>' +
      '</div>' +
    '</div>' +
    '<div class="bio-content">' +
      '<div class="bio-head">' +
        '<img src="/assets/img/prof_pic.jpg" alt="Benhur Tekeste">' +
        '<div><h2 id="bio-title">Benhur Tekeste</h2>' +
        '<p class="muted">Researcher in Cybersecurity and AI &middot; RIT Dubai</p></div>' +
      '</div>' +
      '<p>Benhur Tekeste, originally from Eritrea, is a research assistant in Cybersecurity and AI at Rochester Institute of Technology, Dubai. His research interests include securing data, networks and systems. He has published in reputable venues and holds several industry-recognized certifications. He graduated in Computer Engineering from Khalifa University in 2023.</p>' +
    '</div>';
  document.body.appendChild(dlg);

  var terminalEl = dlg.querySelector('.bio-terminal');
  var typedEl = dlg.querySelector('.term-typed');
  var cursorEl = dlg.querySelector('.term-cursor');
  var outputEl = dlg.querySelector('.term-output');
  var contentEl = dlg.querySelector('.bio-content');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var command = 'whoami';
  var timers = [];
  var runId = 0;

  function clearTimers() {
    timers.forEach(function (t) { clearTimeout(t); });
    timers = [];
  }

  function after(ms, fn) { timers.push(setTimeout(fn, ms)); }

  function revealContent() {
    terminalEl.classList.add('bio-terminal-done');
    contentEl.classList.add('bio-content-visible');
  }

  function playTerminal() {
    clearTimers();
    var myRun = ++runId;
    terminalEl.classList.remove('bio-terminal-done');
    contentEl.classList.remove('bio-content-visible');
    typedEl.textContent = '';
    outputEl.innerHTML = '';
    cursorEl.style.display = '';

    if (reduceMotion) {
      typedEl.textContent = command;
      outputEl.innerHTML = '<div class="term-line"><span class="term-key">benhur.tekeste</span></div>';
      revealContent();
      return;
    }

    var i = 0;
    (function typeChar() {
      if (myRun !== runId) return;
      if (i < command.length) {
        typedEl.textContent += command.charAt(i);
        i++;
        after(55 + Math.random() * 70, typeChar);
      } else {
        after(420, function () {
          if (myRun !== runId) return;
          cursorEl.style.display = 'none';
          outputEl.innerHTML =
            '<div class="term-line term-out"><span class="term-key">benhur.tekeste</span></div>' +
            '<div class="term-line term-out term-muted">uid=1000(benhur) groups=1000(research),1001(cybersecurity),1002(ai)</div>' +
            '<div class="term-line term-out">loading bio<span class="term-dots"><span>.</span><span>.</span><span>.</span></span></div>';
          after(2950, function () {
            if (myRun !== runId) return;
            revealContent();
          });
        });
      }
    })();
  }

  btn.addEventListener('click', function () { dlg.showModal(); playTerminal(); });
  dlg.querySelector('.bio-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { clearTimers(); });
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

