import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
} from 'react-native';
import { ListItem} from '@rneui/themed'

const DefinitionDetailScreen = (props) => {
  const [listData , setListData] = useState();
  const list =     {
    credential_name: 'Customized Credential Name by Individual',
    issued_date: '2022/04/06',
    ca2: 'Snowbridge',
    issued_date2: '2022/04/06',
    ca3: 'Snowbridge',
    issued_date3: '2022/04/06',
    ca4: 'Snowbridge',
  }

  useEffect(() => {
    // setSeletedSchema(() => (props.route.params));
    if(props.route.params === undefined){
      console.log('no data');
    }else{
      setListData(props.route.params.selectedSchema);
    }
  },[props.route.params]);

  const DetailList = (props) => {
    try{
      const abc = Object.keys(listData).map(function(keyName, keyIndex) {
        // use keyName to get current key's name
        // and a[keyName] to get its value

        return(
          <ListItem key={keyName} containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.aaa}>{keyName}</Text>
                <Text style={styles.bbb}>{listData[keyName]}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
        )
      })

      return abc;
    }catch(error){
      const abc = Object.keys(list).map(function(keyName, keyIndex) {
        // use keyName to get current key's name
        // and a[keyName] to get its value
  
        return(
          <ListItem containerStyle={{backgroundColor:'#F4F4F4'}}>
            <ListItem.Content>
              <View style={styles.subtitleView}>
                <Text style={styles.aaa}>{keyName}</Text>
                <Text style={styles.bbb}>{list[keyName]}</Text>
              </View>
            </ListItem.Content>
          </ListItem>
  
        )
  
  
      })

      return abc;
    }
  }
  
  // render page
  return (
    <View style={styles.container}>
      <View style={styles.detailArea}>
        <ScrollView persistentScrollbar={true} >
          <DetailList></DetailList>
        </ScrollView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    padding:20,
    flex:1
  },
  detailArea:{
    flex:4,

  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
    justifyContent:'space-between',
    borderBottomWidth:1,
  },
  aaa:{
    flex:1,
    textAlign:'left',
    fontSize:15
  },
  bbb:{
    flex:1,
    textAlign:'right',
    fontSize:15

  },
  buttonArea:{
    flex:1,
    marginTop: 30,
    paddingTop:20,
    borderTopWidth:1,
    borderTopColor:'gray',

    justifyContent:'center',
    alignItems:'center'
  }

});

export default DefinitionDetailScreen;