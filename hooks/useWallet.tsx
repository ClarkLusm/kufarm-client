import { useEffect, useState } from "react";
import { BrowserProvider, JsonRpcSigner } from "ethers";

export const useWallet = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState(0);

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      (async () => {
        const provider = new BrowserProvider((window as any).ethereum!);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        const network = await provider.getNetwork();
        setSigner(signer);
        setChainId(Number(network.chainId));
        setAddress(addr);
      })();
    }
  }, []);

  return {
    signer,
    chainId,
    address,
  };
};
