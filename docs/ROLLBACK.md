# 视觉升级前版本备份与回滚

本次全站视觉与交互升级前，已将当时 `main` 的完整版本备份到 GitHub：

- 基线提交：`dcc9d01b0e9c9e024b48fb1242ad54c86e420242`
- 备份分支：`backup/pre-visual-upgrade-20261011`
- 固定标签：`pre-visual-upgrade-20261011`
- [查看旧版源码](https://github.com/Jiyouyang/Jiyouyang.github.io/tree/pre-visual-upgrade-20261011)
- [下载旧版 ZIP](https://github.com/Jiyouyang/Jiyouyang.github.io/archive/refs/tags/pre-visual-upgrade-20261011.zip)

备份包含旧版网站代码、图标、资源链接、语言字典、置顶公告及轮播逻辑。浏览器中的个人主题偏好仍保存在 localStorage，不属于 Git 源码备份。

2026-10-11 已按用户要求恢复这份升级前的网站版本。恢复前的升级版及最新交接规则另存于 `backup/pre-change-2026-10-11_10-08-23_UTC`（提交 `89a16cad9c5f3cd909c6df282c2ec06a0fe4c0c2`），可供以后再次切换。

## 给后续 Codex 的回滚流程

用户说“回滚到本次视觉升级前”时，先按 `CODEX_HANDOFF.md` 的现行规则备份当前完整仓库、检查工作区和远端提交，再从固定标签**仅恢复实际网站文件**。`CODEX_HANDOFF.md`、本文件、`README.md`、测试/维护脚本等非网站文件保持当前最新版；不要强制推送或重置历史。

在干净工作区、已同步远端后，可在单独分支准备恢复：

```bash
git fetch origin --tags
git switch -c restore/pre-visual-upgrade origin/main
git restore --source=pre-visual-upgrade-20261011 --staged --worktree -- index.html app.js minecraft.html minecraft-download.html minecraft-mods.html minecraft-launchers.html minecraft-mobile.html genshin.html genshin-download.html site.css site.js
```

以上只是针对这次视觉升级的示例文件清单；真正操作前要核对目标版本实际涉及的网页文件、资源及发布配置，不可照搬到其他回滚。检查 diff，并在**当前最新版** `CODEX_HANDOFF.md` 追加回滚原因、标签、验证结果；不得把文档回退。若升级后还有用户希望保留的新网站资源，应先按其意愿单独保留。

完成页面与链接检查后创建恢复提交，再普通推送到 `main`：

```bash
git add -u
git commit -m "Restore site before visual upgrade"
git push origin HEAD:main
```

最后核验 GitHub Pages 实际页面。备份分支和标签始终保留，后续升级不得覆盖它们。
