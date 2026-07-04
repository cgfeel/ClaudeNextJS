---
name: security-audit
description: 对指定代码进行安全审计，依照 OWASP Top 10 和团队安全规范输出审计报告
version: 1.0.0
trigger: ["安全审计", "代码安全", "安全检查", "security audit"]
author: Levi
---

# 代码安全审计

## 执行步骤

1. 读取用户指定的代码文件或目录
2. 阅读 `./.claude/skills/security-audit/references/owasp-top10-checklist.md` 逐项检查代码是否存在对应漏洞
3. 阅读 `./.claude/skills/security-audit/references/team-security-standards.md` 检查代码是否符合团队安全规范
4. 按照 `./.claude/skills/security-audit/resources/examples/audit-report-sample.md` 的格式生成安全审计报告
5. 对每个发现的问题标注严重等级（高危/中危/低危），给出修复建议和修复代码
6. 将升级报告保存在目录 `./.claude/skills/security-audit/resources/report/` 中，文件名格式为 `security-audit-<timestamp>.md`

## 输出规范

- 使用 `Markdown` 表格列出所有问题
- 每个问题包含：文件路径、行号、问题描述、严重等级、修复建议
- 最后给出安全评分（0-100）和总结

## 错误处理

- 如果代码量过大优先审计 `API` 路由和数据库操作相关的文件
- 如果无法判断是否存在风险标记为“待人工确认“
