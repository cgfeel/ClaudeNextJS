---
name: react-component-generator
description: 根据组件名称和功能描述，生成符合项目规范的 React 组件文件
version: 1.0.0
trigger: ["创建组件", "新建 React 组件", "生成组件"]
tools: ["TypeScript", "React", "Tailwind CSS"]
author: "Levi"
---

# React 组件生成器

## 触发条件

当用户要求创建新的 `React` 组件时，使用此 `Skill`

## 输入参数

- componentName (required): 组件名称，使用 `PascalCase` 格式
- description (required): 组件功能描述
- hasProps (optional, default: true): 是否需要定义 `Props` 类型
- hasState (optional, default: false): 是否需要状态管理

## 执行步骤

1. 在 `./src/components/` 目录下创建组件文件夹：`./src/components/{ComponentName}/`
2. 参考 `./claude/skills/react-component-generator/resources/template/` 中的模板文件创建以下文件：
   - `index.tsx`: 组件主文件（参考 `./claude/skills/react-component-generator/resources/template/component.tsx.tpl`）
   - `types.ts`: `TypeScript` 类型定义（如果 `hasProps: true`）
   - `{ComponentName}.test.tsx`: 测试文件（参考 `./claude/skills/react-component-generator/resources/template/test.tsx.tpl`）
3. 组件代码规范
   - 使用函数组件 + `TypeScript`
   - `Props` 使用 `interface` 接口定义（如果 `hasProps: true`）
   - 使用 `Tailwind CSS` 处理样式
   - 导出使用 `named export`
   - 添加 `JSDoc` 注释说明组件功能
4. 测试代码规范：
   - 使用 `@testing-library/react`
   - 至少包含：渲染测试、`Props` 传递测试
5. 创建完成后可运行 `./claude/skills/react-component-generator/resources/scripts/validate.ts` 验证组件结构完整性

## 输出规范

- 所有文件创建完成后，报告创建的文件列表
- 给出组件的使用示例代码

## 参考示例

参见：`./claude/skills/react-component-generator/resources/examples/BookmarkCard-example/` 中的完整示例。

## 示例

输入：

- componentName: "BookmarkCard"
- description: "展示单个书签的卡片组件，显示标题、URL 和标签"
- hasProps: true
- hasState: false

预期输出的文件：

- `./src/components/BookmarkCard/index.tsx`
- `./src/components/BookmarkCard/types.ts`
- `./src/components/BookmarkCard/BookmarkCard.test.tsx`
