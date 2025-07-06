import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useTheme } from '../utils/useTheme';

const HomeScreen = ({ navigation }: any) => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { colors, isDark } = useTheme();

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  const quickActions = [
    {
      title: 'Tema Modu',
      subtitle: `Şu an ${isDark ? 'Dark' : 'Light'} mode (Sistem otomatik)`,
      icon: (isDark ? 'moon' : 'sun') as any,
      color: colors.primary,
      action: () => {}, // Sadece bilgi gösterimi
    },
    {
      title: 'Ayarlar',
      subtitle: 'Uygulama ayarlarını yönet',
      icon: 'gear' as any,
      color: colors.secondary,
      action: () => navigation.navigate('Ayarlar'),
    },
    {
      title: 'Profil',
      subtitle: 'Profil bilgilerini görüntüle',
      icon: 'user' as any,
      color: colors.error,
      action: () => navigation.navigate('Profil'),
    },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>MyApp</Text>
          <Text style={styles.subtitle}>React Native Template'ine hoş geldiniz!</Text>
          
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="chart-line" size={20} color={colors.primary} iconStyle="solid" />
              <Text style={styles.cardTitle}>Uygulama Bilgileri</Text>
            </View>
            <Text style={styles.cardText}>🚀 Redux Store entegre edildi</Text>
            <Text style={styles.cardText}>🔐 JWT Authentication hazır</Text>
            <Text style={styles.cardText}>📱 Modern UI componentleri</Text>
            <Text style={styles.cardText}>⚡ Axios interceptor kurulu</Text>
            <Text style={styles.cardText}>🎨 Dark/Light theme sistemi</Text>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Hızlı Eylemler</Text>
          </View>

          {quickActions.map((action, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.actionCard} 
              onPress={action.action}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color + '20' }]}>
                <Icon name={action.icon} size={24} color={action.color} iconStyle="solid" />
              </View>
              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>{action.title}</Text>
                <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
              </View>
              <Icon name="chevron-right" size={16} color={colors.border} iconStyle="solid" />
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
            <Icon name="ellipsis" size={18} color="#fff" iconStyle="solid" />
            <Text style={styles.drawerButtonText}>Daha Fazla Seçenek</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <BottomDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        title="Daha Fazla Seçenek"
      >
        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.drawerActionButton}>
            <View style={styles.drawerActionContent}>
              <Icon name="circle-info" size={20} color={colors.primary} iconStyle="solid" />
              <Text style={styles.drawerActionText}>Uygulama Hakkında</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.drawerActionButton}>
            <View style={styles.drawerActionContent}>
              <Icon name="bell" size={20} color={colors.primary} iconStyle="solid" />
              <Text style={styles.drawerActionText}>Bildirim Ayarları</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.drawerActionButton}>
            <View style={styles.drawerActionContent}>
              <Icon name="shield-halved" size={20} color={colors.primary} iconStyle="solid" />
              <Text style={styles.drawerActionText}>Gizlilik</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.drawerActionButton}>
            <View style={styles.drawerActionContent}>
              <Icon name="circle-question" size={20} color={colors.primary} iconStyle="solid" />
              <Text style={styles.drawerActionText}>Yardım & Destek</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomDrawer>
    </SafeAreaView>
  );
};

const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginBottom: 50,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 30,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionCard: {
    backgroundColor: colors.card,
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContent: {
    flex: 1,
    marginLeft: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  actionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  drawerButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: colors.shadowColor,
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  drawerButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
  drawerContent: {
    paddingVertical: 10,
  },
  drawerActionButton: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  drawerActionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  drawerActionText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});

export default HomeScreen;