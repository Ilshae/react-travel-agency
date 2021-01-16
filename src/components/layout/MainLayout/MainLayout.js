import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import styles from './MainLayout.scss';

const MainLayout = ({children}) => (
  <div className={styles.component}>
    <Header />
    <main>
      {children}
    </main>
    <Footer />
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
