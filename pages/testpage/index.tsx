import { useWallet } from "@/hooks/useWallet";

export default function TestPage() {
  const { address, signer, chainId } = useWallet();

  return (
    <div>
      <p>Account {address}</p>
      <p>ChainId {chainId}</p>
    </div>
  );
}
