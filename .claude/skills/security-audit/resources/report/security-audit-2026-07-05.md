# 安全审计报告

**审计范围**：`src/app/api/`（3 个文件）

**审计时间**：2026-07-05

**审计依据**：OWASP Top 10 + 团队安全编码规范

---

## 发现问题

| #   | 文件 | 行号 | 问题描述 | 等级 | 修复建议 |
| --- | --- | --- | --- | --- | --- |
| 1 | `src/app/api/bookmarks/route.ts` | 5-43 | **所有 API 路由无权限校验**。GET/POST 均未做身份认证，任何人可读写书签数据 | 🔴 高危 | 添加认证中间件或 API Key 校验，至少对 POST/PUT/DELETE 做权限控制 |
| 2 | `src/app/api/categories/route.ts` | 5-70 | **所有 API 路由无权限校验**。GET/POST 均未做身份认证 | 🔴 高危 | 同上 |
| 3 | `src/app/api/categories/[id]/route.ts` | 5-110 | **所有 API 路由无权限校验**。GET/PUT/DELETE 均无认证，任何人可修改/删除分类 | 🔴 高危 | 同上 |
| 4 | `src/app/api/bookmarks/route.ts` | 15 | **错误消息泄露内部细节**。`error.message` 直接返回客户端，可能暴露数据库结构、字段名、表名等敏感信息 | 🔴 高危 | catch 块中返回通用错误消息，`error.message` 仅记录到服务端日志 |
| 5 | `src/app/api/categories/route.ts` | 42 | **同上**。`error.message` 直接返回客户端 | 🔴 高危 | 同上 |
| 6 | `src/app/api/categories/[id]/route.ts` | 28,76,106 | **同上**。三处 catch 块均将 `error.message` 返回客户端 | 🔴 高危 | 同上 |
| 7 | `src/app/api/bookmarks/route.ts` | 24 | **输入验证不充分**。`url` 字段未校验 URL 格式，`title`/`description`/`tags` 无长度限制，可传入超大字符串导致存储溢出 | 🟡 中危 | 添加 URL 格式校验（`new URL(url)` 或正则），限制各字段长度 |
| 8 | `src/app/api/categories/route.ts` | 10,53 | **search 参数无长度限制** / **name 无长度限制**。恶意用户可传入极大字符串消耗服务端资源 | 🟡 中危 | 限制 search 和 name 最大长度（如 200 字符） |
| 9 | `src/app/api/categories/[id]/route.ts` | 5-110 | **DELETE 操作无二次确认机制**。直接删除无任何保护 | 🟡 中危 | 前端弹窗确认 + 后端考虑软删除 |
| 10 | `src/app/api/categories/route.ts` / `[id]/route.ts` | 多处 | **敏感操作无审计日志**。POST/PUT/DELETE 未记录操作日志，无法追溯谁在何时做了什么操作 | 🟡 中危 | 记录操作人、时间、操作类型、目标 ID 到日志 |
| 11 | `package.json` | 29 | **Prisma 版本较旧**。`@prisma/client: ^5.22.0`，当前最新稳定版已远超此版本，可能存在已知漏洞 | 🟢 低危 | 运行 `pnpm audit` 检查，升级 Prisma 到最新稳定版 |
| 12 | `src/app/api/bookmarks/route.ts` | 24,32 | **XSS 风险**。用户输入的 title/description/tags 直接存储和返回，未做 HTML 实体转义 | 🟢 低危 | API 层做输入清洗（如 strip HTML tags），或确保前端统一转义渲染 |

---

## 逐项检查明细

### OWASP #1 — 注入攻击 ✅
- 所有数据库操作均通过 Prisma ORM，无字符串拼接 SQL，Prisma 内部使用参数化查询。**无风险。**

### OWASP #2 — 身份认证失效 🔴
- 整个 API 层零认证机制。任何人可访问所有接口。**严重不符合。**

### OWASP #3 — 敏感数据泄露 🔴
- 无硬编码密钥（通过 `env("DATABASE_URL")` 读取）。✅
- 但 `error.message` 在 6 处 catch 块中直接返回客户端，泄露内部错误详情。🔴

### OWASP #4 — XSS 跨站脚本 🟢
- JSON API 本身不直接执行 HTML，风险较低。但输入未清洗即存储，前端若使用 `dangerouslySetInnerHTML` 则有 XSS 风险。

### OWASP #5 — 安全配置错误 🔴
- catch 块返回原始错误消息，生产环境下 `NODE_ENV=production` 时应隐藏内部错误。

### OWASP #6 — 过时组件 🟢
- Prisma 5.22.0 非最新版，建议运行 `pnpm audit` 确认是否有已知漏洞。

### OWASP #7 — 访问控制失效 🔴
- 所有接口均无权限校验。DELETE/PUT 操作完全暴露。**高危。**

### OWASP #8 — 软件与数据完整性失效 ✅
- 无 CI/CD 流程代码、无 JWT、无自动更新。**不适用。**

### OWASP #9 — 安全日志与监控 🟡
- 无任何操作日志记录。POST/PUT/DELETE 等写操作完全无迹可查。

### OWASP #10 — SSRF ✅
- 无服务端发起外部请求的代码。**不适用。**

### 团队强制规范检查

| 规范 | 状态 |
| --- | --- |
| 禁止硬编码密钥 | ✅ 通过 |
| 数据库操作必须通过 ORM | ✅ 通过 |
| 用户输入服务端验证 | ⚠️ 部分通过（有必填校验，但缺格式/长度校验） |
| API 路由必须有权限校验 | 🔴 **不通过** — 所有接口均为裸接口 |

### 团队建议规范检查

| 规范 | 状态 |
| --- | --- |
| 文件上传限制类型和大小 | N/A |
| 敏感操作二次确认 | ⚠️ DELETE 无二次确认 |
| 分页 pageSize 限制 | ✅ categories GET 有 `Math.min(100, ...)` |
| 错误响应不含内部细节 | 🔴 **不通过** |

---

## 安全评分：**38/100**

---

## 总结

审计 `src/app/api/` 下 3 个文件，共发现 **6 个高危、4 个中危、2 个低危** 问题。

**核心风险**：所有 API 路由完全没有任何认证和授权机制，属于"裸接口"。这违反了团队安全规范第 4 条强制规则，也是 OWASP #2（身份认证失效）和 #7（访问控制失效）的典型场景。任何人知晓接口地址后即可读取、创建、修改、删除所有数据。

**优先修复建议**（按紧急程度排序）：

1. **添加 API 认证中间件** — 最优先。建议实现简单的 API Key 或 JWT 认证，至少覆盖 POST/PUT/DELETE 操作
2. **修复错误消息泄露** — 将所有 catch 块中的 `error.message` 替换为通用错误提示，原始错误仅记录到服务端日志
3. **增强输入验证** — 对 url 字段做格式校验，对所有字符串字段限制最大长度
4. **添加操作日志** — 对写操作（POST/PUT/DELETE）记录审计日志
5. **升级依赖** — 运行 `pnpm audit` 并升级有漏洞的依赖包
