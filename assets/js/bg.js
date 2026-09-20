/* Subtle animated network backdrop: drifting nodes, faint links, and small
   packets hopping between neighbours. Links near the cursor light up faintly.
   Respects prefers-reduced-motion and pauses when the tab is hidden. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);
  var ctx = canvas.getContext('2d');

  var W = 0, H = 0, DPR = 1;
  var nodes = [], packets = [], pings = [];
  var mouse = { x: -1000, y: -1000 };
  var rgb = '193,95,60';
  var raf = null, last = 0;
  var LINK = 170, CURSOR = 150;

  function readColor() {
    var v = getComputedStyle(document.documentElement).getPropertyValue('--accent-bright').trim();
    var m = /^#([0-9a-f]{6})$/i.exec(v);
    if (m) {
      var n = parseInt(m[1], 16);
      rgb = ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255);
    }
  }

  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    var count = Math.max(16, Math.min(70, Math.round((W * H) / 26000)));
    nodes = [];
    for (var i = 0; i < count; i++) {
      var a = Math.random() * Math.PI * 2, sp = 3 + Math.random() * 6;
      nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp });
    }
    packets = []; pings = [];
    if (reduce) draw(0);
  }

  function neighbours(i) {
    var out = [], a = nodes[i];
    for (var j = 0; j < nodes.length; j++) {
      if (j === i) continue;
      var dx = a.x - nodes[j].x, dy = a.y - nodes[j].y;
      if (dx * dx + dy * dy < LINK * LINK) out.push(j);
    }
    return out;
  }

  function spawnPacket() {
    for (var tries = 0; tries < 12; tries++) {
      var i = Math.floor(Math.random() * nodes.length), nb = neighbours(i);
      if (nb.length) {
        packets.push({ from: i, to: nb[Math.floor(Math.random() * nb.length)], t: 0, speed: 0.22 + Math.random() * 0.15 });
        return;
      }
    }
  }

  function update(dt) {
    var i, n;
    for (i = 0; i < nodes.length; i++) {
      n = nodes[i];
      n.x += n.vx * dt; n.y += n.vy * dt;
      if (n.x < -20) n.x = W + 20; else if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20; else if (n.y > H + 20) n.y = -20;
    }
    var want = Math.max(2, Math.min(5, Math.round(nodes.length / 14)));
    while (packets.length < want) spawnPacket();
    for (i = packets.length - 1; i >= 0; i--) {
      var p = packets[i];
      p.t += p.speed * dt;
      if (p.t >= 1) {
        pings.push({ x: nodes[p.to].x, y: nodes[p.to].y, r: 0 });
        var nb = neighbours(p.to).filter(function (k) { return k !== p.from; });
        if (!nb.length) { packets.splice(i, 1); continue; }
        p.from = p.to; p.to = nb[Math.floor(Math.random() * nb.length)]; p.t = 0;
      }
    }
    for (i = pings.length - 1; i >= 0; i--) {
      pings[i].r += 22 * dt;
      if (pings[i].r > 22) pings.splice(i, 1);
    }
  }

  function draw() {
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    var i, j, a, b, dx, dy, d, alpha;

    ctx.lineWidth = 1;
    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      for (j = i + 1; j < nodes.length; j++) {
        b = nodes[j];
        dx = a.x - b.x; dy = a.y - b.y; d = Math.sqrt(dx * dx + dy * dy);
        if (d < LINK) {
          alpha = 0.075 * (1 - d / LINK);
          var mx = (a.x + b.x) / 2 - mouse.x, my = (a.y + b.y) / 2 - mouse.y;
          var md = Math.sqrt(mx * mx + my * my);
          if (md < CURSOR) alpha += 0.16 * (1 - md / CURSOR) * (1 - d / LINK);
          ctx.strokeStyle = 'rgba(' + rgb + ',' + alpha + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }

    for (i = 0; i < nodes.length; i++) {
      a = nodes[i];
      dx = a.x - mouse.x; dy = a.y - mouse.y; d = Math.sqrt(dx * dx + dy * dy);
      alpha = 0.16 + (d < CURSOR ? 0.3 * (1 - d / CURSOR) : 0);
      ctx.fillStyle = 'rgba(' + rgb + ',' + alpha + ')';
      ctx.beginPath(); ctx.arc(a.x, a.y, 1.7, 0, Math.PI * 2); ctx.fill();
    }

    for (i = 0; i < pings.length; i++) {
      var pg = pings[i];
      ctx.strokeStyle = 'rgba(' + rgb + ',' + (0.35 * (1 - pg.r / 22)) + ')';
      ctx.beginPath(); ctx.arc(pg.x, pg.y, pg.r, 0, Math.PI * 2); ctx.stroke();
    }

    for (i = 0; i < packets.length; i++) {
      var p = packets[i], f = nodes[p.from], t = nodes[p.to];
      var x = f.x + (t.x - f.x) * p.t, y = f.y + (t.y - f.y) * p.t;
      var tt = Math.max(0, p.t - 0.18);
      var tx = f.x + (t.x - f.x) * tt, ty = f.y + (t.y - f.y) * tt;
      var g = ctx.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, 'rgba(' + rgb + ',0)');
      g.addColorStop(1, 'rgba(' + rgb + ',0.5)');
      ctx.strokeStyle = g; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(x, y); ctx.stroke();
      ctx.fillStyle = 'rgba(' + rgb + ',0.75)';
      ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill();
    }
  }

  function frame(ts) {
    var dt = Math.min(0.05, (ts - last) / 1000 || 0);
    last = ts;
    update(dt); draw();
    raf = requestAnimationFrame(frame);
  }
  function start() { if (!reduce && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); } }
  function stop() { if (raf) { cancelAnimationFrame(raf); raf = null; } }

  readColor();
  resize();
  start();

  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 200); });
  window.addEventListener('mousemove', function (e) { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', function () { mouse.x = mouse.y = -1000; });
  document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); else start(); });
  new MutationObserver(function () { readColor(); if (reduce) draw(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
})();
