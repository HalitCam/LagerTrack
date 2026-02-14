import React from 'react';
import { Link } from 'react-router-dom';
import lagericon from '../../image/lagericon.png';
import { Button, Image } from "@chakra-ui/react"

import styles from './styles.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useBasketContext } from '../../contexts/BasketContext';
import {fetchTask} from '../../api';
import { useQuery } from '@tanstack/react-query';

const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const {data=[] , isLoading} = useQuery({queryKey: ["admin:task"], queryFn: fetchTask});
  
  if(isLoading) return (<div>Loading..</div>)

  const filteredData = data?.filter((item) => item.responsible?.toString() === user?._id?.toString());
  console.log(filteredData)
  const restTask = data?.filter((item)=> (item.responsible === null));

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
            <Link to='/task'>Aufgaben({restTask.length})</Link>
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
                filteredData.length > 0 && (
                  <Link to="/basket">
                    <Button colorScheme="pink" variant="outline">
                      Übernahme ({filteredData.length})
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
