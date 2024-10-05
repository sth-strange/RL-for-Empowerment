export default {
  async fetch(request) {
    // Обработка preflight-запросов (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

    try {
      const { email } = await request.json();  // Извлекаем email из запроса
      const API_KEY = MAILCHIMP_API_KEY;       // Mailchimp API-ключ
      const AUDIENCE_ID = MAILCHIMP_AUDIENCE_ID; // ID аудитории (списка)

      const data = {
        email_address: email,
        status: 'subscribed'  // Статус подписки
      };

      const response = await fetch(`https://us11.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${API_KEY}`
        },
        body: JSON.stringify(data)
      });

      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      };

      if (response.ok) {
        return new Response(JSON.stringify({ success: true, message: 'Вы подписаны!' }), { status: 200, headers });
      } else {
        const errorData = await response.json();
        console.error('Ошибка при подписке:', errorData);
        return new Response(JSON.stringify({ success: false, message: 'Ошибка при подписке.' }), { status: 500, headers });
      }
    } catch (error) {
      console.error('Ошибка сервера:', error);
      return new Response(JSON.stringify({ success: false, message: 'Ошибка сервера.' }), { status: 500, headers });
    }
  }
};
