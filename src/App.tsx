import useSerialCommunication from './hooks/useSerialCommunication';

function App() {
  const { initialize, fetchKioskStatus, emitBills } = useSerialCommunication();
  return (
    <>
      <div>
        <h1>serialPort test</h1>
      </div>
      <div>
        <button onClick={initialize}>Open Port</button>
        <button onClick={fetchKioskStatus}>Send Data</button>
        <button onClick={emitBills}>emit Data</button>
      </div>
    </>
  );
}

export default App;
