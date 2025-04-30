import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../services/AxiosConfig';
import { AuthService } from '../../services/AuthService';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/apiConstants';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/Product';
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import Paginate from '../../components/Paginate'
import ProductCarousel from '../../components/ProductCarousel'
import Meta from '../../components/Meta'
import { Row, Col } from 'react-bootstrap';
import { allProducts, listProducts } from '../../actions/productActions'

function Home(match)  {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { keyword, pageNumber = 1 } = useParams();

    const dispatch = useDispatch()

    const productAll = useSelector((state) => state.productAll) 
    const { error, products, page, pages } = productAll


    useEffect(() => {
        dispatch(allProducts())
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('access_token');
                console.log(" Retrieved Token:", token)
                if (!token) throw new Error("No token found");
                
                console.log(" Sending Token:", `Bearer ${token}`);

                const response = await axiosInstance.get('http://127.0.0.1:5000/auth/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                AuthService.logout();
                navigate('/login'); 
            }
            setLoading(false);
        };
        fetchUserData();
    },[dispatch, keyword, pageNumber , navigate]);

    return (
        <>
        <Link to="/product">Go to Product</Link>
        <Meta />
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Link to='/' className='btn btn-light'>
            Go Back
          </Link>
        )}
        <h1>Latest Products</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
            {Array.isArray(products) && products.map((product) => (
            <Col key={product.name}>
              <Product product={product} />
            </Col>
          ))}
            </Row>
            {/* <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ''}
            /> */}
          </>
        )}
      </>
    );
}

export default Home;