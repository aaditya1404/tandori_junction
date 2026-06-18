import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import {
  db,
} from "@/firebase/firebase";

export const addReview =
  async (review) => {

    try {

      await addDoc(
        collection(
          db,
          "reviews"
        ),
        {
          ...review,
          createdAt:
            serverTimestamp(),
        }
      );

      return {
        success: true,
      };

    } catch (error) {

      return {
        success: false,
        error:
          error.message,
      };

    }

  };

export const getReviews =
  async () => {

    const snapshot =
      await getDocs(
        collection(
          db,
          "reviews"
        )
      );

    return snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

  };
  export const getRatingStats =
  async () => {

    const reviews =
      await getReviews();

    const totalReviews =
      reviews.length;

    const averageRating =
      totalReviews
        ? (
            reviews.reduce(
              (
                sum,
                review
              ) =>
                sum +
                review.rating,
              0
            ) /
            totalReviews
          ).toFixed(1)
        : 0;

    return {

      totalReviews,

      averageRating,

    };

  };