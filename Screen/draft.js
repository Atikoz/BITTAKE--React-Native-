<View style={style.amountInputContainer}>
  <View style={{ height: '100%', width: '100%', alignItems: 'center' }}>
    <TextInput
      style={style.amountInput}
      onBlur={handleBlur('amount')}
      value={values.amount}
      placeholder="Amount send"
      placeholderTextColor='#858383'
      keyboardType="numeric"
      onChangeText={(text) => {
        let cleanedNumber = text.replace(',', '.');
        if (cleanedNumber.charAt(0) === '.') {
          cleanedNumber = '0' + cleanedNumber;
        };
        const cleanedText = cleanedNumber.replace(/[^0-9.]/g, '');
        // Перевірка на кількість крапок (можливо, ви хочете обмежити тільки одну крапку)
        if (cleanedText.split('.').length <= 2) {
          setAmountSend(cleanedText);
          handleChange('amount')(cleanedText);
        }
      }}
    />
    {touched.amount && errors.amount && <Text style={{ color: 'red', fontWeight: '700', marginTop: 5 }}>{errors.amount}</Text>}

  </View>
  <View style={style.buttMaxContainer}>
    <TouchableOpacity
      onPress={() => {
        const maxAmount = getMaxAmountSend()
        setAmountSend(maxAmount)
        handleChange('amount')(maxAmount.toString());
      }}>
      <Text style={{ fontWeight: '800', fontSize: 16 }}>MAX</Text>
    </TouchableOpacity>
  </View>
</View>

buttMaxContainer: {
  height: 38,
  width: 50,
  backgroundColor: '#58FFAF',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center'
},

amountInputContainer: {
  height: 40,
  width: '85%',
  marginTop: 15,
  alignItems: 'center',
  flexDirection: 'row',
}