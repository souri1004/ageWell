import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does AgeWell's AI monitoring work?",
      answer:
        "Our AI system conducts daily check-ins through voice conversations, monitors vital signs, and tracks medication adherence. It learns your loved one's patterns and alerts our team if anything seems unusual.",
    },
    {
      question: "What qualifications do your healthcare professionals have?",
      answer:
        "All our doctors, nurses, physiotherapists, and psychologists are fully licensed and experienced professionals. They undergo additional training in eldercare and our platform protocols.",
    },
    {
      question: "Is AgeWell available in my city?",
      answer:
        "We're currently expanding across major Indian cities. Please contact us to check availability in your area, or join our waitlist for early access.",
    },
    {
      question: "How quickly can you respond to emergencies?",
      answer:
        "Our 24/7 emergency response system connects you to medical professionals within minutes. For critical situations, we coordinate with local emergency services and hospitals.",
    },
    {
      question: "Can family members monitor their loved one's care?",
      answer:
        "Yes! Our Family Dashboard provides real-time updates on health metrics, medication adherence, and care activities. You can also communicate directly with our care team.",
    },
    {
      question: "What if my loved one doesn't like technology?",
      answer:
        "Our interface is designed to be senior-friendly with large buttons, voice commands, and simple navigation. We also provide training and ongoing support to ensure comfort.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="">
        <h2>Frequently Asked Questions</h2>
        <p className="faq-subtitle">
          Everything you need to know about AgeWell's eldercare services
        </p>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${
                  openIndex === index ? "active" : ""
                }`}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="faq-icon">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              <div
                className={`faq-answer ${openIndex === index ? "open" : ""}`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
