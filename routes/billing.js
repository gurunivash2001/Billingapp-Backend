const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');
const PDFDocument = require('pdfkit');

 
router.post('/', async (req, res) => {
  try {
    const { products, discount, tax } = req.body;
    let subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    let total = subtotal - discount + tax;

    const bill = new Bill({ products, discount, tax, total });
    await bill.save();

    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Error generating bill', error });
  }
});

 
router.get('/export/:id', async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=bill-${bill._id}.pdf`);

    doc.text(`Bill ID: ${bill._id}`);
    doc.text(`Date: ${bill.createdAt}`);
    doc.text('');
    bill.products.forEach(p => {
      doc.text(`${p.name} - $${p.price} x ${p.quantity}`);
    });
    doc.text(`Discount: $${bill.discount}`);
    doc.text(`Tax: $${bill.tax}`);
    doc.text(`Total: $${bill.total}`);
    doc.end();

    doc.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Error exporting bill', error });
  }
});

module.exports = router;
