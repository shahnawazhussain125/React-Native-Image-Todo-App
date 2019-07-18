import React from 'react';
import  ListItems from './src/components/listItems';
import { Text, StyleSheet ,View, Button} from 'react-native';
import ModalExample from './src/components/itemModal';
import MyCamera from './Camera';

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state={
      text: "",
      list: [],
      selectedItem: null,
      modalVisible: false,
      isCameraOpen: false,
      isEdit: false
    }
  }

  handleCapturePhoto = ( uri ) =>{
    const key = Math.random().toString().substring(3, 12);
    this.setState((state) =>{
      const list = state.list;
      list.push({photo: uri, key})
      return({list, isCameraOpen: false})
    })
  }

  handleSelectedItem = (id) =>{
    this.setState((state) => {
      const list = state.list.filter((value) => value.key == id);
      return {selectedItem: list[0], modalVisible: true};
    });
  
  }

  handleItemDelete = (key) =>{
    this.setState((state) =>{
      const list = state.list.filter((value) => value.key !== key);
      return { list, modalVisible: false }
    })
  }

  handleItemEdit = (uri) =>{

    this.setState((state) =>{
      const list = state.list.map(value =>{
        if(value.key === state.selectedItem.key)
        {
          value.photo = uri;
        }
        return value 
      })
      const selectedItem = state.selectedItem;
      selectedItem.photo = uri;

      return({list, isCameraOpen: false, selectedItem, isEdit: false});
    })
  }

  handleOpenCamera = () =>{
    this.setState({isCameraOpen: true});
  }

  handleIsEdit = () =>{
    this.setState({isCameraOpen: true, isEdit: true})
  }

  setModalVisible = () =>{
    this.setState({ modalVisible: false })
  }

  render() {
    
    const { modalVisible, isCameraOpen, selectedItem, isEdit } = this.state;
    // console.log("list ", this.state.list );
    return (
      isCameraOpen ?
      <MyCamera handleCapturePhoto = { isEdit ? this.handleItemEdit : this.handleCapturePhoto }/>
      :
      <View style={styles.container}>
        
        <Button title="Open Camera" onPress={this.handleOpenCamera}/>
        <Text style={styles.text}>Todo List</Text>
        {
          modalVisible 
          && 
          <ModalExample  
            modalVisible={modalVisible} 
            setModalVisible={this.setModalVisible} 
            selectedItem={selectedItem}
            handleItemDelete= {this.handleItemDelete}
            handleIsEdit={this.handleIsEdit}
          />
        }
        {  
          <ListItems list = {this.state.list} handleSelectedItem = {this.handleSelectedItem} /> 
        }
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 100
  },
  text:{
    marginTop: 20,
    fontSize: 20, 
    fontWeight: "bold",
    backgroundColor: "green",
    padding: 10,
    width: "90%", 
    color: "white", 
    textAlign: "center"
  }
});