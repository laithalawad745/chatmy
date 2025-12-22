'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Code, Image, Send, Trash2, Camera, X, Cpu, Sparkles, Zap, Brain, FileText } from 'lucide-react';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('mimo-v2-flash');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [activeCategory, setActiveCategory] = useState('coding');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const inputRef = useRef(null);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  
  useEffect(() => {
    if (!loading && inputRef.current && hasSentFirstMessage) {
      inputRef.current.focus();
    }
  }, [loading, hasSentFirstMessage]);
  
  setTimeout(() => {
    inputRef.current?.focus();
  }, 100);

  if (!hasSentFirstMessage) {
    setHasSentFirstMessage(true);
  }
  
  const models = {
    coding: [
      { 
        id: 'mimo-v2-flash', 
        name: 'MiMo V2 Flash', 
        desc: 'الأقوى - 309B معامل - استدلال فائق', 
        color: 'from-emerald-600 to-teal-600',
        rank: 1,
        apiId: 'xiaomi/mimo-v2-flash:free'
      },
      { 
        id: 'kat-coder', 
        name: 'KAT Coder Pro V1', 
        desc: 'الأفضل للبرمجة - معدل حل 73.4%', 
        color: 'from-purple-600 to-pink-600',
        rank: 2,
        apiId: 'kwaipilot/kat-coder-pro:free'
      },
      { 
        id: 'deepseek-r1t2', 
        name: 'DeepSeek R1T2 Chimera', 
        desc: 'استدلال قوي - 164K سياق', 
        color: 'from-blue-600 to-cyan-600',
        rank: 3,
        apiId: 'tngtech/deepseek-r1t2-chimera:free'
      },
      { 
        id: 'qwen3', 
        name: 'Qwen3 235B A22B', 
        desc: 'تفكير عميق - 131K سياق', 
        color: 'from-indigo-600 to-purple-600',
        rank: 4,
        apiId: 'qwen/qwen3-235b-a22b:free'
      },
      { 
        id: 'mistral-small', 
        name: 'Mistral Small 3.1 24B', 
        desc: 'متوازن - 128K سياق', 
        color: 'from-orange-600 to-red-600',
        rank: 5,
        apiId: 'mistralai/mistral-small-3.1-24b:free'
      },
      { 
        id: 'gemini-flash', 
        name: 'Gemini 2.0 Flash', 
        desc: 'سريع جداً - 1M سياق', 
        color: 'from-red-600 to-pink-600',
        rank: 6,
        apiId: 'google/gemini-2.0-flash-exp:free'
      },
    ],
    chat: [
      { 
        id: 'mimo-v2-flash-chat', 
        name: 'MiMo V2 Flash', 
        desc: 'الأقوى - 309B معامل - متعدد اللغات', 
        color: 'from-emerald-600 to-teal-600',
        rank: 1,
        apiId: 'xiaomi/mimo-v2-flash:free'
      },
      { 
        id: 'qwen3-chat', 
        name: 'Qwen3 235B A22B', 
        desc: '100+ لغة - استدلال قوي', 
        color: 'from-indigo-600 to-purple-600',
        rank: 2,
        apiId: 'qwen/qwen3-235b-a22b:free'
      },
      { 
        id: 'gemini-flash-chat', 
        name: 'Gemini 2.0 Flash', 
        desc: 'سريع - متعدد الوسائط', 
        color: 'from-red-600 to-pink-600',
        rank: 3,
        apiId: 'google/gemini-2.0-flash-exp:free'
      },
      { 
        id: 'deepseek-r1t2-chat', 
        name: 'DeepSeek R1T2 Chimera', 
        desc: 'استدلال منطقي', 
        color: 'from-blue-600 to-cyan-600',
        rank: 4,
        apiId: 'tngtech/deepseek-r1t2-chimera:free'
      },
      { 
        id: 'mistral-small-chat', 
        name: 'Mistral Small 3.1 24B', 
        desc: 'متعدد اللغات', 
        color: 'from-orange-600 to-red-600',
        rank: 5,
        apiId: 'mistralai/mistral-small-3.1-24b:free'
      },
      { 
        id: 'llama-70b', 
        name: 'Llama 3.3 70B', 
        desc: '8 لغات مدعومة', 
        color: 'from-green-600 to-emerald-600',
        rank: 6,
        apiId: 'meta-llama/llama-3.3-70b-instruct:free'
      },
    ],
    vision: [
      { 
        id: 'nvidia-vision', 
        name: 'NVIDIA Nemotron 12B VL', 
        desc: 'تحليل الصور والفيديو', 
        color: 'from-green-600 to-teal-600',
        rank: 1,
        supportsImage: true,
        apiId: 'nvidia/nemotron-nano-12b-v2-vl:free'
      },
      { 
        id: 'gemini-vision', 
        name: 'Gemini 2.0 Flash', 
        desc: 'رؤية متقدمة - 1M سياق', 
        color: 'from-red-600 to-pink-600',
        rank: 2,
        supportsImage: true,
        apiId: 'google/gemini-2.0-flash-exp:free'
      },
      { 
        id: 'mistral-vision', 
        name: 'Mistral Small 3.1 24B', 
        desc: 'تحليل الصور - متعدد الوسائط', 
        color: 'from-orange-600 to-red-600',
        rank: 3,
        supportsImage: true,
        apiId: 'mistralai/mistral-small-3.1-24b:free'
      },
    ],
    documents: [
      { 
        id: 'gemini-docs', 
        name: 'Gemini 2.0 Flash', 
        desc: 'تحليل مستندات - 1M سياق', 
        color: 'from-blue-600 to-purple-600',
        rank: 1,
        supportsPDF: true,
        apiId: 'google/gemini-2.0-flash-exp:free'
      },
      { 
        id: 'qwen3-docs', 
        name: 'Qwen3 235B A22B', 
        desc: 'استخراج معلومات - 131K سياق', 
        color: 'from-indigo-600 to-purple-600',
        rank: 2,
        supportsPDF: true,
        apiId: 'qwen/qwen3-235b-a22b:free'
      },
      { 
        id: 'deepseek-docs', 
        name: 'DeepSeek R1T2 Chimera', 
        desc: 'تلخيص وتحليل - 164K سياق', 
        color: 'from-cyan-600 to-blue-600',
        rank: 3,
        supportsPDF: true,
        apiId: 'tngtech/deepseek-r1t2-chimera:free'
      },
      { 
        id: 'mistral-docs', 
        name: 'Mistral Small 3.1 24B', 
        desc: 'ترجمة وشرح - 128K سياق', 
        color: 'from-orange-600 to-amber-600',
        rank: 4,
        supportsPDF: true,
        apiId: 'mistralai/mistral-small-3.1-24b:free'
      },
    ]
  };

  const categories = [
    { id: 'coding', name: 'برمجة', icon: Code },
    { id: 'chat', name: 'محادثة', icon: MessageSquare },
    { id: 'vision', name: 'رؤية', icon: Image },
    { id: 'documents', name: 'مستندات', icon: FileText },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    setSelectedModel(models[activeCategory][0].id);
  }, [activeCategory]);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم الصورة يجب أن يكون أقل من 5MB');
        return;
      }
      
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('يرجى رفع ملف PDF فقط');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        alert('حجم الملف يجب أن يكون أقل من 10MB');
        return;
      }
      
      setSelectedFile(file);
      setFilePreview({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2)
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const getCurrentModel = () => {
    return models[activeCategory]?.find(m => m.id === selectedModel) || models[activeCategory]?.[0];
  };

  const sendMessage = async () => {
    if ((!input.trim() && !selectedImage) || loading) return;

    const currentModel = getCurrentModel();

    if (!currentModel) return null;
    
    if (selectedImage && !currentModel.supportsImage) {
      alert('النموذج الحالي لا يدعم الصور. انتقل لفئة "رؤية"');
      return;
    }

    const userMessage = { 
      role: 'user', 
      content: input,
      image: imagePreview 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      let imageBase64 = null;
      if (selectedImage) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(selectedImage);
        });
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages.map(m => ({ role: m.role, content: m.content })), 
                     { role: 'user', content: input }],
          model: currentModel.apiId,
          image: imageBase64,
        }),
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0]) {
        const botMessage = {
          role: 'assistant',
          content: data.choices[0].message.content,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('خطأ:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.'
      }]);
    } finally {
      setLoading(false);
      removeImage();
    }
  };

  const clearChat = () => {
    if (confirm('هل تريد مسح جميع الرسائل؟')) {
      setMessages([]);
      removeImage();
      removeFile();
    }
  };

  const currentModel = getCurrentModel();

  return (
    <div className="flex flex-col h-screen max-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" dir="rtl">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-2xl border-b border-slate-700 flex-shrink-0 overflow-hidden">
        <div className="max-w-6xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${currentModel.color}`}>
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  شات بوت ذكي
                </h1>
                <p className="text-xs text-gray-400">مجاني بالكامل - نماذج متعددة</p>
              </div>
            </div>
            
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-all border border-red-600/50 text-sm font-semibold"
              >
                <Trash2 className="w-4 h-4" />
                مسح
              </button>
            )}
          </div>
          
          <div className="flex gap-2 mb-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold ${
                    activeCategory === cat.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-800 text-gray-400 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
            {models[activeCategory].map((model, idx) => (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                disabled={loading}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap border min-w-fit ${
                  selectedModel === model.id
                    ? `bg-gradient-to-r ${model.color} text-white shadow-lg scale-105 border-transparent`
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700 border-slate-700'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                    selectedModel === model.id ? 'bg-white/20' : 'bg-slate-700'
                  }`}>
                    #{idx + 1}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">{model.name}</div>
                    <div className="text-xs opacity-75">{model.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 min-h-0">
        <div className="max-w-4xl mx-auto space-y-4 pb-4">
          {messages.length === 0 && (
            <div className="text-center mt-20 animate-fade-in">
              <div className={`inline-flex p-6 rounded-2xl bg-gradient-to-r ${currentModel.color} mb-6`}>
                {activeCategory === 'coding' && <Code className="w-16 h-16 text-white" />}
                {activeCategory === 'chat' && <MessageSquare className="w-16 h-16 text-white" />}
                {activeCategory === 'vision' && <Camera className="w-16 h-16 text-white" />}
                {activeCategory === 'documents' && <FileText className="w-16 h-16 text-white" />}
              </div>
              
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-3">
                مرحباً بك
              </h2>
              <p className="text-xl text-gray-400 mb-2">{currentModel.name}</p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${currentModel.color} text-white text-sm font-semibold mb-6`}>
                <Sparkles className="w-4 h-4" />
                المرتبة #{currentModel.rank} في فئة {categories.find(c => c.id === activeCategory).name}
              </div>
              
              <p className="text-sm text-gray-500 max-w-md mx-auto mb-8">{currentModel.desc}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto text-right">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <Brain className="w-8 h-8 text-blue-400 mb-2" />
                  <p className="text-sm text-gray-300">ذكاء متقدم</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <Zap className="w-8 h-8 text-yellow-400 mb-2" />
                  <p className="text-sm text-gray-300">سرعة عالية</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                  <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
                  <p className="text-sm text-gray-300">مجاني 100%</p>
                </div>
              </div>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 animate-slide-in ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-2xl p-4 rounded-2xl shadow-xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
                    : 'bg-slate-800 text-gray-100 border border-slate-700'
                }`}
              >
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="uploaded" 
                    className="rounded-lg mb-3 max-w-full h-auto max-h-64 object-contain border-2 border-white/20"
                  />
                )}
                {msg.file && (
                  <div className="flex items-center gap-2 mb-3 p-3 bg-white/10 rounded-lg border border-white/20">
                    <FileText className="w-5 h-5" />
                    <div className="text-sm">
                      <div className="font-semibold">{msg.file.name}</div>
                      <div className="text-xs opacity-75">{msg.file.size} MB</div>
                    </div>
                  </div>
                )}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
              
              {msg.role === 'assistant' && (
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentModel.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Cpu className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {loading && (
            <div className="flex gap-3 justify-end animate-slide-in">
              <div className="bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-700">
                <div className="flex gap-2">
                  <div className={`w-2.5 h-2.5 bg-gradient-to-r ${currentModel.color} rounded-full animate-bounce`}></div>
                  <div className={`w-2.5 h-2.5 bg-gradient-to-r ${currentModel.color} rounded-full animate-bounce`} style={{animationDelay: '0.1s'}}></div>
                  <div className={`w-2.5 h-2.5 bg-gradient-to-r ${currentModel.color} rounded-full animate-bounce`} style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentModel.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Cpu className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 border-t border-slate-700 p-4 shadow-2xl flex-shrink-0 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          {imagePreview && (
            <div className="mb-3 relative inline-block mr-2">
              <img 
                src={imagePreview} 
                alt="preview" 
                className="rounded-lg h-24 object-cover border-2 border-green-500"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-all shadow-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {filePreview && (
            <div className="mb-3 relative inline-block">
              <div className="flex items-center gap-3 p-3 bg-blue-600/20 border-2 border-blue-500 rounded-lg">
                <FileText className="w-8 h-8 text-blue-400" />
                <div className="text-sm text-white">
                  <div className="font-semibold">{filePreview.name}</div>
                  <div className="text-xs opacity-75">{filePreview.size} MB</div>
                </div>
                <button
                  onClick={removeFile}
                  className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700 transition-all shadow-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            {currentModel.supportsPDF && (
              <button
                onClick={() => pdfInputRef.current?.click()}
                disabled={loading}
                className={`px-4 py-4 rounded-xl transition-all shadow-lg ${
                  loading 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-2xl hover:scale-105'
                }`}
                title="رفع PDF"
              >
                <FileText className="w-5 h-5" />
              </button>
            )}
            <input
              ref={pdfInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={loading}
            />
            
            {currentModel.supportsImage && (
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  className="hidden"
                  disabled={loading}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                  className={`px-4 py-4 rounded-xl transition-all shadow-lg ${
                    loading 
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-2xl hover:scale-105'
                  }`}
                  title="رفع صورة"
                >
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            )}
            
            <input
              type="text"
              value={input}
              ref={inputRef}
              autoFocus
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 p-4 bg-slate-800 border-2 border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-right text-white placeholder-gray-500 transition-all"
              disabled={loading}
            />
            
            <button
              onClick={sendMessage}
              disabled={loading || (!input.trim() && !selectedImage && !selectedFile)}
              className={`px-6 py-4 rounded-xl font-bold transition-all shadow-lg flex items-center gap-2 ${
                loading || (!input.trim() && !selectedImage && !selectedFile)
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : `bg-gradient-to-r ${currentModel.color} text-white hover:shadow-2xl hover:scale-105`
              }`}
            >
              {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              {messages.length > 0 && <span>{messages.length} رسالة</span>}
              {currentModel.supportsPDF && (
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  يدعم PDF
                </span>
              )}
              {currentModel.supportsImage && (
                <span className="flex items-center gap-1">
                  <Camera className="w-3 h-3" />
                  يدعم الصور
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentModel.color} animate-pulse`}></span>
              <span>#{currentModel.rank} - {currentModel.name}</span>
            </div>
          </div>
        </div>
      </div>

   <style jsx global>{`
        * {
          box-sizing: border-box;
        }
        
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}