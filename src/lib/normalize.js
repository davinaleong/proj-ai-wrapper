export function normalizeChatCompletion({ provider, response }) {
  const choice = response?.choices?.[0];
  const content = choice?.message?.content ?? '';

  return {
    id: response?.id,
    provider,
    model: response?.model,
    content: [{ type: 'text', text: content }],
    usage: response?.usage ?? null,
    raw: response
  };
}
