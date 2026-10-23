/* =====================================================================
   header.js —— 首页页头"半透明叠在首屏大图上"（2026-10-23）
   ---------------------------------------------------------------------
   做了两件事：
   1. 给 <html> 加 class "header-overlay" → CSS 把首屏大图往上拉，钻到页头下面，
      页头就能透出照片。
   2. 页头在大图上方时加 class "is-over-hero"（半透明）；
      往下滚动离开大图后去掉它 → 页头恢复实心深色，压在浅色区块上时文字也清楚。
   没有 JavaScript（或删掉这个文件）时：页头保持原来的实心深色，一切正常。
   ===================================================================== */
(function () {
  var header = document.querySelector(".site-header");
  var hero = document.querySelector(".hero");
  if (!header || !hero) return;          // 没有首屏大图的页面什么都不做

  document.documentElement.classList.add("header-overlay");

  function update() {
    // 大图底边还在页头下面 → 半透明；否则 → 实心
    var overHero = hero.getBoundingClientRect().bottom > header.offsetHeight;
    header.classList.toggle("is-over-hero", overHero);
  }
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
})();
