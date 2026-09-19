import React, { useState, useCallback, useRef } from 'react';
import { View, Text, ScrollView, Alert, Image, FlatList, TextInput, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts/legacy';
import { globalStyles } from '../styles/globalStyles';
import BotaoCustomizado from '../components/BotaoCustomizado';

// Quantidade de contatos carregados por pagina (pageSize)
const TAMANHO_PAGINA = 30;

export default function RegistroVisitaScreen() {
  // Estados para dados consolidados da auditoria tecnica
  const [localizacao, setLocalizacao] = useState(null);
  const [imagemEvidencia, setImagemEvidencia] = useState(null);
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [listaContatosDisponiveis, setListaContatosDisponiveis] = useState([]);

  // Estados de controle da paginacao sob demanda e da busca nativa
  const [termoBusca, setTermoBusca] = useState('');
  const [deslocamentoPagina, setDeslocamentoPagina] = useState(0);
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const [possuiMaisRegistros, setPossuiMaisRegistros] = useState(true);
  const [permissaoConcedida, setPermissaoConcedida] = useState(false);

  // Referencia do temporizador usado para adiar a busca enquanto o usuario digita
  const temporizadorBusca = useRef(null);

  // Captura automatica de coordenadas de auditoria (GPS)
  const capturarCoordenadasGPS = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro de Permissao', 'O acesso ao GPS e vital para a validacao legal da auditoria.');
      return;
    }
    const posicao = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
    setLocalizacao(posicao.coords);
  };

  // Captura de imagem documental em campo (Camera)
  const capturarFotoEvidencia = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro de Permissao', 'Acesso a camera e obrigatorio para registro fotodocumental.');
      return;
    }
    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false
    });
    if (!resultado.canceled) {
      setImagemEvidencia(resultado.assets[0].uri);
    }
  };

  // Consulta uma pagina de contatos direto na base nativa do aparelho,
  // filtrando as strings pelo parametro name e limitando o volume por pageSize
  const consultarPaginaDeContatos = async (deslocamento, nomeBuscado) => {
    const parametrosConsulta = {
      fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      pageSize: TAMANHO_PAGINA,
      pageOffset: deslocamento
    };

    // O filtro e aplicado no lado do banco de dados nativo, nao em memoria
    if (nomeBuscado && nomeBuscado.trim().length > 0) {
      parametrosConsulta.name = nomeBuscado;
    }

    const { data } = await Contacts.getContactsAsync(parametrosConsulta);
    return data;
  };

  // Carregamento inicial da agenda corporativa de produtores rurais
  const carregarContatosProdutores = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Erro', 'Nao e possivel carregar os representantes locais sem acesso aos contatos.');
      return;
    }
    setPermissaoConcedida(true);
    const primeiraPagina = await consultarPaginaDeContatos(0, termoBusca);
    setListaContatosDisponiveis(primeiraPagina);
    setDeslocamentoPagina(0);
    setPossuiMaisRegistros(primeiraPagina.length === TAMANHO_PAGINA);
  };

  // Carrega a proxima pagina quando o usuario atinge o fim da lista (scroll infinito)
  const carregarProximaPagina = async () => {
    if (!permissaoConcedida || carregandoPagina || !possuiMaisRegistros) {
      return;
    }
    setCarregandoPagina(true);
    const proximoDeslocamento = deslocamentoPagina + TAMANHO_PAGINA;
    const novaPagina = await consultarPaginaDeContatos(proximoDeslocamento, termoBusca);

    if (novaPagina.length < TAMANHO_PAGINA) {
      setPossuiMaisRegistros(false);
    }
    // Concatena apenas o novo bloco, sem recarregar os registros ja renderizados
    setListaContatosDisponiveis((listaAtual) => [...listaAtual, ...novaPagina]);
    setDeslocamentoPagina(proximoDeslocamento);
    setCarregandoPagina(false);
  };

  // Reinicia a paginacao a cada novo termo digitado, com atraso para evitar consultas excessivas
  const aoAlterarTermoBusca = (texto) => {
    setTermoBusca(texto);
    if (!permissaoConcedida) {
      return;
    }
    if (temporizadorBusca.current) {
      clearTimeout(temporizadorBusca.current);
    }
    temporizadorBusca.current = setTimeout(async () => {
      const paginaFiltrada = await consultarPaginaDeContatos(0, texto);
      setListaContatosDisponiveis(paginaFiltrada);
      setDeslocamentoPagina(0);
      setPossuiMaisRegistros(paginaFiltrada.length === TAMANHO_PAGINA);
    }, 400);
  };

  // Item isolado e memorizado para permitir o reuso das referencias de memoria na FlatList
  const ItemContato = React.memo(function ItemContato({ contato, aoSelecionar }) {
    return (
      <Text style={globalStyles.itemListaContato} onPress={() => aoSelecionar(contato)}>
        {contato.name}
      </Text>
    );
  });

  // Funcoes estaveis evitam a recriacao dos nos renderizados a cada ciclo
  const renderizarItemContato = useCallback(
    ({ item }) => <ItemContato contato={item} aoSelecionar={setContatoSelecionado} />,
    []
  );
  const extrairChaveContato = useCallback((item) => item.id, []);

  // Validacao final do Relatorio de Vistoria Tecnica
  const finalizarRelatorioAuditoria = () => {
    if (!localizacao || !imagemEvidencia || !contatoSelecionado) {
      Alert.alert(
        'Inconformidade de Dados',
        'Todos os criterios de auditoria (GPS, Evidencia Visual e Produtor Vinculado) devem ser preenchidos.'
      );
      return;
    }
    Alert.alert('Auditoria Concluida', 'Relatorio de Visita Tecnica sincronizado com a central de exportacao com sucesso.');
  };

  return (
    <ScrollView style={globalStyles.container} nestedScrollEnabled={true}>
      <View style={globalStyles.cardVisita}>
        <Text style={globalStyles.tituloSecao}>1. Georreferenciamento de Lote</Text>
        <BotaoCustomizado titulo="Marcar Localizacao Atual" onPress={capturarCoordenadasGPS} tipo="primary" />
        {localizacao && (
          <View style={{ marginTop: 8 }}>
            <Text style={globalStyles.textoInformativo}>Lat: {localizacao.latitude.toFixed(6)}</Text>
            <Text style={globalStyles.textoInformativo}>Long: {localizacao.longitude.toFixed(6)}</Text>
            <Text style={globalStyles.textoInformativo}>Precisao Alvo: {localizacao.accuracy.toFixed(1)}m</Text>
          </View>
        )}
      </View>

      <View style={globalStyles.cardVisita}>
        <Text style={globalStyles.tituloSecao}>2. Evidencia de Qualidade de Graos</Text>
        <BotaoCustomizado titulo="Acionar Camera de Campo" onPress={capturarFotoEvidencia} tipo="warning" />
        {imagemEvidencia && <Image source={{ uri: imagemEvidencia }} style={globalStyles.imagePreview} />}
      </View>

      <View style={globalStyles.cardVisita}>
        <Text style={globalStyles.tituloSecao}>3. Produtor / Representante Logistico</Text>
        <BotaoCustomizado titulo="Buscar Produtores na Agenda" onPress={carregarContatosProdutores} tipo="primary" />

        {contatoSelecionado && (
          <Text style={[globalStyles.textoInformativo, { color: '#27AE60', fontWeight: 'bold', marginVertical: 6 }]}>
            Vinculado a: {contatoSelecionado.name}
          </Text>
        )}

        {/* Campo de entrada nativo que dispara a filtragem por nome na base do aparelho */}
        <TextInput
          style={globalStyles.campoBusca}
          placeholder="Filtrar produtor pelo nome"
          value={termoBusca}
          onChangeText={aoAlterarTermoBusca}
        />

        {/* FlatList pura com altura fixa: renderiza apenas a janela visivel e reaproveita os nos */}
        <FlatList
          data={listaContatosDisponiveis}
          keyExtractor={extrairChaveContato}
          renderItem={renderizarItemContato}
          style={globalStyles.listaContatos}
          nestedScrollEnabled={true}
          onEndReached={carregarProximaPagina}
          onEndReachedThreshold={0.5}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={7}
          removeClippedSubviews={true}
          ListFooterComponent={carregandoPagina ? <ActivityIndicator style={{ marginVertical: 12 }} /> : null}
        />
      </View>

      <BotaoCustomizado titulo="Finalizar e Assinar Auditoria" onPress={finalizarRelatorioAuditoria} tipo="success" />
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}