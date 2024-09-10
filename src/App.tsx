import { useState } from 'react';
import useSerialCommunication from './hooks/useSerialCommunication';

function App() {
  const [amount, setAmount] = useState({
    1000: 0,
    5000: 0,
    10000: 0,
    50000: 0,
  });

  const { initialize, fetchKioskStatus, emitBills, clearTallies } =
    useSerialCommunication();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAmount((prev) => ({ ...prev, [name]: parseInt(value) }));
  };

  return (
    <>
      <div>
        <h1>serialPort test</h1>
      </div>
      <div>
        <label>천원</label>
        <input
          type="number"
          name="1000"
          placeholder="방출매수"
          defaultValue={0}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label>오천원</label>
        <input
          type="number"
          name="5000"
          placeholder="방출매수"
          defaultValue={0}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label>만원</label>
        <input
          type="number"
          name="10000"
          placeholder="방출매수"
          defaultValue={0}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <label>오만원</label>
        <input
          type="number"
          name="50000"
          placeholder="방출매수"
          defaultValue={0}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <button onClick={initialize}>Open Port</button>
        <button onClick={fetchKioskStatus}>Send Data</button>
        <button onClick={() => emitBills(amount)}>emit Data</button>
        <button onClick={clearTallies}>Clear Tallies(끼였을 경우 사용)</button>
      </div>
    </>
  );
}

export default App;
