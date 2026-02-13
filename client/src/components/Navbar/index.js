import React from 'react';
import { Link } from 'react-router-dom';
import lagericon from '../../image/lagericon.png';
import { Button, Image } from "@chakra-ui/react"

import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useBasketContext } from '../../contexts/BasketContext';

const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const { fba } = useBasketContext();
console.log(user)
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
          <li>
            <Link to='/task'>Aufgaben</Link>
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
            {
              user.role === "admin" && (
                <Link to="/task/create" >
                  <Button colorScheme='green' variant="outline">
                      Aufgabe erstellen
                  </Button>
                </Link>
              )
            }
              {
                fba.length > 0 && (
                  <Link to="/basket">
                    <Button colorScheme="pink" variant="outline">
                      Übernahme ({fba.length})
                    </Button>
                  </Link>
                )
              }
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
