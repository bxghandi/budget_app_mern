import express, { NextFunction, Request, Response } from 'express';
import { AccountsResponse } from '../../models/responses';
import { AccountsType } from '../../models/accounts';
import { getAll, postOne, deleteOne, patchOne, getOne } from '../../utils';

const router = express.Router();
const collectionName = process.env.ACCOUNTS_COLLECTION as string;

// @route   GET api/accounts
// @desc    Get All Accounts
// @access  Public
router.get('/', async (req: Request, res: AccountsResponse) => {
  const result = await getAll(collectionName);
  res.json(result);
});

// @route   GET api/accounts/:id
// @desc    Get an account
// @access  Public
router.get('/:id', getAccount, async (req: Request, res: AccountsResponse) => {
  res.json(res.account);
});

// @route   POST api/accounts
// @desc    Create an account
// @access  Public
router.post('/', async (req: Request, res: Response) => {
  if (req.body.currentBalance == null) {
    req.body.currentBalance = req.body.startingBalance;
  }
  if (req.body.nickname == null) {
    req.body.nickname = req.body.name;
  }
  if (!['Budget', 'Loans', 'Tracking'].includes(req.body.category)) {
    return res.status(400).json({ message: 'Invalid Category' });
  }
  if (
    req.body.category === 'Budget' &&
    !['Banking', 'Credit'].includes(req.body.subCategory)
  ) {
    return res.status(400).json({ message: 'Invalid Sub-Category' });
  }

  const newAccount: AccountsType = req.body;
  const postResults = await postOne(collectionName, newAccount);
  res.json(postResults.result);
});

// @route   UPDATE api/account/:id
// @desc    Update an account
// @access  Public
router.patch(
  '/:id',
  getAccount,
  async (req: Request, res: AccountsResponse) => {
    const results = await patchOne(collectionName, req.params.id, req.body);
    res.json(results);
  }
);

// @route   DELETE api/account/:id
// @desc    Delete an account
// @access  Public
router.delete(
  '/:id',
  getAccount,
  async (req: Request, res: AccountsResponse) => {
    if (res.account !== undefined) {
      //   console.log('id', res.account._id);
      const deleteResult = await deleteOne(collectionName, req.params.id);
      res.json(deleteResult.result);
    }
  }
);

async function getAccount(
  req: Request,
  res: AccountsResponse,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let account: any;

  try {
    account = await getOne(collectionName, req.params.id);
    if (account == null) {
      return res.status(404).json({ message: 'Cannot find account' });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }

  res.account = account;
  next();
}

export default router;
