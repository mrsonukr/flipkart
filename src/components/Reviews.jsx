import React from "react";
import ReviewCard from "../components/product-ui/ReviewCard";

// Function to generate label based on rating
const getRatingLabel = (rating) => {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4.0) return "Outstanding";
  if (rating >= 3.5) return "Good";
  if (rating >= 3.0) return "Average";
  if (rating >= 2.0) return "Below Average";
  return "Poor";
};

// Function to pick rating image based on rounded rating
const getRatingImage = (rating) => {
  const rounded = Math.round(rating); // e.g. 4.3 → 4
  return `/assets/images/svg/rating${rounded}.svg`;
};

// Array of reviews
const reviews = [
  {
    rating: 4.3,
    variant: "Color Pearl White · RAM 8GB · Storage 256GB",
    reviewText: "One of the best purchases I've made this year!",
    reviewer: "Jane Smith, Los Angeles",
    helpfulCount: 234,
    dislikeCount: 7,
    daysAgo: "2 weeks ago",
  },
  {
    rating: 4.6,
    variant: "Color Midnight Black · RAM 6GB · Storage 128GB",
    reviewText: "Absolutely amazing! This phone is a game-changer!",
    reviewer: "John Doe, New York",
    helpfulCount: 180,
    dislikeCount: 5,
    daysAgo: "3 days ago",
  },
  {
    rating: 3.8,
    variant: "Color Gold · RAM 4GB · Storage 64GB",
    reviewText: "Good value for money, but the battery could be better.",
    reviewer: "Anita Sharma, Delhi",
    helpfulCount: 89,
    dislikeCount: 12,
    daysAgo: "1 week ago",
  },
];

const Reviews = () => {
  return (
    <div>
      {reviews.map((review, index) => (
        <ReviewCard
          key={index}
          rating={review.rating}
          label={getRatingLabel(review.rating)}
          ratingImage={getRatingImage(review.rating)}
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
