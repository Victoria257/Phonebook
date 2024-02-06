import css from './Home.module.css';

const Home = () => {
  return (
    <div className={css.home}>
      <div className={css.container}>
        <h1>Hello, this is your phone book.</h1>
        <p>
          You can add contacts, delate contacts , and filter contacts from name.
        </p>
        <p>
          We save your contacts. You have access to your contacts from anywhere.
        </p>
      </div>
    </div>
  );
};

export default Home;
