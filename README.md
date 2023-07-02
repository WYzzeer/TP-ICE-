# Social Blockchain
Social Blockchain est un projet qui intègre les technologies Blockchain avec React pour créer une plateforme sociale décentralisée. Les utilisateurs peuvent créer des posts, commenter sur des posts et récompenser les posts en utilisant des ethers. Le projet utilise la bibliothèque ethers.js pour interagir avec le contrat intelligent déployé sur la blockchain Ethereum.

## Configuration
Avant de démarrer le projet, vous devez configurer certains paramètres. Un fichier config.json est utilisé pour cela. Le fichier config.json doit contenir l'adresse du contrat intelligent déployé et l'ABI du contrat. Vous pouvez trouver un exemple de config.json ci-dessous :

json
```{
    "contractAddress": "0xdA9fb2D72DcbB9eDb69691477bD3848EC3DF4abc",
    "contractABI": [...]
}```
Remplacez 0xdA9fb2D72DcbB9eDb69691477bD3848EC3DF4abc avec l'adresse du contrat déployé et [...] avec l'ABI du contrat.

## Installation des dépendances
Pour installer toutes les dépendances, vous devez exécuter la commande npm install dans le répertoire du projet. Assurez-vous que vous avez déjà installé Node.js et npm sur votre système.

bash

```npm install```

## Lancement du projet
Une fois toutes les dépendances installées, vous pouvez lancer le projet en exécutant la commande npm start.

bash

```npm start```
Cela lancera l'application dans le mode de développement. Ouvrez http://localhost:3000 pour le voir dans le navigateur. La page sera rechargée si vous faites des modifications. Vous verrez également les erreurs de peluches dans la console.

Note: Assurez-vous d'avoir une extension de portefeuille Ethereum (comme MetaMask) installée sur votre navigateur et connectée à un réseau Ethereum (testnet/mainnet) pour interagir avec l'application.

## Documentation
Les utilisateurs peuvent utiliser l'application pour créer des posts, commenter sur des posts et récompenser les posts en utilisant des ethers. Pour utiliser ces fonctionnalités, les utilisateurs doivent interagir avec les champs de saisie et les boutons sur l'interface utilisateur.

Le code est bien documenté avec des commentaires pour comprendre le flux de données et les interactions avec la blockchain.
