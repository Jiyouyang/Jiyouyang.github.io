# 视觉升级前版本备份与回滚

本次全站视觉与交互升级前，已将当时 `main` 的完整版本备份到 GitHub：

- 基线提交：`dcc9d01b0e9c9e024b48fb1242ad54c86e420242`
- 备份分支：`backup/pre-visual-upgrade-20261011`
- 固定标签：`pre-visual-upgrade-20261011`
- [查看旧版源码](https://github.com/Jiyouyang/Jiyouyang.github.io/tree/pre-visual-upgrade-20261011)
- [下载旧版 ZIP](https://github.com/Jiyouyang/Jiyouyang.github.io/archive/refs/tags/pre-visual-upgrade-20261011.zip)

备份包含旧版网站代码、图标、资源链接、语言字典、置顶公告及轮播逻辑。浏览器中的个人主题偏好仍保存在 localStorage，不属于 Git 源码备份。

## 给后续 Codex 的回滚流程

用户说“回滚到本次视觉升级前”时，先检查工作区和远端的新提交，保留尚未提交的工作，再从固定标签恢复。以一个新的恢复提交推送 `main`，保留完整历史；不要强制推送或重置历史。

在干净工作区、已同步远端后，可在单独分支准备恢复：

```bash
git fetch origin --tags
git switch -c restore/pre-visual-upgrade origin/main
git restore --source=pre-visual-upgrade-20261011 --staged --worktree -- .
```

这一步会让跟踪文件与旧版本一致，包括移除升级后新增的文件。检查 diff，并在恢复后的 `CODEX_HANDOFF.md` 记录回滚原因、标签、验证结果；若升级后还有用户希望保留的新资源，应先按其意愿单独保留。

完成页面与链接检查后创建恢复提交，再普通推送到 `main`：

```bash
git add CODEX_HANDOFF.md
git commit -m "Restore site before visual upgrade"
git push origin HEAD:main
```

最后核验 GitHub Pages 实际页面。备份分支和标签始终保留，后续升级不得覆盖它们。
