/* =====================================================================
   相册灯箱 Gallery lightbox（2026-10-23）
   ---------------------------------------------------------------------
   作用：点击相册小图 → 在页面里弹出大图，可以左右切换、按 Esc 关闭。
   "渐进增强"：HTML 里每张小图本来就是指向大图的链接；
   这个脚本没加载 / 浏览器太旧时，点击就直接打开大图，功能不会坏。
   用到的 <dialog> 是浏览器自带的弹窗元素：showModal() 打开、close() 关闭，
   Esc 键关闭和"焦点锁在弹窗里"都由浏览器自动处理。
   2026-10-23 修改：页面上有两个图集（成品展示 + 相册），凡是 class 里带 gallery-lb 的区块
   都会各自得到一个灯箱，左右切换只在本区块的照片里循环。
   ===================================================================== */
(function () {
  if (typeof HTMLDialogElement !== 'function') return;   // 不支持 <dialog> 就不接管点击
  // 对每个图集区块调用一次 setup(区块)
  Array.prototype.forEach.call(document.querySelectorAll('.gallery-lb'), setup);

  function setup(section) {
  var links = Array.prototype.slice.call(section.querySelectorAll('a.g-item'));
  if (!links.length) return;
  var L = section.dataset;   // 按钮读屏文字（HTML 里的 data-label-*，中日文版已翻译）

  // 1) 动态创建灯箱结构
  var dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.innerHTML =
    '<figure class="lb-figure"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="' + L.labelPrev + '">&#8249;</button>' +
    '<button type="button" class="lb-btn lb-next" aria-label="' + L.labelNext + '">&#8250;</button>' +
    '<button type="button" class="lb-btn lb-close" aria-label="' + L.labelClose + '">&#215;</button>';
  document.body.appendChild(dlg);
  var img = dlg.querySelector('.lb-img'), cap = dlg.querySelector('.lb-cap'), cur = 0;

  // 2) 显示第 i 张：大图地址取自链接的 href，说明文字取自小图下方的 .g-cap
  function show(i) {
    cur = (i + links.length) % links.length;          // 首尾循环
    var a = links[cur], thumb = a.querySelector('img'), c = a.parentNode.querySelector('.g-cap');
    img.src = a.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    cap.textContent = (c ? c.textContent : '') + '  ·  ' + (cur + 1) + ' / ' + links.length;
  }

  // 3) 接管小图点击
  links.forEach(function (a, i) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      show(i);
      dlg.showModal();
    });
  });

  // 4) 按钮、键盘、点击空白处
  dlg.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
  dlg.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
  dlg.querySelector('.lb-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(cur - 1);
    if (e.key === 'ArrowRight') show(cur + 1);
  });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });   // 点黑色背景关闭
  dlg.addEventListener('close', function () { links[cur].focus(); });                  // 关闭后焦点回到原来那张小图
  }
})();
