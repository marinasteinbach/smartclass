function App() {
  const botaoConectar = document.querySelector('#conectar');
  const campoTemperatura = document.querySelector('#temperatura');
  const campoLuminosidade = document.querySelector('#luminosidade');

  botaoConectar.addEventListener('click', conectarArduino);
  async function conectarArduino(){
    const porta = await navigator.serial.requestPort();
    await porta.open ({ baudRate: 9600});
    const decodificador = new TextDecoderStream();
    porta.readable.pipeTo(decodificador.writable);
    const leitor = decodificador.readable.getReader();
    let buffer = '';
    while (true) {
        const { value, done } = await leitor.read();
        if (done) break;
        buffer += value;
        const linhas = buffer.split('\n');
        buffer = linhas.pop();
        for (const linha of linhas) {
            tratarLinha(linha.trim());
        }
    }
  }
}
 function tratarLinha(linha){
    if (!linha) return;
    try{ 
        const dados = JSON.parse(linha);
        campoTemperatura.textContent = dados.temperatura;
        campoLuminosidade.textContent = dados.luminosidade;
    } catch (erro) {
        console.log('Linha ignorada:', linha);
    }
 }