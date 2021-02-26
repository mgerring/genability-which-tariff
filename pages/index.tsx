import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import GenabilityClient from '../util/GenabilityClient';
import { restApis } from '@genability/api';

export default function Home() {
  const [lseList, setLseList] = useState([]);
  useEffect(() => {
    async function fetchLses() {
      const request = new restApis.GetLoadServingEntitiesRequest();
      request.country="US";
      const lses = await GenabilityClient.lses.getLoadServingEntities(request);
      setLseList(lses.results);
    }
    fetchLses();
  },[]);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Utilities</h1>
        <ul>
          {lseList.map((lse) => {
            return <li><a href={lse.websiteHome}>{lse.name}</a></li>
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
