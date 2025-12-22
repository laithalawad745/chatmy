'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageSquare, Code, Image, Send, Camera, X, Cpu, FileText, Menu, ChevronDown, Trash2 } from 'lucide-react';

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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const pdfInputRef = useRef(null);
  const inputRef = useRef(null);
  const [hasSentFirstMessage, setHasSentFirstMessage] = useState(false);
  
  useEffect(() => {
    if (!loading && inputRef.current && hasSentFirstMessage) {
      // تجنب إعادة التركيز على الموبايل لأنه يسبب إغلاق السايدبار
      if (window.innerWidth >= 768) {
        inputRef.current.focus();
      }
    }
  }, [loading, hasSentFirstMessage]);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  setTimeout(() => {
    // فقط على الشاشات الكبيرة
    if (window.innerWidth >= 768 && inputRef.current) {
      inputRef.current.focus();
    }
  }, 100);

  if (!hasSentFirstMessage) {
    setHasSentFirstMessage(true);
  }
  
  const models = {
    coding: [
      { id: 'mimo-v2-flash', name: 'MiMo V2 Flash', apiId: 'xiaomi/mimo-v2-flash:free' },
      { id: 'kat-coder', name: 'KAT Coder Pro V1', apiId: 'kwaipilot/kat-coder-pro:free' },
      { id: 'deepseek-r1t2', name: 'DeepSeek R1T2', apiId: 'tngtech/deepseek-r1t2-chimera:free' },
      { id: 'qwen3', name: 'Qwen3 235B', apiId: 'qwen/qwen3-235b-a22b:free' },
      { id: 'mistral-small', name: 'Mistral Small 3.1', apiId: 'mistralai/mistral-small-3.1-24b:free' },
      { id: 'gemini-flash', name: 'Gemini 2.0 Flash', apiId: 'google/gemini-2.0-flash-exp:free' },
    ],
    chat: [
      { id: 'mimo-v2-flash-chat', name: 'MiMo V2 Flash', apiId: 'xiaomi/mimo-v2-flash:free' },
      { id: 'qwen3-chat', name: 'Qwen3 235B', apiId: 'qwen/qwen3-235b-a22b:free' },
      { id: 'gemini-flash-chat', name: 'Gemini 2.0 Flash', apiId: 'google/gemini-2.0-flash-exp:free' },
      { id: 'deepseek-r1t2-chat', name: 'DeepSeek R1T2', apiId: 'tngtech/deepseek-r1t2-chimera:free' },
      { id: 'mistral-small-chat', name: 'Mistral Small 3.1', apiId: 'mistralai/mistral-small-3.1-24b:free' },
      { id: 'llama-70b', name: 'Llama 3.3 70B', apiId: 'meta-llama/llama-3.3-70b-instruct:free' },
    ],
    vision: [
      { id: 'nvidia-vision', name: 'NVIDIA Nemotron 12B', supportsImage: true, apiId: 'nvidia/nemotron-nano-12b-v2-vl:free' },
      { id: 'gemini-vision', name: 'Gemini 2.0 Flash', supportsImage: true, apiId: 'google/gemini-2.0-flash-exp:free' },
      { id: 'mistral-vision', name: 'Mistral Small 3.1', supportsImage: true, apiId: 'mistralai/mistral-small-3.1-24b:free' },
    ],
    documents: [
      { id: 'gemini-docs', name: 'Gemini 2.0 Flash', supportsPDF: true, apiId: 'google/gemini-2.0-flash-exp:free' },
      { id: 'qwen3-docs', name: 'Qwen3 235B', supportsPDF: true, apiId: 'qwen/qwen3-235b-a22b:free' },
      { id: 'deepseek-docs', name: 'DeepSeek R1T2', supportsPDF: true, apiId: 'tngtech/deepseek-r1t2-chimera:free' },
      { id: 'mistral-docs', name: 'Mistral Small 3.1', supportsPDF: true, apiId: 'mistralai/mistral-small-3.1-24b:free' },
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
        headers: { 'Content-Type': 'application/json' },
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
    <div className="flex h-[100dvh] bg-[#212121] text-white overflow-hidden" dir="rtl">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:relative top-0 right-0 h-full bg-[#171717] transition-transform duration-300 ease-in-out border-l border-gray-800 z-50 w-64 ${
        sidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
      } ${!sidebarOpen ? 'md:w-0 md:border-0' : ''}`}>
        <div className={`p-4 h-full flex flex-col ${!sidebarOpen ? 'md:hidden' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">شات بوت ذكي</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-gray-800 rounded md:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-xs text-gray-400 mb-2 px-2">الفئات</h3>
            <div className="space-y-1">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      if (window.innerWidth < 768) setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeCategory === cat.id
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Models */}
          <div className="flex-1 overflow-y-auto">
            <h3 className="text-xs text-gray-400 mb-2 px-2">النماذج</h3>
            <div className="space-y-1">
              {models[activeCategory].map((model) => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model.id);
                    if (window.innerWidth < 768) setSidebarOpen(false);
                  }}
                  className={`w-full text-right px-3 py-2 rounded-lg transition-colors text-sm ${
                    selectedModel === model.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  {model.name}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Chat Button */}
          {messages.length > 0 && (
            <button
              onClick={clearChat}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm mt-4"
            >
              <Trash2 className="w-4 h-4" />
              مسح المحادثة
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - كبير على الموبايل */}
        <header className="min-h-[80px] md:h-14 border-b border-gray-800 flex items-center px-4 md:px-6 bg-[#171717] flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-4 md:p-2 hover:bg-gray-800 rounded-lg ml-3 flex-shrink-0 -mr-2"
          >
            <Menu className="w-8 h-8 md:w-5 md:h-5" />
          </button>
          
          <div className="flex-1 flex items-center justify-center relative">
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1.5 hover:bg-gray-800 rounded-lg text-base md:text-sm relative"
            >
              <span className="font-medium">{currentModel.name}</span>
              <ChevronDown className="w-5 h-5 md:w-4 md:h-4" />
              
              {showModelDropdown && (
                <div className="absolute top-full left-0 mt-2 bg-[#2a2a2a] border border-gray-700 rounded-lg shadow-xl min-w-[200px] z-50">
                  {models[activeCategory].map((model) => (
                    <button
                      key={model.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedModel(model.id);
                        setShowModelDropdown(false);
                      }}
                      className={`w-full text-right px-4 py-2 hover:bg-gray-800 text-sm first:rounded-t-lg last:rounded-b-lg ${
                        selectedModel === model.id ? 'bg-gray-800' : ''
                      }`}
                    >
                      {model.name}
                    </button>
                  ))}
                </div>
              )}
            </button>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex w-12 h-12 rounded-full bg-gray-800 items-center justify-center mb-4">
                  <Cpu className="w-6 h-6 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-300 mb-2">مرحباً بك</h2>
                <p className="text-gray-500 text-sm">{currentModel.name}</p>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-8 group">
                <div className="flex gap-4 items-start">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-800'
                  }`}>
                    {msg.role === 'user' ? (
                      <MessageSquare className="w-4 h-4" />
                    ) : (
                      <Cpu className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="font-semibold text-sm text-gray-300">
                      {msg.role === 'user' ? 'أنت' : currentModel.name}
                    </div>
                    
                    {msg.image && (
                      <img 
                        src={msg.image} 
                        alt="uploaded" 
                        className="rounded-lg max-w-sm border border-gray-700"
                      />
                    )}
                    
                    <div className="text-gray-100 leading-7 whitespace-pre-wrap">
                      {msg.content}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="mb-8">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="font-semibold text-sm text-gray-300 mb-2">{currentModel.name}</div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <footer className="border-t border-gray-800 bg-[#212121] p-4 safe-bottom">
          <div className="max-w-3xl mx-auto">
            {/* Preview */}
            {(imagePreview || filePreview) && (
              <div className="flex gap-2 mb-3">
                {imagePreview && (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="preview" 
                      className="rounded-lg h-16 object-cover border border-gray-700"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-1 -right-1 bg-gray-800 hover:bg-gray-700 rounded-full w-5 h-5 flex items-center justify-center border border-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {filePreview && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <div className="text-xs">
                      <div className="text-gray-300">{filePreview.name}</div>
                      <div className="text-gray-500">{filePreview.size} MB</div>
                    </div>
                    <button
                      onClick={removeFile}
                      className="mr-2 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Input */}
            <div className="flex items-end gap-2 bg-[#2a2a2a] rounded-2xl p-2 border border-gray-700 focus-within:border-gray-600">
              {currentModel.supportsPDF && (
                <>
                  <button
                    onClick={() => pdfInputRef.current?.click()}
                    disabled={loading}
                    className="p-2.5 md:p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <FileText className="w-6 h-6 md:w-5 md:h-5" />
                  </button>
                  <input
                    ref={pdfInputRef}
                    type="file"
                    accept=".pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={loading}
                  />
                </>
              )}
              
              {currentModel.supportsImage && (
                <>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                    className="p-2.5 md:p-2 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    <Camera className="w-6 h-6 md:w-5 md:h-5" />
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={loading}
                  />
                </>
              )}
              
              <textarea
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="أرسل رسالة..."
                className="flex-1 bg-transparent px-2 py-2 focus:outline-none resize-none max-h-32 text-gray-100 placeholder-gray-500 text-base"
                rows="1"
                disabled={loading}
                style={{
                  minHeight: '24px',
                  height: 'auto'
                }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
              />
              
              <button
                onClick={sendMessage}
                disabled={loading || (!input.trim() && !selectedImage && !selectedFile)}
                className="p-2.5 md:p-2 bg-white text-black hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send className="w-6 h-6 md:w-5 md:h-5" />
              </button>
            </div>
            
            <div className="text-xs text-gray-500 mt-2 text-center">
              {currentModel.name} • نماذج AI مجانية
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}