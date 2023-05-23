import React, { useState } from 'react';

const VNPayForm = () => {
  const [orderInfo, setOrderInfo] = useState('');
  const [orderType, setOrderType] = useState('');
  const [amount, setAmount] = useState(0);
  const [language, setLanguage] = useState('');
  const [bankCode, setBankCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Tạo request tới API ở đây
    const response = await fetch('/make', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: orderType,
        vnp_Amount: amount,
        vnp_Locale: language,
        vnp_BankCode: bankCode,
      }),
    });

    // Xử lý response từ API ở đây
    const data = await response.json();
    console.log(data); // In ra kết quả từ API
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Order Info:</label>
        <input type="text" value={orderInfo} onChange={(e) => setOrderInfo(e.target.value)} />
      </div>
      <div>
        <label>Order Type:</label>
        <input type="text" value={orderType} onChange={(e) => setOrderType(e.target.value)} />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
      </div>
      <div>
        <label>Language:</label>
        <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} />
      </div>
      <div>
        <label>Bank Code:</label>
        <input type="text" value={bankCode} onChange={(e) => setBankCode(e.target.value)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default VNPayForm;