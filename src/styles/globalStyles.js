import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F6F9', padding: 16 },
  cardVisita: { backgroundColor: '#FFFFFF', borderRadius: 12, padding: 16,
                marginBottom: 16, elevation: 2 },
  tituloSecao: { fontSize: 16, fontWeight: '700', color: '#2C3E50', marginBottom: 12,
                 borderBottomWidth: 1, borderBottomColor: '#ECF0F1', paddingBottom: 4 },
  textoInformativo: { fontSize: 14, color: '#7F8C8D', marginVertical: 4 },
  imagePreview: { width: '100%', height: 200, borderRadius: 8, marginTop: 12,
                  resizeMode: 'cover' },
  itemListaContato: { padding: 12, backgroundColor: '#F8F9FA', borderRadius: 8,
                      marginVertical: 4, borderWidth: 1, borderColor: '#E9ECEF' },
  nomeContatoText: { fontSize: 15, fontWeight: '600', color: '#333333' },
  telefoneContatoText: { fontSize: 13, color: '#666666' },
  campoBusca: { borderWidth: 1, borderColor: '#E9ECEF', borderRadius: 8,
                paddingHorizontal: 12, paddingVertical: 8, marginTop: 10,
                backgroundColor: '#FFFFFF' },
  listaContatos: { height: 220, marginTop: 8 }
});