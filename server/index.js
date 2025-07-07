const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const AGENT_PATH = path.resolve(__dirname, '../martingale-agent');
const ENV_FILE = path.join(AGENT_PATH, '.env.eth');
const DOCKER_NAME = 'martingale-agent-bot';

app.post('/api/set-recall', (req, res) => {
  const { recallApi } = req.body;
  if (!recallApi) return res.status(400).json({ error: 'Missing recallApi' });
  fs.writeFileSync(ENV_FILE, `RECALL_API=${recallApi}\n`);
  res.json({ success: true });
});

app.post('/api/start-bot', (req, res) => {
  exec(
    `docker rm -f ${DOCKER_NAME} 2>/dev/null;` +
    `docker build -t martingale-agent-image ${AGENT_PATH} && ` +
    `docker run -d --name ${DOCKER_NAME} --env-file ${ENV_FILE} -v ${AGENT_PATH}:/app -w /app martingale-agent-image node martingale_agent.js`,
    (error, stdout, stderr) => {
      if (error) return res.status(500).json({ error: stderr });
      res.json({ success: true, container: stdout.trim() });
    }
  );
});

app.get('/api/logs', (req, res) => {
  exec(`docker logs --tail 100 ${DOCKER_NAME}`, (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: stderr });
    res.json({ logs: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
