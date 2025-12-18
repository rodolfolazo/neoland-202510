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
    //Si hay un signo 
    const arraySignos = []

    const indexSuma = displayValue.lastIndexOf('+')
    arraySignos.push(indexSuma)
    const indexResta = displayValue.lastIndexOf('-')
    arraySignos.push(indexResta)
    const indexProd = displayValue.lastIndexOf('÷')
    arraySignos.push(indexProd)
    const indexDiv = displayValue.lastIndexOf('×')
    arraySignos.push(indexDiv)


    let max1 = arraySignos[0];

    for (let n of arraySignos) {
      if (n > max1) max1 = n;
    }

    if (displayValue.lastIndexOf(',')< max1 || displayValue.lastIndexOf(',')===-1){
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

    let prev = displayValue.slice(0,maximo+1)
    let after = displayValue.slice(maximo+1)    
    after = '(' + '-' + after + ')'

    setDisplayValue(prev + after)
  }

  const handleResultClicked = () => {
    const operation = displayValue.replaceAll('÷', '/').replaceAll('×', '*').replaceAll(',', '.')

    const result = eval(operation)

    setDisplayValue(String(result))
  }

  console.log('App -> render')

  return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
    <div className="flex justify-end px-4 text-3xl">{displayValue}</div>

    <div className="p-2 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">⌫</div>
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