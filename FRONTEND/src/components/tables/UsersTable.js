import moment from 'moment/moment';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// react-bootstrap components
import { Card, Table, Row, Col, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
// import { useFav } from '../../Context/FavListContext';
// import { useBlack } from '../../Context/BlackListContext';

function UsersTable({ users,setUsers }) {
  const navigate = useNavigate();
  const { deleteUserByAdmin, loading } = useUser('');
//   const { addUserToFavoriteList, removeUserFromFavoriteList } = useFav('');
//   const { addUserToBlackList, removeUserFromBlackList } = useBlack('');
  const { getUsers } = useUser('');
  function editProfile(id) {

    return navigate('/admin/profile', {
      state: {
        userId: id,
      },
    });
  }

  async function deleteUser(id) {
    const data = await deleteUserByAdmin(id);
    if (data != null) {
      toast.success('User Deleted');
    }
    const res = await getUsers()
    setUsers(res?.value)
    console.log('user table delete user',res)
  }
  
  async function handleBlackList(id) {
    // let user = users.find(user => user.id === id);
    // console.log(user);
    // if (user.blacklist === null) {
    //   await addUserToBlackList(id);
    // } else {
    //   await removeUserFromBlackList(user.blacklist.id);
    // }
    // const res = await getUsers();
    // setUsers(res?.value);
    console.log('to black list a mallam')
  }

  async function handleFavoriteList(id) {
    // let user = users.find(user => user.id === id);
    // if (user.favoriteList === null) {
    //    await addUserToFavoriteList(id);
    // } else {
    //   await removeUserFromFavoriteList(user.favoriteList.id);
    // }
    // const res = await getUsers();
    // setUsers(res.value);
    console.log('to white list a mallam')

  }
  return (
    <Container>
      <Row>
        <ToastContainer />
        <Col md='12'>
          <Card className='strpied-tabled-with-hover'>
            <Card.Header>
              <Card.Title as='h4'>Users</Card.Title>
              {loading && <Spinner animation='grow' />}
            </Card.Header>
            <Card.Body className='table-full-width table-responsive px-0'>
              <Table className='table-hover '>
                <thead>
                  <tr>
                    <th className='border-0'>ID</th>
                    <th className='border-0'>First name</th>
                    <th className='border-0'>Last name</th>
                    <th className='border-0'>Email</th>
                    <th className='border-0'>role</th>
                    <th className='border-0'>verfied at</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{moment(user.verifiedAt).format('DD-MM-YYYY')}</td>
                      <td>
                        <button
                          className='btn btn-fill btn-info me-2'
                          onClick={() => handleFavoriteList(user.id)}
                        >
                            favorite list
                          {/* {user.favoriteList != null
                            ? 'Remove from Favorites'
                            : 'Add To Favorites'} */}
                        </button>
                        <button
                          className='btn btn-fill btn-success me-2'
                          onClick={() => handleBlackList(user.id)}
                        >
                          black list
                          {/* {user.blacklist != null
                            ? 'Remove from BlackList'
                            : 'Add To BlackList'} */}
                        </button>
                        <button
                          className='btn btn-fill btn-secondary me-2'
                          onClick={() => editProfile(user.id)}
                        >
                          Edit
                        </button>
                        <button
                          className='btn btn-fill btn-danger'
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UsersTable;