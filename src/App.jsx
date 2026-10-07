import { useState } from "react";
import "./App.css";

function App() {
  const [temperatura, setTemperatura] = useState(0);
  const [luminosidade, setLuminosidade] = useState(0);
  const [umidade, setUmidade] = useState(0);
  const [conectado, setConectado] = useState(false);

  return (
    <div className="app">
      <header>
        <h1>SmartClass IOT</h1>
        <p>Monitoramento do ambiente</p>
      </header>

      <main>
        <section className="conexao">
          <div>
            <h2>Status da conexão</h2>

            <p className={conectado ? "online" : "offline"}>
              ● {conectado ? "Arduino conectado" : "Arduino desconectado"}
            </p>
          </div>

          <button onClick={() => setConectado(true)}>
            Conectar Arduino
          </button>
        </section>

        <section className="cards">
          <div className="card">
            <div className="icone">🌡️</div>

            <h2>Temperatura</h2>

            <strong>{temperatura.toFixed(1)} °C</strong>

            <p>Temperatura do ambiente</p>
          </div>

          <div className="card">
            <div className="icone">💡</div>

            <h2>Luminosidade</h2>

            <strong>{luminosidade} %</strong>

            <p>Nível de luminosidade</p>
          </div>

          <div className="card">
            <div className="icone">💧</div>

            <h2>Umidade</h2>

            <strong>{umidade} %</strong>

            <p>Umidade do ambiente</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;