import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { userInput } = req.body;

  if (!userInput) {
    return res.status(400).json({ error: 'No user input provided.' });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55000);

  try {
    const response = await openai.chat.completions.create(
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content:
              'You respond only in json objects and nothing else or extra then what is asked of you.',
          },
          { role: 'user', content: userInput },
        ],
      },
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

    const answer =
      response.choices[0]?.message?.content || 'No response generated.';
    res.status(200).json({ reply: answer });
  } catch (error) {
    clearTimeout(timeout);

    if (error.name === 'AbortError') {
      console.error('Request to OpenAI timed out.');
      return res.status(504).json({ error: 'Request timed out.' });
    }

    console.error(
      'Error fetching response from OpenAI:',
      error.response?.data || error.message
    );
    res
      .status(500)
      .json({ error: 'Failed to fetch response from OpenAI API.' });
  }
}
