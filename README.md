martingale-agent-dashboard/
├── client/                  # React 前端
│   ├── package.json
│   ├── src/
│   │   └── App.js
│   └── ... (React 其它文件)
├── server/                  # Node/Express 后端
│   ├── index.js
│   └── package.json
├── martingale-agent/        # 你的马丁机器人主目录
│   ├── Dockerfile
│   └── package.json
├── README.md

# Martingale Agent Dashboard

一键部署和管理你的马丁策略交易机器人。

## 使用说明

### 1. 启动后端

```bash
cd server
npm install
node index.js
```

### 2. 启动前端

```bash
cd client
npm install
npm start
```

### 3. 配置 martingale-agent

请确保 martingale-agent 目录下有 package.json、Dockerfile

### 4. 使用面板

浏览器访问 [http://localhost:3000](http://localhost:3000)：
- 输入 RECALL API, 点“保存 API”
- 点“启动机器人”，服务端自动 build & run docker
- 点“查看日志”实时查看容器日志

---

### 生产环境建议

- 后端建议用 pm2 或 docker 部署
- 前端可 build 成静态文件用 nginx 部署
- 服务器部署需保证 Docker 已安装
- 建议加认证保护管理面板

---
