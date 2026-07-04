# AICoding

`Vibe Coding` 学习，通过 `Claude Code` 创建一个 `NextJS` 项目

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
