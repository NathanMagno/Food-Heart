# Food Heart

## Sobre o Projeto

Food Heart é um aplicativo criado para combater um dos grandes problemas sociais do Brasil: a fome, agravada pela inflação dos alimentos básicos. A plataforma facilita a doação de alimentos por meio de hospitais parceiros,
que recolhem as doações e as distribuem para pessoas em situação de vulnerabilidade.
Os usuários contribuitens que fizerem doações obteram descontos em mercados parceiros disponíveis no aplicativo.

## Sistema de cadastro 

A aplicação possui um sistema de cadastro de usuários que garante a segurança e a individualidade das informações de cada pessoa. Cada usuário terá seus dados armazenados em sua conta,
permitindo o registro do histórico de doações realizadas. Com disso, o sistema acumula pontos a cada doação, que poderão ser trocados por descontos em mercados parceiros.

<p align="center">
  <img src="https://img.icons8.com/?size=100&id=RaljsbuV3tuS&format=png&color=000000" alt="Ícone de computação em nuvem" />
</p>

## APIs utilizadas

* **API Flask**: Desenvolvida para o sistema de cadastro.

<p align="center">
  <img src="https://img.icons8.com/?size=100&id=pIJdjOoL6KfU&format=png&color=000000" alt="Ícone de computação em nuvem" />
</p>

* **Via CEP**: Coletar informações de endereço do usuário.

<p align="center">
  <img src="https://img.icons8.com/?size=100&id=7NVJSIkgx3xp&format=png&color=000000" alt="Ícone de computação em nuvem" />
</p>


* **Places API**: Informa os hospitais próximos do usuário, com base na localização do dispositivo do usuário que são passadas pelo Localização do dispositivo.

<p align="center">
  <img src="https://img.icons8.com/?size=100&id=64515&format=png&color=000000" alt="Ícone de computação em nuvem" />
</p>

## Dependências
  
O front-end do projeto conta com as segunites dependências

~~~ json
"dependencies": {
     "@react-navigation/bottom-tabs": "^7.3.10",
    "@react-navigation/native": "^7.1.5",
    "@react-navigation/stack": "^7.2.9",
    "axios": "^1.8.4",
    "expo": "~52.0.43",
    "expo-image": "~2.0.7",
    "expo-location": "~18.0.10",
    "expo-status-bar": "~2.0.1",
    "react": "18.3.1",
    "react-native": "0.76.9",
    "react-native-dotenv": "^3.4.11",
    "react-native-gesture-handler": "^2.25.0",
    "react-native-maps": "1.18.0",
    "react-native-maps-directions": "^1.9.0",
    "react-native-reanimated": "^3.17.2",
    "react-native-safe-area-context": "^5.3.0",
    "react-native-screens": "^4.10.0",
    "react-native-vector-icons": "^10.2.0"
  }
~~~

## Utilização

Instalar APK: https://expo.dev/accounts/nathan299/projects/FoodHeart/builds/06a99463-8cd0-4580-a2ff-609beab52aed

OBS: A versão APK não possui a API Python para sistema de cadastro.
