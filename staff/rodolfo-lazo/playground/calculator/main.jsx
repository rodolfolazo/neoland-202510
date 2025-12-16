const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
//const useState = React.useState();

function App() {
  return (
    <div className="border border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
      <div className="flex justify-end px-2 text-white mb-4 text-3xl">0</div>
      <div className="p-2">
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            ⌫
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            AC
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            %
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            ÷
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            7
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            8
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            9
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            ×
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            4
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            5
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            6
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            -
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            1
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            2
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            3
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            +
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            +/-
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            0
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center">
            ,
          </div>
          <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center bg-orange-400">
            =
          </div>
        </div>
      </div>
    </div>
  );
}

root.render(<App />);
