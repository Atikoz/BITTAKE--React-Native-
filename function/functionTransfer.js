import axios from 'axios';
import config from '../config';

export async function SendCoin(coin, amount, tokenSender, addressRecipient, date) {
  const request = await axios({
    method: 'get',
    maxBodyLength: Infinity,
    url: `${config.apiUrl}/v1/withdrawal/sendCoin?coin=${coin}&amount=${amount}&address=${addressRecipient}&date=${date}`,
    headers: {
      'Authorization': `Bearer ${tokenSender}`
    }
  });

  return request.data

}