// import logo from './logo.svg';
import Main from './Components/Main/Main';
// import { useSelector, useDispatch } from 'react-redux';
// import { useEffect } from 'react';
// import { getUser } from './store/user/actionCreators';

function App() {
  // const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  // useEffect(() => {
  //   (async function () {
  //     const userFindBack = await fetch('/check', {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
  //     const jsonFromBack = await userFindBack.json();
  //     dispatch(getUser(jsonFromBack));
  //   })();
  // }, []);

  return (
    <>
      <Main />
    </>
  );
}

export default App;
