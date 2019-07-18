import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ModalExample from './itemModal';

class MyListItem extends Component 
{
    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      return (
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.listItem}>
            <Image source={{uri: this.props.photo}} style={{height: 100, width: "100%"}}/>
          </View>
        </TouchableOpacity>
      );
    }
  }
  
  
  class ItemsList extends Component 
  {
      constructor(props)
      {
          super(props);
          this.state={
              data: props.list,
              selectedItem: null
          }
      }

      componentWillReceiveProps(nextprops)
      {
          this.setState({data: nextprops.list})
      }
      
    _keyExtractor = (item, index) => item.key;
  
    _renderItem = ({item}) => (
       
     <MyListItem
        id={item.key}
        onPressItem={ this.props.handleSelectedItem }
        photo={item.photo}
      />
    );
  
    render() {
      return (
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.list}
        />
      );
    }
  }

const styles = StyleSheet.create({
    list:{
        width: "90%",  
        padding: 10   
    },
    listItem: {
       borderWidth: 1,
       borderRadius: 10,
       borderColor: "silver",
       padding: 10,
       marginTop: 10
    }
})


export default ItemsList;