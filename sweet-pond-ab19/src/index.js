export default {
  async fetch(request) {
    try {
      const { email } = await request.json();
      const API_KEY = SENDINBLUE_API_KEY;
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
        const errorData = await response.json();
        console.error('Ошибка при подписке:', errorData);
        return new Response(JSON.stringify({ success: false, message: 'Ошибка при подписке.' }), { status: 500 });
      }
    } catch (error) {
      console.error('Ошибка сервера:', error);
      return new Response(JSON.stringify({ success: false, message: 'Ошибка сервера.' }), { status: 500 });
    }
  }
}
