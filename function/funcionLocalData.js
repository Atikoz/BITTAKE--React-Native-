import AsyncStorage from '@react-native-async-storage/async-storage';


class LocalData {
  async saveUserData(nameData, data) {
    try {
      await AsyncStorage.setItem(`${nameData}`, JSON.stringify(data));
    } catch (error) {
    }
  };

  async getUserData(key) {
    try {

      const userData = await AsyncStorage.getItem(key);;
  
      // Перевірка на null, оскільки AsyncStorage може повертати null, якщо дані не знайдено.
      if (userData !== null) {
        // Дані були знайдені та вони зазвичай представлені у вигляді рядка JSON, тому їх потрібно розпарсити
        return JSON.parse(userData);
      } else {
        // Якщо ключ не знайдено, повертаємо пустий об'єкт або значення за замовчуванням, в залежності від вашого випадку.
        return 'user not found';
      }
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
      // Обробка помилки
    }
  }
};

export default new LocalData();