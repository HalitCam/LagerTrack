import React from 'react';
import { Link } from 'react-router-dom';
import lagericon from '../../image/lagericon.png';
import { Button, Image } from "@chakra-ui/react"

import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const { loggedIn } = useAuth();

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
        {
          !loggedIn && (
            <>
              <Link to='/login'>
                <Button style={{ marginRight: '10px' }} colorScheme='pink' >Anmelden</Button>
              </Link>
              <Link to='/signup'>
                <Button colorScheme='blue' >Registrieren</Button>
              </Link>
            </>
          )
        }
        {
          loggedIn && (
            <>
              <Link to='/profile'>
                <Button style={{ marginRight: '10px' }} >Profile</Button>
              </Link>
            </>
          )
        }
      </div>
    </nav>
  );
}

export default Navbar;
