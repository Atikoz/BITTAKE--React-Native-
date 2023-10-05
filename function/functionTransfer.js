import axios from 'axios';

export async function SendCoin(coin, amount, tokenSender, addressRecipient, date) {
  const request = await axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: `http://178.159.39.251:3000/v1/withdrawal/sendCoin?coin=${coin}&amount=${amount}&address=${addressRecipient}&date=${date}`,
    headers: { 
      'Authorization': `Bearer ${tokenSender}`
    }
  });

  return request.data

}