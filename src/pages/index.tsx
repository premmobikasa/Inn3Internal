import MainLayout from "@/components/mainlayout";
import Sppiner from "@/components/common/spinner";
import HotelGroup from "./hotelgroup"; 
import { AuthData } from "./api/authContext"; 
import { GetHotelGroups, REFRESH_TOKEN } from "@/lib/graphqlOperation/operation";
import {createApolloClient} from "@/lib/apollo-client";
import { useContext, useEffect } from "react";
import { GlobleContext } from "@/components/common/modalContext";
import Cookies from "js-cookie";
import Router from "next/router";
import { setContext } from "@apollo/client/link/context";
import { useMutation } from "@apollo/client";
// import useRefreshAccessToken, { isTokenExpired } from "@/lib/token";
const Home = ({ hotel }:any) => { 
  let token = Cookies.get("token")
 
  
const { dispatch }:any = useContext(GlobleContext);

 const client  = createApolloClient(token)
const [refreshToken] = useMutation(REFRESH_TOKEN, { client ,
  onError: (error) => { 
    if (error.message === 'Invalid or expired token') { 
      handleTokenRefresh();
    } else { 
      console.error(error);
    }
  },
});

const handleTokenRefresh = async () => {
  // debugger
  try { 
    const { data } = await refreshToken({
      variables: { accessToken: token },
    });
    const newAccessToken = data.refreshToken.accessToken;
    Cookies.set('token', newAccessToken); 
  } catch (error) { 
    console.error('Error refreshing token:', error);
  }
};

 
useEffect(() => {
  handleTokenRefresh()
  // if(!hotel){  
  //     Router?.replace("/auth/login"); 
  // }
  dispatch({ type: 'SET_HOTEL_GROUPS_DATA', payload: hotel });
},[])
  // console.log(hotel, "data+++"); //will remove once done with data
  const { auth }:{auth: boolean} = AuthData();
  if (auth)
    return (
      <>
        <main className="main-wrapper">
          <MainLayout>         
            <HotelGroup />
          </MainLayout>
        </main>
      </>
    );
  return <Sppiner />;
};
export default Home;
 
 
//  graphql function ---->>>
 

export const getServerSideProps = async (context:any) => {
  const { req } = context; 
  // console.log(context,"localToken+++")
  const token = req?.headers.cookie ? req?.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1") : null;

  try {
    const client = createApolloClient(token );
    const res = await client.query({
      query: GetHotelGroups,
      variables:{
        limit:20,
        skip:0
      },
      context: {
        headers: {
          authorization: token  ? `Bearer ${token }` : "",
        },
      },
    }); 

    const serializedData = JSON.parse(JSON.stringify(res?.data)); 
    return {
      props: {
        hotel: res?.data ? serializedData: null,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        hotel: null,
      },
    };
  }
};
