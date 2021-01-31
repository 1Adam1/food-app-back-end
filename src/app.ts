import express from 'express';
import {DatabaseLoader} from './services/loaders/database-loader.service';
import userRouter from './api/user.api';
import shopRouter from './api/shop.api';
import productRouter from './api/product.api';
import productOfferRouter from './api/product-offer.api';
import mealRouter from './api/meal.api';
import shoppingListRouter from './api/shopping-list.api';
import personRouter from './api/person.api';
import personalProfileRouter from './api/personal-profile.api';
import consumedMealsHistoryDay from './api/consumed-meals-history-day.api';
import dietPlanDayRouter from './api/diet-plan-day.api';

DatabaseLoader.load();

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());
app.use(userRouter);
app.use(shopRouter);
app.use(productRouter);
app.use(productOfferRouter);
app.use(mealRouter);
app.use(shoppingListRouter);
app.use(personRouter);
app.use(personalProfileRouter);
app.use(consumedMealsHistoryDay);
app.use(dietPlanDayRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});