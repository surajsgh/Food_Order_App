import React, { useEffect, useState } from 'react';

import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealsItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const loadData = async function () {
      try {
        const res = await fetch(
          'https://food-order-application-8d176-default-rtdb.firebaseio.com/meals.json'
        );
        if (!res.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await res.json();

        const loadedMeals = [];

        for (const key in data) {
          loadedMeals.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }
        setMeals(loadedMeals);
      } catch (error) {
        setHttpError(error.message);
      }
    };
    loadData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className={styles.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.error}>
        <p>{httpError}!</p>
      </section>
    );
  }

  const reactMeals = meals.map(meal => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{reactMeals}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
