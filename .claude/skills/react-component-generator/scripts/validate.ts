// scripts/validate.ts 验证组件目录结构是否完整
// AI 在执行 Skill 后可以运行此脚本进行检查

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const scriptDir = path.dirname(__filename)
const projectRoot = path.resolve(scriptDir, "../../../../")

function validateComponent(componentName: string) {
    const dir = path.join(projectRoot, 'src/components', componentName)
    const requiredFiles = ['index.tsx', 'types.ts']
    const missing: string[] = []

    requiredFiles.forEach(file => {
        if (!fs.existsSync(path.join(dir, file))) {
            missing.push(file)
        }
    })

    if (missing.length > 0) {
        console.error(` 组件 ${componentName} 缺少文件：${missing.join(', ')}`)
        return false
    }

    console.log(` 组件 ${componentName} 结构验证通过`)
    return true
}

// 从命令行参数获取取件名
const componentName = process.argv[2]
if (!componentName) {
    console.error('用法：ts-node validate.ts <ComponentName>')
    process.exit(1)
}

validateComponent(componentName)