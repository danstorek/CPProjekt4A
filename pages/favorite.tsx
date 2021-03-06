import { Menu } from '../components/menu';
import {SearchBarStyled, DarkModeButton, PageCont} from '../components/styledComps'
import styles from '../styles/Home.module.css'
import Head from 'next/head';
import { useContext, useState } from 'react';
import { Image } from 'react-bootstrap';

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

import {getDarkMode, useDarkMode, fetchFavs, removeFavorite, searchChange, getLanguageText} from "../components/functions";

import languageContext from "../components/language";

const Page = () => {
  const [search, setSearch] = useState("");
  const [fav, setFav] = useState([]);

  const langContext = useContext(languageContext);

  const lng = getLanguageText(langContext.language);

  const [dark, setDark] = useState(styles.mainwhite);
  useDarkMode(setDark);

  fetchFavs(setFav);
  return (
    <PageCont>
      <Head>
        <title>{lng?.['app.favoritepokemonlist']}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossOrigin="anonymous" />
      </Head>
      <Menu />
      <main className={dark}>
        <DarkModeButton onClick={() => {setDark(getDarkMode());}}>🌙</DarkModeButton>
        <h1 className={"display-1 " + styles.title}>{lng?.['app.favoritepokemonlist']}</h1>
        <SearchBarStyled className={styles.search} onChange={(event)=>searchChange(event, setSearch)} placeholder={lng?.['app.search']} />
        <div className={styles.flexdiv}>
        {
          fav.map((item: string, key) => {
            if (item.split(";")[0].startsWith(search))
              return <div key={key} className={styles.flexcontainer + " " + styles.pokecard}>
                <Image src={"./" + item.split(";")[0] + ".png"} width="73%" />
                <div className={styles.pokecontainer}>
                  <h4><b>{item.split(";")[0][0].toUpperCase() + item.split(";")[0].substring(1)}</b></h4>
                  <p>{item.split(";")[2]}{lng?.['app.generation']}</p>
                </div>
                <button name={item} onClick={(event)=>{removeFavorite(event, setFav)}} className={styles.nofavoritebutton} type="button">{lng?.['app.favorite']}</button>
              </div>
          })
        }
        </div>
      </main>
    </PageCont>
  )
}

export default Page