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

  const handleDivideClicked = () => setDisplayValue(displayValue + '÷')

  const handleMultiplyClicked = () => setDisplayValue(displayValue + '×')

  const handleSubtractClicked = () => setDisplayValue(displayValue + '-')

  const handleAddClicked = () => setDisplayValue(displayValue + '+')

  const handleCommaClicked = () => {
    //6,5,					error
    //6,2345,				error
    //6,234 + 12,		correcto
    //6,18 + 3,14,	incorrecto
    //6,18 + 458		correcto

    //Si no existe ninguna , puedo agregarla
    //Si el indice de mi ultima coma es mayor al indice de mi ultimo simbolo no puedo agregarla
    //Si el indice de mi ulitimo simbolo es superior a mi ultima coma, puedo agregar

    const arraySignos = []

    const indexSuma = displayValue.lastIndexOf('+')
    arraySignos.push(indexSuma)
    const indexResta = displayValue.lastIndexOf('-')
    arraySignos.push(indexResta)
    const indexProd = displayValue.lastIndexOf('÷')
    arraySignos.push(indexProd)
    const indexDiv = displayValue.lastIndexOf('×')
    arraySignos.push(indexDiv)

    //Determinar el mayor índice
    let maximo = arraySignos[0];
    for (let n of arraySignos) {
      if (n > maximo) maximo = n;
    }

    if ((displayValue.lastIndexOf(',') < maximo || displayValue.lastIndexOf(',') === -1) && displayValue.at(-1) !== ')') {
      setDisplayValue(displayValue + ',')
    }

  }

  const handleSignesClicked = () => {
    let arr = []

    const indexSuma = displayValue.lastIndexOf('+')
    arr.push(indexSuma)
    const indexResta = displayValue.lastIndexOf('-')
    arr.push(indexResta)
    const indexProd = displayValue.lastIndexOf('÷')
    arr.push(indexProd)
    const indexDiv = displayValue.lastIndexOf('×')
    arr.push(indexDiv)

    let maximo = arr[0];

    for (let n of arr) {
      if (n > maximo) maximo = n;
    }

    let prev = displayValue.slice(0, maximo + 1)
    let after = displayValue.slice(maximo + 1)
    after = '(' + '-' + after + ')'

    setDisplayValue(prev + after)
  }

  const handleResultClicked = () => {
    const operation = displayValue.replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',', '.')

    const result = eval(operation)

    setDisplayValue(String(result))
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