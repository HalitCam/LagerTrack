import React from 'react';
import { Link } from 'react-router-dom';
import lagericon from '../../lagericon.png';
import { Button, Image } from "@chakra-ui/react"

import styles from './styles.module.css';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div >
          <Link to="/">
            {
              <Image src={lagericon} alt="logo" height="7vmin" />
            }
          </Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to='/calender'>Kalender</Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <Link to='/login'>
        <Button style={{marginRight:'10px'}} colorScheme='pink' >Anmelden</Button>
        </Link>
        <Link to='/signup'>
        <Button colorScheme='blue' >Registrieren</Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
