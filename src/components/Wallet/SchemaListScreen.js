import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  StyleSheet
} from 'react-native';
import { ListItem} from '@rneui/themed'

const SchemaListScreen = (props) => {
    const [text, setText] = useState('');
    const [data, setData] = useState([]);


    const onChangeText = () => {
        
    }

    const list = [
      {
        schema_title: 'Schema Name',
        version: '1.001',
        attribute: 'Vice President',
      },
      {
        schema_title: 'SchemaNameSchema NameSchema Name',
        version: '2.0002',
        attribute: 'Vice President',

      }
    ] 

    useEffect(
      () => {
        const expandList = list.map((item, index) => {
          return (
            {
              listNumber:index,
              expanded:false,
            }         
          )
        })
        setData(expandList);
      } ,[])
    
    const AccordionList = list.map((item, index) => {
      try{
        return(
          <ListItem.Accordion
            key={`accroidon${index}`}
            style={{marginTop:10}}
            containerStyle={styles.accordionContainer}
            content={
              <View style={{flex:1, flexDirection:'row'}}>
                <Ionicons style={{flex:1}} name="ios-square" size={60} color='#cddc39'/>
                <ListItem.Content style={{flex:3}}>
                  <ListItem.Title style={{fontSize:20}}>{item.schema_title}</ListItem.Title>
                </ListItem.Content>
              </View>
            }
              isExpanded={data[index].expanded}
              onPress={() => {
              let newArr = [...data];
              newArr[index].expanded = !newArr[index].expanded;
              setData(newArr);
            }}
          >
            <ListItem key={`item${index}`} containerStyle={{flex:1,padding:0, marginBottom:10}} bottomDivider>
              {/* <Avatar title={l.name[0]} source={{ uri: l.avatar_url }} /> */}
              <ListItem.Content style={{backgroundColor:'#c1e9fb', padding:10}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{ borderBottomWidth:1, flex:1,textAlign:'left', marginBottom:10}}>Version</Text>
                  <Text style={{ borderBottomWidth:1, flex:1, textAlign:'right', marginBottom:10}}>{item.version}</Text>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
                  <Text style={{ borderBottomWidth:1, flex:1,textAlign:'left', marginBottom:10}}>Attribute</Text>
                  <Text style={{ borderBottomWidth:1, flex:1, textAlign:'right', marginBottom:10}}>{item.attribute}</Text>
                </View>
              </ListItem.Content>
            </ListItem>
          </ListItem.Accordion>
        );
      }
      catch(error){
        // console.log('error', error);
        return(
          <View>
            <Text>no schema</Text>
          </View>
        )
      }
    });

  // render page
  return (
    <View style={styles.container}>
      <View style={styles.searchArea}>
          <View style={styles.inputWrap}>
              <Ionicons name="search" size={30} color='black'></Ionicons>
              <TextInput
                  style={styles.searchInput}
                  onChangeText={onChangeText}
                  placeholder="please enter schema name"
              />
          </View>
      </View>
      <View style={styles.listArea}>
        <ScrollView persistentScrollbar={true}  >
          {AccordionList}
        </ScrollView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  searchArea:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  inputWrap:{
    flex:8,
    borderRadius:30,
    flexDirection:'row',
    borderWidth:1,
    marginHorizontal:15,
    paddingLeft:5,
    paddingTop:3,
    height:40
  },
  searchIcon:{
    flex:2
  },
  searchInput:{
    paddingVertical: 0 ,
    height:30,
    fontSize:18
  },
  displayBtn:{
    flex:1
  },
  listArea:{
    justifyContent:'center',
    paddingBottom: 10,
    marginHorizontal:10,
    flex:8
  },
  accordionContainer:{
    shadowColor: '#171717',
    shadowColor: 'black',
    shadowOpacity: 0.56,
    shadowOffset: { width: 2, height: 2},
    shadowRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius:5,
  }
});

export default SchemaListScreen;