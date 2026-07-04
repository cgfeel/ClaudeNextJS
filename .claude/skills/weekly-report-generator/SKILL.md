---
name: weekly-report-generator
description: >-
  Generate structured Chinese weekly work reports by scanning Git commits and TODO/FIXME/HACK comments.
  Use this skill whenever the user asks for a 周报, weekly report, work summary, 工作汇报, or wants to
  summarize this week's progress from git history. Also trigger when the user mentions generating
  reports from recent commits, tracking weekly development progress, or summarizing what was done
  this week — even if they don't explicitly say "周报".
---

# Weekly Report Generator (周报生成器)

## Overview

This skill generates a structured weekly report in Chinese Markdown format by analyzing the
current week's Git commit history and TODO/FIXME/HACK comments in the codebase. The report
helps developers summarize their weekly work, track TODO changes, and plan for the next week.

## Time Range

Always use the **current calendar week**: Monday 00:00 to Sunday 23:59.

To determine the date range, calculate from today's date:
- Find the Monday of this week
- Find the Sunday of this week
- Format dates as `YYYY-MM-DD`

If today is Sunday, the week range is the week just ending.

## Report Output

Save the report to `reports/weekly-YYYY-MM-DD.md` in the project root, where the date is
the Sunday of the reporting week. Create the `reports/` directory if it doesn't exist.

## Report Template

Use this exact Markdown structure. Section headers in Chinese, commit messages in their
original language:

```markdown
# 周报 — 第X周 (MM/DD - MM/DD)

> 生成日期：YYYY-MM-DD | 项目：<project-name>

## 📋 本周概要

<2-3 sentence executive summary based on commit patterns and work themes>

## 📝 Git 提交记录

### 按日期汇总

**MM/DD (周X)** — N 次提交
- `commit-hash` 提交信息 (作者)
- ...

### 统计
- 总提交数：N
- 活跃天数：N
- 主要作者：name (N commits), name (N commits)

## 🔧 TODO 变更

### 当前代码中的 TODO/FIXME/HACK

| 类型 | 内容 | 文件位置 |
|------|------|----------|
| TODO | 待办内容 | `src/xxx.ts:42` |
| FIXME | 待修复内容 | `src/xxx.ts:18` |

### 变更分析

<List newly added TODOs, resolved ones, or net changes. If a previous week's report
exists, compare against it. Otherwise note this as the baseline report.>

## 💡 工作总结

### 主要工作方向

<Group commits into 2-5 work themes, each with a sub-heading and brief description>

### 关键成果

- <bullet points of notable achievements this week>

## 📅 下周计划

<Based on remaining TODOs and work momentum, suggest 3-5 priority items for next week>

---

*报告由 Claude Code 自动生成*
```

## Workflow

### Step 1: Calculate the week range

Use Bash to compute the Monday and Sunday of the current week:

```bash
# macOS/BSD date
if date --version 2>/dev/null | grep -q GNU; then
  # GNU date
  MONDAY=$(date -d "last monday" +%Y-%m-%d 2>/dev/null || date -d "monday this week" +%Y-%m-%d)
  SUNDAY=$(date -d "next sunday" +%Y-%m-%d 2>/dev/null || date -d "sunday this week" +%Y-%m-%d)
else
  # macOS/BSD date - calculate Monday of current week
  DOW=$(date +%u)  # 1=Mon ... 7=Sun
  MONDAY=$(date -v-$((DOW-1))d +%Y-%m-%d)
  SUNDAY=$(date -v+$((7-DOW))d +%Y-%m-%d)
fi
```

### Step 2: Gather Git commits

Collect all commits from the current week:

```bash
git log --since="$MONDAY 00:00:00" --until="$SUNDAY 23:59:59" \
  --pretty=format:"%h %ad %s (%an)" \
  --date=format:"%m/%d %a" \
  --all \
  --no-merges
```

Also get commit statistics:

```bash
git shortlog --since="$MONDAY 00:00:00" --until="$SUNDAY 23:59:59" \
  --all --no-merges -sn
```

### Step 3: Scan TODO/FIXME/HACK comments

Search the codebase for TODO-related comments, excluding dependencies and build output:

```bash
find . -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \
  -o -name "*.py" -o -name "*.rs" -o -name "*.go" -o -name "*.md" \) \
  ! -path "*/node_modules/*" ! -path "*/.next/*" ! -path "*/dist/*" \
  ! -path "*/build/*" ! -path "*/.git/*" ! -path "*/target/*" \
  | xargs grep -n -E "TODO|FIXME|HACK" 2>/dev/null
```

### Step 4: Check for previous reports

Look for a previous week's report to enable comparison:

```bash
ls reports/weekly-*.md 2>/dev/null | sort | tail -2
```

If a previous report exists, read it to compare TODO counts and highlight changes.

### Step 5: Generate and save the report

Combine all gathered data into the report template. When writing each section:

- **本周概要**: Read through all commits and identify 2-3 main themes. Write a concise summary
  that gives the reader immediate context.
- **Git 提交记录**: Group commits by date. If a single day has many commits, list them all.
  If there are no commits for a day, skip that day.
- **TODO 变更**: Present the full TODO list in a table. If there's a previous report, add a
  subsection noting which TODOs are new and which were resolved.
- **工作总结**: Group commits into work themes (e.g., "Bug修复", "新功能开发", "重构").
  Write a brief description for each theme.
- **下周计划**: Look at unresolved TODOs and work momentum to suggest next priorities.
  Be specific — reference actual TODO items or ongoing work themes.

### Step 6: Summarize to the user

After saving, print a brief summary:
- Report path
- Total commits analyzed
- Active days
- TODO/FIXME/HACK count
- A key takeaway sentence

## Edge Cases

- **No commits this week**: Generate the report anyway with empty commit sections.
  Note "本周无提交记录" and still include the TODO scan.
- **Empty TODO scan**: Note "当前代码中无未完成的 TODO/FIXME/HACK 标记" in the section.
- **First report ever**: Note "此为基线周报，无历史数据可供对比" in the TODO 变更 section
  and skip the comparison.
- **Weekend generation**: If generating on a weekend, the week range is correct as-is
  (Monday-Sunday of the current week).

## Notes

- Use Chinese for all section headers and narrative text
- Keep commit messages in their original language (Chinese or English)
- If the project has a package.json or similar, infer the project name from it
- Do not commit or push the generated report unless the user asks
