import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";
import { JsonRpcSigner } from "ethers";

export const useWallet = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const provider = new BrowserProvider((window as any).ethereum!);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      setSigner(signer);
      setAddress(addr);
    })();
  }, []);

  return {
    signer,
    address,
  };
};
