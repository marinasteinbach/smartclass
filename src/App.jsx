import { useState } from "react";
import "./App.css";

function App() {
  const [temperatura, setTemperatura] = useState(0);
  const [luminosidade, setLuminosidade] = useState(0);
  const [umidade, setUmidade] = useState(0);
  const [conectado, setConectado] = useState(false);

  async function conectarArduino() {
    try {
      if (!("serial" in navigator)) {
        alert("Seu navegador não suporta Web Serial.");
        return;
      }

      const porta = await navigator.serial.requestPort();

      await porta.open({
        baudRate: 9600,
      });

      setConectado(true);

      const decodificador = new TextDecoderStream();

      porta.readable.pipeTo(decodificador.writable);

      const leitor = decodificador.readable.getReader();

      let buffer = "";

      while (true) {
        const { value, done } = await leitor.read();

        if (done) {
          break;
        }

        buffer += value;

        const linhas = buffer.split("\n");

        buffer = linhas.pop() || "";

        for (const linha of linhas) {
          tratarLinha(linha.trim());
        }
      }
    } catch (erro) {
      console.error("Erro:", erro);
      setConectado(false);
    }
  }

  function tratarLinha(linha) {
    console.log("Recebido do Arduino:", linha);

    if (!linha) return;

    try {
      const dados = JSON.parse(linha);

      console.log("Dados:", dados);

      setTemperatura(Number(dados.temperatura));
      setUmidade(Number(dados.umidade));
      setLuminosidade(Number(dados.luminosidade));

    } catch (erro) {
      console.log("Não é JSON:", linha);
    }
  }

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
              ●{" "}
              {conectado
                ? "Arduino conectado"
                : "Arduino desconectado"}
            </p>
          </div>

          <button onClick={conectarArduino}>
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

            <strong>{luminosidade}</strong>

            <p>Nível de luminosidade</p>
          </div>

          <div className="card">
            <div className="icone">💧</div>

            <h2>Umidade</h2>

            <strong>{umidade.toFixed(1)} %</strong>

            <p>Umidade do ambiente</p>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;