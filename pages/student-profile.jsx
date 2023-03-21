import NavBar from './components/NavBar';
import ProfileForm from './components/ProfileForm'

export default function Student({hasCookie}) {

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

    return{
      props:{

      }
    }
    
  }
