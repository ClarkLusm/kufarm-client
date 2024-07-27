import {
  HR,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Tabs,
  TextInput,
} from 'flowbite-react';

export default function Symbolsearch() {
  const list = [
    {
      id: '1',
      title: 'All',
      symbol: 'XAUUSD',
      decription: 'GOLD',
      sources: 'commodity cfd',
    },
    {
      id: '2',
      title: 'Stocks',
    },
    {
      id: '3',
      title: 'Fund',
      symbol: 'XAUUSD',
      decription: 'GOLD',
      sources: 'commodity cfd',
    },
    {
      id: '4',
      title: 'Futures',
    },
    {
      id: '5',
      title: 'CDF',
      symbol: 'XAUUSD',
      decription: 'GOLD',
      sources: 'commodity cfd',
    },
    {
      id: '6',
      title: 'Crypto',
    },
    {
      id: '7',
      title: 'Indices',
      symbol: 'XAUUSD',
      decription: 'GOLD',
      sources: 'commodity cfd',
    },
    {
      id: '8',
      title: 'Bond',
    },
    {
      id: '9',
      title: 'Option',
      symbol: 'XAUUSD',
      decription: 'GOLD',
      sources: 'commodity cfd',
    },
  ];

  return (
    <div className="h-96">
      <Modal.Header>Symbol Search</Modal.Header>
      <Modal.Body className="p-2">
        <div className="flex items-center">
          <TextInput
            id="search"
            type="text"
            placeholder="Search"
            className="w-full border-none bg-transparent"
          />
        </div>
        <HR className="my-2" />
        <div>
          <Tabs aria-label="Default tabs" variant="default">
            {list.map((l) => (
              <Tabs.Item title={l.title} key={l.id}>
                <Table>
                  <TableHead>
                    <TableHeadCell>SYMBOL</TableHeadCell>
                    <TableHeadCell>DECRIPTION</TableHeadCell>
                    <TableHeadCell>All sources</TableHeadCell>
                  </TableHead>
                  <TableBody className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {l.symbol}
                      </TableCell>
                      <TableCell>{l.decription}</TableCell>
                      <TableCell>{l.sources}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Tabs.Item>
            ))}
          </Tabs>
        </div>
      </Modal.Body>
    </div>
  );
}
