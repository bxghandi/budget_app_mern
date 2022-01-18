import express, { NextFunction, Request, Response } from 'express';
import { TransactionResponse, DeleteResponse } from '../../models/responses';
import {
  getAll,
  postOne,
  deleteOne,
  patchOne,
  getOne,
  deleteMany,
} from '../../utils';
import { TransactionType } from '../../models/transactions';

const router = express.Router();
const collectionName = process.env.TRANSACTIONS_COLLECTION as string;

// @route   GET api/transactons
// @desc    Get All transactions
// @access  Public
router.get('/', async (req: Request, res: TransactionResponse) => {
  const result = await getAll(collectionName);
  res.json(result);
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
  const newTransaction: TransactionType = req.body;
  const postResults = await postOne(collectionName, newTransaction);
  res.json(postResults.result);
});

// @route   UPDATE api/transactions/:id
// @desc    UPDATE a transaction
// @access  Public
router.patch(
  '/:id',
  getTransaction,
  async (req: Request, res: TransactionResponse) => {
    const results = await patchOne(collectionName, req.params.id, req.body);
    res.json(results);
  }
);

// @route   DELETE api/transactions/many
// @desc    Delete a transaction
// @access  Public
router.delete('/many', async (req: Request, res: DeleteResponse) => {
  const deleteResults = await deleteMany(collectionName, req.body.ids);
  res.json(deleteResults.result);
});

// @route   DELETE api/transactions/:id
// @desc    Delete a transaction
// @access  Public
router.delete(
  '/:id',
  getTransaction,
  async (req: Request, res: TransactionResponse) => {
    const deleteResult = await deleteOne(collectionName, req.params.id);
    res.json(deleteResult.result);
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
    transaction = await getOne(collectionName, req.params.id);
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
