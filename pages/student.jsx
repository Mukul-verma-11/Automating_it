import NavBar from './components/NavBar';

export default function Student({hasCookie}) {

  return (
    <>
        <NavBar/>
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
