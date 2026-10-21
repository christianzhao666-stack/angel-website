/* =====================================================================
   craft-video.js —— 工艺视频的"懒加载 + 自动播放"
   ---------------------------------------------------------------------
   为什么需要这几行代码？
   1. 视频文件有几 MB，如果打开网页就下载，会拖慢首屏。
      所以 HTML 里先不写真正的地址（用 data-src 暂存），
      等访客滚动到视频附近时，再把地址填进去开始下载。
   2. 尊重访客的系统设置：如果开启了"减少动态效果"
      （prefers-reduced-motion），就不自动播放，只显示封面和播放按钮。
   不懂 JavaScript 也没关系：这个文件不用改。删掉它，视频位置会只显示封面图。
   ===================================================================== */

// 找到页面上的视频元素
var video = document.querySelector(".craft-video");

if (video) {
  // 检查访客是否设置了"减少动态效果"
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 把 data-src 里的地址真正填进 src，并开始加载
  function loadVideo() {
    var sources = video.querySelectorAll("source[data-src]");
    sources.forEach(function (source) {
      source.src = source.getAttribute("data-src");
    });
    video.load();
  }

  if (reduceMotion) {
    // 减少动态效果：显示播放按钮，由访客自己决定是否播放
    video.controls = true;
    loadVideo();
  } else if ("IntersectionObserver" in window) {
    // IntersectionObserver = "观察某个元素是否进入屏幕"
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          loadVideo();
          video.play();               // 静音视频允许自动播放
          observer.disconnect();      // 只需要触发一次
        }
      });
    }, { rootMargin: "300px" });      // 距离屏幕还有 300px 时就提前开始加载
    observer.observe(video);
  } else {
    // 很旧的浏览器：直接加载并播放
    loadVideo();
    video.play();
  }
}
