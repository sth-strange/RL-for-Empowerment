export default {
  async fetch(request) {
    // Обработка preflight-запросов (OPTIONS)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',  // Разрешаем доступ с любых источников
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',  // Разрешаем методы
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'  // Разрешаем заголовки
        }
      });
    }

    try {
      const { email } = await request.json();  // Извлекаем email из запроса
      const API_KEY = MAILCHIMP_API_KEY;       // Mailchimp API-ключ
      const AUDIENCE_ID = MAILCHIMP_AUDIENCE_ID; // ID аудитории (списка)

      const response = await fetch(`https://us11.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `apikey ${API_KEY}`
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed'  // Статус подписки
        })
      });

      const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',  // Разрешаем доступ с любых источников
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      };

      if (response.ok) {
        return new Response(JSON.stringify({ success: true, message: 'Success' }), { status: 200, headers });
      } else {
        const errorData = await response.json();
        console.error('Ошибка при подписке:', errorData);
        return new Response(JSON.stringify({ success: false, message: 'Error.' }), { status: 500, headers });
      }
    } catch (error) {
      console.error('Ошибка сервера:', error);
      return new Response(JSON.stringify({ success: false, message: 'Server error.' }), { status: 500, headers });
    }
  }
};
