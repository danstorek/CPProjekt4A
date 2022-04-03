import languageContext from './language';

import styles from '../styles/Home.module.css';

const ToggleLanguageButton = () => {
  return (
    <languageContext.Consumer>
      {({language, toggleLanguage}) => (
        <button className={styles.myLang} onClick={toggleLanguage}>
          {language === "en" && "Change language"}
          {language === "cz" && "Změnit jazyk"}
        </button>
      )}
    </languageContext.Consumer>
  );
}

export default ToggleLanguageButton;