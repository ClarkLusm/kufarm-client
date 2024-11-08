import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export default function TestPage() {
  const [account, setAccount] = useState("");
  useEffect(() => {
    if (window.ethereum) {
      isConnected();
    }
  }, []);

  async function isConnected() {
    const provider = new BrowserProvider((window as any).ethereum!);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
  }

  return (
    <div>
      <p>Account {account}</p>
    </div>
  );
}
