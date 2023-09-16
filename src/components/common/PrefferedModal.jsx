import { Dimensions } from "react-native";
import React from "react";
import { Center, Text, Modal, Select,Box, CheckIcon } from "native-base";
import Colors from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

const {width} = Dimensions.get('window')

export default function PrefferedModal({ open, setOpen,prefType }) {

  const {user} = useSelector(state=> state.user)

  const colorScheme = useColorScheme()
  return (

      <Modal isOpen={open.open} onClose={()=> setOpen({open:false,name:null})}>
        <Modal.Content minW='96' bg='indigo.300'>
          <Modal.CloseButton />
          <Modal.Header flexDirection='row' bg='indigo.300' color={Colors[colorScheme].text} borderBottomColor='indigo.300'>
            <Text fontSize='lg'>{prefType} Seçiniz</Text>
          </Modal.Header>

          <Modal.Body>
                <Select accessibilityLabel="Kategori Seçiniz" borderColor='indigo.800' color='black' size='2xl' placeholder="Seç"
                  _selectedItem={{endIcon:<CheckIcon size="3" />,bg:'teal.600'}}
                >
                  <Select.Item label="Meyveler" value="Meyveler"></Select.Item>
                  <Select.Item label="Sebzeler" value="Sebzeler"></Select.Item>
                  <Select.Item label="Baklagil" value="Baklagil"></Select.Item>
                  <Select.Item label="Kuru Yemiş" value="Kuru Yemiş"></Select.Item>
                  <Select.Item label="Deniz Ürünleri" value="Deniz Ürünleri"></Select.Item>
                  <Select.Item label="Hayvansal Gıda" value="Hayvansal Gıda"></Select.Item>
                </Select>

                <Box flexDirection='row' flexWrap='wrap' mt='2'>
                    {
                      prefType === 'Kategori' ?(
                        user?.preffererCategory?.map((item,index)=> (
                          <Box key={index} px='2' py='1' mt='2.5' ml='2.5' rounded='xl' 
                             borderColor='indigo.700'
                             bg='indigo.700'
                             shadow='0' borderWidth='1'>
                             <Text style={{color:Colors[colorScheme].text}}>{item}</Text>
                          </Box>
                        ))
                      ):(
                        user?.preffererproduct?.map((item,index)=> (
                          <Box key={index} px='2' py='1' mt='2.5' ml='2.5' rounded='xl' 
                             borderColor='indigo.700'
                             bg='indigo.700'
                             shadow='0' borderWidth='1'>
                             <Text style={{color:Colors[colorScheme].text}}>{item}</Text>
                          </Box>
                        ))
                      )
                      
                    }
                </Box>
          </Modal.Body>
        </Modal.Content>
      </Modal>
  );
}
