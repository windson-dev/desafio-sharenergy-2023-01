import { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import Header from '../../Components/Header';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([]);
  const [_error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const elementsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=100');
        setUsers(response.data.results);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter((user: any) => {
    return user.login.username.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.name.first.toLowerCase().includes(search.toLowerCase()) ||
      user.name.last.toLowerCase().includes(search.toLowerCase())
  });

  const totalPages = Math.ceil(filteredUsers.length / elementsPerPage);

  const currentPageData = filteredUsers
    .slice((currentPage - 1) * elementsPerPage, currentPage * elementsPerPage);

  const handlePageChange = (_event: any, page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };


  return (
    <>
      <Header />
      <div className="overflow-x-auto bg-gray-900">
        <div className="py-3 pl-2">
          <div className="relative max-w-xs">
            <label htmlFor="hs-table-search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              name="hs-table-search"
              id="hs-table-search"
              className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
              placeholder="Search..."
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <svg
                className="h-3.5 w-3.5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className='space-x-1'>
          <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
        </div>
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle ">
            <div className="overflow-hidden border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Fullname
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Username
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      age
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (<p>loading</p>) : (currentPageData.map((item: any) => (
                    <tr key={item.email}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap"><img src={item.picture.large} alt={`${item.name.first} ${item.name.last}`} /></td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{`${item.name.first} ${item.name.last}`}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{item.login.username}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{item.dob.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">{item.email}</td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
    </>
  )
}

export default Home