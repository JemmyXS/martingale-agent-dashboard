import React, { useState } from 'react';

function App() {
  const [recallApi, setRecallApi] = useState('');
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetRecall = async () => {
    if (!recallApi) return alert('请输入 RECALL API');
    await fetch('/api/set-recall', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recallApi }),
    });
    alert('RECALL API 已保存');
  };

  const handleStartBot = async () => {
    setLoading(true);
    await fetch('/api/start-bot', { method: 'POST' });
    setLoading(false);
    alert('机器人已启动');
  };

  const fetchLogs = async () => {
    const res = await fetch('/api/logs');
    const data = await res.json();
    setLogs(data.logs);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>马丁机器人管理面板</h2>
      <div>
        <input
          placeholder="输入 RECALL API"
          value={recallApi}
          onChange={e => setRecallApi(e.target.value)}
          style={{ width: 400 }}
        />
        <button onClick={handleSetRecall}>保存 API</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleStartBot} disabled={loading}>
          启动机器人
        </button>
        <button onClick={fetchLogs} style={{ marginLeft: 10 }}>
          查看日志
        </button>
      </div>
      <pre style={{
        background: '#222', color: '#eee', padding: 16, marginTop: 20,
        height: 300, overflow: 'auto', borderRadius: 5
      }}>
        {logs}
      </pre>
    </div>
  );
}

export default App;
