import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { Checkbox, Modal } from "flowbite-react";
import { useSession } from "next-auth/react";
import axios from "axios";

export const NotifyModal = () => {
  const session = useSession();
  const [notify, setNotify] = useState<Notify | null>(null);

  useEffect(() => {
    const shownNotify = getCookie("shownNotify");
    if (!shownNotify) {
      axios
        .get(`${process.env.API_URL}/api/app-notify`, {
          headers: {
            Authorization: `Bearer ${session?.data?.accessToken}`,
          },
        })
        .then((res) => res.data)
        .then((data) => {
          if (data) {
            setTimeout(() => {
              setNotify(data);
            }, (data?.condition?.delay ?? 0) * 1000);
          }
        })
        .catch((e) => console.error(e));
    }
  }, []);

  return (
    <Modal
      className="notify-modal"
      show={!!notify}
      onClose={() => setNotify(null)}
    >
      <Modal.Header className="notify-modal-header border-0">
        {notify?.title}
      </Modal.Header>
      <Modal.Body>
        <div
          dangerouslySetInnerHTML={{ __html: notify?.description ?? "" }}
          className="mb-4"
        />
        <div className="text-slate-400 text-base flex items-center">
          <Checkbox
            onChange={(e) => setCookie("shownNotify", e.target.checked)}
          />{" "}
          <span className="ml-2">Không hiển thị lại</span>
        </div>
      </Modal.Body>
    </Modal>
  );
};
