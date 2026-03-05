import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

export default function FormScreen() {
  const [petImage, setPetImage] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      breed: "",
      age: "",
      price: "",
    },
  });

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Gallery access is required.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPetImage(result.assets[0].uri);
  };

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Camera access is required.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) setPetImage(result.assets[0].uri);
  };

  const showImageOptions = () => {
    Alert.alert("Select Image", "Choose a source", [
      { text: "Camera", onPress: pickFromCamera },
      { text: "Gallery", onPress: pickFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const onSubmit = (data) => {
    if (!petImage) {
      Alert.alert("Missing Image", "Please upload a photo of your pet.");
      return;
    }
    console.log({ ...data, image: petImage });
    Alert.alert("Success! 🐾", "Your pet has been listed for sale!");
  };

  const fields = [
    { name: "name", label: " Name", placeholder: "e.g. Buddy" },
    { name: "breed", label: " Breed", placeholder: "e.g. Labrador" },
    {
      name: "age",
      label: " Age",
      placeholder: "e.g. 2 years",
      keyboardType: "numeric",
    },
    {
      name: "price",
      label: " Price ($)",
      placeholder: "e.g. 500",
      keyboardType: "numeric",
    },
  ];

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Sell Your Pet</Text>
            <Text style={styles.subtitle}>
              Fill in the details below to list your pet
            </Text>
          </View>

          <View style={styles.card}>
            {fields.map(({ name, label, placeholder, keyboardType }) => (
              <View key={name} style={styles.fieldRow}>
                <Text style={styles.label}>{label}</Text>
                <Controller
                  control={control}
                  name={name}
                  rules={{ required: `${label} is required` }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, errors[name] && styles.inputError]}
                      placeholder={placeholder}
                      placeholderTextColor="#aaa"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      keyboardType={keyboardType || "default"}
                    />
                  )}
                />
                {errors[name] && (
                  <Text style={styles.errorText}>{errors[name].message}</Text>
                )}
              </View>
            ))}

            {/* Image Picker Row */}
            <View style={styles.fieldRow}>
              <Text style={styles.label}> Pet Photo</Text>
              <View style={styles.imageRow}>
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={showImageOptions}
                >
                  {petImage ? (
                    <Image source={{ uri: petImage }} style={styles.petImage} />
                  ) : (
                    <View style={styles.imagePlaceholder}>
                      <Text style={styles.imagePlaceholderText}>
                        Tap to add photo
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
                <View style={styles.imageButtons}>
                  <TouchableOpacity
                    style={styles.imgBtn}
                    onPress={pickFromCamera}
                  >
                    <Text style={styles.imgBtnText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imgBtn}
                    onPress={pickFromGallery}
                  >
                    <Text style={styles.imgBtnText}>Gallery</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit(onSubmit)}
          >
            <Text style={styles.submitText}>List My Pet </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f0eb" },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  header: { alignItems: "center", paddingVertical: 28 },

  title: { fontSize: 26, fontWeight: "800", color: "#2d2d2d", marginTop: 8 },
  subtitle: { fontSize: 14, color: "#888", marginTop: 4 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    gap: 6,
  },

  fieldRow: { gap: 8 },
  label: { fontSize: 13, fontWeight: "700", color: "#444", marginBottom: 2 },
  input: {
    borderWidth: 1.5,
    borderColor: "#e0d9d0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2d2d2d",
    backgroundColor: "#faf9f7",
  },
  inputError: { borderColor: "#ff6b6b" },
  errorText: { fontSize: 12, color: "#ff6b6b", marginTop: 2 },

  imageRow: { flexDirection: "row", gap: 14, alignItems: "center" },
  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#e0d9d0",
    borderStyle: "dashed",
  },
  petImage: { width: "100%", height: "100%" },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: "#faf9f7",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  imagePlaceholderIcon: { fontSize: 24 },
  imagePlaceholderText: { fontSize: 10, color: "#aaa", textAlign: "center" },

  imageButtons: { flex: 1, gap: 10 },
  imgBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f5f0eb",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  imgBtnIcon: { fontSize: 18 },
  imgBtnText: { fontSize: 14, fontWeight: "600", color: "#555" },

  submitBtn: {
    marginTop: 24,
    backgroundColor: "#ff7043",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#ff7043",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  submitText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
