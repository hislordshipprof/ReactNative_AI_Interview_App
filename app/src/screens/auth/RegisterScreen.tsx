import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useAuth } from '../../context/AuthContext';
import LogoSvgComponent from '../../components/LogoSvgComponent';
import { supabase } from '../../lib/supabase';
import { uploadImage, uploadDocument } from '../../lib/storage-helpers';
import { DeepLinkingConfig } from '../../lib/deepLinking';

interface RegisterScreenProps {
  navigation: any;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const { signUp } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<string | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handlePickResume = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });
      
      if (result.canceled === false) {
        setResumeFile(result.assets[0].uri);
      }
    } catch (err) {
      console.error('Error picking document:', err);
    }
  };

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Register user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: fullName,
            job_title: jobTitle,
            industry: industry
          },
          emailRedirectTo: DeepLinkingConfig.redirectUrl,
        },
      });
      
      if (error) throw error;
      
      if (data?.user) {
        const userId = data.user.id;
        
        // Upload profile image if selected
        let profileImageUrl = null;
        if (profileImage) {
          profileImageUrl = await uploadImage(profileImage, 'profiles', userId);
        }
        
        // Upload resume if selected
        let resumeUrl = null;
        if (resumeFile) {
          resumeUrl = await uploadDocument(resumeFile, 'resumes', userId, 'pdf');
        }
        
        // Update user profile with additional data
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            avatar_url: profileImageUrl,
            resume_url: resumeUrl,
            job_title: jobTitle,
            industry: industry || null  // Use null if industry is empty
          })
          .eq('id', userId);
          
        if (profileError) {
          console.error('Error updating profile:', profileError);
        }
      }
      
      Alert.alert(
        'Registration Successful', 
        'Please check your email to verify your account.',
        [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]
      );
      
    } catch (error: any) {
      console.error('Registration error:', error.message);
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <LogoSvgComponent width={200} height={50} />
        </View>
        
        <Text style={styles.title}>Practice job interviews with AI</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#666"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Job Title (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="What position are you targeting?"
            placeholderTextColor="#666"
            value={jobTitle}
            onChangeText={setJobTitle}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Industry (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="What industry do you work in?"
            placeholderTextColor="#666"
            value={industry}
            onChangeText={setIndustry}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Profile picture (optional)</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handlePickImage}
          >
            <Text style={styles.uploadButtonText}>
              {profileImage ? 'Change image' : 'Upload an image'}
            </Text>
          </TouchableOpacity>
          {profileImage && (
            <Image 
              source={{ uri: profileImage }} 
              style={styles.previewImage} 
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Resume (optional)</Text>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handlePickResume}
          >
            <Text style={styles.uploadButtonText}>
              {resumeFile ? 'Change PDF' : 'Upload a PDF'}
            </Text>
          </TouchableOpacity>
          {resumeFile && (
            <Text style={styles.fileName}>
              Resume uploaded
            </Text>
          )}
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleRegister}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Create an account</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContent: {
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    alignSelf: 'center',
  },
  fileName: {
    color: '#fff',
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#D0BCFF',
    borderRadius: 30,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  footerText: {
    color: '#fff',
    marginRight: 5,
  },
  linkText: {
    color: '#D0BCFF',
    fontWeight: 'bold',
  },
});

export default RegisterScreen; 