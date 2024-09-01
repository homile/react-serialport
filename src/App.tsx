import useSerialCommunication from "./hooks/useSerialCommunication";

function App() {
  const { initialize, fetchKioskStatus, readResponse } =
    useSerialCommunication();
  return (
    <>
      <div>
        <h1>serialPort test</h1>
      </div>
      <div>
        <button onClick={initialize}>Open Port</button>
        <button onClick={fetchKioskStatus}>Send Data</button>
      </div>
    </>
  );
}

export default App;
