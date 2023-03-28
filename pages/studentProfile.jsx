import { getCookie } from 'cookies-next';
import NavBar from './components/NavBar';
import ProfileForm from './components/ProfileForm'

export default function Student({cookie}) {

  console.log(typeof cookie);
  console.log(cookie);
  return (
    <>
        <NavBar/>
        <ProfileForm/>
    </>
  )
}

export async function getServerSideProps(context) {
    const cookie = context.req.headers.cookie;
    if(!cookie){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };

    }

    // const reg_num = getCookie(cookie)
    console.log(cookie,'================');

    return{
      props:{
        cookie
      }
    }
    
  }
