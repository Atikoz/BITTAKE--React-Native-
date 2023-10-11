import axios from 'axios';

export async function SendCoin(coin, amount, tokenSender, addressRecipient, date) {
  const request = await axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://inline.dev.na4u.ru/v1/withdrawal/sendCoin?coin=${coin}&amount=${amount}&address=${addressRecipient}&date=${date}`,
    headers: {
      'Authorization': `Bearer ${tokenSender}`
    }
  });

  return request.data

}