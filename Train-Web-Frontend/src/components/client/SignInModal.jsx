import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

function SignInModal() {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <div className="bg-[#094273] p-4 flex flex-col gap-2 rounded-lg ">
          {/* <Modal.Header> */}
          <Modal.Title className="text-white">
            Please login to proceed!
          </Modal.Title>
          {/* </Modal.Header> */}
          {/* <Modal.Body className="text-white"> */}
          <h4 className="text-white text-[1rem] font-[200]">
            You need to login in order to proceed with the ticket allocation!
          </h4>
          {/* </Modal.Body> */}
          {/* <Modal.Footer> */}
          <Link
            className="rounded-md w-full text-center p-2 px-10 bg-[#ffdc00] text-black no-underline hover:bg-yellow-100 transition-all ease-in-out"
            to={"/signin?redirectUrl=/proceed"}
          >
            Goto Signin
          </Link>
          {/* </Modal.Footer> */}
        </div>
      </Modal>
    </>
  );
}

export default SignInModal;
