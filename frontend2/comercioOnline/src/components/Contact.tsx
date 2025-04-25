import React, { useState, FormEvent, ChangeEvent } from 'react';
import IContact from '@/model/interfaces/iContact';
import { FiSend, FiCheckCircle, FiAlertCircle, FiArrowLeft } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    asunto: '',
    description: ''
  });
  
  const [formState, setFormState] = useState({
    status: 'idle' as 'idle' | 'loading' | 'success' | 'error',
    message: '',
    showForm: true
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const send = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validación de campos
    if (!formData.description.trim() || !formData.asunto.trim() || !formData.name.trim()) {
      setFormState({
        status: 'error',
        message: 'Por favor completa todos los campos',
        showForm: true
      });
      return;
    }

    setFormState(prev => ({ ...prev, status: 'loading', message: 'Enviando mensaje...' }));

    const contenido: IContact = {
      content: "Nuevo mensaje de contacto:",
      embeds: [
        {
          title: formData.asunto,
          description: formData.description,
          footer: {
            text: `De: ${formData.name}`
          }
        }
      ]
    };

    try {
      const response = await fetch('https://discord.com/api/webhooks/1365078295351136316/t0-NhNoSvTPhVZpD9Iz7ch7DL9RA7wthizT2BSvrDfuHR9ckD_eG0wkCVpiewIdZkDux', {
        method: 'POST',
        body: JSON.stringify(contenido),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Error en la respuesta del servidor');

      setFormData({ name: '', asunto: '', description: '' });
      setFormState({
        status: 'success',
        message: '¡Mensaje enviado con éxito!',
        showForm: false
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setFormState({
        status: 'error',
        message: 'Error al enviar el mensaje. Inténtalo de nuevo.',
        showForm: true
      });
    }
  };

  const getStatusIcon = () => {
    switch(formState.status) {
      case 'success': return <FiCheckCircle className="inline mr-2" />;
      case 'error': return <FiAlertCircle className="inline mr-2" />;
      case 'loading': return <div className="inline-block mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>;
      default: return <FiSend className="inline mr-2" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-center">
          <h2 className="text-2xl font-bold text-white">CONTACTA CON NOSOTROS</h2>
          <p className="text-blue-100 mt-2">Estamos aquí para ayudarte</p>
        </div>

        {/* Form or Success Message */}
        <div className="p-6">
          {formState.showForm ? (
            <>
              {formState.message && (
                <div className={`mb-6 p-4 rounded-lg ${
                  formState.status === 'error' ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {formState.message}
                </div>
              )}

              <form onSubmit={send} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ej. Himilce Sanchez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                    Asunto *
                  </label>
                  <input
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    type="text"
                    placeholder="Ej. Reparación"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensaje *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descríbenos en qué podemos ayudarte"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    rows={5}
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formState.status === 'loading'}
                    className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-colors ${
                      formState.status === 'loading' ? 'bg-blue-400' :
                      formState.status === 'error' ? 'bg-red-600 hover:bg-red-700' :
                      'bg-blue-600 hover:bg-blue-700'
                    } flex items-center justify-center`}
                  >
                    {getStatusIcon()}
                    {formState.status === 'idle' && 'ENVIAR MENSAJE'}
                    {formState.status === 'loading' && 'ENVIANDO...'}
                    {formState.status === 'success' && 'ENVIADO'}
                    {formState.status === 'error' && 'INTENTAR DE NUEVO'}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">¡MENSAJE ENVIADO!</h3>
              <p className="text-gray-600 mb-6">Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
              <button
                onClick={() => setFormState({
                  status: 'idle',
                  message: '',
                  showForm: true
                })}
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FiArrowLeft className="mr-2" />
                Enviar otro mensaje
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
