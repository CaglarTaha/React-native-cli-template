import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useTheme } from '../utils/useTheme';

const ProfileScreen: React.FC = () => {
  const { colors } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { text: 'Çıkış Yap', style: 'destructive', onPress: () => console.log('Logout') }
      ]
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 30,
    },
    profileCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      marginBottom: 30,
      alignItems: 'center',
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    name: {
      fontSize: 22,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 8,
    },
    email: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    avatarContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: colors.primary + '20', // %20 opacity
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    menuItemContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    menuContainer: {
      flex: 1,
    },
    menuItem: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      shadowColor: colors.shadowColor,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    menuText: {
      fontSize: 16,
      color: colors.text,
    },
    logoutButton: {
      backgroundColor: colors.error,
      marginTop: 20,
    },
    logoutText: {
      color: '#fff',
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profil</Text>
        
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Icon name="user" iconStyle="solid" size={40} color={colors.primary} />
          </View>
          <Text style={styles.name}>Kullanıcı Adı</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Icon name="gear" iconStyle="solid" size={18} color={colors.primary} />
              <Text style={styles.menuText}>Hesap Ayarları</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Icon name="bell" iconStyle="solid" size={18} color={colors.primary} />
              <Text style={styles.menuText}>Bildirimler</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Icon name="shield" iconStyle="solid" size={18} color={colors.primary} />
              <Text style={styles.menuText}>Gizlilik</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <Icon name="circle-question" iconStyle="solid" size={18} color={colors.primary} />
              <Text style={styles.menuText}>Yardım</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, styles.logoutButton]} onPress={handleLogout}>
            <View style={styles.menuItemContent}>
              <Icon name="right-from-bracket" iconStyle="solid" size={18} color="#fff" />
              <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;