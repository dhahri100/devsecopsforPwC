import React, { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [debugInfo, setDebugInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', null
  const [showDebug, setShowDebug] = useState(false);

  const sendPrompt = async () => {
    setLoading(true);
    setResponse("");
    setDebugInfo("");
    setStatus(null);

    try {
      const res = await fetch("http://localhost:5678/webhook-test/c2ca7ad4-ffc7-4279-8e8d-ad31826f29b9", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      
      // Debug: Log the full response structure
      console.log("Full response from n8n:", data);
      setDebugInfo(JSON.stringify(data, null, 2));
      
      // Try to extract the response_text from the n8n response
      // Handle both array and object responses
      let responseData = data;
      if (Array.isArray(data) && data.length > 0) {
        responseData = data[0];
      }
      
      if (responseData.response_text) {
        setResponse(responseData.response_text);
        setStatus('success');
      } else if (responseData.output) {
        // Fallback to output if response_text doesn't exist
        setResponse(responseData.output);
        setStatus('success');
      } else {
        setResponse("⚠️ Aucune réponse reçue dans les champs 'response_text' ou 'output'.");
        setStatus('error');
      }
    } catch (error) {
      console.error("Erreur:", error);
      setResponse(`❌ Erreur lors de l'envoi du prompt: ${error.message}`);
      setDebugInfo(`Error: ${error.message}`);
      setStatus('error');
    }
    setLoading(false);
  };

  const getStatusIcon = () => {
    if (status === 'success') return '✅';
    if (status === 'error') return '❌';
    return null;
  };

  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px',
      background: 'linear-gradient(135deg, #f3e8ff 0%, #dbeafe 100%)',
      minHeight: '100vh',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    card: {
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      padding: '32px'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '24px'
    },
    headerIcon: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      padding: '12px',
      borderRadius: '8px',
      color: 'white',
      fontSize: '24px'
    },
    headerText: {
      margin: 0
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#1f2937',
      margin: '0 0 4px 0'
    },
    subtitle: {
      color: '#6b7280',
      margin: 0
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: window.innerWidth > 1024 ? '1fr 1fr' : '1fr',
      gap: '32px'
    },
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1f2937',
      margin: 0
    },
    textarea: {
      width: '100%',
      height: '192px',
      padding: '16px',
      border: '2px solid #e5e7eb',
      borderRadius: '8px',
      resize: 'none',
      fontSize: '14px',
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box'
    },
    textareaFocus: {
      borderColor: '#8b5cf6',
      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
    },
    bottomRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '12px'
    },
    stats: {
      display: 'flex',
      gap: '16px',
      fontSize: '14px',
      color: '#6b7280'
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 24px',
      background: loading || !prompt.trim() ? '#9ca3af' : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: loading || !prompt.trim() ? 'not-allowed' : 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      transform: loading || !prompt.trim() ? 'none' : 'scale(1)'
    },
    buttonHover: {
      transform: 'scale(1.05)'
    },
    statusIndicator: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '12px'
    },
    statusSuccess: {
      background: '#f0fdf4',
      color: '#166534'
    },
    statusError: {
      background: '#fef2f2',
      color: '#dc2626'
    },
    responseArea: {
      background: '#f9fafb',
      borderRadius: '8px',
      padding: '16px',
      minHeight: '192px',
      maxHeight: '384px',
      overflowY: 'auto',
      border: '1px solid #e5e7eb'
    },
    loadingContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '192px',
      color: '#6b7280'
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '3px solid #e5e7eb',
      borderTop: '3px solid #8b5cf6',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '12px'
    },
    emptyState: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '192px',
      color: '#9ca3af'
    },
    responseText: {
      whiteSpace: 'pre-wrap',
      color: '#1f2937',
      fontSize: '14px',
      lineHeight: '1.6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      margin: 0
    },
    debugSection: {
      marginTop: '32px',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '24px'
    },
    debugToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      color: '#6b7280',
      fontSize: '14px',
      fontWeight: '500',
      padding: '8px 0',
      border: 'none',
      background: 'none'
    },
    debugContent: {
      marginTop: '16px',
      background: '#1e293b',
      color: '#e2e8f0',
      borderRadius: '8px',
      padding: '16px',
      overflow: 'auto'
    },
    debugPre: {
      fontSize: '12px',
      lineHeight: '1.5',
      margin: 0,
      fontFamily: 'ui-monospace, monospace'
    },
    footer: {
      marginTop: '32px',
      paddingTop: '24px',
      borderTop: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '14px',
      color: '#6b7280'
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: loading ? '#fbbf24' : '#10b981',
      marginRight: '8px'
    }
  };

  // CSS pour l'animation du spinner
  const spinnerCSS = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinnerCSS}</style>
      <div style={styles.container}>
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerIcon}>🧠</div>
            <div style={styles.headerText}>
              <h1 style={styles.title}>Prompt Box</h1>
              <p style={styles.subtitle}>Interface moderne pour tester vos prompts</p>
            </div>
          </div>

          <div style={styles.grid}>
            {/* Section Input */}
            <div>
              <div style={styles.sectionHeader}>
                <span style={{fontSize: '18px'}}>💬</span>
                <h2 style={styles.sectionTitle}>Votre Prompt</h2>
              </div>
              
              <div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Écrivez votre prompt ici..."
                  style={styles.textarea}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#8b5cf6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                
                <div style={styles.bottomRow}>
                  <div></div>
                  
                  <button
                    onClick={sendPrompt}
                    disabled={loading || !prompt.trim()}
                    style={styles.button}
                    onMouseEnter={(e) => {
                      if (!loading && prompt.trim()) {
                        e.target.style.transform = 'scale(1.05)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)';
                    }}
                  >
                    {loading ? '⏳' : '📤'}
                    {loading ? "Envoi..." : "Envoyer"}
                  </button>
                </div>
              </div>

              {/* Status indicator */}
              {status && (
                <div style={{
                  ...styles.statusIndicator,
                  ...(status === 'success' ? styles.statusSuccess : styles.statusError)
                }}>
                  <span>{getStatusIcon()}</span>
                  <span>
                    {status === 'success' ? 'Réponse reçue avec succès' : 'Erreur lors de l\'envoi'}
                  </span>
                </div>
              )}
            </div>

            {/* Section Output */}
            <div>
              <div style={styles.sectionHeader}>
                <span style={{fontSize: '18px'}}>📥</span>
                <h2 style={styles.sectionTitle}>Réponse</h2>
              </div>
              
              <div style={styles.responseArea}>
                {loading ? (
                  <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <span>Traitement en cours...</span>
                  </div>
                ) : response ? (
                  <div style={styles.responseText}>{response}</div>
                ) : (
                  <div style={styles.emptyState}>
                    <span>Aucune réponse pour le moment</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section Debug */}
          {debugInfo && (
            <div style={styles.debugSection}>
              <button
                onClick={() => setShowDebug(!showDebug)}
                style={styles.debugToggle}
              >
                <span>🐛</span>
                <span>Informations de Debug</span>
                <span style={{marginLeft: 'auto', fontSize: '12px'}}>
                  (Cliquez pour {showDebug ? 'masquer' : 'afficher'})
                </span>
              </button>
              
              {showDebug && (
                <div style={styles.debugContent}>
                  <pre style={styles.debugPre}>{debugInfo}</pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;