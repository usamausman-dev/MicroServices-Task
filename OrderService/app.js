const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());

// Create a new order
app.post('/orders', async (req, res) => {
  const { userId, productId, quantity, status } = req.body;

  try {
    const result = await db.createOrder(userId, productId, quantity, status);
    res.status(201).json({ message: 'Order created successfully', orderId: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders for a user
app.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await db.getOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

app.put('/orders/:orderId/pay', async (req, res) => {
  const { orderId } = req.params;

  try {
    const result = await db.updateOrderStatus(orderId, 'Paid');
    if (result) {
      res.status(200).json({ message: 'Order status updated to Paid' });
    } else {
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});


const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Order Service running on port ${PORT}`));
