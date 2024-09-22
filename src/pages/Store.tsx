import  { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Card, CardContent, CardMedia, Typography, Grid, Button } from '@mui/material';
import { RazorpayOptions } from '../types/razorpay';
import { IProduct } from '../types/store.types';

export const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products/');
        setProducts(response.data);

        console.log(response.data);

      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handlePayNow = (product: IProduct) => {
    axios
      .post('/orders/create-order/', { product_id: product.id })
      .then((response) => {
        const { order_id, razorpay_key_id, amount } = response.data;

        const options: RazorpayOptions = {
          key: razorpay_key_id,
          currency: 'INR',
          name: 'Tejas Vaij',
          description: product.description,
          order_id: order_id,
          amount: amount,
          handler: function (paymentResponse: any) {
            console.log(paymentResponse);
          },
          prefill: {
            name: '', // Prefill if known
            email: '',
            contact: '',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Grid container spacing={2}>
      {products.map((product: IProduct) => (
        <Grid item key={product.id} xs={12} sm={6} md={4}>
          <Card className='w-96'>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product.cover_image} // Adjust according to your API response structure
            />
            <CardContent>
              <Typography variant="h5">{product.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product.description}
              </Typography>
              <Typography variant="h6">${product.price}</Typography>

              {/* Add Buy Now button here */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePayNow(product)}
              >
                Buy Now
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Store;
