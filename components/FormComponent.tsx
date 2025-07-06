import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'phone';
  placeholder?: string;
  required?: boolean;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    message?: string;
  };
}

export interface CustomButton {
  text: string;
  onPress: () => void;
  style?: 'primary' | 'secondary' | 'google' | 'apple';
}

export interface FormConfig {
  title: string;
  fields: FormField[];
  submitButtonText?: string;
  onSubmit: (data: Record<string, string>) => void;
  showCancelButton?: boolean;
  onCancel?: () => void;
  customButtons?: CustomButton[];
}

interface FormComponentProps {
  config: FormConfig;
}

const FormComponent: React.FC<FormComponentProps> = ({ config }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: '',
      }));
    }
  };

  const validateField = (field: FormField, value: string): string | null => {
    // Required field validation
    if (field.required && (!value || value.trim() === '')) {
      return `${field.label} is required`;
    }

    // Skip other validations if field is empty and not required
    if (!value || value.trim() === '') {
      return null;
    }

    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation
    if (field.type === 'phone') {
      const phoneRegex = /^\d{10,15}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        return 'Please enter a valid phone number';
      }
    }

    // Custom validation
    if (field.validation) {
      const { minLength, maxLength, pattern, message } = field.validation;

      if (minLength && value.length < minLength) {
        return message || `${field.label} must be at least ${minLength} characters`;
      }

      if (maxLength && value.length > maxLength) {
        return message || `${field.label} must be no more than ${maxLength} characters`;
      }

      if (pattern && !pattern.test(value)) {
        return message || `${field.label} format is invalid`;
      }
    }

    return null;
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    
    // Validate all fields
    config.fields.forEach(field => {
      const value = formData[field.name] || '';
      const error = validateField(field, value);
      if (error) {
        newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    // Submit form
    config.onSubmit(formData);
  };

  const getKeyboardType = (fieldType: string) => {
    switch (fieldType) {
      case 'email':
        return 'email-address';
      case 'number':
        return 'numeric';
      case 'phone':
        return 'phone-pad';
      default:
        return 'default';
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name] || '';
    const error = errors[field.name];

    return (
      <View key={field.name} style={styles.fieldContainer}>
        <Text style={styles.label}>
          {field.label}
          {field.required && <Text style={styles.required}>*</Text>}
        </Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={value}
          onChangeText={(text) => handleInputChange(field.name, text)}
          placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
          secureTextEntry={field.type === 'password'}
          keyboardType={getKeyboardType(field.type)}
          autoCapitalize={field.type === 'email' ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

  const renderCustomButton = (button: CustomButton, index: number) => {
    const getButtonStyle = () => {
      switch (button.style) {
        case 'google':
          return styles.googleButton;
        case 'apple':
          return styles.appleButton;
        case 'secondary':
          return styles.cancelButton;
        default:
          return styles.submitButton;
      }
    };

    const getTextStyle = () => {
      switch (button.style) {
        case 'google':
          return styles.googleButtonText;
        case 'apple':
          return [styles.submitButtonText, styles.appleButtonText];
        case 'secondary':
          return styles.cancelButtonText;
        default:
          return styles.submitButtonText;
      }
    };

    const renderButtonContent = () => {
      if (button.style === 'google') {
        return (
          <View style={styles.buttonContent}>
            <Icon name="google" size={18} color="#db4437" iconStyle="brand" />
            <Text style={getTextStyle()}>{button.text}</Text>
          </View>
        );
      } else if (button.style === 'apple') {
        return (
          <View style={styles.buttonContent}>
            <Icon name="apple" size={18} color="#fff" iconStyle="brand" />
            <Text style={getTextStyle()}>{button.text}</Text>
          </View>
        );
      }
      return <Text style={getTextStyle()}>{button.text}</Text>;
    };

    return (
      <TouchableOpacity
        key={index}
        style={getButtonStyle()}
        onPress={button.onPress}
        activeOpacity={0.8}
      >
        {renderButtonContent()}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{config.title}</Text>
      
      {config.fields.map(renderField)}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {config.submitButtonText || 'Submit'}
          </Text>
        </TouchableOpacity>

        {config.showCancelButton && config.onCancel && (
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={config.onCancel}
            activeOpacity={0.8}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}

        {config.customButtons && config.customButtons.map(renderCustomButton)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  required: {
    color: '#e74c3c',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fdf2f2',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  appleButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    paddingVertical: 15,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    alignItems: 'center',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  appleButtonText: {
    color: '#fff',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
});

export default FormComponent;