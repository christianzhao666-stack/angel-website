# Angel Musical 首页原型 — 使用说明

## 文件结构
```
site/
├── index.html          ← 页面"内容和结构"（文字、图片、链接）
├── css/style.css       ← 页面"外观"（颜色、字体、间距、手机适配）
├── fonts/              ← 自托管字体（Cinzel 标题、Inter 正文，均为 SIL OFL 免费商用授权）
├── images/             ← Logo、网站图标、已压缩的 WebP 照片
└── preview/            ← 截图预览（不属于网站本身，可删除）
```

## 如何在电脑上打开
最推荐：在 site 文件夹里打开终端，运行
```
python3 -m http.server 8000
```
然后浏览器访问 http://localhost:8000 。（直接双击 index.html 也能看，但部分浏览器会因安全限制不加载本地字体。）

## 上线前必须替换的 TODO
在 index.html 里搜索 "TODO" 即可找到全部位置。
