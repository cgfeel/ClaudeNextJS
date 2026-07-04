# 项目名称

AICoding

## 项目概述

通过 `Claude Code` 完成 `Claude Code` 项目，使用的技术栈是 `NextJS` + `TypeScript` + `Prisma`

## 技术栈

- 前端 `NextJS` + `TypeScript` + `Tailwind CSS`
- 前端构建工具：`pnpm`
- 后端：`Next.js API Routes`
- 数据库：`Prisma` + `SQLite`
- 部署：`Vercel`

## 项目结构

```
  src/
  ├── app/
  │   ├── api/
  │   │   └── bookmarks/
  │   │       └── route.ts          # GET/POST 书签 API
  │   ├── globals.css               # Tailwind 入口
  │   ├── layout.tsx                # 全局布局（header + main）
  │   └── page.tsx                  # 首页
  ├── components/
  │   ├── ui/                       # 通用 UI 组件（待开发）
  │   └── features/                 # 业务组件（待开发）
  ├── lib/
  │   ├── prisma.ts                 # Prisma Client 单例
  │   └── utils.ts                  # 工具函数
  ├── prisma/
  │   ├── dev.db                    # SQLite 数据库（已 gitignore）
  │   └── schema.prisma             # Bookmark 模型
  └── types/
      └── index.ts                  # ApiResponse<T> 统一类型
```

## 编码规范

- 使用函数式组件 + `React Hooks`
- 组件文件使用 `PascalCase` 命名（如 `BookmarkCard.tsx`）
- 工具函数使用 `camelCase` 命名
- `API` 路由返回统一的格式：`{ success: boolean, data?: unknown, error?: string }`
- 所有数据库操作通过 `Prisma Client` 执行

## 技术栈版本

| 依赖         | 版本         |
| ------------ | ------------ |
| Next.js      | ^16.2.9      |
| React        | ^19.2.7      |
| Tailwind CSS | ^4.3.1       |
| TypeScript   | ^5.6.0       |
| Prisma       | ^5.22.0      |
| 包管理       | pnpm 10.25.0 |

## 当前开发状态

- [x] 项目脚手架搭建（Next.js 16 + React 19 + Tailwind CSS 4）
- [x] 数据库 Schema 设计（Bookmark 模型：id/title/url/description/tags）
- [x] 统一 ApiResponse 类型、Prisma Client 单例、全局 layout/首页
- [x] 书签 GET/POST API
- [ ] 书签 PUT/DELETE API
- [ ] 书签前端页面（列表、新建、编辑、删除）
- [ ] 搜索功能
- [ ] 标签分类管理

## 注意事项

- `SQLite` 数据库文件在 `src/prisma/dev.db`，不要提交到 `Git` 仓库
- 环境变量在 `.env` 文件中，不要提交到 `Git` 仓库
- 所有新功能先创建 `Git` 分支再开发，完成后合并到 `main` 分支

## 可用 Skills

- 创建 `React` 组件时，请读取 `./.claude/skills/react-component-generator/SKILL.md` 并严格遵守其中的规范
- 创建 `Api` 时，请读取 `./.claude/skills/api-endpoint-generator/SKILL.md` 并严格遵守其中的规范
- 提交 `Git` 时，请读取 `./.claude/skills/git-commit-standard/SKILL.md` 并严格遵守其中的规范
- 安全审计时，请读取 `./.claude/skills/security-audit/SKILL.md` 并严格遵守其中的规范
