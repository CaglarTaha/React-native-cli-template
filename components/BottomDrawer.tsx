import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
  Modal,
} from 'react-native';
import { useTheme } from '../utils/useTheme';

const { height: screenHeight } = Dimensions.get('window');

interface BottomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

const BottomDrawer: React.FC<BottomDrawerProps> = ({
  isVisible,
  onClose,
  title = "Bottom Drawer",
  children,
}) => {
  const { colors } = useTheme();
  const translateY = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Immediate close without animation delay
  const closeDrawer = () => {
    if (isClosing) return;
    setIsClosing(true);
    
    // Immediately hide backdrop
    backdropOpacity.setValue(0);
    setModalVisible(false);
    Animated.spring(translateY, {
      toValue: screenHeight,
      friction: 12,
      tension: 150,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setIsClosing(false);
      onClose();
    });
  };

  // Fast swipe response
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dy > 5 && Math.abs(gestureState.dx) < 50;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        translateY.setValue(gestureState.dy);
        // Immediate backdrop fade based on swipe
        const progress = Math.min(gestureState.dy / 100, 1);
        const opacity = Math.max(0, 1 - progress);
        backdropOpacity.setValue(opacity);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 80) {
        closeDrawer();
      } else {
        Animated.parallel([
          Animated.spring(translateY, {
            toValue: 0,
            friction: 10,
            tension: 120,
            useNativeDriver: true,
          }),
          Animated.timing(backdropOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          })
        ]).start();
      }
    },
  });

  useEffect(() => {
    if (isVisible) {
      setModalVisible(true);
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          friction: 10,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    } else if (!isClosing) {
      backdropOpacity.setValue(0);
      translateY.setValue(screenHeight);
      setModalVisible(false);
    }
  }, [isVisible]);

  const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
      backgroundColor: colors.surface,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: screenHeight * 0.8,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: -2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 10,
      elevation: 1000,
    },
    handle: {
      paddingVertical: 15,
      paddingHorizontal: 50,
      alignSelf: 'center',
    },
    handleBar: {
      width: 40,
      height: 4,
      backgroundColor: colors.border,
      borderRadius: 2,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
    },
    closeButton: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeText: {
      fontSize: 16,
      color: colors.textSecondary,
      fontWeight: '600',
    },
    content: {
      padding: 20,
      paddingBottom: 40,
    },
    defaultContent: {
      alignItems: 'center',
      paddingVertical: 40,
    },
    defaultText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    defaultSubtext: {
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
    instructionText: {
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: 15,
      fontStyle: 'italic',
    },
  });

  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
      onRequestClose={closeDrawer}
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeDrawer}>
          <Animated.View 
            style={[
              styles.backdrop,
              { opacity: backdropOpacity }
            ]} 
          />
        </TouchableWithoutFeedback>
        
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateY }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity style={styles.handle} activeOpacity={0.7}>
            <View style={styles.handleBar} />
          </TouchableOpacity>
          
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={closeDrawer} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            {children || (
              <View style={styles.defaultContent}>
                <Text style={styles.defaultText}>Bottom Drawer İçeriği</Text>
                <Text style={styles.defaultSubtext}>
                  Buraya istediğiniz içeriği ekleyebilirsiniz.
                </Text>
                <Text style={styles.instructionText}>
                  Swipe aşağı veya handle'a dokunarak kapatabilirsiniz
                </Text>
              </View>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default BottomDrawer;