import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

// Define the type for FAQ data
interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
    {
      question: "How much does the service cost?",
      answer: "We offer competitive pricing based on the complexity and scope of the project. We provide a free consultation to understand your needs and give you a customized quote. We understand that cost is a concern, and we strive to offer fair pricing for high-quality work. Many customers find that our service saves them time and money in the long run, making it a worthwhile investment."
    },
    {
      question: "How long will it take to complete the project?",
      answer: "The timeline for each project depends on the size and complexity. We’ll provide a detailed timeline during the consultation. Generally, we work efficiently to minimize disruption to your schedule. We understand that time is valuable, so we strive to complete projects on time while ensuring high-quality results. If there are any delays, we’ll keep you informed throughout the process."
    },
    {
      question: "What if I’m not happy with the results?",
      answer: "Your satisfaction is our top priority. If you're not happy with the results, we'll work with you until we meet your expectations. We understand that sometimes things don’t go as planned, but we’re committed to making it right. We’ve built a reputation for quality and reliability, and customer satisfaction is the backbone of our service."
    },
    {
      question: "Do I need to prepare anything before the service?",
      answer: "For most projects, we’ll guide you through any necessary preparations before we begin. You don’t need to worry about complicated preparations. We’ll take care of everything. We aim to make the process as stress-free as possible, so you don’t have to spend time worrying about anything in advance."
    },
    {
      question: "What if I’ve never used this type of service before? I’m not sure if it’s right for me.",
      answer: "It’s completely normal to feel uncertain. That’s why we offer a free consultation where we explain the entire process, address any concerns, and help you understand how our service can specifically benefit you. We’ve helped many first-time customers, and we always take the time to explain every step and answer all your questions. You’ll have a clear understanding of the process before we begin."
    },
    {
      question: "What if my project isn’t urgent? Can I book a service for later?",
      answer: "Yes! While we strive to accommodate urgent projects, we also work with clients who have more flexible timelines. You can book a service whenever it’s convenient for you, and we’ll fit it into our schedule. We understand that not every project is urgent, but it’s important to plan ahead. By booking in advance, you ensure your project gets the attention it deserves without any last-minute rush."
    },
    {
      question: "How do I know I can trust your team?",
      answer: "We’re a licensed and insured company with years of experience in the industry. We have a long list of satisfied clients who trust us with their projects. We are transparent and committed to keeping you informed throughout the entire process. Our team is vetted, professional, and highly skilled. We understand the importance of trust and take great pride in the quality of our work and customer service."
    },
    {
      question: "What if I need changes during the project?",
      answer: "We understand that your needs may evolve during the project, and we’re happy to accommodate reasonable changes. We’ll keep an open line of communication throughout the project to ensure everything is going as planned. If any adjustments are needed, we’ll discuss them with you and revise the timeline and cost if necessary. Flexibility is part of our service, and we always aim to ensure your satisfaction."
    },
    {
      question: "Do you offer any guarantees or warranties on your work?",
      answer: "Yes, we offer warranties on most of the services we provide. We stand behind our work and ensure it’s done right the first time. If any issues arise after completion, we’ll address them promptly. Our commitment to quality means that we don’t just complete a project and walk away—we’re here to ensure it’s lasting and meets your expectations."
    },
  ];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-10 bg-gray-300 px-6">
      <div className="max-w-4xl mx-auto px-3 text-left">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-md shadow-md">
              {/* Question */}
              <div
                onClick={() => toggleAnswer(index)}
                className="cursor-pointer flex items-center gap-3 p-4 bg-white rounded-md shadow-md hover:bg-gray-100 transition duration-200"
              >
                <FaQuestionCircle className="text-gray-600 text-4xl" />
                <span className="text-lg font-semibold">{faq.question}</span>
              </div>

              {/* Answer - Toggle Visibility */}
              {openIndex === index && (
                <div className="p-4 border-t border-gray-300 text-gray-700">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
