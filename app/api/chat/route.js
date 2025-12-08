//app/api/chat/route.js
export async function POST(req) {
  try {
    const { messages, model, image, file } = await req.json();

    const selectedModel = model;
    const lastMessage = messages[messages.length - 1];
    
    // بناء content array
    const contentArray = [
      {
        type: "text",
        text: lastMessage.content
      }
    ];
    
    // إضافة الصورة إذا كانت موجودة
    if (image) {
      contentArray.push({
        type: "image_url",
        image_url: {
          url: `data:image/jpeg;base64,${image}`
        }
      });
    }
    
    // إضافة PDF إذا كان موجوداً
    if (file) {
      contentArray.push({
        type: "file",
        file: {
          filename: file.filename,
          file_data: `data:application/pdf;base64,${file.data}`
        }
      });
    }
    
    lastMessage.content = contentArray;

    const requestBody = {
      model: selectedModel,
      messages: messages,
    };
    
    // إضافة plugin لاستخدام محرك pdf-text المجاني
    if (file) {
      requestBody.plugins = [
        {
          id: "file-parser",
          pdf: {
            engine: "pdf-text"  // المحرك المجاني!
          }
        }
      ];
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return Response.json({ error: 'حدث خطأ في المعالجة' }, { status: 500 });
  }
}