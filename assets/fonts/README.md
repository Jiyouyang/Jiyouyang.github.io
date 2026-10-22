# Apple 字符兼容字体

`jy-apple-fallback.woff2`（644 字节）是 Font Awesome Free Brands 6.7.2 的单字形子集。
原始字体来自 <https://cdn.bootcdn.net/ajax/libs/font-awesome/6.7.2/webfonts/fa-brands-400.woff2>，
上游 <https://github.com/FortAwesome/Font-Awesome/tree/6.7.2>。

字体采用 SIL Open Font License 1.1，版权归 Fonticons, Inc.，完整许可见 `LICENSE-font-awesome.txt`。
本修改版已按 Reserved Font Name 要求重命名为 **JY Apple Fallback**，
仅把原 Apple 字形 `U+F179` 映射到网站已经使用的 `U+F8FF`（），并删除其余字形。
没有复制、重新分发 Apple 系统字体或改画图标。

`styles/card-controls.css` 的字体优先级仍是 Apple 原生系统字体，之后才是此后备字体。
网页保留原字符、镂空描边、尺寸和颜色；此文件只补足缺少原生 Apple 字形的环境。
全部资源同源，不依赖外部字体服务。不要将这份字体用于正文。
