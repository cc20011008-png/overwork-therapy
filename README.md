# WorkHorse 职场小马 - 前端部署说明

## 部署前准备

1. 先部署后端，获取后端 URL
2. 修改 `index.html` 中的 API 地址：
   - 找到 `http://localhost:3000/api/chat`
   - 改成 `https://your-backend.vercel.app/api/chat`

## Vercel 部署步骤

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "Add New" → "Project"
3. 直接拖拽 `frontend` 文件夹
4. 点击 "Deploy"
5. 部署完成后得到前端 URL，分享给别人即可

## 本地测试

直接用浏览器打开 `index.html` 即可。
