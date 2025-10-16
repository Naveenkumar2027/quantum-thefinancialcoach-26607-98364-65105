import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useLocation } from "react-router-dom";

const OnboardingPopup = () => {
  const { isOnboarding, currentStepData, nextStep, skipOnboarding } = useOnboarding();
  const location = useLocation();
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("👀 Onboarding Popup Check:", { 
      isOnboarding, 
      currentStepData, 
      pathname: location.pathname 
    });
    
    if (!isOnboarding || !currentStepData) {
      setIsVisible(false);
      return;
    }

    // Check if we're on the correct page for this step
    const currentPage = location.pathname === "/" ? "login" : 
                       location.pathname.includes("/dashboard") ? "dashboard" :
                       location.pathname.includes("/groups") ? "groups" :
                       location.pathname.includes("/profile") ? "profile" : null;

    console.log("📍 Page match:", { currentPage, stepPage: currentStepData.page });

    if (currentPage !== currentStepData.page) {
      setIsVisible(false);
      return;
    }

    // Calculate position based on target element
    if (currentStepData.targetElement && currentStepData.position !== "center") {
      const element = document.getElementById(currentStepData.targetElement);
      if (element) {
        // Scroll element into view if needed
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        
        setTimeout(() => {
          const rect = element.getBoundingClientRect();
          const scrollY = window.scrollY;
          const scrollX = window.scrollX;

          let top = 0;
          let left = 0;

          switch (currentStepData.position) {
            case "bottom":
              top = rect.bottom + scrollY + 24;
              left = rect.left + scrollX + rect.width / 2;
              break;
            case "top":
              top = rect.top + scrollY - 24;
              left = rect.left + scrollX + rect.width / 2;
              break;
            case "left":
              top = rect.top + scrollY + rect.height / 2;
              left = rect.left + scrollX - 24;
              break;
            case "right":
              top = rect.top + scrollY + rect.height / 2;
              left = rect.right + scrollX + 24;
              break;
          }

          setPosition({ top: `${top}px`, left: `${left}px` });
        }, 300);
      }
    }

    setIsVisible(true);
  }, [isOnboarding, currentStepData, location.pathname]);

  if (!isOnboarding || !currentStepData || !isVisible) {
    return null;
  }

  const isCentered = currentStepData.position === "center" || !currentStepData.targetElement;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] pointer-events-none">
        {/* Dark overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
          onClick={skipOnboarding}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: isCentered ? 0 : 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: isCentered ? 0 : 10 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`absolute pointer-events-auto ${
            isCentered
              ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              : "transform -translate-x-1/2 -translate-y-1/2"
          }`}
          style={isCentered ? {} : position}
        >
          <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-primary/20 p-6 max-w-sm w-[90vw] md:w-full">
            {/* Close button */}
            <button
              onClick={skipOnboarding}
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors hover:scale-110"
              aria-label="Skip onboarding"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-4">
              {/* Title */}
              <h3 className="text-xl font-bold text-white leading-tight pr-8">
                {currentStepData.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                {currentStepData.description}
              </p>

              {/* Button */}
              <button
                onClick={nextStep}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg py-3 px-6 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl text-sm"
              >
                {currentStepData.buttonText}
              </button>

              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-1.5 pt-1">
                {[...Array(11)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i + 1 === currentStepData.id
                        ? "w-6 bg-primary"
                        : i + 1 < currentStepData.id
                        ? "w-1 bg-primary/50"
                        : "w-1 bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Arrow pointer for non-centered popups */}
          {!isCentered && currentStepData.targetElement && (
            <div
              className={`absolute w-3 h-3 bg-card/95 backdrop-blur-xl border-primary/20 transform rotate-45 ${
                currentStepData.position === "bottom"
                  ? "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-l border-t"
                  : currentStepData.position === "top"
                  ? "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-r border-b"
                  : currentStepData.position === "left"
                  ? "right-0 top-1/2 translate-x-1/2 -translate-y-1/2 border-r border-t"
                  : "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 border-l border-b"
              }`}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default OnboardingPopup;
