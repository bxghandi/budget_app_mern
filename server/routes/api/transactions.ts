import express, { NextFunction, Request, Response } from 'express';
import { Transaction, TransactionType } from '../../models/transactions';

const router = express.Router();

interface TransactionResponse extends Response {
  transaction?: TransactionType;
}

// @route   GET api/transactons
// @desc    Get All transactions
// @access  Public
router.get('/', (req: Request, res: Response) => {
  Transaction.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @route   GET api/transactions
// @desc    Get a transaction
// @access  Public
router.get('/:id', getTransaction, (req: Request, res: TransactionResponse) => {
  res.json(res.transaction);
});

// @route   POST api/transactions
// @desc    Create a transaction
// @access  Public
router.post('/', (req: Request, res: Response) => {
  const newTransaction = new Transaction({
    date: req.body.date,
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount,
    account: req.body.account,
  });

  newTransaction
    .save()
    .then((item) => res.status(201).json(item))
    .catch((error) => res.status(400).json(error));
});

// @route   UPDATE api/transactions/:id
// @desc    UPDATE a transaction
// @access  Public
router.patch(
  '/:id',
  getTransaction,
  (req: Request, res: TransactionResponse) => {
    if (req.body.date != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).item.date = req.body.date;
    }
    if (req.body.description != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).item.description = req.body.description;
    }
    if (req.body.category != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).item.category = req.body.category;
    }
    if (req.body.amount != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).item.amount = req.body.amount;
    }
    if (req.body.account != null) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (res as any).item.account = req.body.account;
    }

    const newTransaction = new Transaction(res.transaction);

    newTransaction
      .save()
      .then(() => res.json(res.transaction))
      .catch((err) => res.status(400).json(err));
  }
);

async function getTransaction(
  req: Request,
  res: TransactionResponse,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let transaction: any;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(404).json({ message: 'Cannot find transaction' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.transaction = transaction;
  next();
}

export default router;
