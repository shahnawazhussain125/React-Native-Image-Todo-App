import React from 'react';
import {Modal, Button, View, Image, StyleSheet} from 'react-native';


export default  ItemsModal = (props) => {
  return (
    <View style = { styles.modal } >
      <Modal
        animationType = "slide"
        transparent = {false}
        visible = { props.modalVisible }
        onRequestClose={ props.setModalVisible}
      >
        <View style={styles.modal}>
          <View style={styles.modalImage}>
            <Image 
              source={{uri: props.selectedItem.photo}}
              style={{width: "90%", height: 200}}
            />
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 10}}>
              <View>
                <Button style={{marginRight: 20}} title="Edit" onPress={props.handleIsEdit}/>
              </View>
              <View>
                <Button style={{marginRight: 20}} title="Delete" onPress = {() => props.handleItemDelete(props.selectedItem.key)}/>
              </View>
            </View>
          </View>
          <View style={{marginBottom: 10, marginLeft: 5, marginRight: 5}}>
            <Button title="Close" onPress={ props.setModalVisible }/>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    paddingTop: 20
  },
  modalImage: {
    flex: 1,
    alignItems: "center",
  }
})