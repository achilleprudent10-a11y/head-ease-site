# HEAD EASE — site vitrine

Site vitrine de HEAD EASE, agence française d'automatisation IA.

Site statique, sans dépendance ni étape de build :

- `index.html` — contenu et structure (Hero, Services, Méthode, À propos, Contact)
- `styles.css` — thème sombre, accents vert néon / violet, responsive
- `script.js` — menu mobile, animations au scroll, formulaire de contact

## Lancer en local

Ouvrir `index.html` dans un navigateur, ou :

```bash
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## À personnaliser

- **E-mail de contact** : `contact@head-ease.fr` est un exemple. Le changer dans
  `index.html` (section Contact) et dans `script.js` (`CONTACT_EMAIL`).
- **Formulaire** : il ouvre le logiciel de messagerie du visiteur (mailto).
  Pour recevoir les demandes directement, brancher un service type Formspree
  ou un webhook N8N.
- **Chiffres du Hero** (« +10 h gagnées ») : à ajuster selon vos vrais résultats.
