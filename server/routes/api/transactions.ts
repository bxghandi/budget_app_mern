import express, { NextFunction, Request, Response } from 'express';
import { Transaction } from '../../models/transactions';
import { TransactionResponse, DeleteResponse } from '../../models/responses';

const router = express.Router();

// @route   GET api/transactons
// @desc    Get All transactions
// @access  Public
router.get('/', async (req: Request, res: TransactionResponse) => {
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
router.post('/', async (req: Request, res: Response) => {
  await Transaction.create(req.body)
    .then((account) => res.sendStatus(201).json(account))
    .catch((err) => res.sendStatus(400).json(err));
});

// @route   UPDATE api/transactions/:id
// @desc    UPDATE a transaction
// @access  Public
router.patch(
  '/:id',
  getTransaction,
  async (req: Request, res: TransactionResponse) => {
    await Transaction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true, useFindAndModify: false }
    )
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
  }
);

// @route   DELETE api/transactions/many
// @desc    Delete a transaction
// @access  Public
router.delete('/many', async (req: Request, res: DeleteResponse) => {
  const idArray: string[] = req.body.ids;

  await Transaction.deleteMany({ _id: { $in: idArray } })
    .then((data) => res.send(data))
    .catch((err) => res.sendStatus(500).json({ message: err.message }));
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Public
router.delete(
  '/:id',
  getTransaction,
  async (req: Request, res: TransactionResponse) => {
    await Transaction.findByIdAndRemove(req.params.id)
      .then(() => res.json({ message: 'Transaction Deleted' }))
      .catch((err) => res.status(500).json({ message: err.message }));
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
