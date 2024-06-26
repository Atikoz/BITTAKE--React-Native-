import AsyncStorage from '@react-native-async-storage/async-storage';


class LocalData {
  async saveUserData(nameData, data) {
    try {
      await AsyncStorage.setItem(`${nameData}`, JSON.stringify(data));
      console.log('data saved');
    } catch (error) {
      console.error('save local data error: ' ,error);
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
  };

  async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Помилка під час видалення даних: ${error}`);
    }
  };
};



export default new LocalData();