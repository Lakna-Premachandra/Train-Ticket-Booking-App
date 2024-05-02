import React from "react";
import { PiTrainSimpleBold } from "react-icons/pi";
import "./style.scss";

const Footer = () => (
    <footer className="page-footer font-small blue pt-4 footer mt-auto">
        <div style={{ maxWidth: 1200 }} className="container-fluid text-center text-md-left">
            <div className="flex justify-center">
                <div className="col-md-6 mt-md-0 mt-3 flex items-center flex-col">
                    <img width={90} src="src/assets/images/Auckland_transport_train_logo.png" alt="" />
                    <h5 className="text-uppercase my-[1rem]">Sri Lanka Railway</h5>
                    <p>
                        Sri Lanka Railway is the national railway of Sri Lanka. Here you
                        can find information about our services and operations.
                    </p>
                </div>
            </div>
        </div>
        <div className="footer-copyright text-center py-3">
            © {new Date().getFullYear()} Sri Lanka Railway
        </div>
    </footer>
);
export default Footer;
