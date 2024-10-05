/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */



export default {
  async fetch(request) {
    const { email } = await request.json();
    const API_KEY = SENDINBLUE_API_KEY; // Ключ API будет храниться в переменной среды
    const LIST_ID = SENDINBLUE_LIST_ID;

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY
      },
      body: JSON.stringify({
        email: email,
        listIds: [LIST_ID]
      })
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Вы подписаны!' }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Ошибка при подписке.' }), { status: 500 });
    }
  }
}
