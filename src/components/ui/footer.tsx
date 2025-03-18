import { FaWhatsapp, FaComments, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Follow Us Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <p>Stay connected on social media.</p>
          <div className="flex justify-center gap-4 mt-4">
            <FaFacebook className="text-3xl cursor-pointer hover:text-blue-500" />
            <FaTwitter className="text-3xl cursor-pointer hover:text-blue-400" />
            <FaInstagram className="text-3xl cursor-pointer hover:text-pink-500" />
            <FaLinkedin className="text-3xl cursor-pointer hover:text-blue-700" />
          </div>
        </div>

        {/* WhatsApp Support Section */}
        <div>
          <FaWhatsapp className="text-green-500 text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">WhatsApp Support</h3>
          <p>WhatsApp your queries for instant reply.</p>
          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-600">
            +12-345-678-89089
          </button>
        </div>

        {/* Live Chat Section */}
        <div>
          <FaComments className="text-4xl mx-auto mb-3" />
          <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
          <p>The fastest way to get in touch with an Expert.</p>
          <button className="mt-4 bg-yellow-500 text-black px-6 py-2 rounded-md font-bold hover:bg-yellow-600">
            LIVE CHAT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
