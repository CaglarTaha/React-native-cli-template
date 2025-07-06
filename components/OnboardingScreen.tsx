import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onFinish: () => void;
}

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  iconName: string;
  iconStyle: 'solid' | 'regular' | 'brand';
  backgroundColor: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to MyApp',
    description: 'Discover amazing features and boost your productivity with our innovative app.',
    iconName: 'hand',
    iconStyle: 'solid',
    backgroundColor: '#4A90E2',
  },
  {
    id: 2,
    title: 'Easy to Use',
    description: 'Simple and intuitive interface designed for everyone. Get started in seconds.',
    iconName: 'bolt',
    iconStyle: 'solid',
    backgroundColor: '#50C878',
  },
  {
    id: 3,
    title: 'Stay Connected',
    description: 'Connect with friends and share your experiences. Build meaningful connections.',
    iconName: 'star',
    iconStyle: 'solid',
    backgroundColor: '#FF6B6B',
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onFinish();
    }
  };

  const skipOnboarding = () => {
    onFinish();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <View style={[styles.container, { backgroundColor: currentStepData.backgroundColor }]}>
      <StatusBar barStyle="light-content" backgroundColor={currentStepData.backgroundColor} />
      
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <Icon 
            name={currentStepData.iconName} 
            iconStyle={currentStepData.iconStyle}
            size={80} 
            color="#FFFFFF" 
          />
        </View>

        <Text style={styles.title}>{currentStepData.title}</Text>
        <Text style={styles.description}>{currentStepData.description}</Text>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.indicatorContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentStep ? styles.activeIndicator : styles.inactiveIndicator,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={nextStep}>
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  skipButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  skipText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: width * 0.8,
  },
  bottomContainer: {
    alignItems: 'center',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  indicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  activeIndicator: {
    backgroundColor: '#FFFFFF',
  },
  inactiveIndicator: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  nextButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default OnboardingScreen;