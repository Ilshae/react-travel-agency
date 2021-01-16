import React from 'react';
import styles from './Footer.scss';


class Footer extends React.Component {
  render(){
    return (
      <footer className={styles.component}>
        <a href='https://ilshae.github.io/' rel='nofollow noopener noreferrer' target='_blank'>&copy; Ingrid Pruszyńska</a>
      </footer>
    );
  }
}

export default Footer;
