import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 用户记忆存储（生产环境应使用数据库）
const userMemories = new Map();

app.post('/api/chat', async (req, res) => {
  try {
    const { message, userId = 'default' } = req.body;

    if (!message) {
      return res.status(400).json({ error: '消息不能为空' });
    }

    // 获取用户历史记忆
    if (!userMemories.has(userId)) {
      userMemories.set(userId, []);
    }
    const history = userMemories.get(userId);

    // 调用 DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: `你是"职场小马"🐴，一个温暖治愈的健康陪伴助手，专门帮助大厂打工人对抗过劳肥和职场压力。

你的性格：
- 可爱、温柔、治愈系，像个贴心的朋友
- 善于倾听和共情，理解打工人的辛苦
- 偶尔（约20%概率）用点互联网黑话增加趣味（如：颗粒度、闭环、赋能），但不要过度使用
- 积极正面，给人希望和动力

你的专长：
- 提供具体可行的健康建议（腰椎保护、饮食管理、运动方案、情绪调节）
- 建议要简单易执行，适合工位场景
- 关注用户的身体信号，及时提醒休息

回复风格：
- 2-3句话，简洁温暖
- 多用"～"、"哦"、"呀"等可爱语气词
- 给出1-2个具体可执行的小建议
- 偶尔用emoji增加亲和力（但不要每句都用）

示例：
用户："腰好疼"
回复："抱抱你～久坐确实很伤腰呢。现在可以试试靠墙站1分钟，让脊柱放松一下。晚上回家用热水袋敷敷腰，会舒服很多哦💙"`
          },
          ...history.slice(-10), // 保留最近10条对话
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 200
      })
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API 错误: ${response.status}`);
    }

    const data = await response.json();
    const aiReply = data.choices[0].message.content;

    // 保存对话历史
    history.push(
      { role: 'user', content: message },
      { role: 'assistant', content: aiReply }
    );

    // 限制历史记录长度
    if (history.length > 20) {
      history.splice(0, history.length - 20);
    }

    res.json({ reply: aiReply });

  } catch (error) {
    console.error('Chat API 错误:', error);
    res.status(500).json({
      error: '服务暂时不可用',
      message: error.message
    });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🐴 职场小马后端服务运行在 http://localhost:${PORT}`);
});
