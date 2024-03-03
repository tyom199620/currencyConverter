import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {styles} from '../ConverterStyle';

import DropDownArrow from '../../../assets/svg/DropDownArrow';
import UsaSvg from '../../../assets/svg/Flags/UsaSvg';

const SelectedCurrency = props => {

  useFocusEffect(
    React.useCallback(() => {}, []), // The empty dependency array means the effect runs once when the component mounts
  );

  return (
    <View style={styles.selectedCurrencyWrapper}>
      <Text style={styles.selectedCurrencyLabel}>{props?.title}</Text>
      <TouchableOpacity
        style={styles.selectedCurrency}
        onPress={() => {
          props?.onOpen(true);
        }}>
        <UsaSvg />
        <Text style={styles.selectedCurrencyText}>
          {props?.selectedCurrency?.name2}
        </Text>
        <DropDownArrow />
      </TouchableOpacity>
    </View>
  );
};

export default SelectedCurrency;
