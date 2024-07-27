import { HR, Modal } from 'flowbite-react';

export default function Info() {
  return (
    <div className="h-96">
      <Modal.Header>Security Info</Modal.Header>
      <Modal.Body className="p-2">
        <div className="flex justify-between">
          <div className="w-2/4">
            <div>Name</div>
            <div>BINANCE:BTCUSDT</div>
          </div>
          <div className="w-2/4">
            <div>Description</div>
            <div>Bitcoin / Tether US</div>
          </div>
        </div>
        <HR className="my-0" />
        <div className="flex justify-between">
          <div className="w-2/4">
            <div>
              <div>Type</div>
              <div>Sport crypto</div>
            </div>
            <div>
              <div>Listed exchange</div>
              <div>BINANCE</div>
            </div>
            <div>
              <div>Currency</div>
              <div>USDT</div>
            </div>
          </div>
          <div className="w-2/4">
            <div>
              <div>Point value</div>
              <div>-</div>
            </div>
            <div>
              <div>Exchange</div>
              <div>BINANCE</div>
            </div>
            <div>
              <div>Tick size</div>
              <div>0.01</div>
            </div>
          </div>
        </div>
        <HR className="my-0" />
      </Modal.Body>
    </div>
  );
}
