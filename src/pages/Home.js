
import 'bootstrap/dist/css/bootstrap.min.css';
import Banner from '../components/Banner';
import Bar from '../components/Bar';
import NewProductSlide from '../components/ProductSlide';
import Sale from '../components/Sale';


export default function Home(){
     return(
         <>
            <Banner></Banner>
            <Bar></Bar>
            <NewProductSlide></NewProductSlide>
            <Sale></Sale>
        </>
    )
}

