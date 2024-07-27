import { Button, Navbar, NavbarLink } from "flowbite-react";

export default function About() {
  const statistic = [
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/user2.svg",
      properties: "Username:",
      value: "pthanhhumg",
    },
    {
      id: "2",
      image: "https://kufarm.io/static/kufarm/layers.svg",
      properties: "Mining power:",
      value: "1 TH/S",
    },
    {
      id: "3",
      image: "https://kufarm.io/static/kufarm/wallet3.svg",
      properties: "Your BTC wallet:",
      value: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    },
    {
      id: "4",
      image: "https://kufarm.io/static/kufarm/btc2.svg",
      properties: "Your Balance:",
      value: "Your Balance:",
    },
    {
      id: "5",
      image: "https://kufarm.io/static/kufarm/btc2.svg",
      properties: "Your Referral Balance:",
      value: "0$",
    },
  ];

  const miner = [
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer Z9 MINI:",
      value: "0",
    },
    {
      id: "21",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer S9K:",
      value: "0",
    },
    {
      id: "3",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer T17:",
      value: "0",
    },
    {
      id: "4",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer S17 Pro:",
      value: "0",
    },
    {
      id: "5",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer S17 E-Series:",
      value: "0",
    },
    {
      id: "6",
      image: "https://kufarm.io/static/kufarm/chart.svg ",
      properties: "Antminer S19 PRO+ Hyd:",
      value: "0",
    },
  ];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const mining_statistic = [
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/chart.svg",
      properties: "Main mining pool:",
      value: "stratum+tcp://sha256d.kupool.com:443",
    },
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/bril.svg",
      properties: "DAILY Ƀ:",
      value: "+0.00000183300 BITCOIN",
    },
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/time2.svg",
      properties: "MONTHLY Ƀ:",
      value: "+0.00005499000 BITCOIN",
    },
    {
      id: "1",
      image: "https://kufarm.io/static/kufarm/time2.svg",
      properties: "Mining power:",
      value: "1 TH/S",
    },
  ];

  return (
    <div className="container m-auto pt-24">
      <div className="mb-10 rounded-2xl shadow-2xl">
        <div className="mb-5 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">Mining Statistic:</div>
          {mining_statistic.map((ms) => (
            <div className="mb-2 flex" key={ms.id}>
              <img className="size-6" src={ms.image} />
              <div className="ml-2 font-medium">
                {ms.properties}
                <span className="ml-2 text-gray-500">{ms.value}</span>
              </div>
            </div>
          ))}
          <div className="my-6 h-5 w-full rounded-xl bg-slate-300 text-transparent mining-line"></div>
          <div className="my-6 text-center">
            <span className="text-xl font-medium">
              0.000059501281736108 BTC
            </span>
          </div>
        </div>
        <div className="rounded-b-xl border">
          <iframe
            src='https://s.tradingview.com/widgetembed/?hideideas=1&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22frameElementId%22%3A%22tradingview_7763e%22%2C%22interval%22%3A%22240%22%2C%22hide_side_toolbar%22%3A%221%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22watchlist%22%3A%22BINANCE%3ABTCUSDT%5Cu001fBINANCE%3AETHUSDT%22%2C%22details%22%3A%221%22%2C%22calendar%22%3A%221%22%2C%22hotlist%22%3A%221%22%2C%22studies%22%3A%22STD%3BSMA%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUtc%22%2C%22show_popup_button%22%3A%221%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BINANCE%3ABTCUSDT%22%2C%22page-uri%22%3A%22kufarm.com%2Faccounts%2Fmain%2F%22%7D'
            className="h-[400px] w-full"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="mr-7 w-8/12 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">
            Dashboard Statistic:
          </div>
          {statistic.map((s) => (
            <div className="mb-5 flex" key={s.id}>
              <img className="size-6" src={s.image} alt="" />
              <div className="ml-2 font-medium">
                {s.properties}
                <span className="ml-2 text-gray-500">{s.value}</span>
              </div>
            </div>
          ))}
          <Navbar className="flex w-4/6 list-none bg-transparent">
            <NavbarLink href="#">
              <Button color="success" className="h-12 w-44 items-center">
                <img src="https://kufarm.io/static/kufarm/refresh.svg" alt="" />
                <div className="ml-2 font-medium text-white">
                  Refresh balance
                </div>
              </Button>
            </NavbarLink>
            <NavbarLink href="#">
              <Button color="success" className="h-12 w-44 items-center">
                <img
                  src="https://kufarm.io/static/kufarm/credit-card.svg"
                  alt=""
                />
                <div className="ml-2 font-medium text-white">Withdrawal</div>
              </Button>
            </NavbarLink>
            <NavbarLink href="#">
              <Button color="warning" className="h-12 w-44 items-center">
                <img
                  src="https://kufarm.io/static/kufarm/credit-card.svg"
                  alt=""
                />
                <div className="ml-2 font-medium text-white">Referal</div>
              </Button>
            </NavbarLink>
          </Navbar>
        </div>
        <div className="w-4/12 rounded-2xl bg-slate-100 p-10">
          <div className="mb-5 text-2xl font-semibold">Dashboard Miners:</div>
          {miner.map((m) => (
            <div className="mb-5 flex" key={m.id}>
              <img className="size-6" src={m.image} alt="" />
              <div className="ml-2 font-medium">
                {m.properties}
                <span className="ml-2 text-gray-500">{m.value}</span>
              </div>
            </div>
          ))}
          <Navbar className="-ml-4 flex w-4/6 list-none bg-transparent">
            <NavbarLink href="#">
              <Button color="success" className="h-12 w-44 items-center">
                <img
                  src="https://kufarm.io/static/kufarm/cart-icon.svg"
                  alt=""
                />
                <div className="ml-2 font-medium text-white">Buy more TH/S</div>
              </Button>
            </NavbarLink>
          </Navbar>
        </div>
      </div>
    </div>
  );
}
