//Defino Elemento donde renderizaré mi app
const rootElement = document.getElementById('root')
const root = ReactDOM.createRoot(rootElement)
root.render(<App />);

//Importo Hook
const useState = React.useState

//Función Principal
function App() {
  
  const displayState = useState('0')
  const displayValue = displayState[0]
  const setDisplayValue = displayState[1]

  const helpState = useState(null)
  const helpValue = helpState[0]
  const setHelpValue = helpState[1]


  const handleNumberClicked = (num) => {
    let aux 
    let operation
    if (num === 'AC'){
      aux = '0'
    }else if (num === '⌫'){      
      if (displayValue.length>1){
        aux = displayValue.slice(0,-1)
      }else{
        aux = '0'
      }      
    }else if (displayValue === '0'){
      aux = num
    }else if(num === '+'){
      setHelpValue(displayValue+'+')      
      aux = '0'
    }else if(num === '='){
      aux = String(Number(helpValue.slice(0,-1))+Number(displayValue))
      setHelpValue(null)
    }else{
      aux = displayValue + num
    }

    setDisplayValue(aux)
    
  }

  return (
    <div className="border border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
      <div className="h-3 flex justify-end px-2 text-stone-500 text-lg">{helpValue}</div>
      <div className="flex justify-end px-2 text-white mb-4 text-3xl mt-6">{displayValue}</div>
      <div className="p-2">
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('⌫')}>
            ⌫
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('AC')}>
            AC
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('+')}>
            %
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            ÷
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('7')}>
            7
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('8')}>
            8
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('9')}>
            9
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            ×
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('4')}>
            4
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('5')}>
            5
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('6')}>
            6
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            -
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('1')}>
            1
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('2')}>
            2
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('3')}>
            3
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400" onClick={() => handleNumberClicked('+')}>
            +
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            +/-
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center" onClick={() => handleNumberClicked('0')}>
            0
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            ,
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400" onClick={() => handleNumberClicked('=')}>
            =
          </div>
        </div>
      </div>
    </div>
  );
}


