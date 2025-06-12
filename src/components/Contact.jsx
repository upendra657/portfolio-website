import React, { useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Header from "./Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from '../theme/ThemeContext.jsx'; // Adjusted import path
import { Fade } from "react-awesome-reveal";

const Contact = (props) => {
    const { header } = props;
    const { theme } = useTheme();
    const formRef = useRef(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          console.log("Sending email with data:", form);
          await emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            form,
            process.env.REACT_APP_EMAILJS_PUBLIC_KEY
          );
      
          setForm({ name: "", email: "", enquiry: "General enquiry", message: "" });
        } catch (error) {
          console.error("EmailJS Error:", error);
        } finally {
          setLoading(false);
        }
      };

    return (
        <div id="/contact">
            <Header title={header} />

            <div className="contact-container">
                <Fade direction="left" duration={2000} cascade damping={1e3} triggerOnce>
                    <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                        <input type="text" name="name" placeholder="Name" required onChange={handleChange} value={form.name} />
                        <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={form.email}/>
                        <select name="enquiry" id="enquiry" onChange={handleChange} value={form.enquiry || 'General enquiry'}>
                            <option>General enquiry</option>
                            <option>Feedback</option>
                            <option>Hire Me</option>
                        </select>
                        <textarea
                            name="message"
                            id="message"
                            cols="30"
                            rows="5"
                            placeholder="Message"
                            onChange={handleChange}
                            value={form.message}
                        ></textarea>
                        <button
                            style={{
                                cursor: "pointer",
                                backgroundColor: "black", color: "white",
                                padding: "10px 20px",
                                fontWeight: "bold",
                                margin: "0px",
                                border: "none",
                                borderRadius: "5px",
                                fontSize: "small",
                                justifyItems: "center"
                            }} type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                    </form>
                </Fade>
                <div className="contactText">
                    <Fade direction="right" duration={2000} cascade damping={1e3} triggerOnce>
                        <div>
                            <p className="contact-text">
                                I am always interested in discussing new projects or
                                opportunities. If you have any questions or would like to get in touch, please feel free to reach out to me.
                            </p>
                        </div>
                    </Fade>
                    <div className="contact-links">
                        <Fade direction="up" duration={3000} cascade damping={1e3}>
                            <a
                                className="contact-link"
                                href="https://github.com/upendra657"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faGithub}
                                    style={{ color: theme.socialIconBgColor }} />
                            </a>
                        </Fade>
                        <Fade direction="up" duration={3000} delay={500} cascade damping={1e3}>
                            <a
                                className="contact-link"
                                href="https://www.linkedin.com/in/upendra-sharma-21783a1a9/"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faLinkedin}
                                    style={{ color: theme.socialIconBgColor }} />
                            </a>
                        </Fade>
                        <Fade direction="up" duration={3000} delay={1000} cascade damping={1e3}>
                            <a
                                className="contact-link"
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=sharmaupendra657@gmail.com&su=Hello&body=Hello, I would like to discuss a project with you."
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faEnvelope}
                                    style={{ color: theme.socialIconBgColor }} />
                            </a>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Contact;