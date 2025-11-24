# 📘 Guida: Aprire il Progetto su VS Code

Questa guida ti accompagnerà passo passo nell'apertura e configurazione del progetto Agro.io su Visual Studio Code.

---

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere:

1. **Node.js** installato (versione 16 o superiore)
   - Verifica con: `node --version`
   - Scarica da: https://nodejs.org/

2. **Visual Studio Code** installato
   - Scarica da: https://code.visualstudio.com/

3. **Git** installato
   - Verifica con: `git --version`
   - Scarica da: https://git-scm.com/

---

## 🚀 Passaggi per Aprire il Progetto

### 1. Apri VS Code

- Avvia Visual Studio Code dal menu Start (Windows) o dalla barra delle applicazioni (Mac/Linux)

### 2. Apri la Cartella del Progetto

**Metodo A - Dalla barra dei menu:**
1. Clicca su `File` → `Apri Cartella...` (o `Open Folder...`)
2. Naviga fino alla cartella `agro-claude-ai-studio-`
3. Clicca su `Seleziona Cartella`

**Metodo B - Dal terminale:**
```bash
cd /percorso/alla/cartella/agro-claude-ai-studio-
code .
```

**Metodo C - Drag & Drop:**
- Trascina la cartella del progetto direttamente sulla finestra di VS Code

### 3. Aprire il Terminale Integrato

Una volta aperto il progetto:
1. Vai su `Terminale` → `Nuovo Terminale` (o usa la scorciatoia <kbd>Ctrl</kbd>+<kbd>`</kbd>)
2. Il terminale si aprirà nella parte inferiore di VS Code

### 4. Installa le Dipendenze

Nel terminale integrato, esegui:

```bash
npm install
```

Questo installerà tutte le dipendenze necessarie elencate nel file `package.json`.

### 5. Configura le Variabili d'Ambiente (Opzionale)

Se il progetto richiede una chiave API Gemini:

1. Apri il file `.env.local` (se non esiste, crealo nella root del progetto)
2. Aggiungi la tua chiave API:
   ```
   GEMINI_API_KEY=la_tua_chiave_api_qui
   ```

### 6. Avvia il Progetto

Esegui nel terminale:

```bash
npm run dev
```

Il server di sviluppo si avvierà e vedrai un messaggio simile a:
```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 7. Apri il Progetto nel Browser

- Tieni premuto <kbd>Ctrl</kbd> (o <kbd>Cmd</kbd> su Mac) e clicca sul link `http://localhost:5173/`
- Oppure copia e incolla l'URL nel tuo browser

---

## 🔌 Estensioni VS Code Consigliate

Per una migliore esperienza di sviluppo, installa queste estensioni:

### Essenziali:

1. **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
   - Snippet per React

2. **ESLint** (dbaeumer.vscode-eslint)
   - Linting JavaScript/TypeScript

3. **Prettier - Code formatter** (esbenp.prettier-vscode)
   - Formattazione automatica del codice

4. **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
   - Autocompletamento per Tailwind CSS

5. **TypeScript Vue Plugin (Volar)** (Vue.vscode-typescript-vue-plugin)
   - Supporto avanzato TypeScript

### Utili:

6. **Auto Rename Tag** (formulahendry.auto-rename-tag)
   - Rinomina automaticamente i tag HTML/JSX

7. **Path Intellisense** (christian-kohler.path-intellisense)
   - Autocompletamento per i percorsi dei file

8. **GitLens** (eamodio.gitlens)
   - Strumenti Git avanzati

**Come installarle:**
1. Clicca sull'icona Estensioni nella barra laterale (o premi <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>X</kbd>)
2. Cerca il nome dell'estensione
3. Clicca su `Installa`

---

## 📁 Struttura del Progetto

```
agro-claude-ai-studio-/
├── public/                 # File statici
│   ├── images/            # Immagini
│   └── favicon.svg        # Icona del sito
├── src/                   # Codice sorgente
│   ├── components/        # Componenti React riutilizzabili
│   ├── context/          # Context API (AuthContext)
│   ├── data/             # Dati statici
│   ├── layouts/          # Layout (DashboardLayout)
│   ├── pages/            # Pagine dell'applicazione
│   ├── App.tsx           # Componente principale
│   ├── main.tsx          # Entry point
│   ├── index.css         # Stili globali
│   └── types.ts          # Definizioni TypeScript
├── .env.local            # Variabili d'ambiente (non versionato)
├── index.html            # HTML principale
├── package.json          # Dipendenze e script
├── tsconfig.json         # Configurazione TypeScript
├── tailwind.config.js    # Configurazione Tailwind CSS
└── vite.config.ts        # Configurazione Vite
```

---

## 💡 Comandi Utili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il server di sviluppo |
| `npm run build` | Compila il progetto per la produzione |
| `npm run preview` | Anteprima della build di produzione |

---

## ⚙️ Configurazioni Consigliate per VS Code

### Formattazione Automatica al Salvataggio

1. Apri le impostazioni: `File` → `Preferenze` → `Impostazioni` (o <kbd>Ctrl</kbd>+<kbd>,</kbd>)
2. Cerca "format on save"
3. Spunta la casella `Editor: Format On Save`

### File `settings.json` (Opzionale)

Crea/modifica `.vscode/settings.json` nella root del progetto:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

---

## 🐛 Risoluzione Problemi

### Problema: `npm install` fallisce

**Soluzione:**
```bash
# Pulisci la cache
npm cache clean --force

# Riprova l'installazione
npm install
```

### Problema: Porta 5173 già in uso

**Soluzione:**
- Vite utilizzerà automaticamente la porta successiva disponibile (5174, 5175, ecc.)
- Oppure specifica una porta diversa:
  ```bash
  npm run dev -- --port 3000
  ```

### Problema: Errori TypeScript

**Soluzione:**
- Riavvia il server TypeScript: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> → "TypeScript: Restart TS Server"

### Problema: Modifiche non visibili nel browser

**Soluzione:**
1. Svuota la cache del browser (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>)
2. Riavvia il server dev: ferma con <kbd>Ctrl</kbd>+<kbd>C</kbd> e rilancia `npm run dev`

---

## 🎯 Prossimi Passi

Ora che hai il progetto aperto:

1. ✅ Esplora i componenti in `src/components/`
2. ✅ Guarda le pagine in `src/pages/`
3. ✅ Modifica `src/App.tsx` per personalizzare l'app
4. ✅ Aggiungi nuove funzionalità

---

## 📞 Supporto

Se hai problemi, controlla:
- [Documentazione React](https://react.dev/)
- [Documentazione Vite](https://vitejs.dev/)
- [Documentazione TypeScript](https://www.typescriptlang.org/)
- [Documentazione Tailwind CSS](https://tailwindcss.com/)

---

**Buono sviluppo! 🚀**
