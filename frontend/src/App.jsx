import { useState } from 'react'
import './App.css'

function App() {
  const [number, setNumber] = useState(""); 
  const[result, setResult] = useState([]);
  const[error, setError] = useState("");
  const[loading, setLoading] = useState(false); 

  function validasiAngka(value){
    if(value === "") {
      return "Input angka tidak boleh kosong, Silahkan diisi."; 
    }

    for(let i=0; i<value.length; i++) {
      if(value[i] < "0" || value [i] > "9") {
        return "Input harus berupa angka, tidak boleh minus ataupun koma."; 
      } 
    }

    if(!Number.isSafeInteger(Number(value))) {
      return "Angka yang di input terlalu besar."; 
    }
    return null; 
  }

  async function handleGenerate(type) {
    setError("");
    setResult([]);
    const validationError = validasiAngka(number);

    if(validationError) {
      setError(validationError);
      return; 
    }
    try {
      setLoading(true); 
      const response = await fetch(`http://localhost:5001/api/generate/${type}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ number: Number(number) })
        } 
      );
      const data = await response.json();
      if(!response.ok){
        throw new Error(data.error || "Terjadi kesalahan saat memproses permintaan.");
      }
      setResult(data.result);
    } catch (error) {
      setError(error.message || "Backend belum terhubung.");
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="container"> 
    <input type = "text"
      placeholder="Input Angka"
      value={number}
      onChange={(e) => setNumber(e.target.value)}
    /> 

    <div className="buttons">
      <button onClick={() => handleGenerate("segitiga")}> Generate Segitiga</button>
      <button onClick={() => handleGenerate("ganjil")}> Generate Bilangan Ganjil</button>
      <button onClick={() => handleGenerate("prima")}> Generate Bilangan Prima</button>
    </div>

    <h2>Result:</h2> 
    {loading && <p>Loading..</p>}
    {error && <p className="error">{error}</p>} 

    <div className="result">
      {result.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div> 
    </div>
  );
}

export default App
