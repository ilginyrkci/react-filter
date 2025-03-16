

function App() {
  const [count, setCount] = useState(0)
  const [step, setStep ] = useState(1)

    function checkStepApprove(e){
      e.preventDefault();
      if(step !== 1){
        setStep(step -1)
      }else{
        alert("Step zaten en küçük değerde")
      }

    }
  return (
    <>
      <div>
        <p>{step} Basamak sayısı</p>
        <button onClick={() => setStep(step +1 )}>Basamak Arttır</button>
        <button onClick={checkStepApprove}>Basamak Arttır</button>
        <hr />
        <p>{count}</p>
        <button onClick={() => setCount(count + step )}>Arttır</button>
        <button onClick={() => setCount(count - step )}>Azalt</button>
      </div>
    </>
  )
}

export default App
