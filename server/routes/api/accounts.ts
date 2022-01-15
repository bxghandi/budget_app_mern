import express, { NextFunction, Request, Response } from 'express';
import { AccountsResponse } from '../../models/responses';
import { accounts_collection as collection } from '../../server';

const router = express.Router();

// @route   GET api/accounts
// @desc    Get All Accounts
// @access  Public
router.get('/', async (req: Request, res: AccountsResponse) => {
  await collection
    .find({})
    .toArray()
    .then((accounts) => res.json(accounts))
    .catch((err) => res.json(err));
  //   await Account.find().then((accounts) => res.json(accounts));
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

  await collection
    .insertOne(req.body)
    .then((account) => res.sendStatus(201).json(account))
    .catch((err) => res.sendStatus(400).json(err));

  //   await Account.create(req.body)
  //     .then((account) => res.sendStatus(201).json(account))
  //     .catch((err) => res.sendStatus(400).json(err));
});

// @route   DELETE api/account/:id
// @desc    Delete an account
// @access  Public
router.delete(
  '/:id',
  getAccount,
  async (req: Request, res: AccountsResponse) => {
    // await Account.findByIdAndRemove(req.params.id)
    //   .then(() =>
    //     res.json({ account: res.account, message: 'Account Deleted' })
    //   )
    //   .catch((err) => res.status(500).json({ message: err.message }));

    await collection
      .deleteOne({ _id: res.account?.id })
      .then(() =>
        res.json({ account: res.account, message: 'Account Deleted' })
      )
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
    //     await Account.findByIdAndUpdate(
    //       req.params.id,
    //       { $set: req.body },
    //       { new: true, runValidators: true, useFindAndModify: false }
    //     )
    //       .then((data) => res.json(data))
    //       .catch((err) => res.status(400).json(err));
    //   }

    await collection
      .updateOne({ _id: req.params.id }, { $set: req.body })
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
    // account = await Account.findById(req.params.id);
    account = await collection.find({ _id: req.params.id }).toArray();
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
