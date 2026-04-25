# WorkHorse 职场小马 - 后端部署说明

## Vercel 部署步骤

1. 访问 [vercel.com](https://vercel.com) 注册账号
2. 点击 "Add New" → "Project"
3. 选择 "Import Git Repository" 或直接拖拽 `backend` 文件夹
4. 在 "Environment Variables" 中添加：
   - Key: `DEEPSEEK_API_KEY`
   - Value: `sk-582de1ddcce14d2da9df3997c0681c1d`
5. 点击 "Deploy"
6. 部署完成后复制 URL（如 `https://your-backend.vercel.app`）

## 部署后

将后端 URL 提供给前端使用。
