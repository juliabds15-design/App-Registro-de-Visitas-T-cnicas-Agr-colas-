import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BotaoCustomizado({ titulo, onPress, tipo = 'primary' }) {
  const obterCorFundo = () => {
    switch (tipo) {
      case 'success': return '#2ECC71';
      case 'warning': return '#E67E22';
      default: return '#2980B9';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: obterCorFundo() }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.textoBotao}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8,
    alignItems: 'center', marginVertical: 6, width: '100%' },
  textoBotao: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' }
});