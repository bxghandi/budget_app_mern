import express, { NextFunction, Request, Response } from 'express';
import { Account, AccountsType } from '../../models/accounts';

const router = express.Router();

interface AccountsResponse extends Response {
  account?: AccountsType;
}

// @route   GET api/accounts
// @desc    Get All Accounts
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  await Account.find().then((accounts) => res.json(accounts));
});

// @route   GET api/accounts/:id
// @desc    Get an account
// @access  Public
router.get('/:id', getAccount, (req: Request, res: AccountsResponse) => {
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

  await Account.create(req.body)
    .then((account) => res.sendStatus(201).json(account))
    .catch((err) => res.sendStatus(400).json(err));
});

// @route   DELETE api/account/:id
// @desc    Delete an account
// @access  Public
router.delete(
  '/:id',
  getAccount,
  async (req: Request, res: AccountsResponse) => {
    const currAccount = new Account(res.account);

    await Account.findByIdAndRemove(currAccount.id)
      .then(() => res.json({ message: 'Account Deleted' }))
      .catch((err) => res.status(500).json({ message: err.message }));
  }
);

// @route   UPDATE api/account/:id
// @desc    Update an account
// @access  Public
router.patch(
  '/:id',
  getAccount,
  async (req: Request, res: AccountsResponse) => {
    await Account.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true, useFindAndModify: false }
    )
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err));
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
    account = await Account.findById(req.params.id);
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