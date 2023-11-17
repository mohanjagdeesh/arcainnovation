import {
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import ModalView from "../components/ModalView";
import { Link } from "expo-router";
import { styles } from "../components/StyleSheet";
import user from "../assets/user.jpg";

export default function employees() {
  // Setting Up Component's State Management
  const [inputs, setInputs] = useState({
    isLoading: true,
    employes: [],
    error: "",
    searchValue: "",
    isModalOpen: false,
  });

  // Fetching Employees List From API
  useEffect(() => {
    fetch("https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d")
      .then((res) => res.json())
      .then(
        (result) => {
          setInputs({ ...inputs, isLoading: false, employes: result });
        },
        (error) => {
          setInputs({ ...inputs, isLoading: false, error });
        }
      );
  }, []);

  // Conditional Viewing Of Loading Indicator While Data Is Fetching From API
  if (inputs?.isLoading) {
    return (
      <View style={styles.loadingIndicator}>
        <ActivityIndicator
          size="large"
          color="black"
          animating={inputs?.isLoading}
        />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Employees List</Text>
      <TextInput
        onChangeText={(e) => setInputs({ ...inputs, searchValue: e })}
        placeholder="Search Employee"
        style={styles.textInput}
      />

      <Button
        onPress={() => setInputs({ ...inputs, isModalOpen: true })}
        title="Add Employee"
      />
      <ScrollView>
        {inputs?.employes
          ?.filter((each) => {
            return inputs.searchValue.toLowerCase() === ""
              ? each
              : each?.name
                  .toLowerCase()
                  .includes(inputs.searchValue.toLowerCase());
          })
          .map((each) => {
            const getManager = () => {
              const mathedManager = inputs.employes?.filter((eachOne) => {
                return eachOne.id === each.parentId;
              });
              return mathedManager[0]?.name
                ? mathedManager[0]?.name
                : "Manager Not Found";
            };

            return (
              <View
                style={[
                  styles.employesCard,
                  each.backgroundColor
                    ? { backgroundColor: each.backgroundColor }
                    : { backgroundColor: "green" },
                ]}
                key={each?.id}
              >
                <Image style={styles.userImage} source={user} />
                <Text style={styles.employeDetailsText}>
                  <Text style={styles.employeName}>Name:-</Text> {each?.name}
                </Text>
                <Text style={styles.employeDetailsText}>
                  <Text style={styles.employeName}>Email:-</Text> {each?.email}
                </Text>
                <Text style={styles.employeDetailsText}>
                  <Text style={styles.employeName}>Mobile:-</Text> {each?.phone}
                </Text>
                <Text style={styles.employeDetailsText}>
                  <Text style={styles.employeName}>Manager:-</Text>
                  {getManager()}
                </Text>

                <Link href={{ pathname: "/employee", params: each }}>
                  <Text style={styles.getDetails}>Get Details--{">"}</Text>
                </Link>
              </View>
            );
          })}
        <ModalView inputs={inputs} setInputs={setInputs} />
      </ScrollView>
    </View>
  );
}
