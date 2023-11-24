import { Router } from "express";
import { plaidGetTransactions } from "../../../Services/Plaid/actions";

export const transactionRoutes = Router();

transactionRoutes.post('/', async (req, res) => {
  try {
    const {
      accessToken,
      startDate,
      endDate,
    } = req.body;
    console.log(accessToken);

    const transactions = await plaidGetTransactions({
      accessToken,
      startDate,
      endDate
    });

    res
      .status(200)
      .json({ transactions });
  } catch (error: any) {
    res
      .status(400)
      .json({ Error: error.message });
  }
})
