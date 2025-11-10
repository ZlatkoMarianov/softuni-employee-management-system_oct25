import { useState } from 'react';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import Pagination from './components/Pagination.jsx';
import Search from './components/Search.jsx';
import UserList from './components/UserList.jsx';
import CreateUserModal from './components/CreateUserModal.jsx';

function App() {
  const [showCreateUser, setShowCreateUser] = useState(false);

  const addUserClickHandler = () => {
    setShowCreateUser(true);
  };

  const closeUserModalHandler = () => {
    setShowCreateUser(false);
  };

  const AddUserHandlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <main>
      <Header />

      <main className="main">
        <section className="card users-container">
          <Search />

          <UserList />

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
