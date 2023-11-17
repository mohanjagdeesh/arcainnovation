import { Modal, View, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import { styles } from "./StyleSheet";
import SelectDropdown from "react-native-select-dropdown";

const idS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function ModalView(props) {
  const { inputs, setInputs } = props;
  const { reset, handleSubmit, control } = useForm();

  const submitEmployeeDetails = (data) => {
    const lastEmployeId = inputs.employes[inputs.employes.length - 1]["id"];
    const employeDetails = {
      ...data,
      id: lastEmployeId + 1,
      parentId: parseInt(data.parentId),
    };
    setInputs({
      ...inputs,
      employes: [...inputs.employes, employeDetails],
      isModalOpen: false,
    });
    reset();
  };
  return (
    <View style={styles.modalContainer}>
      <Modal
        animationType="slide"
        onRequestClose={() => setInputs({ ...inputs, isModalOpen: false })}
        visible={inputs.isModalOpen}
      >
        <View style={styles.modalView}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.modalInput}
                placeholder="Enter Name"
              />
            )}
            name="name"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.modalInput}
                placeholder="Enter Email"
              />
            )}
            name="email"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.modalInput}
                placeholder="Enter Mobine Number"
              />
            )}
            name="phone"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                style={styles.modalInput}
                placeholder="Enter Address"
              />
            )}
            name="address"
            defaultValue=""
          />
          <View style={styles.containerInput}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={{ backgroundColor: "lightgray", width: "100%" }}
                >
                  <Picker.Item label="Select Parent ID" value="" />
                  <Picker.Item label="Parent ID 1" value="1" />
                  <Picker.Item label="Parent ID 2" value="2" />
                  <Picker.Item label="Parent ID 3" value="3" />
                  <Picker.Item label="Parent ID 4" value="4" />
                  <Picker.Item label="Parent ID 5" value="5" />
                  <Picker.Item label="Parent ID 6" value="6" />
                  <Picker.Item label="Parent ID 7" value="7" />
                  <Picker.Item label="Parent ID 8" value="8" />
                  <Picker.Item label="Parent ID 9" value="9" />
                  <Picker.Item label="Parent ID 10" value="10" />
                  <Picker.Item label="Parent ID 11" value="11" />
                </Picker>
              )}
              name="parentId"
              defaultValue=""
            />
          </View>
          <View style={styles.containerInput}>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <Picker
                  selectedValue={value}
                  onValueChange={(itemValue) => onChange(itemValue)}
                  style={{
                    backgroundColor: "lightgray",
                    width: "100%",
                  }}
                >
                  <Picker.Item label="Select Background Color" value="" />
                  <Picker.Item label="Red" value="red" />
                  <Picker.Item label="Blue" value="blue" />
                  <Picker.Item label="Green" value="green" />
                  <Picker.Item label="Yellow" value="yellow" />
                  <Picker.Item label="White" value="white" />
                </Picker>
              )}
              name="backgroundColor"
              defaultValue=""
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Submit"
              onPress={handleSubmit(submitEmployeeDetails)}
            />
            <Button
              title="Close"
              onPress={() => setInputs({ ...inputs, isModalOpen: false })}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
