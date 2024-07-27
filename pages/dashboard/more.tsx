import { Button, Dropdown, DropdownItem, HR, Modal } from 'flowbite-react';
import { useState } from 'react';

import Indicator from './indicator';
import Info from './info';

export default function More() {
  const [indicator, setIndicator] = useState(false);

  const [securityInfo, setSecurityInfo] = useState(false);

  return (
    <div className="mr-3 mt-2">
      <Dropdown dismissOnClick={false} label={undefined} color="light" inline>
        <DropdownItem>
          <Button
            className="border-none bg-transparent"
            color="light"
            onClick={() => setIndicator(true)}
          >
            <svg
              className="size-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
              />
            </svg>
            <div className="ml-2">Add indicator</div>
          </Button>
          <Modal show={indicator} onClose={() => setIndicator(false)}>
            <Indicator />
          </Modal>
        </DropdownItem>
        <DropdownItem>
          <Button
            className="border-none bg-transparent"
            color="light"
            onClick={() => setSecurityInfo(true)}
          >
            <svg
              className="size-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <div className="ml-2">Security Info...</div>
          </Button>
          <Modal show={securityInfo} onClose={() => setSecurityInfo(false)}>
            <Info />
          </Modal>
        </DropdownItem>
        <DropdownItem className="pl-8">
          <svg
            className="mr-2 size-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z" />
          </svg>
          <Dropdown inline label="Visual order" placement="right-start">
            <Dropdown.Item>Bring to front</Dropdown.Item>
            <Dropdown.Item>Send to back</Dropdown.Item>
            <Dropdown.Item>Bring forward</Dropdown.Item>
            <Dropdown.Item>Send backward</Dropdown.Item>
          </Dropdown>
        </DropdownItem>
        <DropdownItem className="pl-8">
          <svg
            className="mr-2 size-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M12.832 3.445a1 1 0 0 0-1.664 0l-4 6A1 1 0 0 0 8 11h8a1 1 0 0 0 .832-1.555l-4-6Zm-1.664 17.11a1 1 0 0 0 1.664 0l4-6A1 1 0 0 0 16 13H8a1 1 0 0 0-.832 1.555l4 6Z"
              clip-rule="evenodd"
            />
          </svg>
          <Dropdown inline label="Move to" placement="right-start">
            <Dropdown.Item>New pane above</Dropdown.Item>
            <Dropdown.Item>Existng pane below</Dropdown.Item>
            <Dropdown.Item>New pane below</Dropdown.Item>
          </Dropdown>
        </DropdownItem>
        <DropdownItem className="pl-8">
          <svg
            className="mr-2 size-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7H7m2 3H7m2 3H7m4 2v2m3-2v2m3-2v2M4 5v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-9a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1Z"
            />
          </svg>
          <Dropdown
            inline
            label="Pin to scale (now right)"
            placement="right-start"
          >
            <Dropdown.Item>Pinned to right scale</Dropdown.Item>
            <Dropdown.Item>Pin to new right scale</Dropdown.Item>
            <HR className="my-0" />
            <Dropdown.Item>Pin to new left scale</Dropdown.Item>
            <HR className="my-0" />
            <Dropdown.Item>No scale(fullscreen) </Dropdown.Item>
          </Dropdown>
        </DropdownItem>
        <DropdownItem className="pl-8">
          <svg
            className="mr-2 size-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3.933 13.909A4.357 4.357 0 0 1 3 12c0-1 4-6 9-6m7.6 3.8A5.068 5.068 0 0 1 21 12c0 1-3 6-9 6-.314 0-.62-.014-.918-.04M5 19 19 5m-4 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
          <div>Hide</div>
        </DropdownItem>
      </Dropdown>
    </div>
  );
}
