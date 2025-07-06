import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Icon from '@react-native-vector-icons/fontawesome6';

const HomeScreen = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const openDrawer = () => setIsDrawerVisible(true);
  const closeDrawer = () => setIsDrawerVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Ana Sayfa</Text>
          <Text style={styles.subtitle}>Hoş geldiniz!</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Günlük Özet</Text>
            <Text style={styles.cardText}>Bugün harika bir gün!</Text>
          </View>
          
          <TouchableOpacity style={styles.card} onPress={openDrawer}>
            <Text style={styles.cardTitle}>Hızlı Eylemler</Text>
            <Text style={styles.cardText}>Buradan hızlı işlemler yapabilirsiniz.</Text>
            <Text style={styles.cardSubtext}>Dokunarak drawer'ı açın</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.drawerButton} onPress={openDrawer}>
            <Text style={styles.drawerButtonText}>Bottom Drawer Aç</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      <BottomDrawer
        isVisible={isDrawerVisible}
        onClose={closeDrawer}
        title="Hızlı Eylemler"
      >
        <View style={styles.drawerContent}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Icon name="user" size={20} color="#3498db" iconStyle="solid" />
              <Text style={styles.actionButtonText}>Profil Ayarları</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Icon name="bell" size={20} color="#3498db" iconStyle="solid" />
              <Text style={styles.actionButtonText}>Bildirimler</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Icon name="chart-bar" size={20} color="#3498db" iconStyle="solid" />
              <Text style={styles.actionButtonText}>İstatistikler</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionButtonContent}>
              <Icon name="circle-question" size={20} color="#3498db" iconStyle="solid" />
              <Text style={styles.actionButtonText}>Yardım</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomDrawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  drawerButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
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
  },
  drawerContent: {
    paddingVertical: 10,
  },
  actionButton: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});

export default HomeScreen;