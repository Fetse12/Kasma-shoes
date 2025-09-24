const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const TELEGRAM_API_TOKEN = process.env.TELEGRAM_API_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const sendMessage = async (req, res) => {
  try {
    const messages = req.body;

    // Send the initial message with payment information
    let initialMessage = `🛍️ **NEW ORDER RECEIVED** 🛍️
        
👤 **Customer Information:**
Name: ${messages.name}
Phone: ${messages.phone}
Address: ${messages.address}

💰 **Payment Information:**
Payment Method: ${messages.paymentMethod?.toUpperCase() || "Not specified"}
Reference ID: ${messages.referenceId || "Not provided"}
Amount Paid: ${messages.receivedAmount || "Not provided"} ETB
Account: ${messages.receiverAccountNumber || "Not provided"}`;

    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: initialMessage,
        parse_mode: "Markdown",
      }
    );

    // Prepare media group for images
    const mediaGroup = messages.data.map((image) => ({
      type: "photo",
      media: image.shoe.imgUrl[0],
    }));

    // Send media group
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMediaGroup`,
      {
        chat_id: CHAT_ID,
        media: mediaGroup,
      }
    );

    // Calculate total and send individual shoe messages
    let total = 0;
    let orderDetails = `📦 **ORDER DETAILS:**\n\n`;

    for (let i = 0; i < messages.data.length; i++) {
      const itemTotal =
        parseInt(messages.data[i].quantity) *
        parseInt(messages.data[i].shoe.Price);
      total += itemTotal;

      orderDetails += `👟 **${messages.data[i].shoe.shoes_name}**
Size: ${messages.data[i].selectedSize || "Not specified"}
Quantity: ${messages.data[i].quantity}
Price: ${messages.data[i].shoe.Price} ETB
Subtotal: ${itemTotal} ETB

`;
    }

    // Send order details
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: orderDetails,
        parse_mode: "Markdown",
      }
    );

    // Send total order amount
    await axios.post(
      `https://api.telegram.org/bot${TELEGRAM_API_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: `💳 **TOTAL ORDER AMOUNT: ${total} ETB**`,
        parse_mode: "Markdown",
      }
    );

    res
      .status(200)
      .json({ message: "Order details sent to Telegram successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to send order details to Telegram",
        error: error.message,
      });
    console.log(error.message);
  }
};

module.exports = {
  sendMessage,
};
