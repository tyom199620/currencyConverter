import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from './ConverterStyle';

import SelectedCurrency from './includes/SelectedCurrency';
import SwapSvg from '../../assets/svg/SwapSvg';
import CurrencySelectModal from './CurrencySelectModal';
import {convertAmount} from '../../core/api/CurrencyApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNetInfo} from '@react-native-community/netinfo';

const ConverterScreen = props => {
  const netInfo = useNetInfo();

  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [currencyModalType, setCurrencyModalType] = useState('from');

  const [amount, setAmount] = useState('1');
  const [amountError, setAmountError] = useState(false);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [offlineDataNotExistError, setOfflineDataNotExistError] =
    useState(false);

  const [selectedFromCurrency, setSelectedFromCurrency] = useState({
    name: 'US Dollar',
    symbol: '$',
    name2: 'USD',
  });
  const [selectedToCurrency, setSelectedToCurrency] = useState({
    name: 'Euro',
    symbol: '€',
    name2: 'EUR',
  });

  useFocusEffect(
    React.useCallback(() => {
      handleConvertAmount(null, null, amount);
    }, [netInfo.isConnected]),
  );

  const handleSetSelectedCurrency = async (type, data) => {
    if (type == 'from') {
      setSelectedFromCurrency(data);
      handleConvertAmount(data, selectedToCurrency, amount);
    } else if (type == 'to') {
      setSelectedToCurrency(data);
      handleConvertAmount(selectedFromCurrency, data, amount);
    }
    if (amount == '') {
      setAmount('1');
      setAmountError(false);
    }
    setShowCurrencyModal(false);
  };

  const handleChangeAmount = async val => {
    let val_ = val.replace(/\D/g, '');
    let error = val_ < 1 ? true : false;

    setAmountError(error);
    setAmount(val_);

    if (!error) {
      handleConvertAmount(null, null, val_);
    }
  };

  const handleConvertAmount = async (
    selectedFromCurrency_ = null,
    selectedToCurrency_ = null,
    amount_,
  ) => {
    let body = {
      from: selectedFromCurrency_
        ? selectedFromCurrency_?.name2
        : selectedFromCurrency?.name2,
      to: selectedToCurrency_
        ? selectedToCurrency_?.name2
        : selectedToCurrency?.name2,
      amount: amount_,
    };

    console.log(netInfo.isConnected, 'NetInfo');
    console.log(body, 'body');

    if (netInfo.isConnected === false || netInfo.isConnected === null) {
      // Нет интернета

      let ratesStorage = await AsyncStorage.getItem('ratesStorage');
      if (ratesStorage) {
        ratesStorage = JSON.parse(ratesStorage);
        console.log(ratesStorage, 'ratesStorage No internet');

        let hasOfflineRates = ratesStorage?.find(
          element => element?.from === body?.from,
        ); // Ищем локальные данные
        console.log(hasOfflineRates, 'hasOfflineRates');

        if (hasOfflineRates) {
          // локальные данные есть

          let findToCurrency = hasOfflineRates?.rates[body?.to];
          if (findToCurrency) {
            let total = parseFloat(body.amount) * parseFloat(findToCurrency);
            total = total.toFixed(2);
            setConvertedAmount(total);
            setOfflineDataNotExistError(false);
          } else {
            setOfflineDataNotExistError(true);
          }
          console.log(findToCurrency, 'findToCurrency');

          // локальных данных нет
        } else {
          setOfflineDataNotExistError(true);
        }
      } else {
        setOfflineDataNotExistError(true);
      }
    } else {
      setOfflineDataNotExistError(false);

      convertAmount(body)
        .then(async result => {
          console.log(result, 'convertAmount');

          if (result?.rates) {
            let converted = Object.values(result?.rates);
            console.log(converted, 'handleConvertAmount');

            if (converted.length > 0) {
              setConvertedAmount(converted[0]);
            }
          }
        })
        .catch(error => {
          console.warn('ERROR handleConvertAmount', error);
        });
    }
  };

  const handleSwap = async () => {
    const temp = {...selectedFromCurrency};

    // Обновляем первый стейт значением второго стейта
    setSelectedFromCurrency({...selectedToCurrency});

    // Обновляем второй стейт значением временной переменной
    setSelectedToCurrency(temp);

    handleConvertAmount(selectedToCurrency, selectedFromCurrency, amount);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.converterMainBlock}>
          <SelectedCurrency
            title={'From:'}
            onOpen={() => {
              setShowCurrencyModal(true);
              setCurrencyModalType('from');
            }}
            selectedCurrency={selectedFromCurrency}
          />

          <TouchableOpacity
            onPress={() => {
              handleSwap();
            }}
            style={styles.swap}>
            <SwapSvg />
          </TouchableOpacity>

          <SelectedCurrency
            title={'To:'}
            onOpen={() => {
              setShowCurrencyModal(true);
              setCurrencyModalType('to');
            }}
            selectedCurrency={selectedToCurrency}
          />
        </View>

        {!offlineDataNotExistError ? (
          <>
            <View style={styles.inputWrapper}>
              <Text style={styles.inputTitle}>Amount</Text>
              <View>
                <TextInput
                  returnKeyType="next"
                  onBlur={() => {
                    // props.validateEmail();
                  }}
                  onSubmitEditing={() => {
                    // props.passwordInputState.inputRef.current?.focus();
                  }}
                  onChangeText={val => {
                    handleChangeAmount(val);
                  }}
                  placeholderTextColor="white"
                  style={[styles.input]}
                  value={amount}
                />
              </View>
              {amountError && (
                <Text style={styles.errorText}>
                  Please enter a valid amount
                </Text>
              )}
            </View>

            {!amountError && (
              <>
                <Text style={styles.totalText1}>
                  {amount}
                  {` ${selectedFromCurrency?.symbol}`} =
                </Text>
                <Text style={styles.totalText}>
                  {convertedAmount} {selectedToCurrency?.symbol}
                </Text>
              </>
            )}
          </>
        ) : (
          <View>
            <Text style={styles.errorText}> Offline currency not found</Text>
          </View>
        )}
      </View>

      {showCurrencyModal && (
        <CurrencySelectModal
          onClose={setShowCurrencyModal}
          type={currencyModalType}
          selected={
            currencyModalType == 'from'
              ? selectedFromCurrency
              : selectedToCurrency
          }
          netInfo={netInfo}
          onSave={handleSetSelectedCurrency}
        />
      )}
    </SafeAreaView>
  );
};

export default ConverterScreen;
