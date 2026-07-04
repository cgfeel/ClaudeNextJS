# AICoding

`Vibe Coding` 学习，通过 `Claude Code` 创建一个 `NextJS` 项目

## `skills`: `react-component-generator`

根据组件名称和功能描述，生成符合项目规范的 `React` 组件文件

示例：

> 请按照 React 组件生成器 skill 的规范，创建一个 BookmarkCard 组件
>
> - 组件功能：展示单个书签的卡片，显示标题、URL、描述和标签列表
> - 需要 props 不需要状态管理

⏺ 创建完成

已按 `react-component-generator` skill 规范生成 3 个文件：

| 文件                                                | 说明                                  |
| --------------------------------------------------- | ------------------------------------- |
| `src/components/BookmarkCard/types.ts`              | Props 类型定义（`BookmarkCardProps`） |
| `src/components/BookmarkCard/index.tsx`             | 组件主文件（函数组件 + named export） |
| `src/components/BookmarkCard/BookmarkCard.test.tsx` | 测试文件（6 个测试用例）              |

组件功能

- 标题 — 大字号加粗，hover 时变蓝色
- URL — 蓝色链接，`target="_blank"` 新窗口打开，点击时阻止冒泡
- 描述 — 灰色文字，最多两行截断（`line-clamp-2`）
- 标签 — 逗号分隔字符串 → 圆角标签 pill，支持深色模式
- 可访问性 — 传入 `onClick` 时自动添加 `role="button"` + 键盘事件

使用示例

```tsx
import { BookmarkCard } from "@/components/BookmarkCard";

<BookmarkCard
  title="Claude Code 官方文档"
  url="https://docs.anthropic.com/claude-code"
  description="Claude Code CLI 工具的完整使用指南"
  tags="claude, ai, tool"
  onClick={() => console.log("clicked")}
/>;
```

## `skills`: `api-endpoint-generator`

为指定的数据模型生成标准的 `CRUD API` 端点

示例：

> 按照 `API` 生成的 `skill` 创建一个书签分类
>
> - 模型的名称为：`category`
> - 包含的字段列表有：`id`, `name`, `description`, `createAt`, `updateAt`

⏺ 完成。以下是为 category 模型生成的 CRUD API：

新增/修改文件

| 文件                                   | 说明                              |
| -------------------------------------- | --------------------------------- |
| `src/prisma/schema.prisma`             | 新增 `Category` 模型              |
| `src/app/api/categories/route.ts`      | GET 列表 + POST 创建              |
| `src/app/api/categories/[id]/route.ts` | GET 单个 + PUT 更新 + DELETE 删除 |

API 端点

| 方法     | URL                    | 说明                                                            |
| -------- | ---------------------- | --------------------------------------------------------------- |
| `GET`    | `/api/categories`      | 获取分类列表，支持 `?page=1&pageSize=20&search=关键词`          |
| `POST`   | `/api/categories`      | 创建分类，body: `{ "name": "名称", "description": "描述" }`     |
| `GET`    | `/api/categories/{id}` | 获取单个分类                                                    |
| `PUT`    | `/api/categories/{id}` | 更新分类，body: `{ "name": "新名称", "description": "新描述" }` |
| `DELETE` | `/api/categories/{id}` | 删除分类                                                        |

特性

- 输入验证：`name` 必填校验、`ID` 格式校验
- 分页：`page/pageSize` 参数，默认 page=1, pageSize=20，上限 100
- 搜索：`search` 参数，模糊匹配 `name` 和 `description`
- 统一响应格式：`{ success, data?, error? }`，列表额外返回 `pagination`
- 错误处理：400（参数错误）、404（不存在）、500（服务端异常）

## `skills`: `git-commit-standard`

在提交代码时，自动生成符合 Conventional Commits 规范的 commit message

示例：

> 根据 `git` 的 `skill` 提交本次修改信息

⏺ 新增了一个 skill 文件：`.claude/skills/git-commit-standard/SKILL.md`，用于规范 Git 提交信息。

> 建议的 commit message：
>
> feat(skills): add git-commit-standard skill
>
> Add a skill that generates Conventional Commits compliant commit messages
> by analyzing staged changes and determining the correct type/scope.
>
> 是否按此提交并推送？

⏺ 已提交并推送：

> 742d60c feat(skills): add git-commit-standard skill

## `skills`: `security-audit`

对指定代码进行安全审计，依照 `OWASP` Top 10 和团队安全规范输出审计报告

示例：

> 请使用安全审计 skill 对 `@src/app/api/` 目录下所有文件进行安全检

⏺ 审计完成，报告已保存至 `.claude/skills/security-audit/resources/report/security-audit-2026-07-05.md`。

审计结果摘要

安全评分：38/100 — 共扫描 3 个文件，发现 12 个问题。

> 备注：代码是 `Claude Code` 生成的，用的模型是 `deepseek-v4-pro`，审计报告也是惨不忍睹。结果说明 AI 确实可以辅助编程，但不是代替编程
