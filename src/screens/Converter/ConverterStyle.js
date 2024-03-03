import {Dimensions, StyleSheet} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    width: '100%',
  },
  selectedCurrencyWrapper: {},
  selectedCurrencyLabel: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  selectedCurrency: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
  },
  selectedCurrencyText: {
    color: 'black',
    fontSize: 16,
    marginLeft: 8,
    marginRight: 22,
  },
  converterMainBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom:16
  },
  swap: {
    marginTop: 35,
  },
  inputWrapper: {
    width: '100%',
    marginBottom:24
  },
  inputTitle: {
    fontSize: 16,
    color: 'black',
    marginBottom:8
  },
  input: {
    borderRadius:8,
    paddingHorizontal:16,
    paddingVertical:12,
    borderColor:'black',
    borderWidth:1,
    color: 'black',
    fontSize:16
  },
  totalText1: {
    color: 'black',
    fontSize: 16,
  },
  totalText: {
    color: 'black',
    fontSize: 42,
  },
  currencySelect: {
    flex: 1,
    position:'absolute',
    bottom:0,
    left:0,
    width: '100%',
    height:'100%',
    backgroundColor:'#F5F5F5'
  },
  currencySelectHeader: {
    width:'100%',
    height: 56,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'white',
    paddingHorizontal:20
  },
  currencyContent: {
    flex:1,
    backgroundColor:'#F5F5F5',
    padding:20
  },
  currencySelectInput: {
    paddingLeft:40,
    height:43
  },
  headerTitle: {
    color: 'black',
    fontSize:20,
    marginLeft:12,
    fontWeight:'700',
  },
  searchIcon: {
    position:'absolute',
    top: 10,
    left: 16
  },
  ok: {
    position:'absolute',
    right:15,
    top:10
  },
  currencyList: {
    backgroundColor:'#E7E7E7'
  },
  currencyListItem: {
    paddingHorizontal:16,
    height:52,
    marginBottom:8,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  currencyListItemLeft: {
    flexDirection:'row',
    alignItems:'center',
    height:'100%'
  },
  currencyListItemText: {
    fontSize:16,
    color: 'black',
    marginLeft:8
  },
  radio: {
    width:16,
    height: 16,
    borderRadius:100,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center'
  },
  radioActive: {
    width:8,
    height: 8,
    borderRadius:100,
    backgroundColor:'black'
  },
  currencyListItemActive: {
    backgroundColor:'#DEDEDE',
    borderRadius:8
  },
  loaderWrapper: {
    width:'100%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#DEDEDE',
    position:'absolute',
    left: 0,
    bottom: 0
  },
  symbol: {
    color: 'black',
    fontSize: 18,
    position:'absolute',
    left: 15,
    top: 13
  },
  errorText: {
    color: '#DD4A64',
    marginTop: 5,
  },
});
