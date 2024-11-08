import { useWallet } from "@/hooks/useWallet";

export default function TestPage() {
  const { address, signer } = useWallet();

  return (
    <div>
      <p>Account {address}</p>
    </div>
  );
}
