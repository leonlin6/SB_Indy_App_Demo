import React, {useState, useEffect} from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';
import { Switch } from '@rneui/themed';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LocaleConfig} from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Colors} from '../utils/Colors';
import * as Animatable from 'react-native-animatable';


const RuleCard = (props) => {
    const [toggleChecked, setToggleChecked] = useState(true);
    const [format, setFormat] = useState('');
    const [condition, setCondition] = useState('');
    const [canlendarShow, setCanlendarShow] = useState(false);

    const [isFocus, setIsFocus]=useState(false);
    const [conditionValue, setConditionValue]=useState('');

    const format_dropdown_list = [
        { label: '數字', value: 'number' },
        { label: '日期', value: 'date' }
    ];
    
    const condition_dropdown_list = [
        { label: '>', value: 'more_than' },
        { label: '=', value: 'equal' },
        { label: '<', value: 'less_than' },
        { label: '>=', value: 'mtoe' },// more than or equal
        { label: '>=', value: 'ltoe' },// less than or equal
    ];



      LocaleConfig.locales['fr'] = {
        monthNames: [
          'Janvier',
          'Février',
          'Mars',
          'Avril',
          'Mai',
          'Juin',
          'Juillet',
          'Août',
          'Septembre',
          'Octobre',
          'Novembre',
          'Décembre'
        ],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        today: "Aujourd'hui"
      };
      LocaleConfig.defaultLocale = 'fr';

    const removeCard = () => {
      const newData = props.data.filter((e , i)=>{
        if(i === props.index){
          return false;
        }
        return true;
      })
      .map((el, idx)=>{
        return(el);
      });
      props.setData(newData);
    }

    return (
        <View style={styles.cardItem}>
            <View style={styles.section}>
                <View style={styles.cardTitleArea}>
                    <Text style={styles.title}>Key Name</Text>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={()=>{removeCard()}}>
                        <Ionicons name={'close'} size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                <TextInput style={styles.input} placeholder='請輸入查驗Key名稱'></TextInput>
            </View>
            <View style={styles.section}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>查驗規則</Text>
                    <Switch
                        value={toggleChecked}
                        onValueChange={(value) => {
                          setToggleChecked(value);
                          const newData = props.data.map((el, i)=>{
                            if(i === props.index){
                              el.rule_toggle = value;
                            }
                            
                            return(el);
                          });
                          props.setData(newData);
                        }}
                    />
                </View>
            </View>
            <View style={styles.dropdownArea}>
                <Dropdown
                    // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    style={styles.dropdown}

                    // placeholderStyle={styles.placeholderStyle}
                    // selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={format_dropdown_list}
                    search={false}
                    labelField="label"
                    valueField="value"
                    placeholder={'格式'}
                    value={format}
                    maxHeight={100}
                    // onFocus={() => setIsFocus(true)}
                    // onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                      setFormat(item.value);
                      const newData = props.data.map((el, i)=>{
                        if(i === props.index){
                          el.format = item.value;
                        }
                        
                        return(el);
                      });
                      props.setData(newData);
                      // setIsFocus(false);
                    }}
                    // renderLeftIcon={() => (
                    //   <AntDesign
                    //     style={styles.icon}
                    //     color={isFocus ? 'blue' : 'black'}
                    //     name="Safety"
                    //     size={20}
                    //   />
                    // )}
                    />
                <Dropdown
                    // style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    style={styles.dropdown}
                    // placeholderStyle={styles.placeholderStyle}
                    // selectedTextStyle={styles.selectedTextStyle}
                    // inputSearchStyle={styles.inputSearchStyle}
                    // iconStyle={styles.iconStyle}
                    data={condition_dropdown_list}
                    search={false}
                    maxHeight={150}
                    labelField="label"
                    valueField="value"
                    placeholder={'條件'}
                    searchPlaceholder="Search..."
                    value={condition}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setCondition(item.value);
                      const newData = props.data.map((el, i)=>{
                        if(i === props.index){
                          el.condition = item.value;
                        }
                        
                        return(el);
                      });
                      props.setData(newData);
                      // setIsFocus(false);
                      // console.log(props.data, props.index);
                    }}
                />
                <TextInput 
                  style={styles.input} 
                  placeholder='請輸入數值' 
                  keyboardType={'numeric'}
                  maxLength={5}
                  onChanegeText={(value)=>{
                    setConditionValue(value);
                    const newData = props.data.map((el, i)=>{
                        if(i === props.index){
                          el.condition_value = value;
                        }
                        
                        return(el);
                      });
                      props.setData(newData);
                    }
                  } ></TextInput>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

  cardItem:{
    padding:15,
    borderWidth:1,
    borderColor:'white',
    borderRadius:5,
    shadowColor: '#171717',
    shadowOpacity: 0.56,
    shadowOffset: { width: 0, height: 2},
    shadowRadius: 20,
    elevation: 5,
    backgroundColor: 'white',
    marginBottom:15
  },
  section:{
    marginBottom:20
  },
  cardTitleArea:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  titleArea:{
    flexDirection:'row'
  },
  title:{
    fontSize:20,
    fontWeight:'bold',
    color:'black',
    marginBottom:10
  },
  input:{
    height: 30,
    borderBottomWidth: 1,
    paddingVertical:0,
    paddingLeft:10
  },
  dropdownArea:{
    flexDirection:'row',
    justifyContent:'space-evenly',
  },
  dropdown:{
    width:80, 
    marginRight:10, 
    borderWidth:1, 
    paddingLeft:10,

  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

});

export default RuleCard;