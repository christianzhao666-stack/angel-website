/* =====================================================================
   clips.js —— 工序部分车间短视频的"懒加载 + 自动播放"（2026-10-23）
   ---------------------------------------------------------------------
   1. HTML 里视频地址先放在 data-src 里，页面打开时不下载视频，只显示封面图。
   2. 滚动到视频附近时才填入真正的地址并播放；滚走了就暂停（省电、省流量）。
   3. 手机 / 小屏幕（宽度 ≤ 960px）用 data-src-mobile 里更小的版本。
   4. 访客开启"减少动态效果"或"省流量模式"时：不加载、不播放，只显示封面图。
   这个文件不用改。删掉它，视频位置只会显示封面图，网页其它部分不受影响。
   ===================================================================== */
(function () {
  var videos = document.querySelectorAll(".clip-video");
  if (!videos.length) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  if (reduceMotion || saveData || !("IntersectionObserver" in window)) return;  // 只显示封面

  var small = window.matchMedia("(max-width: 960px)").matches;

  function load(video) {
    if (video.dataset.loaded) return;
    video.querySelectorAll("source").forEach(function (s) {
      s.src = (small && s.getAttribute("data-src-mobile")) || s.getAttribute("data-src");
    });
    video.load();
    video.dataset.loaded = "1";
  }

  // 距离屏幕 300px 时开始加载
  var loader = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { load(e.target); loader.unobserve(e.target); }
    });
  }, { rootMargin: "300px" });

  // 真正出现在屏幕上才播放，离开屏幕就暂停
  var player = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var v = e.target;
      if (e.isIntersecting) { load(v); var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else { v.pause(); }
    });
  }, { threshold: 0.25 });

  videos.forEach(function (v) { loader.observe(v); player.observe(v); });
})();
