---
name: api-endpoint-generator
description: 为指定的数据模型生成标准的 CRUD API 端点
version: 1.0.0
trigger: ["创建 API", "生成端点", "新建接口"]
author: Levi
---

# Restful API 端点生成器

## 输出参数

- `modelName` (required): 数据模型名称（如：`bookmark`、`tag`）
- `fields` (required): 模型字段列表
- `operations` (optional, default `all`): 需要的操作（`create`/`read`/`update`/`delete`/`list`）

## 执行步骤

1. 在 `src/app/api/{modelName}s/` 目录下创建 `route.ts`
2. 实现以下端点：
   - `GET`: `/api/{modelName}s` - 获取列表（支持分页、搜索）
   - `POST`: `/api/{modelName}s` - 创建
   - `GET`: `/api/{modelName}s/[id]` - 获取单个记录
   - `PUT`: `/api/{modelName}s/[id]` - 更新
   - `DELETE`: `/api/{modelName}s/[id]` - 删除
3. 代码规范：
   - 使用 `Prisma Client` 获取数据库
   - 统一返回格式参考：`./.claude/skills/api-endpoint-generator/resources/config/response-format.json`
   - 包含输入验证
   - 包含错误处理 `try/catch`
4. 创建完成后列出所有 `API` 端点的 `URL` 和用法
