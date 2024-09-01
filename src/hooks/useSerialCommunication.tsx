import { useEffect, useState } from "react";

function useSerialCommunication() {
  const [port, setPort] = useState();

  const initialize = async () => {
    try {
      //@ts-ignore
      const port = await navigator.serial.requestPort();
      setPort(port);
      await port.open({ baudRate: 9600, parity: "even" });
      console.log("Port opened successfully:", port);
    } catch (err) {
      console.error("포트 연결 실패:", err);
    }
  };

  /** ** 명령어 전송 ** */
  async function sendCommandToSerialPort(commandBuffer: Uint8Array) {
    if (!port) {
      console.error("Port is not initialized");
      return;
    }
    try {
      //@ts-ignore
      const writer = await port.writable.getWriter();
      console.log("Sending command:", commandBuffer);
      await writer.write(commandBuffer);
      await writer.releaseLock();
      console.log("Command sent successfully");
    } catch (err) {
      console.error("Failed to send command:", err);
    }
  }

  /** 상태 조회 ** */
  const fetchKioskStatus = async () => {
    const commandBuffer = new Uint8Array([104, 101, 108, 108, 111]);
    try {
      console.log("명령어 전송");
      await sendCommandToSerialPort(commandBuffer);
      await readResponse(); // 명령어 전송 후 readResponse 호출
    } catch (err) {
      console.error(err);
    }
  };

  /** ** 응답 수신 ** */
  const readResponse = async () => {
    if (!port) return;
    //@ts-ignore
    const reader = port.readable.getReader();
    console.log("응답 수신: ", port, reader);

    let RecvComBuffer: Array<number> = [];
    let RS232_RXStep = 0;

    try {
      while (true) {
        const { value, done } = await reader.read();
        console.log("Read result:", { value, done });
        if (done) {
          console.log("Done reading");
          break;
        }
        if (value) {
          console.log("Received value:", value);
          // 여기서 수신된 값을 처리합니다.
          // value.forEach(processValue);
        }
      }
    } catch (err) {
      console.log(`시리얼 통신 에러:: 응답 수신 에러 ${err}`);
    } finally {
      await reader.releaseLock();
      console.log("Reader lock released");
    }
  };

  useEffect(() => {
    if (port) {
      console.log("port 연결:", port);
    } else {
      console.log("port 연결 실패:", port);
    }
  }, [port]);

  return {
    readResponse,
    fetchKioskStatus,
    initialize,
  };
}

export default useSerialCommunication;