import {
  HR,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from 'flowbite-react';

export default function Indicator() {
  return (
    <div className="h-96">
      <Modal.Header>Indicators</Modal.Header>
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
          <Table>
            <TableHead>
              <TableHeadCell>Script name</TableHeadCell>
            </TableHead>
            <TableBody className="divide-y">
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  24 hour Volume
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  24 hour Volume
                </TableCell>
              </TableRow>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  24 hour Volume
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Modal.Body>
    </div>
  );
}
