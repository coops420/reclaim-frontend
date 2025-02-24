import React, { useState, useEffect } from "react";
import "./CountdownTimer.css";

const CountdownTimer = () => {
  const getNextMondayMidnight = () => {
    let now = new Date();
    let nextTarget = new Date(now);

    // Calculate days until the next Monday
    let daysUntilMonday = (8 - now.getDay()) % 7;
    if (daysUntilMonday === 0) daysUntilMonday = 7; // Ensure it's always next Monday

    nextTarget.setDate(now.getDate() + daysUntilMonday);
    nextTarget.setHours(0, 0, 0, 0);
    
    return nextTarget;
  };

  const calculateTimeLeft = () => {
    const now = new Date();
    const targetTime = getNextMondayMidnight();
    const difference = targetTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        // Restart the timer by updating state
        setTimeLeft(calculateTimeLeft());
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="countdown-container">
      <div className="countdown-timer">
        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>
      <div className="countdown-subtext">
        {/* Optional subtext can be added here */}
      </div>
    </div>
  );
};

export default CountdownTimer;

