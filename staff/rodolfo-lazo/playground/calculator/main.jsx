const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
  const displayState = useState('0')
  const displayValue = displayState[0]
  const setDisplayValue = displayState[1]

  const handleOneClicked = () => {
    if (displayValue === '0')
      setDisplayValue('1')
    else
      setDisplayValue(displayValue + '1')
  }

  const handleTwoClicked = () => {
    if (displayValue === '0')
      setDisplayValue('2')
    else
      setDisplayValue(displayValue + '2')
  }

  const handleThreeClicked = () => {
    if (displayValue === '0')
      setDisplayValue('3')
    else
      setDisplayValue(displayValue + '3')
  }

  const handleFourClicked = () => {
    if (displayValue === '0')
      setDisplayValue('4')
    else
      setDisplayValue(displayValue + '4')
  }

  const handleFiveClicked = () => {
    if (displayValue === '0')
      setDisplayValue('5')
    else
      setDisplayValue(displayValue + '5')
  }

  const handleSixClicked = () => {
    if (displayValue === '0')
      setDisplayValue('6')
    else
      setDisplayValue(displayValue + '6')
  }

  const handleSevenClicked = () => {
    if (displayValue === '0')
      setDisplayValue('7')
    else
      setDisplayValue(displayValue + '7')
  }

  const handleEightClicked = () => {
    if (displayValue === '0')
      setDisplayValue('8')
    else
      setDisplayValue(displayValue + '8')
  }

  const handleNineClicked = () => {
    if (displayValue === '0')
      setDisplayValue('9')
    else
      setDisplayValue(displayValue + '9')
  }

  const handleZeroClicked = () => {
    if (displayValue !== '0')
      setDisplayValue(displayValue + '0')
  }

  const handleAllClearClicked = () => setDisplayValue('0')

  const handleDivideClicked = () => {
    if (displayValue.at(-1) === '÷') {
      return
    } else {
      setDisplayValue(displayValue + '÷')
    }
  }

  const handleMultiplyClicked = () => {
    if (displayValue.at(-1) === '×') {
      return
    } else {
      setDisplayValue(displayValue + '×')
    }
  }


  const handleSubtractClicked = () => {
    if (displayValue.at(-1) === '-') {
      return
    } else {
      setDisplayValue(displayValue + '-')
    }
  }

  const handleAddClicked = () => {
    if (displayValue.at(-1) === '+') {
      return
    } else {
      setDisplayValue(displayValue + '+')
    }
  }

  const handleCommaClicked = () => {
    //6,5,					error
    //6,2345,				error
    //6,234 + 12,		correcto
    //6,18 + 3,14,	incorrecto
    //6,18 + 458		correcto
    //(-(-(-5)))+(-)	incorreto
    //(-(-(-5))),   incorrecto

    //Si no existe ninguna , puedo agregarla
    //Si el indice de mi ultima coma es mayor al indice de mi ultimo simbolo no puedo agregarla    
    //No puedo poner una coma luego de un paréntesis    

    const lastIndexSuma = displayValue.lastIndexOf('+')
    const lastIndexResta = displayValue.lastIndexOf('-')
    const lastIndexProd = displayValue.lastIndexOf('÷')
    const lastIndexDiv = displayValue.lastIndexOf('×')

    let maximo = Math.max(lastIndexDiv, lastIndexProd, lastIndexResta, lastIndexSuma)

    if ((displayValue.lastIndexOf(',') < maximo || displayValue.lastIndexOf(',') === -1) && displayValue.at(-1) !== ')') {
      setDisplayValue(displayValue + ',')
    }

  }

  const handleSignesClicked = () => {

    if (displayValue.at(-1) === '+' || displayValue.at(-1) === '-' || displayValue.at(-1) === '×' || displayValue.at(-1) === '÷' || displayValue.at(-1) === ',') return

    const indexSuma = displayValue.lastIndexOf('+')
    const indexResta = displayValue.lastIndexOf('-')
    const indexProd = displayValue.lastIndexOf('÷')
    const indexDiv = displayValue.lastIndexOf('×')


    let maximo = Math.max(indexSuma, indexResta, indexProd, indexDiv)

    let prev
    let after

    // Casos:
    // 123 - ( -4,3)
    //123 - 4,3

    if (displayValue.lastIndexOf(')') > maximo) {
      prev = displayValue.slice(0, displayValue.lastIndexOf('('))
      after = displayValue.slice(displayValue.lastIndexOf('(') + 2, -1)      
    } else {
      prev = displayValue.slice(0, maximo + 1)
      after = displayValue.slice(maximo + 1)
      after = '(' + '-' + after + ')'
    }

    setDisplayValue(prev + after)
  }

  const handleResultClicked = () => {
    const operation = displayValue.replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',', '.')

    const result = eval(operation)

    setDisplayValue(String(result).replace('.', ','))
  }

  const handleBackClicked = () => {
    let aux
    if (displayValue.length > 1) {
      aux = displayValue.slice(0, -1)
    } else {
      aux = '0'
    }

    setDisplayValue(aux)
  }

  console.log('App -> render')

  return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
    <div className="flex justify-end px-4 text-3xl">{displayValue}</div>

    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleBackClicked}>⌫</div>
        <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAllClearClicked}>AC</div>
        <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">%</div>
        <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleDivideClicked}>÷</div>
      </div>
      <div className="flex justify-between">
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSevenClicked}>7</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleEightClicked}>8</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleNineClicked}>9</div>
        <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleMultiplyClicked}>×</div>
      </div>
      <div className="flex justify-between">
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFourClicked}>4</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFiveClicked}>5</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSixClicked}>6</div>
        <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSubtractClicked}>-</div>
      </div>
      <div className="flex justify-between">
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleOneClicked}>1</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleTwoClicked}>2</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleThreeClicked}>3</div>
        <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAddClicked}>+</div>
      </div>
      <div className="flex justify-between">
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSignesClicked}>+/-</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleZeroClicked}>0</div>
        <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleCommaClicked}>,</div>
        <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleResultClicked}>=</div>
      </div>
    </div>
  </div>
}