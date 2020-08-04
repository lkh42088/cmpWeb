import React, {useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import {checkCaptcha} from "../../../../lib/api/login";
import {SITE_KEY} from "../../../../lib/api/client";

const GoogleRecaptcha = (props) => {
    const recaptchaRef = React.createRef();
    const {visible, setCaptchaOk} = props;

    const axiosCaptcha = async (value) => {
        try {
            const response = await checkCaptcha({humanKey: value});
            if (response.data.includes("true")) {
                return true;
            }
        } catch {
            console.log("ReCAPCHA verifing failed");
            recaptchaRef.current.reset();
        }
        return false;
    };

    // Chaptcha is successfully
    const handleChange = (value) => {
        if (axiosCaptcha(value)) {
            setCaptchaOk(true);
        }
    };
    
    // Chaptcha is errored
    const handleErrored = (value) => {
        console.log("Captcha Error:", value);
    };

    useEffect(() => {
        recaptchaRef.current.reset();
    }, []);

    return (
        <div
            style={{
                paddingLeft: "50px",
                display: visible ? "block" : "none",
            }}
        >
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={SITE_KEY}
                    onChange={handleChange}
                    onErrored={handleErrored}
                />
        </div>
    );
};

export default GoogleRecaptcha;
