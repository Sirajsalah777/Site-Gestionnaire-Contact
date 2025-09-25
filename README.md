# 📞 Gestionnaire de Contacts Vue.js

Une application moderne de gestion de contacts développée avec Vue 3, TypeScript et Vite. Cette application permet de créer, lire, modifier et supprimer des contacts de manière intuitive.

## ✨ Fonctionnalités

- 📝 **Gestion complète des contacts** : Ajouter, modifier, supprimer des contacts
- 🔍 **Recherche et filtrage** : Trouvez rapidement vos contacts
- 📱 **Interface responsive** : Design moderne et adaptatif
- ⚡ **Performance optimisée** : Développé avec Vue 3 et Vite
- 🛡️ **TypeScript** : Code type-safe et maintenable
- 🎨 **UI moderne** : Interface utilisateur intuitive et élégante

## 🚀 Technologies utilisées

- **Vue 3** - Framework JavaScript progressif
- **TypeScript** - JavaScript avec typage statique
- **Vite** - Outil de build rapide
- **Axios** - Client HTTP pour les requêtes API
- **JSON Server** - API REST simulée pour le développement

## 📦 Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Sirajsalah777/Site-Gestionnaire-Contact.git
   cd Site-Gestionnaire-Contact
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Démarrer le serveur de développement**
   ```bash
   # Terminal 1 - Serveur de données (JSON Server)
   npm run server
   
   # Terminal 2 - Application Vue.js
   npm run dev
   ```

4. **Ouvrir l'application**
   - L'application sera disponible sur `http://localhost:5173`
   - L'API sera disponible sur `http://localhost:3000`

## 🏗️ Structure du projet

```
src/
├── components/          # Composants Vue
│   ├── ContactForm.vue     # Formulaire d'ajout/modification
│   ├── ContactList.vue     # Liste des contacts
│   ├── ContactItem.vue     # Élément de contact individuel
│   └── ConfirmDialog.vue   # Dialogue de confirmation
├── services/           # Services API
│   └── api.ts             # Configuration Axios
├── types/              # Définitions TypeScript
│   └── index.ts           # Types de données
├── assets/             # Ressources statiques
├── App.vue             # Composant principal
└── main.ts             # Point d'entrée
```

## 🎯 Utilisation

### Ajouter un contact
1. Cliquez sur le bouton "Ajouter un contact"
2. Remplissez le formulaire avec les informations du contact
3. Cliquez sur "Enregistrer"

### Modifier un contact
1. Cliquez sur l'icône d'édition à côté du contact
2. Modifiez les informations dans le formulaire
3. Cliquez sur "Mettre à jour"

### Supprimer un contact
1. Cliquez sur l'icône de suppression à côté du contact
2. Confirmez la suppression dans le dialogue

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run server       # Démarrer JSON Server

# Production
npm run build        # Construire pour la production
npm run preview      # Prévisualiser la build de production
```

## 📝 API Endpoints

L'application utilise JSON Server pour simuler une API REST :

- `GET /contacts` - Récupérer tous les contacts
- `POST /contacts` - Créer un nouveau contact
- `PUT /contacts/:id` - Mettre à jour un contact
- `DELETE /contacts/:id` - Supprimer un contact

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Siraj Salah**
- GitHub: [@Sirajsalah777](https://github.com/Sirajsalah777)

## 🙏 Remerciements

- [Vue.js](https://vuejs.org/) - Framework JavaScript progressif
- [Vite](https://vitejs.dev/) - Outil de build rapide
- [TypeScript](https://www.typescriptlang.org/) - JavaScript avec typage statique
