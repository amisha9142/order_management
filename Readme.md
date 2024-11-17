Admin APIs:
POST http://localhost:5000/api/admin/create-order
{
"item": "Smartphone",
"customerName": "Alice Doe",
"pincode": "123456"
}

GET http://localhost:5000/api/admin/orders
POST http://localhost:5000/api/admin/forward-order (Body: { "orderId": "id", "sellerId": "id" })

Seller APIs:
GET http://localhost:5000/api/seller/orders/:sellerId
POST http://localhost:5000/api/seller/update-order (Body: { "orderId": "id", "status": "Accepted" })
