import { useLocalSearchParams } from "expo-router";
import { Text, View, Image } from "react-native";
import { styles } from "../components/StyleSheet";
import user from "../assets/user.jpg";

const employee = () => {
  const params = useLocalSearchParams();
  return (
    <View
      style={[
        styles.employeeContainer,
        params.backgroundColor
          ? { backgroundColor: params.backgroundColor }
          : { backgroundColor: "green" },
      ]}
    >
      <View style={styles.employeCard}>
        <Image style={styles.userImage} source={user} />
        <Text style={styles.employeDetailsText}>
          <Text style={styles.employeName}>Name:-</Text> {params?.name}
        </Text>
        <Text style={styles.employeDetailsText}>
          <Text style={styles.employeName}>Email:-</Text> {params?.email}
        </Text>
        <Text style={styles.employeDetailsText}>
          <Text style={styles.employeName}>Mobile:-</Text> {params?.phone}
        </Text>
        <Text style={styles.employeDetailsText}>
          <Text style={styles.employeName}>Address:-</Text> {params?.address}
        </Text>
      </View>
    </View>
  );
};

export default employee;
