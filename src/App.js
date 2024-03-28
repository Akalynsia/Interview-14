import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  return <Pagination />;
}

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://randomuser.me/api?results=50"
        );
        const userData = response.data.results.map((user) => {
          const { name, dob, email } = user;
          return {
            name: `${name.first} ${name.last}`,
            age: dob.age,
            email,
          };
        });
        setUsers(userData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div>
          <Pages content={users} itemsPerPage={10} />
        </div>
      )}
    </div>
  );
};

const Pages = ({ content, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = content.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <ul>
        {currentItems.map((user, index) => (
          <li key={index} className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul>
      <ul className="flex justify-center mt-8">
        {content.length > itemsPerPage &&
          Array.from({ length: Math.ceil(content.length / itemsPerPage) }).map(
            (_, index) => (
              <li key={index} className="mx-1">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default App;
