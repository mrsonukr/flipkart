import React from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "../components/product-ui/ReviewCard";
import { getProductById } from "../utils/productUtils";
import { generateReviewsForProduct } from "../utils/reviewUtils";

const Reviews = () => {
  const { id } = useParams();
  const product = getProductById(id);
  
  if (!product) {
    return <div>Loading reviews...</div>;
  }
  
  // Generate 3 dynamic reviews based on product category
  const reviews = generateReviewsForProduct(product, 3);

  return (
    <div className="mb-20">
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          rating={review.rating}
          label={review.label}
          ratingImage={review.ratingImage}
          variant={review.variant}
          reviewText={review.reviewText}
          reviewer={review.reviewer}
          helpfulCount={review.helpfulCount}
          dislikeCount={review.dislikeCount}
          daysAgo={review.daysAgo}
        />
      ))}
    </div>
  );
};

export default Reviews;