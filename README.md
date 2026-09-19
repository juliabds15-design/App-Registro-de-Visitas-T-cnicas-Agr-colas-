# 🌱 Registro de Visitas Técnicas Agrícolas

Aplicativo mobile desenvolvido em **React Native com Expo** para registrar visitas técnicas agrícolas de forma prática. O app permite cadastrar informações das visitas, utilizar a localização do dispositivo, selecionar imagens e buscar produtores diretamente na agenda do celular.

---

## 📱 Funcionalidades

- Cadastro de visitas técnicas agrícolas.
- Registro de localização da visita.
- Seleção de imagens da galeria ou câmera.
- Busca de produtores na agenda do celular.
- Lista de contatos otimizada com paginação e busca.

---

## 🛠️ Tecnologias utilizadas

- React Native
- Expo
- Node.js
- Expo Go
- Expo Location
- Expo Image Picker
- Expo Contacts

---

# 🚀 Como rodar o projeto (passo a passo completo)

## 1. Instalar os pré-requisitos

Antes de iniciar, instale:

- **Node.js (versão LTS)**.
- **Expo Go** no celular (Android ou iPhone).

## 2. Baixar o projeto do GitHub

```bash
git clone <url-do-repositorio>
cd meu-app-agricola
```

Substitua `<url-do-repositorio>` pelo link do seu repositório no GitHub.

## 3. Instalar as dependências

No terminal, dentro da pasta do projeto:

```bash
npm install
```

Esse comando instala todas as dependências do projeto.

## 4. Confirmar a versão dos pacotes do Expo

Instale os pacotes utilizados pelo aplicativo:

```bash
npx expo install expo-location expo-image-picker expo-contacts
```

## 5. Conferir as permissões

Abra o arquivo **app.json** e confirme que o projeto possui permissões para:

- Câmera;
- Localização;
- Contatos.

As permissões devem estar configuradas em:

- `ios.infoPlist`
- `android.permissions`

## 6. Iniciar o servidor do Expo

Execute:

```bash
npx expo start
```

O Expo abrirá uma página no navegador com um QR Code.

## 7. Abrir o aplicativo no celular

1. Conecte o celular e o computador na **mesma rede Wi-Fi**.
2. Abra o aplicativo **Expo Go**.
3. Escaneie o **QR Code** exibido pelo Expo.
4. Aguarde o aplicativo carregar.

O projeto será executado diretamente no celular.

---

## 📁 Estrutura básica do projeto

```text
├── assets/            # Imagens e ícones
├── components/        # Componentes reutilizáveis
├── screens/           # Telas do aplicativo
├── app.json           # Configurações do Expo
├── package.json       # Dependências
└── ...
```

---

## 🎯 Objetivo do projeto

O objetivo deste aplicativo é facilitar o registro de visitas técnicas em propriedades agrícolas, permitindo armazenar informações da visita, localização, fotos e seleção de produtores da agenda do dispositivo de forma rápida e organizada.
