import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, X, Image as ImageIcon } from "lucide-react";
import { reviews, Review } from "@/data/reviews";
import { Button } from "@/components/ui/button";

const ReviewsSection = () => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scrollSpeed = 1;
    let animationId: number;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Reset scroll when reaching halfway (since we duplicate the reviews)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  const handleReviewClick = (review: Review) => {
    setSelectedReview(review);
  };

  const closeModal = () => {
    setSelectedReview(null);
  };

  // Duplicate reviews for infinite scroll effect
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <motion.section
      id="reviews"
      className="section-padding relative overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real feedback from clients who trusted me with their projects
          </p>
        </motion.div>

        {/* Reviews Carousel - Auto-scrolling */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden pb-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedReviews.map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5), duration: 0.5 }}
                viewport={{ once: true }}
                onClick={() => handleReviewClick(review)}
                className="glass-card p-6 min-w-[360px] max-w-[360px] flex-shrink-0 group hover-lift relative cursor-pointer"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Screenshot preview (primary) */}
                {review.screenshot ? (
                  <div className="mb-4 rounded-xl overflow-hidden border border-border/50 bg-card/30">
                    <img
                      src={review.screenshot}
                      alt={`Client review screenshot ${review.id}`}
                      className="w-full h-[180px] object-contain bg-background/30"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="mb-4 rounded-xl border border-border/50 bg-card/30 h-[180px] flex items-center justify-center text-muted-foreground">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}

                {/* Comment (optional) */}
                {review.comment ? (
                  <p className="text-foreground/90 leading-relaxed mb-4 line-clamp-3 text-sm">
                    "{review.comment}"
                  </p>
                ) : (
                  <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                    Click to view the full review screenshot.
                  </p>
                )}

                {/* Meta info */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  <div>
                    {review.project && (
                      <span className="text-xs text-primary font-medium block">
                        {review.project}
                      </span>
                    )}
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  {review.country && (
                    <span className="text-xs text-muted-foreground">
                      📍 {review.country}
                    </span>
                  )}
                </div>

                {/* Click hint */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to expand
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-6 sm:p-8 max-w-4xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: selectedReview.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Full Comment */}
              {selectedReview.comment && (
                <p className="text-foreground leading-relaxed mb-6 text-lg">
                  "{selectedReview.comment}"
                </p>
              )}

              {/* Full Screenshot */}
              {selectedReview.screenshot && (
                <div className="mb-6 rounded-2xl overflow-hidden border border-border/50 bg-card/30">
                  <img
                    src={selectedReview.screenshot}
                    alt={`Client review screenshot ${selectedReview.id}`}
                    className="w-full max-h-[70vh] object-contain bg-background/30"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              )}

              {/* Meta info */}
              <div className="flex items-center justify-between pt-4 border-t border-border/50 mb-6">
                <div>
                  {selectedReview.project && (
                    <span className="text-sm text-primary font-medium block">
                      {selectedReview.project}
                    </span>
                  )}
                  <p className="text-sm text-muted-foreground">{selectedReview.date}</p>
                </div>
                {selectedReview.country && (
                  <span className="text-sm text-muted-foreground">
                    📍 {selectedReview.country}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="grid gap-3 sm:grid-cols-2">
                {selectedReview.screenshot ? (
                  <Button asChild variant="outline" className="border-primary/50 hover:bg-primary/10">
                    <a href={selectedReview.screenshot} target="_blank" rel="noopener noreferrer">
                      Open Screenshot
                    </a>
                  </Button>
                ) : (
                  <div />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default ReviewsSection;