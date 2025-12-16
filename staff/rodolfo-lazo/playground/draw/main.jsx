const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

function WazowskiEye() {
  return (
    <div class="w-30 h-30 bg-white absolute left-15 top-10 rounded-full">
      <div class="w-10 h-10 bg-[darkblue] absolute left-10 top-10 rounded-full"></div>
    </div>
  );
}

function WazowskiMouth() {
  return <div class="w-30 h-5 bg-black absolute left-15 bottom-10"></div>;
}

function WazowskiHead() {
  return (
    <div class="w-60 h-60 bg-[yellowgreen] absolute rounded-full p-10">
      <WazowskiEye />
      <WazowskiMouth />
    </div>
  );
}

function PigEyeLeft() {
  return (
    <div class="w-40 h-40 bg-white absolute left-5 top-5">
      <div class="w-20 h-20 bg-black absolute left-10 top-10"></div>
    </div>
  );
}

function PigEyeRight() {
  return (
    <div class="w-40 h-40 bg-white absolute right-5 top-5">
      <div class="w-20 h-20 bg-black absolute left-10 top-10"></div>
    </div>
  );
}

function PigNose() {
  return (
    <div class="w-50 h-30 bg-[palevioletred] absolute left-25 top-50">
      <div class="w-10 h-10 bg-black absolute left-10 top-10"></div>
      <div class="w-10 h-10 bg-black absolute right-10 top-10"></div>
    </div>
  );
}

function PigMouth() {
  return <div class="w-30 h-10 bg-black absolute left-35 bottom-5"></div>;
}

function PigEarLeft() {
  return <div class="w-10 h-40 bg-pink-300 absolute -left-10"></div>;
}

function PigEarRight() {
  return <div class="w-10 h-40 bg-pink-300 absolute -right-10"></div>;
}

function PigHead() {
  return (
    <div class="w-100 h-100 bg-pink-300 absolute left-100 top-100">
      <PigEyeLeft />
      <PigEyeRight />

      <PigNose />

      <PigMouth />

      <PigEarLeft />
      <PigEarRight />
    </div>
  );
}

function FrontSpaceShip() {
  return (
    <div class="w-50 h-100 bg-[lightgray] absolute left-0 -top-50 rounded-full"></div>
  );
}

function WindowSpaceShip() {
  return (
    <div class="w-30 h-15 bg-[aqua] absolute left-10 -top-20 rounded-tl-3xl rounded-tr-3xl"></div>
  );
}

function TailSpaceShip() {
  return <div class="w-10 h-40 bg-gray-600 absolute top-10 left-20"></div>;
}

function WingsSpaceShip() {
  return (
    <div class="w-[37.5rem] h-0 bg-transparent absolute -left-50 bottom-0 border-t-[10rem] border-t-transparent border-b-[12.5rem] border-b-[lightgray] border-l-[12.5rem] border-l-transparent border-r-[12.5rem] border-r-transparent">
      <TailSpaceShip />
    </div>
  );
}

function FireSpaceShip() {
  return (
    <div class="w-40 h-60 bg-[tomato] absolute left-15 bottom-20 rounded-full z-10"></div>
  );
}

function EngineSpaceShip() {
  return (
    <div class="w-70 h-100 bg-[gold] absolute -left-10 -bottom-50 rounded-full -z-10">
      <FireSpaceShip />
    </div>
  );
}

function BodySpcaeShip() {
  return (
    <div class="w-50 h-100 bg-[lightgray] absolute left-100 top-300"></div>
  );
}

function SpaceShip() {
  return (
    <div class="w-50 h-100 bg-[lightgray] absolute left-100 top-300">
      <FrontSpaceShip />
      <WindowSpaceShip />
      <WingsSpaceShip />
      <EngineSpaceShip />
    </div>
  );
}

//root.render(<WazowskiHead />)
//root.render([<WazowskiHead />, <PigHead />])
//root.render([<WazowskiHead />, <PigHead />, <SpaceShip />])
root.render(<SpaceShip />);
