import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome6';
import { useTheme } from '../utils/useTheme';
import { useAppDispatch } from '../store';
import { logoutUser } from '../store/slices/authSlice';

interface SettingItem {
  title: string;
  subtitle: string;
  icon: string;
  type: 'info' | 'arrow';
  onPress?: () => void;
  danger?: boolean;
}

const SettingsScreen = () => {
  const { colors, isDark } = useTheme();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const settingsSections = [
    {
      title: 'Tema Bilgisi',
      items: [
        {
          title: 'Tema Modu',
          subtitle: `Şu an ${isDark ? 'Dark' : 'Light'} mode aktif (Sistem otomatik)`,
          icon: isDark ? 'moon' : 'sun',
          type: 'info' as const,
        },
      ],
    },
    {
      title: 'Hesap',
      items: [
        {
          title: 'Profil Ayarları',
          subtitle: 'Profil bilgilerini düzenle',
          icon: 'user-gear',
          type: 'arrow' as const,
          onPress: () => console.log('Profil ayarları'),
        },
        {
          title: 'Güvenlik',
          subtitle: 'Şifre ve güvenlik ayarları',
          icon: 'shield-halved',
          type: 'arrow' as const,
          onPress: () => console.log('Güvenlik ayarları'),
        },
      ],
    },
    {
      title: 'Uygulama',
      items: [
        {
          title: 'Bildirimler',
          subtitle: 'Bildirim tercihlerini yönet',
          icon: 'bell',
          type: 'arrow' as const,
          onPress: () => console.log('Bildirim ayarları'),
        },
        {
          title: 'Gizlilik',
          subtitle: 'Gizlilik ve veri ayarları',
          icon: 'lock',
          type: 'arrow' as const,
          onPress: () => console.log('Gizlilik ayarları'),
        },
        {
          title: 'Hakkında',
          subtitle: 'Uygulama bilgileri',
          icon: 'circle-info',
          type: 'arrow' as const,
          onPress: () => console.log('Hakkında'),
        },
      ],
    },
    {
      title: 'Diğer',
      items: [
        {
          title: 'Çıkış Yap',
          subtitle: 'Hesabından çıkış yap',
          icon: 'right-from-bracket',
          type: 'arrow' as const,
          onPress: handleLogout,
          danger: true,
        },
      ],
    },
  ];

  const styles = createStyles(colors);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.title}>Ayarlar</Text>
          
          {/* Theme Info Card */}
          <View style={styles.themeCard}>
            <View style={styles.themeCardHeader}>
              <Icon 
                name={isDark ? 'moon' : 'sun'} 
                size={24} 
                color={colors.primary} 
                iconStyle="solid" 
              />
              <Text style={styles.themeCardTitle}>
                {isDark ? 'Dark Mode' : 'Light Mode'} Aktif
              </Text>
            </View>
            <Text style={styles.themeCardSubtitle}>
              Tema otomatik olarak sistem ayarınızı takip ediyor. Cihazınızın tema ayarını değiştirerek uygulamanın temasını değiştirebilirsiniz.
            </Text>
          </View>

          {/* Settings Sections */}
          {settingsSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              {section.items.map((item: SettingItem, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    item.danger && styles.settingItemDanger,
                    item.type === 'info' && styles.settingItemInfo,
                  ]}
                  onPress={item.onPress}
                  disabled={item.type === 'info'}
                >
                  <View style={styles.settingItemLeft}>
                    <View style={[
                      styles.settingIcon,
                      { backgroundColor: item.danger ? colors.error + '20' : colors.primary + '20' }
                    ]}>
                      <Icon 
                        name={item.icon as any} 
                        size={18} 
                        color={item.danger ? colors.error : colors.primary} 
                        iconStyle="solid" 
                      />
                    </View>
                    <View style={styles.settingText}>
                      <Text style={[
                        styles.settingTitle,
                        item.danger && styles.settingTitleDanger,
                      ]}>
                        {item.title}
                      </Text>
                      <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>
                  
                  {item.type === 'arrow' && (
                    <View style={styles.settingItemRight}>
                      <Icon 
                        name="chevron-right" 
                        size={14} 
                        color={colors.textSecondary} 
                        iconStyle="solid" 
                      />
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
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
    marginBottom: 24,
  },
  themeCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  themeCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  themeCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  themeCardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    marginLeft: 4,
  },
  settingItem: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  settingItemDanger: {
    borderColor: colors.error + '30',
  },
  settingItemInfo: {
    opacity: 0.8,
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  settingTitleDanger: {
    color: colors.error,
  },
  settingSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  settingItemRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingsScreen;