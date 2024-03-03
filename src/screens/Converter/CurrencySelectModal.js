import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import {useFocusEffect} from '@react-navigation/native';
import {styles} from './ConverterStyle';

import SearchSvg from '../../assets/svg/SearchSvg';
import BackSvg from '../../assets/svg/BackSvg';
import {getCurrency, getRates } from "../../core/api/CurrencyApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import OkSvg from '../../assets/svg/OkSvg';
import UsaSvg from '../../assets/svg/Flags/UsaSvg';
// import NetInfo, { addEventListener, useNetInfo } from "@react-native-community/netinfo";

const CurrencySelectModal = props => {
  // const netInfo = useNetInfo();

  const [showLoader, setShowLoader] = useState(true);
  const [currency, setCurrency] = useState('');

  const [currencyList, setCurrencyList] = useState([]);
  const [findCurrencyList, setFindCurrencyList] = useState([]);

  const [selectedCurrency, setSelectedCurrency] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      handleGetCurrencyList();
    }, []),
  );

  const handleSetSelectedCurrency = async () => {
    if (props?.selected) {
      setSelectedCurrency(props?.selected);
    }
  };
  const handleGetCurrencyList = async () => {
    let localCurrency = await AsyncStorage.getItem('currencyList');

    if (localCurrency) {
      setCurrencyList(JSON.parse(localCurrency));
      setShowLoader(false);
      console.log('Load from storage', localCurrency);
      handleSetSelectedCurrency();

    } else {

      if (props?.netInfo.isConnected) {
        getCurrency()
          .then(async result => {
            console.log(result, 'result');

            if (result) {
              const currencyArray = Object.values(result).map(item => {
                return {
                  ...item,
                  name2: Object.keys(result).find(key => result[key] === item),
                };
              });

              setCurrencyList(currencyArray);
              await AsyncStorage.setItem(
                'currencyList',
                JSON.stringify(currencyArray),
              );
              console.log('Load from api', currencyArray);
              handleSetSelectedCurrency();
            }
            setShowLoader(false);
          })
          .catch(error => {
            setShowLoader(false);
            console.warn('error', error);
          });
      } else {
        setShowLoader(false);
      }
    }




  };

  const handleSelectRadio = item => {
    setSelectedCurrency(item);
  };
  const CurrencyList = () => {
    if (currencyList.length > 0 || findCurrencyList.length > 0) {
      let list = currency.length > 0 ? findCurrencyList : currencyList;

      return (
        <View style={styles.currencyList}>
          {list?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleSelectRadio(item);
                }}
                style={[
                  styles.currencyListItem,
                  selectedCurrency?.symbol == item?.symbol &&
                    styles.currencyListItemActive,
                ]}
                key={index}>
                <View style={styles.currencyListItemLeft}>
                  <UsaSvg />
                  <Text style={styles.currencyListItemText}>
                    {item?.name2} - {item?.name}
                  </Text>
                </View>

                <View style={styles.radio}>
                  {selectedCurrency?.symbol == item?.symbol && (
                    <View style={styles.radioActive} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{color: 'black', fontSize:18}}>No currencys data</Text>
        </View>
      );
    }
  };

  const handleClose = () => {
    props?.onClose(false);
  };

  const handleSearch = val => {
    setCurrency(val);

    const searchString = val;

    const filteredData = currencyList.filter(item => {
      return Object.values(item).some(value => {
        if (
          typeof value === 'string' &&
          value.toLowerCase().includes(searchString.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    });

    console.log(filteredData, 'find data');
    setFindCurrencyList(filteredData);
  };

  const handleOnSave = async () => {

    console.log(props?.netInfo.isConnected, 'NetInfo');

    if (props?.netInfo.isConnected) { // Есть интернет

      if (props?.type == 'from') {

        let body = {
          base: selectedCurrency?.name2
        }

        getRates(body)
          .then(async result => {
            let ratesStorage = await AsyncStorage.getItem('ratesStorage');
            if (ratesStorage) {
              ratesStorage = JSON.parse(ratesStorage);
              ratesStorage.push({from: result?.base, rates: result?.rates});
              await AsyncStorage.setItem('ratesStorage', JSON.stringify(ratesStorage));
            } else {
              ratesStorage = [{from: result?.base, rates: result?.rates}];
              await AsyncStorage.setItem('ratesStorage', JSON.stringify(ratesStorage));
            }
            console.log(result, 'handlegetRates');
          })
          .catch(error => {
            console.warn('ERROR handleOnSave', error);
          });
      }
    }

    props?.onSave(props?.type, selectedCurrency);
  }

  return (
    <View style={styles.currencySelect}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.currencySelectHeader}>
          <TouchableOpacity style={{ padding:10, paddingLeft:0}} onPress={handleClose}>
            <BackSvg />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Currency Select</Text>

          <TouchableOpacity
            disabled={selectedCurrency ? false : true}
            style={styles.ok}
            onPress={handleOnSave}>
            <OkSvg style={{opacity: selectedCurrency ? 1 : 0.5}} />
          </TouchableOpacity>
        </View>

        <View style={styles.currencyContent}>
          <View style={[styles.inputWrapper, {marginBottom: 16}]}>
            <SearchSvg style={styles.searchIcon} />
            <TextInput
              returnKeyType="next"
              onBlur={() => {
              }}
              onSubmitEditing={() => {
              }}
              onChangeText={val => {
                handleSearch(val);
              }}
              placeholderTextColor="white"
              style={[styles.input, styles.currencySelectInput]}
              value={currency}
            />
          </View>

          <CurrencyList />
        </View>
      </ScrollView>

      {showLoader && (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size={'large'} color={'green'} />
        </View>
      )}
    </View>
  );
};

export default CurrencySelectModal;
