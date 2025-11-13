import { useEffect, useState } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Pagination from './components/Pagination.jsx';
import Search from './components/Search.jsx';
import UserList from './components/UserList.jsx';
import CreateUserModal from './components/CreateUserModal.jsx';

function App() {
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3030/jsonstore/users')
      .then((response) => response.json())
      .then((result) => {
        setUsers(Object.values(result));
      })
      .catch((err) => alert(err.message));
  }, [refresh]);

  const forceRefresh = () => {
    setRefresh((state) => !state);
  };

  const addUserClickHandler = () => {
    setShowCreateUser(true);
  };

  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };

  const AddUserHandlerSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const { country, city, street, streetNumber, ...userData } = Object.fromEntries(formData);
    userData.address = {
      country,
      city,
      street,
      streetNumber,
    };

    userData.createdAt = new Date().toISOString();
    userData.updatedAt = new Date().toISOString();

    fetch('http://localhost:3030/jsonstore/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then(() => {
        closeUserModalHandler();
        forceRefresh();
      })
      .catch((err) => alert(err.message));
  };

  return (
    <main>
      <Header />

      <main className="main">
        <section className="card users-container">
          <Search />

          <UserList users={users} forceUserRefresh={forceRefresh} />

          <button className="btn-add btn" onClick={addUserClickHandler}>
            Add new user
          </button>

          <Pagination />

          {showCreateUser && <CreateUserModal onClose={closeUserModalHandler} onSubmit={AddUserHandlerSubmit} />}
        </section>

        {/* User details component  */}

        {/* Create/Edit Form component  */}

        {/* Delete user component  */}
      </main>

      <Footer />
    </main>
  );
}

export default App;
